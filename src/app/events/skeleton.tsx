import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

export default function EventsSkeleton() {
    return (
        <div className="flex flex-col gap-2 w-full h-fit">
            <Card className="w-full animate-pulse hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                <CardHeader>
                    <CardTitle>
                        <Button
                            variant={'text'}
                            className="p-0 cursor-pointer text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                            <span className="inline-block w-40 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardDescription>
                    <CardAction>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="w-full animate-pulse hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                <CardHeader>
                    <CardTitle>
                        <Button
                            variant={'text'}
                            className="p-0 cursor-pointer text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                            <span className="inline-block w-40 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardDescription>
                    <CardAction>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="w-full animate-pulse hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                <CardHeader>
                    <CardTitle>
                        <Button
                            variant={'text'}
                            className="p-0 cursor-pointer text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                            <span className="inline-block w-40 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardDescription>
                    <CardAction>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="w-full animate-pulse hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                <CardHeader>
                    <CardTitle>
                        <Button
                            variant={'text'}
                            className="p-0 cursor-pointer text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                            <span className="inline-block w-40 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardDescription>
                    <CardAction>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="w-full animate-pulse hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                <CardHeader>
                    <CardTitle>
                        <Button
                            variant={'text'}
                            className="p-0 cursor-pointer text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                            <span className="inline-block w-40 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardDescription>
                    <CardAction>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardAction>
                </CardHeader>
            </Card>{' '}
            <Card className="w-full animate-pulse hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                <CardHeader>
                    <CardTitle>
                        <Button
                            variant={'text'}
                            className="p-0 cursor-pointer text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                            <span className="inline-block w-40 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardDescription>
                    <CardAction>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardAction>
                </CardHeader>
            </Card>
            <Card className="w-full animate-pulse hover:border-neutral-400 dark:hover:border-neutral-500 transition-all duration-300">
                <CardHeader>
                    <CardTitle>
                        <Button
                            variant={'text'}
                            className="p-0 cursor-pointer text-xl font-mono font-medium dark:font-thin hover:text-amber-600 dark:hover:text-amber-500 transition-colors duration-200">
                            <span className="inline-block w-40 h-6 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                        </Button>
                    </CardTitle>
                    <CardDescription>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardDescription>
                    <CardAction>
                        <span className="inline-block w-15 h-5 bg-neutral-200 dark:bg-neutral-700 rounded-md" />
                    </CardAction>
                </CardHeader>
            </Card>
        </div>
    );
}
