import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function RecentShipments() {
  return (
    <div className="space-y-8">
      {recentShipments.map((shipment) => (
        <div key={shipment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback>{shipment.name[0]}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{shipment.name}</p>
            <p className="text-sm text-muted-foreground">{shipment.email}</p>
          </div>
          <div className="ml-auto font-medium">{shipment.amount}</div>
        </div>
      ))}
    </div>
  )
}

const recentShipments = [
  {
    id: "1",
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "$1,999.00",
  },
  {
    id: "2",
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "$39.00",
  },
  {
    id: "3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "$299.00",
  },
  {
    id: "4",
    name: "William Kim",
    email: "will@email.com",
    amount: "$99.00",
  },
  {
    id: "5",
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "$39.00",
  },
]

