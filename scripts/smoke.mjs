/*
 * Browser smoke test for the interactive layer — the state machine in
 * lib/ui-state.ts, the panels it drives, and the DOM the anime.js layer hooks
 * into. Nothing here is unit-testable without a DOM, so it drives a real
 * headless Edge/Chrome over CDP and asserts on the live page.
 *
 *   npm run build && npm start -- -l 3111     # in one shell (serves ./out)
 *   node scripts/smoke.mjs                    # in another
 *   node scripts/smoke.mjs                     # in another
 *
 * Env: SMOKE_URL (default http://127.0.0.1:3111/), SMOKE_PORT (default 9222).
 */

import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const URL_UNDER_TEST = process.env.SMOKE_URL ?? "http://127.0.0.1:3111/";
const CDP_PORT = Number(process.env.SMOKE_PORT ?? 9222);
const BROWSERS = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "/usr/bin/microsoft-edge",
  "/usr/bin/google-chrome",
];

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "ok  " : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* ---------------------------------------------------------------- CDP plumbing */

async function connect() {
  for (let attempt = 0; attempt < 40; attempt++) {
    try {
      const targets = await (await fetch(`http://127.0.0.1:${CDP_PORT}/json/list`)).json();
      const page = targets.find((t) => t.type === "page");
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
    } catch {
      // browser still starting
    }
    await sleep(250);
  }
  throw new Error(`no CDP page target on :${CDP_PORT}`);
}

function session(ws) {
  const pending = new Map();
  let nextId = 0;
  const events = new Map();

  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id !== undefined) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(msg.error.message));
      else resolve(msg.result);
    } else {
      events.get(msg.method)?.forEach((fn) => fn(msg.params));
    }
  });

  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const id = ++nextId;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });

  const once = (method) =>
    new Promise((resolve) => {
      const list = events.get(method) ?? [];
      const fn = (params) => {
        events.set(method, list.filter((f) => f !== fn));
        resolve(params);
      };
      list.push(fn);
      events.set(method, list);
    });

  /** Evaluates an expression in the page and returns its value. */
  const evaluate = async (expression) => {
    const { result, exceptionDetails } = await send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (exceptionDetails) throw new Error(exceptionDetails.text + " in " + expression);
    return result.value;
  };

  return { send, once, evaluate, on: (method, fn) => events.set(method, [...(events.get(method) ?? []), fn]) };
}

const key = (type, k, code, vk, modifiers = 0) => ({
  type,
  key: k,
  code,
  windowsVirtualKeyCode: vk,
  nativeVirtualKeyCode: vk,
  modifiers,
});

async function press(cdp, k, code, vk) {
  await cdp.send("Input.dispatchKeyEvent", key("keyDown", k, code, vk));
  await cdp.send("Input.dispatchKeyEvent", key("keyUp", k, code, vk));
}

const clickJs = (expression) => `(() => {
  const el = (${expression});
  if (!el) return "missing";
  el.click();
  return "clicked";
})()`;

const CLICKERS = {
  palette:
    '[...document.querySelectorAll("header button")].find(b => b.textContent.includes("palette"))',
  dark: 'document.querySelector(\'header button[aria-label*="Switch to"]\')',
  sound:
    'document.querySelector(\'button[title*="UI sounds"], button[title*="Mute"]\')',
  cmdkButton: 'document.querySelector(\'button[aria-label*="Command Palette"]\')',
  terminalLauncher: 'document.querySelector(\'button[aria-label*="terminal"]\')',
  workTile: 'document.querySelector("#work article")',
  certTile: 'document.querySelector("#certs figure button")',
};

async function click(cdp, name) {
  const outcome = await cdp.evaluate(clickJs(CLICKERS[name]));
  if (outcome !== "clicked") throw new Error(`could not click ${name}: ${outcome}`);
  await sleep(320);
}

/* ------------------------------------------------------------------- the run */

