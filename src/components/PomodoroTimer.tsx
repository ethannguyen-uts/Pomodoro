import { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { playTimerStart, playTimerEnd } from '../utils/sound';

type TimerMode = 'work' | 'break';

export default function PomodoroTimer(): JSX.Element {
    const { workDuration, breakDuration, soundEnabled, autoStart } = useSettings();
    const [timeLeft, setTimeLeft] = useState<number>(workDuration * 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [mode, setMode] = useState<TimerMode>('work');

    // Update timer when settings change, but only if not currently active to avoid disrupting a session
    useEffect(() => {
        if (!isActive) {
            setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
        }
    }, [workDuration, breakDuration, mode, isActive]);

    useEffect(() => {
        let interval: number | null = null;
        if (isActive && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft(timeLeft => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            if (soundEnabled) playTimerEnd();

            if (autoStart) {
                const newMode = mode === 'work' ? 'break' : 'work';
                setMode(newMode);
                setTimeLeft(newMode === 'work' ? workDuration * 60 : breakDuration * 60);
            } else {
                setIsActive(false);
            }
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, timeLeft, autoStart, mode, workDuration, breakDuration, soundEnabled]);

    const toggleTimer = () => {
        if (!isActive && soundEnabled) {
            playTimerStart();
        }
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
    };

    const switchMode = (newMode: TimerMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'work' ? workDuration * 60 : breakDuration * 60);
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const totalTime = mode === 'work' ? workDuration * 60 : breakDuration * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="flex gap-1 mb-4 md:mb-8 bg-notion-sidebar p-1 rounded-md">
                <button
                    onClick={() => switchMode('work')}
                    className={`px-4 py-1 rounded text-sm font-medium transition-all duration-200 ${mode === 'work'
                        ? 'bg-notion-bg text-notion-text shadow-notion-sm'
                        : 'text-notion-gray hover:text-notion-text hover:bg-notion-hover'
                        }`}
                >
                    Work
                </button>
                <button
                    onClick={() => switchMode('break')}
                    className={`px-4 py-1 rounded text-sm font-medium transition-all duration-200 ${mode === 'break'
                        ? 'bg-notion-bg text-notion-text shadow-notion-sm'
                        : 'text-notion-gray hover:text-notion-text hover:bg-notion-hover'
                        }`}
                >
                    Break
                </button>
            </div>

            <div className="relative mb-4 md:mb-8">
                <div className="text-6xl md:text-8xl font-mono font-medium text-notion-text tracking-tight tabular-nums">
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Minimalist Progress Bar */}
            <div className="w-64 h-1 bg-notion-border rounded-full mb-4 md:mb-8 overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-linear rounded-full ${mode === 'work' ? 'bg-notion-text' : 'bg-notion-green'
                        }`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            <div className="flex gap-3">
                <button
                    onClick={toggleTimer}
                    className={`px-6 py-2 rounded border transition-all duration-200 font-medium ${isActive
                        ? 'bg-notion-bg border-notion-text text-notion-text hover:bg-notion-hover'
                        : 'bg-notion-text border-notion-text text-notion-bg hover:opacity-90'
                        }`}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={resetTimer}
                    className="p-2 rounded border border-transparent text-notion-gray hover:text-notion-text hover:bg-notion-hover transition-all duration-200"
                    title="Reset"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
