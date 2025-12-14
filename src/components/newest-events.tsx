'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import useEventService from '@/services/use-event-service';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useEventContext } from '@/contexts/event-detail-context';
import EventsSkeleton from '@/app/events/skeleton';

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

interface EventResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: EventResult[];
}

export default function Events() {
    const { getEvents, clearError, process, setProcess } = useEventService();
    const [events, setEvents] = useState<EventResponse>();
    const { setSelectedEvent } = useEventContext();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState();

    useEffect(() => {
        clearError();
        getEvents()
            .then(setEvents)
            .then(() => setProcess('confirmed'))
            .catch((e) => {
                setErrorMessage(e.message);
            });
    }, []);

    useEffect(() => {
        console.log(events);
    }, [events]);

    const handleEventClick = (event: EventResult) => {
        setSelectedEvent(event);

        router.push(`/events/${event.id}`);
    };
    return (
        <div className="flex flex-col gap-2 w-full h-fit">
            <h1 className="text-4xl font-serif px-3">Newest events</h1>
            {process == 'loading' ? (
                <EventsSkeleton />
            ) : events ? (
                events['results'].map((event) => (
                    <Card
                        key={event.id}
                        className="w-full hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                        <CardHeader>
                            <CardTitle>
                                <Button
                                    onClick={() => handleEventClick(event)}
                                    variant={'text'}
                                    className="p-0 cursor-pointer text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                                    {event.name}
                                </Button>
                            </CardTitle>
                            <CardDescription>{event.date}</CardDescription>
                            <CardAction>
                                <span className="italic">
                                    {event.entries.length} entries.
                                </span>
                            </CardAction>
                        </CardHeader>
                    </Card>
                ))
            ) : <EventsSkeleton />}
            <Button className="rounded-lg cursor-pointer">
                See all events {'->'}
            </Button>
        </div>
    );
}
