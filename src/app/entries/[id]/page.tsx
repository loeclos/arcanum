'use client';

import EntryCard, { EntryData } from '@/components/entry';
import useEntriesService from '@/services/use-entries-service';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function Page() {
    const { getEntryByID, process, setProcess, clearError } =
        useEntriesService();
    const params = useParams<{ id: string }>();
    const [entry, setEntry] = useState<EntryData | null>(null);


    useEffect(() => {
        clearError();
        getEntryByID(Number(params.id))
            .then(entryResponse => {
                setEntry(entryResponse);
            })

    }, []);

    return entry ? (
        <div className="flex items-center justify-center min-h-screen">
            <EntryCard entry={entry} />
        </div>
    ) : null;
}
