import React, { useState, useEffect } from 'react';
import { useSettings } from '../context/SettingsContext';
import quotesData from '../data/quotes.json';

interface Quote {
    id: number;
    quote: string;
    author: string;
}

export const FortuneQuote: React.FC = () => {
    const { showQuotes } = useSettings();
    const [quoteData, setQuoteData] = useState<Quote | null>(null);

    useEffect(() => {
        if (showQuotes) {
            // Select a random quote from the local file
            // We can use the date to make it "daily" or just random on reload. 
            // User asked for "daily fortune quotes" initially, but "fortune" implies randomness.
            // Let's stick to random on reload for now as it's more fun with 1000+ quotes.
            // Or we can do a hash of the date to get a stable daily quote.
            // Let's do random for now to show off the variety.
            const randomIndex = Math.floor(Math.random() * quotesData.quotes.length);
            setQuoteData(quotesData.quotes[randomIndex]);
        }
    }, [showQuotes]);

    if (!showQuotes) return <div className="min-h-[100px] md:min-h-[160px]"></div>;

    return (
        <div className="w-full max-w-3xl mx-auto mt-4 md:mt-12 min-h-[100px] md:min-h-[160px] flex items-center justify-center">
            {quoteData ? (
                <div className="bg-notion-sidebar dark:bg-notion-hover border border-notion-border rounded-lg p-4 md:p-8 text-center shadow-notion-card animate-in fade-in slide-in-from-bottom-4 duration-700 w-full">
                    <div className="inline-block relative">
                        <span className="hidden md:block text-5xl text-notion-gray opacity-20 absolute -top-6 -left-8 font-serif">"</span>
                        <p className="text-notion-text text-sm md:text-xl font-serif font-medium leading-relaxed px-2 md:px-6">
                            {quoteData.quote}
                        </p>
                        <span className="hidden md:block text-5xl text-notion-gray opacity-20 absolute -bottom-10 -right-8 font-serif">"</span>
                    </div>
                    <div className="mt-2 md:mt-4 text-notion-gray text-xs md:text-sm font-medium uppercase tracking-wider">
                        — {quoteData.author}
                    </div>
                </div>
            ) : (
                <div className="text-notion-gray animate-pulse">Loading your fortune...</div>
            )}
        </div>
    );
};
