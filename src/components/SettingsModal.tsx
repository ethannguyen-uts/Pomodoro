import React from 'react';
import { useSettings } from '../hooks/useSettings';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { workDuration, breakDuration, showQuotes, soundEnabled, autoStart, updateSettings } = useSettings();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-notion-bg w-full max-w-md rounded-lg shadow-notion-card p-6 border border-notion-border animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-notion-text">Settings</h2>
                    <button onClick={onClose} className="text-notion-gray hover:text-notion-text transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Timer Settings */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-notion-gray uppercase tracking-wider">Timer (minutes)</h3>

                        <div className="flex items-center justify-between">
                            <label className="text-notion-text">Work Duration</label>
                            <input
                                type="number"
                                value={workDuration}
                                onChange={(e) => updateSettings({ workDuration: Math.max(1, parseInt(e.target.value) || 0) })}
                                className="w-20 p-2 rounded border border-notion-border bg-transparent text-notion-text focus:outline-none focus:border-notion-blue transition-colors"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-notion-text">Break Duration</label>
                            <input
                                type="number"
                                value={breakDuration}
                                onChange={(e) => updateSettings({ breakDuration: Math.max(1, parseInt(e.target.value) || 0) })}
                                className="w-20 p-2 rounded border border-notion-border bg-transparent text-notion-text focus:outline-none focus:border-notion-blue transition-colors"
                            />
                        </div>
                    </div>

                    <div className="h-[1px] bg-notion-border w-full"></div>

                    {/* Feature Settings */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-notion-gray uppercase tracking-wider">Features</h3>

                        <div className="flex items-center justify-between">
                            <label className="text-notion-text">Daily Fortune Quotes</label>
                            <button
                                onClick={() => updateSettings({ showQuotes: !showQuotes })}
                                className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${showQuotes ? 'bg-notion-green' : 'bg-notion-gray'
                                    }`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${showQuotes ? 'left-7' : 'left-1'
                                    }`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-notion-text">Sound Effects</label>
                            <button
                                onClick={() => updateSettings({ soundEnabled: !soundEnabled })}
                                className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${soundEnabled ? 'bg-notion-green' : 'bg-notion-gray'
                                    }`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${soundEnabled ? 'left-7' : 'left-1'
                                    }`}></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-notion-text">Auto-start Timer</label>
                            <button
                                onClick={() => updateSettings({ autoStart: !autoStart })}
                                className={`w-12 h-6 rounded-full transition-colors duration-200 relative ${autoStart ? 'bg-notion-green' : 'bg-notion-gray'
                                    }`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform duration-200 ${autoStart ? 'left-7' : 'left-1'
                                    }`}></div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-notion-text text-notion-bg rounded hover:opacity-90 transition-opacity font-medium"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};
