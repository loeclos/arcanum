'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import useEventService from '@/services/use-event-service';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useEventContext } from '@/contexts/event-detail-context';
import EventsSkeleton from './skeleton';
import { ChevronRight, ChevronLeft } from 'lucide-react';


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

const ChangePageButtons = ({
    prevExists: prevExists,
    nextExists: nextExists,
    handleNextClick,
    handlePrevClick,
}: {
    prevExists: boolean;
    nextExists: boolean;
    handleNextClick: () => void;
    handlePrevClick: () => void;
}) => {
    return (
        <div className="w-full grid grid-cols-2 gap-2">
            <Button className="w-full cursor-pointer" disabled={!prevExists} onClick={handlePrevClick}>
                <ChevronLeft /> Prev
            </Button>
            <Button className="w-full cursor-pointer" disabled={!nextExists} onClick={handleNextClick}>
                <ChevronRight /> Next
            </Button>
        </div>
    );
};

export default function Events() {
    const { getEventsByPage, clearError, process, setProcess } = useEventService();
    const [events, setEvents] = useState<EventResponse>();
    const [prevExists, setPrevExists] = useState(false);
    const [nextExists, setNextExists] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const { setSelectedEvent } = useEventContext();
    const router = useRouter();

    useEffect(() => {
        clearError();

        getEventsByPage(currentPage)
            .then((data: EventResponse) => {
                setEvents(data);
                setProcess('confirmed');
                setNextExists(data.next != null);
                setPrevExists(data.previous != null);
            })
            .catch((e) => {
                console.error(e);
                setProcess('error');
            });
        
    }, [currentPage]);

    const handleNextClick = () => {
        setCurrentPage(currPage => currPage + 1)
    }
    const handlePrevClick = () => {
        setCurrentPage(currPage => currPage - 1)
    }

    const handleEventClick = (event: EventResult) => {
        setSelectedEvent(event);

        router.push(`/events/${event.id}`);
    };
    return (
        <div className="flex w-full h-full justify-center p-10 ">
            <div className="w-full lg:w-4xl">
                <div className="flex flex-col gap-2 w-full h-fit">
                    <h1 className="text-4xl font-serif px-3">
                        All events (sorted by date)
                    </h1>
                    <ChangePageButtons prevExists={prevExists} nextExists={nextExists} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />
                    {process != 'loading' ? (
                        events ? (
                            events['results'].map((event) => (
                                <Card
                                    key={event.id}
                                    className="w-full hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300 px-0">
                                    <CardHeader>
                                        <CardTitle>
                                            <div className='flex flex-col gap-3 items-start p-0'>
                                            <Button
                                                onClick={() =>
                                                    handleEventClick(event)
                                                }
                                                variant={'text'}
                                                className="p-0 cursor-pointer whitespace-normal md:whitespace-nowrap wrap-break-word text-lg md:text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                                                {event.name}
                                            </Button>
                                                <span className="italic text-neutral-500 font-medium block md:hidden">
                                                {event.date}
                                            </span>
                                            </div>
                                        </CardTitle>
                                        <CardDescription className='hidden md:block'>
                                            {event.date}
                                        </CardDescription>
                                        <CardAction className='hidden md:block'>
                                            <span className="italic">
                                                {event.entries.length} entries.
                                            </span>
                                        </CardAction>
                                    </CardHeader>
                                </Card>
                            ))
                        ) : <EventsSkeleton />
                    ) : (
                        <EventsSkeleton />
                    )}
                    <ChangePageButtons prevExists={prevExists} nextExists={nextExists} handleNextClick={handleNextClick} handlePrevClick={handlePrevClick} />
                </div>
            </div>
        </div>
    );
}
