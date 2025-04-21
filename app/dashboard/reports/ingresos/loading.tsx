import { Skeleton } from "@/components/ui/skeleton"

export default function IngresosLoading() {
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
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Skeleton className="h-[250px] rounded-xl" />
        <Skeleton className="h-[250px] rounded-xl" />
      </div>

      <Skeleton className="h-[350px] rounded-xl" />

      <div className="space-y-2">
        <Skeleton className="h-8 w-[150px]" />
        <div className="space-y-3">
          {Array(3)
            .fill(null)
            .map((_, i) => (
              <Skeleton key={i} className="h-16 rounded-lg" />
            ))}
        </div>
      </div>
    </div>
  )
}