async function main() {
  const browser = BROWSERS.find((path) => existsSync(path));
  if (!browser) throw new Error("no Edge/Chrome found");

  const profile = mkdtempSync(join(tmpdir(), "portfolio-smoke-"));
  const child = spawn(
    browser,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${CDP_PORT}`,
      `--user-data-dir=${profile}`,
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const wsUrl = await connect();
  const ws = new WebSocket(wsUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  const cdp = session(ws);
  const pageErrors = [];
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Page.bringToFront");
  // Without this, headless occasionally treats the tab as backgrounded and
  // throttles requestAnimationFrame, which stalls the anime.js animations.
  await cdp.send("Page.setWebLifecycleState", { state: "active" });
  cdp.on("Runtime.exceptionThrown", (params) => {
    const text = params.exceptionDetails?.exception?.description ?? params.exceptionDetails?.text;
    pageErrors.push(String(text).split("\n")[0]);
  });
  cdp.on("Runtime.consoleAPICalled", (params) => {
    if (params.type !== "error" && params.type !== "warning") return;
    pageErrors.push(
      params.args.map((a) => a.description ?? a.value ?? a.type).join(" ").split("\n")[0],
    );
  });

  const goto = async () => {
    const loaded = cdp.once("Page.loadEventFired");
    await cdp.send("Page.navigate", { url: URL_UNDER_TEST });
    await loaded;

    // three.js + R3F make hydration take a moment; a fixed sleep makes the first
    // click race it, so wait for React to have touched the DOM, then for the
    // entrance timeline to have finished — proof the mount effects (and with them
    // the store subscriptions) are live before anything is clicked.
    for (let attempt = 0; attempt < 60; attempt++) {
      const hydrated = await cdp.evaluate(
        `Object.keys(document.getElementById("portfolio") ?? {}).some((k) => k.startsWith("__reactFiber$"))`,
      );
      if (hydrated) break;
      await sleep(250);
    }
    for (let attempt = 0; attempt < 80; attempt++) {
      const landed = await cdp.evaluate(
        `getComputedStyle(document.querySelector("[data-hero]")).opacity === "1"`,
      );
      if (landed) break;
      await sleep(250);
    }
    await sleep(300);
  };

  const emulate = (colorScheme, reducedMotion = "no-preference") =>
    cdp.send("Emulation.setEmulatedMedia", {
      features: [
        { name: "prefers-color-scheme", value: colorScheme },
        { name: "prefers-reduced-motion", value: reducedMotion },
      ],
    });

  try {
    /* -- the store's initial state is what the server rendered -- */
    await emulate("light");
    await goto();
    check(
      "hydrates with the server's palette",
      (await cdp.evaluate("document.documentElement.dataset.palette")) === "bold",
    );
    check(
      "no dark class under a light OS preference",
      (await cdp.evaluate("document.documentElement.classList.contains('dark')")) === false,
      await cdp.evaluate(
        'getComputedStyle(document.documentElement).getPropertyValue("--color-canvas")',
      ),
    );

    /* -- the tokens the base layer still depends on resolve to real colours -- */
    const tokens = await cdp.evaluate(`(() => {
      const body = getComputedStyle(document.body);
      const link = document.querySelector('a[class*="text-background"]');
      return {
        border: body.borderTopColor,
        outline: body.outlineColor,
        onDark: link ? getComputedStyle(link).color : "no element uses text-background",
      };
    })()`);
    check(
      "base-layer border / outline / background resolve",
      tokens.border === "rgb(221, 221, 221)" &&
        tokens.outline !== "" &&
        tokens.outline !== "currentcolor" &&
        tokens.onDark === "rgb(255, 255, 255)",
      JSON.stringify(tokens),
    );

    /* -- mock art resolved to real files, not the image optimizer -- */
    check(
      "all four mock screenshots are plain SVG files",
      (await cdp.evaluate(
        '[...document.images].filter(i => i.src.endsWith(".svg")).length',
      )) === 4,
    );

    /* -- palette: state, <html> attribute, and the anime.js hue-bar sweep.
       The sweep is ~900ms, longer than any reliable CDP round trip, so the page
       records it frame by frame and this reads the recording back. -- */
    await cdp.evaluate(`(() => {
      window.__sweep = { min: 1, frames: 0 };
      const tick = () => {
        for (const bar of document.querySelectorAll("[data-hue-bar]")) {
          const t = getComputedStyle(bar).transform;
          const s = t === "none" ? 1 : new DOMMatrixReadOnly(t).d;
          if (s < window.__sweep.min) window.__sweep.min = s;
        }
        if (++window.__sweep.frames < 240) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      return true;
    })()`);
    await click(cdp, "palette");
    check(
      "palette toggle writes data-palette=calm",
      (await cdp.evaluate("document.documentElement.dataset.palette")) === "calm",
    );
    await sleep(2200);
    const barSweep = await cdp.evaluate(`(() => {
      const scales = [...document.querySelectorAll("[data-hue-bar]")].map((bar) => {
        const t = getComputedStyle(bar).transform;
        return t === "none" ? 1 : new DOMMatrixReadOnly(t).d;
      });
      return {
        min: Math.round(window.__sweep.min * 1000) / 1000,
        frames: window.__sweep.frames,
        finalMin: Math.round(Math.min(...scales) * 1000) / 1000,
        bars: scales.length,
      };
    })()`);
    check(
      "hue bars sweep up from zero and land at full scale",
      barSweep.min < 0.98 && barSweep.finalMin > 0.98,
      JSON.stringify(barSweep),
    );

    /* -- dark: class, persistence, and restore on reload -- */
    await click(cdp, "dark");
    check(
      "dark toggle writes the class",
      (await cdp.evaluate("document.documentElement.classList.contains('dark')")) === true,
    );
    check(
      "dark toggle persists to localStorage",
      (await cdp.evaluate("localStorage.getItem('theme')")) === "dark",
    );
    check(
      "dark toggle restyles the base border token",
      (await cdp.evaluate("getComputedStyle(document.body).borderTopColor")) === "rgb(38, 45, 56)",
      await cdp.evaluate("getComputedStyle(document.body).borderTopColor"),
    );
    check(
      "dark toggle swaps the icon",
      (await cdp.evaluate(
        'document.querySelector(\'header button[aria-label*="Switch to"]\').getAttribute("aria-pressed")',
      )) === "true",
    );
    await goto();
    check(
      "theme survives a reload",
      (await cdp.evaluate("document.documentElement.classList.contains('dark')")) === true,
    );

    // A first-time visitor with a dark OS preference gets dark, via matchMedia.
    await cdp.evaluate("localStorage.clear()");
    await emulate("dark");
    await goto();
    check(
      "falls back to the OS colour scheme",
      (await cdp.evaluate("document.documentElement.classList.contains('dark')")) === true,
    );
    await emulate("light");

    /* -- prefers-reduced-motion keeps the bar visible but drops the sweep -- */
    await emulate("light", "reduce");
    await goto();
    await click(cdp, "palette");
    const reducedBar = await cdp.evaluate(`(() => {
      const bar = document.querySelector("[data-hue-bar]");
      return [getComputedStyle(bar).opacity, Math.round(bar.getBoundingClientRect().height), getComputedStyle(bar).transform];
    })()`);
    check(
      "reduced motion shows the hue bar without animating it",
      reducedBar[0] === "1" && reducedBar[1] > 0 && reducedBar[2] === "none",
      `opacity=${reducedBar[0]} height=${reducedBar[1]} transform=${reducedBar[2]}`,
    );
    await emulate("light");

    /* -- sound: one store drives both the engine and the telemetry button -- */
    await click(cdp, "sound");
    const soundState = await cdp.evaluate(`(() => {
      const b = document.querySelector('button[title*="UI sounds"], button[title*="Mute"]');
      return [b?.getAttribute("aria-pressed"), localStorage.getItem("portfolio_sound_enabled")];
    })()`);
    check(
      "sound toggle updates button and storage together",
      soundState[0] === "true" && soundState[1] === "true",
      soundState.join(" / "),
    );

    /* -- command palette: Ctrl+K opens, typing filters, Escape closes -- */
    await cdp.send("Input.dispatchKeyEvent", key("keyDown", "k", "KeyK", 75, 2));
    await cdp.send("Input.dispatchKeyEvent", key("keyUp", "k", "KeyK", 75, 2));
    await sleep(300);
    check(
      "Ctrl+K opens the palette",
      (await cdp.evaluate('!!document.querySelector(\'[aria-label="Command Menu"]\')')) === true,
    );
    await cdp.evaluate('document.querySelector(\'[aria-label="Command Menu"] input\').focus()');
    await cdp.evaluate(`(() => {
      const input = document.querySelector('[aria-label="Command Menu"] input');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(input, "zzzz");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    })()`);
    await sleep(220);
    const noHits = await cdp.evaluate(
      'document.querySelectorAll(\'[aria-label="Command Menu"] button\').length',
    );
    await cdp.evaluate(`(() => {
      const input = document.querySelector('[aria-label="Command Menu"] input');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(input, "guestbook");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    })()`);
    await sleep(220);
    const hits = await cdp.evaluate(
      'document.querySelectorAll(\'[aria-label="Command Menu"] button\').length',
    );
    await press(cdp, "Escape", "Escape", 27);
    await sleep(300);
    check(
      "palette filters to one match and closes on Escape",
      noHits === 0 &&
        hits === 1 &&
        (await cdp.evaluate('!!document.querySelector(\'[aria-label="Command Menu"]\')')) === false,
      `${noHits} for the nonsense query, ${hits} for "guestbook"`,
    );

    /* -- terminal drawer -- */
    await click(cdp, "terminalLauncher");
    check(
      "terminal drawer opens",
      (await cdp.evaluate(
        '!!document.querySelector(\'[aria-label="Interactive Developer Terminal"]\')',
      )) === true,
    );
    await cdp.evaluate(`(() => {
      const input = document.querySelector('[aria-label="Interactive Developer Terminal"] input');
      const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
      setter.call(input, "help");
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
      return true;
    })()`);
    await sleep(300);
    check(
      "terminal renders the help table from content",
      (await cdp.evaluate(
        `document.querySelector('[aria-label="Interactive Developer Terminal"]').textContent.includes("Technical recruiter fast-track")`,
      )) === true,
    );
    await click(cdp, "terminalLauncher");

    /* -- case study strip -- */
    await click(cdp, "workTile");
    await sleep(700);
    const strip = await cdp.evaluate(`(() => {
      const el = document.getElementById("case-strip");
      return [el.getAttribute("aria-hidden"), Math.round(el.getBoundingClientRect().height)];
    })()`);
    check(
      "work tile opens the case-study strip",
      strip[0] === "false" && strip[1] > 100,
      `aria-hidden=${strip[0]} height=${strip[1]}`,
    );

    /* -- certificate dialog reuses the native <dialog> -- */
    await click(cdp, "certTile");
    await sleep(500);
    check(
      "certificate opens the native dialog",
      (await cdp.evaluate('document.querySelector("dialog").open')) === true,
    );
    await press(cdp, "Escape", "Escape", 27);
    await sleep(300);
    check(
      "certificate dialog closes on Escape",
      (await cdp.evaluate('document.querySelector("dialog").open')) === false,
    );

    /* -- milestone runner: progress drives the dot, not a magic number -- */
    const readRunner = `(() => {
      const dot = document.querySelector('[title="Milestone Runner"]');
      const label = [...document.querySelectorAll("#journey span")].find(s => /^\\d+%$/.test(s.textContent.trim()));
      return { top: parseFloat(dot.style.top), pct: Number(label.textContent.replace("%", "")) };
    })()`;
    await cdp.evaluate(
      'document.getElementById("journey").scrollIntoView({ block: "start", behavior: "instant" })',
    );
    await sleep(600);
    const runnerStart = await cdp.evaluate(readRunner);
    await cdp.evaluate('window.scrollBy({ top: 1400, behavior: "instant" })');
    await sleep(600);
    const runnerEnd = await cdp.evaluate(readRunner);
    check(
      "milestone runner tracks its own container height",
      runnerEnd.pct > runnerStart.pct && runnerEnd.top > runnerStart.top,
      `${runnerStart.pct}%→${runnerEnd.pct}%, top ${runnerStart.top}→${runnerEnd.top}`,
    );
    check(
      "milestone dot stays within the track",
      runnerEnd.top >= 0 && runnerEnd.top <= 100.01,
      `top=${runnerEnd.top}%`,
    );

    /* -- the fluid background drops to its mobile tier on a phone viewport.
       It is a fullscreen fragment shader, so its cost is pixels x frames; the
       only proof the tier engaged is the backbuffer being smaller than the CSS
       viewport. Emulated at 390x844 @3x — the tier is chosen once at mount, so
       this has to be set before the navigation. -- */
    await cdp.send("Emulation.setDeviceMetricsOverride", {
      width: 390,
      height: 844,
      deviceScaleFactor: 3,
      mobile: true,
    });
    await goto();
    const fluid = await cdp.evaluate(`(() => {
      const c = document.querySelector('canvas[aria-hidden="true"]');
      return {
        w: c?.width ?? 0,
        h: c?.height ?? 0,
        cssW: window.innerWidth,
        cssH: window.innerHeight,
        webgl: !!c?.getContext("webgl"),
      };
    })()`);
    check(
      "fluid background renders below native resolution on mobile",
      fluid.webgl && fluid.w > 0 && fluid.w < fluid.cssW && fluid.h < fluid.cssH,
      JSON.stringify(fluid),
    );
    await cdp.send("Emulation.clearDeviceMetricsOverride");

    /* -- anything the page logged as an error or warning is a failure -- */
    check(
      "page logged no errors or warnings",
      pageErrors.length === 0,
      pageErrors.slice(0, 3).join(" | "),
    );
  } finally {
    ws.close();
    child.kill();
    await sleep(300);
    try {
      rmSync(profile, { recursive: true, force: true });
    } catch {
      // best effort
    }
  }

  const failed = results.filter((r) => !r.ok);
  console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
