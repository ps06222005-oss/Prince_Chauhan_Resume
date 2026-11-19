/**
 * Native Web Audio API Sound Synthesizer
 *
 * Provides subtle cybernetic auditory feedback for the BIOS Entry Portal
 * and Holographic Workspace interactions without requiring any external MP3/WAV assets (0 KB network payload).
 * Always starts MUTED by default.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export const workspaceSound = {
  /**
   * Crisp microscopic click on button press
   */
  click(enabled: boolean) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      /* Audio playback not permitted without user gesture */
    }
  },

  /**
   * High-tech hover pulse for 3D monitors and interactive elements
   */
  hover(enabled: boolean) {
    this.portalHover(enabled, 720);
  },

  /**
   * High-tech hover pulse for portal gateways
   */
  portalHover(enabled: boolean, frequency = 620) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(frequency + 140, ctx.currentTime + 0.06);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      /* ignore */
    }
  },

  /**
   * Harmonious chime when transitioning worlds
   */
  modeEngage(enabled: boolean, isTechnical = false) {
    if (!enabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const notes = isTechnical ? [440, 660, 880] : [523.25, 659.25, 783.99]; // A-minor or C-major triad
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

        gain.gain.setValueAtTime(0.03, ctx.currentTime + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.05);
        osc.stop(ctx.currentTime + idx * 0.05 + 0.25);
      });
    } catch {
      /* ignore */
    }
  },
};
