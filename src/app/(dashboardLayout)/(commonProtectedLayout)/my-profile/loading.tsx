import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileLoading() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left: Profile Picture Card */}
            <Card className="p-6 flex flex-col items-center text-center">
                <Skeleton className="h-6 w-32 mb-6 self-start" />

                <Skeleton className="h-32 w-32 rounded-full mb-4" />

                <Skeleton className="h-5 w-40 mb-2" />
                <Skeleton className="h-4 w-48 mb-1" />
                <Skeleton className="h-4 w-20" />
            </Card>

            {/* Right: Personal Information */}
            <Card className="p-6 lg:col-span-2">
                <Skeleton className="h-6 w-48 mb-6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full rounded-md" />
                    </div>
                </div>

                <div className="space-y-2 mb-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="space-y-2 mb-6">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>

                <div className="flex justify-end">
                    <Skeleton className="h-10 w-36 rounded-md" />
                </div>
            </Card>
        </div>
    );
}
