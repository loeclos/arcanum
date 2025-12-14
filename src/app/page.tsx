import Events from '@/components/newest-events';
import InfoSection from '@/components/info-section'
import FullScreenAnimatedMenu from '@/components/ui/full-screen-menu';

export default function Home() {
    return (
        <div className="flex w-full h-full justify-center p-10 ">
          <FullScreenAnimatedMenu />
          <div className='w-full lg:w-4xl flex flex-col gap-10'>
            <Events />
            <InfoSection />
          </div>
        </div>
    );
}
