import { usePomodoroTimer } from '../hooks/usePomodoroTimer';

export default function PomodoroTimer(): JSX.Element {
    const {
        timeLeft,
        isActive,
        mode,
        progress,
        toggleTimer,
        resetTimer,
        switchMode
    } = usePomodoroTimer();

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

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
