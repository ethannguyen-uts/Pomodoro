import { useState } from 'react';
import TodoList from './components/TodoList';
import PomodoroTimer from './components/PomodoroTimer';
import { ThemeProvider } from './context/ThemeContext';
import { SettingsProvider } from './context/SettingsContext';
import { ThemeToggle } from './components/ThemeToggle';
import { SettingsModal } from './components/SettingsModal';
import { FortuneQuote } from './components/FortuneQuote';

function App(): JSX.Element {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <SettingsProvider>
            <ThemeProvider>
                <div className="flex flex-col gap-4 lg:gap-8 w-full max-w-6xl mx-auto h-[100dvh] p-4 md:p-8 box-border relative overflow-hidden">
                    <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                        <button
                            onClick={() => setIsSettingsOpen(true)}
                            className="p-2 rounded-md hover:bg-notion-hover text-notion-text transition-colors duration-200"
                            aria-label="Settings"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="3"></circle>
                                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                        </button>
                        <ThemeToggle />
                    </div>

                    <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

                    <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-2 gap-4 lg:gap-8 w-full">
                        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
                            <TodoList />
                        </div>
                        <div className="shrink-0 lg:h-full flex flex-col justify-center">
                            <PomodoroTimer />
                        </div>
                    </div>

                    <div className="shrink-0 pt-4">
                        <FortuneQuote />
                    </div>
                </div>
            </ThemeProvider>
        </SettingsProvider>
    );
}

export default App;
