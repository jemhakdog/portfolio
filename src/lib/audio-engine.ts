/*
 * Synthesized Web Audio API sound effects [Jhey Tompkins inspired]
 * 100% self-contained: zero external audio files, zero network requests, instant playback.
 *
 * The four effects below are one oscillator→gain blip with different numbers.
 * `src/lib/ui-state.ts` mirrors `isEnabled()` into React state for the toggle.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.enabled = localStorage.getItem("portfolio_sound_enabled") === "true";
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "portfolio_sound_enabled",
        this.enabled ? "true" : "false",
      );
    }
    if (this.enabled) {
      this.playChime();
    }
    return this.enabled;
  }

  /** One pitched blip. `from`/`to` are Hz, `ms` the sweep length, `delay` seconds. */
  private blip(
    type: OscillatorType,
    from: number,
    to: number,
    gain: number,
    ms: number,
    delay = 0,
  ) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const start = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const amp = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(from, start);
      osc.frequency.exponentialRampToValueAtTime(to, start + ms);
      amp.gain.setValueAtTime(gain, start);
      amp.gain.exponentialRampToValueAtTime(0.001, start + ms);

      osc.connect(amp);
      amp.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + ms + 0.01);
    } catch {
      // AudioContext unavailable or blocked — silence is the right fallback.
    }
  }

  /** Subtle mechanical click for toggles, tabs, and buttons */
  public playClick() {
    this.blip("sine", 600, 120, 0.08, 0.04);
  }

  /** Satisfying mechanical switch snap for terminal keys */
  public playKeypress() {
    this.blip("triangle", 820, 200, 0.05, 0.03);
  }

  /** Pleasant ascending chime on modal/drawer open or success */
  public playChime() {
    [440, 660, 880].forEach((hz, i) =>
      this.blip("sine", hz, hz, 0.04, 0.18, i * 0.06),
    );
  }

  /** Soft pop effect for cards opening and chip clicks */
  public playPop() {
    this.blip("sine", 320, 800, 0.06, 0.06);
  }
}

export const sound = new AudioEngine();
