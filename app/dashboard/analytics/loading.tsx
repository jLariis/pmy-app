import { Skeleton } from "@/components/ui/skeleton"

export default function AnalyticsLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-[180px] rounded-xl" />
          ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[300px] rounded-xl" />
        <Skeleton className="h-[300px] rounded-xl" />
      </div>

      <Skeleton className="h-[400px] rounded-xl" />

      <div className="space-y-2">
        <Skeleton className="h-10 w-[200px]" />
        <div className="space-y-3">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  )
}
