import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Users, TrendingUp } from "lucide-react"

const statsData = [
  {
    title: "Citas Hoy",
    value: "12",
    change: "+2 desde ayer",
    icon: Calendar,
  },
  {
    title: "Clientes Activos",
    value: "248",
    change: "+12% este mes",
    icon: Users,
  },
  {
    title: "Ingresos Mes",
    value: "€3,240",
    change: "+8% vs mes anterior",
    icon: TrendingUp,
  },
  {
    title: "Tiempo Promedio",
    value: "42 min",
    change: "-3 min vs promedio",
    icon: Clock,
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
