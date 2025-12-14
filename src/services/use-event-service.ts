import { useHttp } from '@/hooks/http.hook';

export default function useEventService() {
    const { request, clearError, process, setProcess } = useHttp();

    const getEvents = async () => {
        const res = await request('https://wob.coppermind.net/api/events/');

        return res;
    };

    const getEventsByPage = async (page: number) => {
        let fetchUrl = '';
        if (page === 0) {
            fetchUrl = 'https://wob.coppermind.net/api/events/';
        } else {
            fetchUrl = `https://wob.coppermind.net/api/events/?page=${page}`;
        }

        const res = await request(fetchUrl);

        return res;
    };

    return {
        getEvents,
        getEventsByPage,
        process,
        setProcess,
        clearError,
    };
}
