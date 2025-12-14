// contexts/EventDetailContext.tsx

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Reuse your EventResult interface
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
    setSelectedEvent: (event: EventResult) => void;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export const EventProvider = ({ children }: { children: ReactNode }) => {
    const [selectedEvent, setSelectedEvent] = useState<EventResult | null>(null);

    return (
        <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
            {children}
        </EventContext.Provider>
    );
};

export const useEventContext = () => {
    const context = useContext(EventContext);
    if (context === undefined) {
        throw new Error('useEventContext must be used within an EventProvider');
    }
    return context;
};