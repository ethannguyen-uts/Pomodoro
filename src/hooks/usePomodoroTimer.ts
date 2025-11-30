import { useState, useEffect, useRef } from 'react';
import { useSettings } from './useSettings';
import { playTimerStart, playTimerEnd } from '../utils/sound';

type TimerMode = 'work' | 'break';

export function usePomodoroTimer() {
    const { workDuration, breakDuration, soundEnabled, autoStart } = useSettings();
    const [timeLeft, setTimeLeft] = useState<number>(workDuration * 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [mode, setMode] = useState<TimerMode>('work');
    const endTimeRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isActive) {
            setTimeLeft(mode === 'work' ? workDuration * 60 : breakDuration * 60);
        }
    }, [workDuration, breakDuration, mode]);

    useEffect(() => {
        let intervalId: number | null = null;

        const startCountdown = () => {
            if (endTimeRef.current === null) {
                endTimeRef.current = Date.now() + timeLeft * 1000;
            }

            intervalId = window.setInterval(() => {
                if (endTimeRef.current !== null) {
                    const remaining = Math.ceil((endTimeRef.current - Date.now()) / 1000);
                    setTimeLeft(Math.max(0, remaining));
                }
            }, 1000);
        };

        const handleTimerEnd = () => {
            endTimeRef.current = null;

            if (soundEnabled) {
                playTimerEnd();
            }

            if (autoStart) {
                const nextMode = mode === 'work' ? 'break' : 'work';
                setMode(nextMode);

                const nextDuration = nextMode === 'work' ? workDuration : breakDuration;
                setTimeLeft(nextDuration * 60);

            } else {
                setIsActive(false);
            }
        };

        const isRunning = isActive && timeLeft > 0;
        const isFinished = !isActive && timeLeft === 0;

        if (isRunning) {
            startCountdown();
        } else if (isFinished) {
            handleTimerEnd();
        } else {
            endTimeRef.current = null;
        }

        return () => {
            if (intervalId !== null) {
                window.clearInterval(intervalId);
            }
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

    const totalTime = mode === 'work' ? workDuration * 60 : breakDuration * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    return {
        timeLeft,
        isActive,
        mode,
        progress,
        toggleTimer,
        resetTimer,
        switchMode
    };
}
