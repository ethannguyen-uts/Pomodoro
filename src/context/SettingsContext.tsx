import React, { createContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface SettingsContextType {
    workDuration: number;
    breakDuration: number;
    showQuotes: boolean;
    soundEnabled: boolean;
    autoStart: boolean;
    updateSettings: (settings: Partial<Omit<SettingsContextType, 'updateSettings'>>) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [workDuration, setWorkDuration] = useLocalStorage<number>('workDuration', 25);
    const [breakDuration, setBreakDuration] = useLocalStorage<number>('breakDuration', 5);
    const [showQuotes, setShowQuotes] = useLocalStorage<boolean>('showQuotes', true);
    const [soundEnabled, setSoundEnabled] = useLocalStorage<boolean>('soundEnabled', true);
    const [autoStart, setAutoStart] = useLocalStorage<boolean>('autoStart', false);

    const updateSettings = (settings: Partial<Omit<SettingsContextType, 'updateSettings'>>) => {
        if (settings.workDuration !== undefined) setWorkDuration(settings.workDuration);
        if (settings.breakDuration !== undefined) setBreakDuration(settings.breakDuration);
        if (settings.showQuotes !== undefined) setShowQuotes(settings.showQuotes);
        if (settings.soundEnabled !== undefined) setSoundEnabled(settings.soundEnabled);
        if (settings.autoStart !== undefined) setAutoStart(settings.autoStart);
    };

    return (
        <SettingsContext.Provider value={{ workDuration, breakDuration, showQuotes, soundEnabled, autoStart, updateSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};


