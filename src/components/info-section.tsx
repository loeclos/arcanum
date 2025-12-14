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

export default function InfoSection() {
    return (
        <div className="flex flex-col gap-10 w-full h-full">
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-serif px-3">Welcome!</h1>

                <Card className="w-full hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                    <CardContent>
                        Welcome to Arcanum 2.0, which is basically{' '}
                        <a
                            className="underline cursor-pointer hover:text-amber-500 transition-colors duration-200"
                            href="https://wob.coppermind.net/">
                            https://wob.coppermind.net/
                        </a>{' '}
                        under a new skin.
                    </CardContent>
                </Card>
            </div>
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-serif px-3">Helpful links</h1>
                <Card className="w-full hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                    <CardContent className="flex flex-col gap-1 w-full">
                        <Card className="flex-1 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                            <CardHeader className="flex items-center justify-center">
                                <CardTitle className="text-center underline hover:text-amber-500 transition-colors duration-200 cursor-pointer font-medium font-mono"><a href="https://www.brandonsanderson.com/"></a>BrandonSanderson.com</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="flex-1 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                            <CardHeader className="flex items-center justify-center">
                                <CardTitle className="text-center underline hover:text-amber-500 transition-colors duration-200 cursor-pointer font-medium font-mono"><a href="http://www.17thshard.com/">17thshard.com</a></CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="flex-1 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                            <CardHeader className="flex items-center justify-center">
                                <CardTitle className="text-center underline hover:text-amber-500 transition-colors duration-200 cursor-pointer font-medium font-mono"><a href="https://coppermind.net/">coppermind.net</a></CardTitle>
                            </CardHeader>
                        </Card>
                        <Card className="flex-1 hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                            <CardHeader className="flex items-center justify-center">
                                <CardTitle className="text-center underline hover:text-amber-500 transition-colors duration-200 cursor-pointer font-medium font-mono"><a href="https://github.com/17thshard/palanaeum">Original Github Repo</a></CardTitle>
                            </CardHeader>
                        </Card>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
