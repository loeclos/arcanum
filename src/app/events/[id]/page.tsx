'use client';

import { useEventContext } from '@/contexts/event-detail-context';
import useEntriesService from '@/services/use-entries-service';
import { useEffect, useState } from 'react';
import FullScreenAnimatedMenu from '@/components/ui/full-screen-menu';
import { Button } from '@/components/ui/button'; // shadcn/ui Button

const PAGE_SIZE = 10;

export default function EventDetail() {
    const { selectedEvent } = useEventContext();
    const { getEntryByID, process, setProcess, clearError } = useEntriesService();

    const [entryIds, setEntryIds] = useState<number[]>([]);
    const [entries, setEntries] = useState<any[]>([]); // adjust type if you have Entry type
    const [loadedCount, setLoadedCount] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    // Set entry IDs when selectedEvent changes
    useEffect(() => {
        setEntryIds(selectedEvent.entries ?? []);
        setLoadedCount(0); // reset when event changes
        setEntries([]);
    }, [selectedEvent]);

    // Load initial batch and subsequent batches
    useEffect(() => {
        if (entryIds.length === 0 || loadedCount === 0) return;

        const start = entries.length; // current loaded count
        const end = Math.min(start + PAGE_SIZE, entryIds.length);
        const idsToLoad = entryIds.slice(start, end);

        if (idsToLoad.length === 0) return;

        setIsLoadingMore(true);
        clearError();
        setProcess('loading');

        Promise.all(idsToLoad.map((id) => getEntryByID(id)))
            .then((newEntries) => {
                setEntries((prev) => [...prev, ...newEntries]);
                setLoadedCount((prev) => prev + newEntries.length);
                setProcess('confirmed');
            })
            .catch((e: any) => {
                setErrorMessage(e?.message ?? 'Failed to load entries');
                setProcess('error');
            })
            .finally(() => {
                setIsLoadingMore(false);
            });
    }, [loadedCount, entryIds, getEntryByID, clearError, setProcess]);

    // Trigger initial load
    useEffect(() => {
        if (entryIds.length > 0 && loadedCount === 0) {
            setLoadedCount(PAGE_SIZE); // trigger loading first 10
        }
    }, [entryIds, loadedCount]);

    const handleLoadMore = () => {
        if (isLoadingMore || entries.length >= entryIds.length) return;
        setLoadedCount((prev) => prev + PAGE_SIZE);
    };

    const hasMore = entries.length < entryIds.length;

    return (
        <div className="flex w-full h-full justify-center p-10">
            <FullScreenAnimatedMenu />
            <div className="w-full max-w-4xl flex flex-col gap-8">
                <div className="p-4">
                    <h1 className="text-6xl font-serif">{selectedEvent.name}</h1>
                    <p className="text-lg mt-2 font-mono">Date: {selectedEvent.date}</p>
                    <p className="text-lg font-mono">
                        Location:{' '}
                        {selectedEvent.location ? selectedEvent.location : 'Shadesmar'}
                    </p>
                    <p className="font-mono">Total Entries: {selectedEvent.entries.length}</p>
                </div>

                <div className="p-4">
                    <p className="text-lg italic font-mono mb-6">
                        Loaded {entries.length} of {entryIds.length} entries.
                    </p>

                    {errorMessage && (
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                    )}

                    {/* Here you would render your entries */}
                    <div className="space-y-6">
                        {entries.map((entry, index) => (
                            <div key={entry.id} className="p-4 border rounded-lg bg-card">
                                {/* Replace with actual entry rendering */}
                                <pre>{JSON.stringify(entry, null, 2)}</pre>
                            </div>
                        ))}
                    </div>

                    {hasMore && (
                        <div className="mt-8 flex justify-center">
                            <Button
                                onClick={handleLoadMore}
                                disabled={isLoadingMore || process === 'loading'}
                                size="lg"
                            >
                                {isLoadingMore ? 'Loading...' : 'Load More Entries'}
                            </Button>
                        </div>
                    )}

                    {!hasMore && entries.length > 0 && (
                        <p className="text-center text-muted-foreground mt-8">
                            All entries loaded.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}