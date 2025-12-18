'use client';

import { useEventContext } from '@/contexts/event-detail-context';
import useEntriesService from '@/services/use-entries-service';
import { useEffect, useState, useRef } from 'react';
import FullScreenAnimatedMenu from '@/components/ui/full-screen-menu';
import { Button } from '@/components/ui/button';
import EntryCard from '@/components/entry';

const PAGE_SIZE = 10;

export default function EventDetail() {
    const { selectedEvent } = useEventContext();
    const { getEntryByID, process, setProcess, clearError } =
        useEntriesService();

    const [entryIds, setEntryIds] = useState<number[]>([]);
    const [entries, setEntries] = useState<any[]>([]);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Use ref to track if we should load more
    const shouldLoadRef = useRef(false);
    // Set entry IDs when selectedEvent changes (always call hook)
    useEffect(() => {
        if (!selectedEvent) {
            setEntryIds([]);
            setEntries([]);
            shouldLoadRef.current = false;
            return;
        }

        setEntryIds(selectedEvent.entries ?? []);
        setEntries([]);
        shouldLoadRef.current = true; // Trigger initial load
    }, [selectedEvent]);

    // Load entries when shouldLoadRef changes (always call hook)
    useEffect(() => {
        if (!shouldLoadRef.current || entryIds.length === 0 || isLoadingMore) {
            return;
        }

        const start = entries.length;
        const end = Math.min(start + PAGE_SIZE, entryIds.length);
        const idsToLoad = entryIds.slice(start, end);

        if (idsToLoad.length === 0) {
            shouldLoadRef.current = false;
            return;
        }

        shouldLoadRef.current = false; // Reset flag
        setIsLoadingMore(true);
        clearError();
        setProcess('loading');

        Promise.all(idsToLoad.map((id) => getEntryByID(id)))
            .then((newEntries) => {
                setEntries((prev) => [...prev, ...newEntries]);
                setProcess('confirmed');
            })
            .catch((e: any) => {
                setErrorMessage(e?.message ?? 'Failed to load entries');
                setProcess('error');
            })
            .finally(() => {
                setIsLoadingMore(false);
            });
    }, [
        entryIds,
        entries.length,
        isLoadingMore,
        getEntryByID,
        clearError,
        setProcess,
    ]);

    if (!selectedEvent) {
        return (
            <div className="p-4">
                <p>
                    No event data found. Please return to the{' '}
                    <a href="/events" className="underline">
                        list page
                    </a>
                    .
                </p>
            </div>
        );
    }

    const handleLoadMore = () => {
        if (isLoadingMore || entries.length >= entryIds.length) return;
        shouldLoadRef.current = true; // Trigger load
        // Force re-render to trigger effect
        setEntries([...entries]);
    };

    const hasMore = entries.length < entryIds.length;

    return (
        <div className="flex w-full h-full justify-center ">
            {/* <FullScreenAnimatedMenu /> */}
            <div className="w-full max-w-4xl flex flex-col gap-8">
                <div className="p-4">
                    <h1 className="text-6xl font-serif">
                        {selectedEvent.name}
                    </h1>
                    <p className="text-lg mt-2 font-mono">
                        Date: {selectedEvent.date}
                    </p>
                    <p className="text-lg font-mono">
                        Location:{' '}
                        {selectedEvent.location
                            ? selectedEvent.location
                            : 'Shadesmar'}
                    </p>
                    <p className="font-mono">
                        Total Entries: {selectedEvent.entries.length}
                    </p>
                </div>

                <div className="p-4">
                    <p className="text-lg italic font-mono mb-6">
                        Loaded {entries.length} of {entryIds.length} entries.
                    </p>

                    {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}

                    <div className="space-y-6">
                        {entries.map((entry) => (
                            <div key={entry.id}>
                                <EntryCard entry={entry} />
                            </div>
                        ))}
                    </div>
                    {!hasMore && entries.length > 0 ? (
                        <p className="text-center text-muted-foreground mt-8">
                            All entries loaded.
                        </p>
                    ) : (
                        <p className="my-5 text-center text-lg italic font-mono mb-6">
                            Loaded {entries.length} of {entryIds.length}{' '}
                            entries.
                        </p>
                    )}
                    {hasMore && (
                        <div className="mt-8 flex justify-center">
                            <Button
                                onClick={handleLoadMore}
                                disabled={
                                    isLoadingMore || process === 'loading'
                                }
                                className='cursor-pointer'
                                size="lg">
                                {isLoadingMore
                                    ? 'Loading...'
                                    : 'Load More Entries'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
