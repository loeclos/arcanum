'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface EventResult {
    id: number;
    name: string;
    location: string;
    date: string;
    tour: string;
    bookstore: string;
    review_state: string;
    modified_date: string;
    tags: string[];
    entries: number[];
}

interface EventContextType {
    selectedEvent: EventResult | null;
    setSelectedEvent: (event: EventResult | null) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

const STORAGE_KEY = 'selectedEvent';

export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [selectedEvent, setSelectedEventState] = useState<EventResult | null>(null);

    /* 🔁 Load from localStorage on mount */
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                setSelectedEventState(JSON.parse(stored));
            }
        } catch (err) {
            console.error('Failed to load event from localStorage', err);
        }
    }, []);

    /* 💾 Save to localStorage whenever it changes */
    const setSelectedEvent = (event: EventResult | null) => {
        setSelectedEventState(event);

        if (event) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(event));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    return (
        <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (!context) {
        throw new Error('useEventContext must be used within an EventProvider');
    }
    return context;
};
