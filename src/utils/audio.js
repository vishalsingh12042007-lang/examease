/**
 * Web Audio API helper for ExamEase
 * Provides synthesized gentle chimes and tones without requiring external mp3s.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a peaceful bell chime (used for Pomodoro transitions & breathing guides)
 */
export function playGentleBell(frequency = 528, duration = 1.8) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    // Slight harmonics decay
    osc.frequency.exponentialRampToValueAtTime(frequency * 0.98, ctx.currentTime + duration);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (err) {
    console.warn('Audio playback error (browser policy):', err);
  }
}

/**
 * Play breathing transition pulse
 */
export function playBreathTick(type = 'inhale') {
  try {
    const freq = type === 'inhale' ? 432 : 360;
    playGentleBell(freq, 0.8);
  } catch {
    // Ignore autoplay limits
  }
}

/**
 * Ambient binaural/nature synthesizer (Rain / White noise generator)
 */
let ambientNode = null;
let ambientGain = null;

export function startAmbientSound(type = 'rain') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    stopAmbientSound();

    // Create pink/brown noise for rain effect
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 3.5; // Gain compensation
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate soft rainfall / calming flow
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(type === 'rain' ? 800 : 400, ctx.currentTime);

    ambientGain = ctx.createGain();
    ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
    ambientGain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 1);

    whiteNoise.connect(filter);
    filter.connect(ambientGain);
    ambientGain.connect(ctx.destination);

    whiteNoise.start();
    ambientNode = whiteNoise;
  } catch (err) {
    console.warn('Ambient audio error:', err);
  }
}

export function stopAmbientSound() {
  try {
    if (ambientGain && audioCtx) {
      ambientGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
      setTimeout(() => {
        if (ambientNode) {
          ambientNode.stop();
          ambientNode.disconnect();
          ambientNode = null;
        }
      }, 500);
    } else if (ambientNode) {
      ambientNode.stop();
      ambientNode = null;
    }
  } catch {
    ambientNode = null;
  }
}
