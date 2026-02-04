import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ChangePasswordLoading() {
  return (
    <div className="max-w-2xl">
      {/* Page Title */}
      <Skeleton className="h-7 w-48 mb-6 self-start" />

      <Card className="p-6 space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Current Password */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Button */}
        <Skeleton className="h-11 w-full rounded-md" />
      </Card>
    </div>
  );
}
