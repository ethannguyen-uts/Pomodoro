// Simple sound synthesis using Web Audio API to avoid external dependencies

const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

export const playTimerStart = () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pleasant "ding" sound
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.exponentialRampToValueAtTime(1046.5, audioContext.currentTime + 0.1); // C6

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.5);
};

export const playTimerEnd = () => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const now = audioContext.currentTime;

    // Sequence of 3 beeps
    [0, 0.5, 1.0].forEach(offset => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(880, now + offset); // A5

        gainNode.gain.setValueAtTime(0.05, now + offset);
        gainNode.gain.linearRampToValueAtTime(0, now + offset + 0.2);

        oscillator.start(now + offset);
        oscillator.stop(now + offset + 0.2);
    });
};
