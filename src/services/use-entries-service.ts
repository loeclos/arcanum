

import { useHttp } from '@/hooks/http.hook';

export default function useEntriesService() {
    const { request, clearError, process, setProcess } = useHttp();

    const getEntryByID = async (id: number) => {
        const res = await request(`https://wob.coppermind.net/api/entry/${id}/`);

        return res;
    }

    return {
        getEntryByID,
        process,
        setProcess,
        clearError,
    };
}