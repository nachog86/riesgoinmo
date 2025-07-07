// import React from "react"
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
// } from "@/components/ui/card"
// import {
//   Tabs,
//   TabsList,
//   TabsTrigger,
//   TabsContent,
// } from "@/components/ui/tabs"
// import {
//   AreaChart,
//   Area,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
// } from "r"
// import {
//   DollarSign,
//   Building2,
//   AlertTriangle,
//   Calendar,
//   TrendingUp,
//   TrendingDown,
// } from "lucide-react"
// import { Badge } from "@/components/ui/badge"

// const formatCurrency = (amount) =>
//   new Intl.NumberFormat("es-AR", {
//     style: "currency",
//     currency: "ARS",
//     minimumFractionDigits: 0,
//     maximumFractionDigits: 0,
//   }).format(amount)

// const formatPeriod = (period) => {
//   const year = period.substring(0, 4)
//   const month = period.substring(4, 6)
//   return `${month}/${year}`
// }



// export default function DeudaHistorica({ historico }) {
//   const data = historico

//   const evolutionData = data.periodos.map((p) => ({
//     periodo: formatPeriod(p.periodo),
//     total: p.entidades.reduce((acc, e) => acc + e.monto, 0) * 1000,
//     enRiesgo: p.entidades.filter((e) => e.situacion > 1).length,
//     enRevision: p.entidades.filter((e) => e.enRevision).length,
//     procesoJud: p.entidades.filter((e) => e.procesoJud).length,
//   })).reverse()

//   const lastPeriod = data.periodos[0]
//   const totalDebt = lastPeriod.entidades.reduce((sum, e) => sum + e.monto, 0) * 1000
//   const totalEntities = lastPeriod.entidades.length
//   const riskEntities = lastPeriod.entidades.filter((e) => e.situacion > 1).length

//   const trend = evolutionData.at(-1)?.total - evolutionData.at(0)?.total
//   const trendPercentage = evolutionData.at(0)?.total > 0 ? (trend / evolutionData.at(0)?.total) * 100 : 0

//   const entitiesData = lastPeriod.entidades.map((e) => ({
//     name: e.entidad,
//     monto: e.monto * 1000,
//     situacion: e.situacion,
//   }))

//   const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"]

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <Card className="border-0 shadow-sm">
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <div>
//               <CardTitle className="text-2xl font-bold text-gray-900">{data.denominacion}</CardTitle>
//               <CardDescription>CUIT/CUIL: {data.identificacion.toLocaleString("es-AR")} • Evolución de Deuda</CardDescription>
//             </div>
//             <div className="flex items-center gap-2">
//               {trendPercentage >= 0
//                 ? <TrendingUp className="h-6 w-6 text-red-500" />
//                 : <TrendingDown className="h-6 w-6 text-green-500" />}
//               <span className={`text-lg font-semibold ${trendPercentage >= 0 ? "text-red-600" : "text-green-600"}`}>
//                 {trendPercentage > 0 ? "+" : ""}
//                 {trendPercentage.toFixed(1)}%
//               </span>
//             </div>
//           </div>
//         </CardHeader>
//       </Card>

//       {/* KPIs */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="border-0 shadow-sm">
//           <CardContent className="p-6 flex items-center gap-3">
//             <DollarSign className="h-6 w-6 text-blue-600" />
//             <div>
//               <p className="text-sm text-muted-foreground">Deuda Total</p>
//               <p className="text-2xl font-bold">{formatCurrency(totalDebt)}</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="border-0 shadow-sm">
//           <CardContent className="p-6 flex items-center gap-3">
//             <Building2 className="h-6 w-6 text-green-600" />
//             <div>
//               <p className="text-sm text-muted-foreground">Entidades</p>
//               <p className="text-2xl font-bold">{totalEntities}</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="border-0 shadow-sm">
//           <CardContent className="p-6 flex items-center gap-3">
//             <AlertTriangle className="h-6 w-6 text-yellow-600" />
//             <div>
//               <p className="text-sm text-muted-foreground">En Riesgo</p>
//               <p className="text-2xl font-bold">{riskEntities}</p>
//             </div>
//           </CardContent>
//         </Card>
//         <Card className="border-0 shadow-sm">
//           <CardContent className="p-6 flex items-center gap-3">
//             <Calendar className="h-6 w-6 text-purple-600" />
//             <div>
//               <p className="text-sm text-muted-foreground">Períodos</p>
//               <p className="text-2xl font-bold">{data.periodos.length}</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Tabs */}
//       <Tabs defaultValue="evolucion" className="space-y-4">
//         <TabsList className="grid w-full grid-cols-4">
//           <TabsTrigger value="evolucion">Evolución Total</TabsTrigger>
//           <TabsTrigger value="distribucion">Distribución</TabsTrigger>
//           <TabsTrigger value="ranking">Ranking</TabsTrigger>
//           <TabsTrigger value="estados">Estados</TabsTrigger>
//         </TabsList>

//         {/* Tab: Evolución Total */}
//         <TabsContent value="evolucion">
//           <Card className="shadow-sm border-0">
//             <CardHeader>
//               <CardTitle>Evolución de Deuda Total</CardTitle>
//               <CardDescription>Monto total de deuda por período</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={400}>
//                 <AreaChart data={evolutionData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="periodo" />
//                   <YAxis tickFormatter={formatCurrency} />
//                   <Tooltip formatter={(v) => formatCurrency(v)} />
//                   <Area
//                     type="monotone"
//                     dataKey="total"
//                     stroke="#3b82f6"
//                     fill="#3b82f6"
//                     fillOpacity={0.1}
//                     strokeWidth={3}
//                   />
//                 </AreaChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Tab: Distribución */}
//         <TabsContent value="distribucion">
//           <Card className="shadow-sm border-0">
//             <CardHeader>
//               <CardTitle>Distribución por Entidad</CardTitle>
//               <CardDescription>Proporción de deuda actual por entidad</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={350}>
//                 <PieChart>
//                   <Pie
//                     data={entitiesData}
//                     cx="50%"
//                     cy="50%"
//                     outerRadius={100}
//                     fill="#8884d8"
//                     dataKey="monto"
//                     label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                   >
//                     {entitiesData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                     ))}
//                   </Pie>
//                   <Tooltip formatter={(v) => formatCurrency(v)} />
//                 </PieChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Tab: Ranking */}
//         <TabsContent value="ranking">
//           <Card className="shadow-sm border-0">
//             <CardHeader>
//               <CardTitle>Ranking por Monto</CardTitle>
//               <CardDescription>Entidades ordenadas por monto</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart data={[...entitiesData].sort((a, b) => b.monto - a.monto)}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
//                   <YAxis tickFormatter={formatCurrency} />
//                   <Tooltip formatter={(v) => formatCurrency(v)} />
//                   <Bar dataKey="monto" fill="#3b82f6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         {/* Tab: Estados */}
//         <TabsContent value="estados">
//           <Card className="shadow-sm border-0">
//             <CardHeader>
//               <CardTitle>Estados por Período</CardTitle>
//               <CardDescription>Cantidad de entidades por estado</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ResponsiveContainer width="100%" height={350}>
//                 <BarChart data={evolutionData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="periodo" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="enRiesgo" fill="#f59e0b" name="En Riesgo" />
//                   <Bar dataKey="enRevision" fill="#8b5cf6" name="En Revisión" />
//                   <Bar dataKey="procesoJud" fill="#ef4444" name="Judicial" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend, LineChart, Line } from "recharts"
import { DollarSign, Building2, AlertTriangle, Calendar, TrendingUp, TrendingDown } from "lucide-react"
import { DistribucionEntidad } from "./DistribucionEntidad"
import { RankingDeuda } from "./RankingDeuda"

function formatCurrency(amount) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatPeriod(period) {
  return period.replace(/^(\d{4})(\d{2})$/, "$2/$1")
}

export default function DeudaHistorica({ historico }) {
  const data = historico

  // Preparación datos
  const evolutionData = data.periodos
    .map(p => ({
      periodo: formatPeriod(p.periodo),
      total: p.entidades.reduce((sum, e) => sum + e.monto, 0) * 1000,
      enRiesgo: p.entidades.filter(e => e.situacion > 1).length,
      enRevision: p.entidades.filter(e => e.enRevision).length,
      procesoJud: p.entidades.filter(e => e.procesoJud).length,
    }))
    .reverse()

  const last = evolutionData[0]
  const first = evolutionData.at(-1)
  const trend = last.total - first.total
  const trendPct = first.total > 0 ? (trend / first.total) * 100 : 0

  const entitiesData = data.periodos[data.periodos.length - 1].entidades.map(e => ({
    name: e.entidad.replace(/BANCO |S\.A\.|S\.R\.L\./g, "").trim(),
    monto: e.monto * 1000,
  }))

  const COLORS = ["#10b981","#f59e0b","#ef4444","#8b5cf6","#06b6d4"]

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-sm">
        <CardHeader className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl font-bold">{data.denominacion}</CardTitle>
            <CardDescription>
              CUIT/CUIL: {data.identificacion.toLocaleString("es-AR")} • Evolución de Deuda
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {trend >= 0
              ? <TrendingUp className="h-6 w-6 text-red-500" />
              : <TrendingDown className="h-6 w-6 text-green-500" />}
            <span className={`${trend >= 0 ? "text-red-600" : "text-green-600"} text-lg font-semibold`}>
              {trend >= 0 ? "+" : ""}{trendPct.toFixed(1)}%
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
        {[
          { icon: <DollarSign className="h-6 w-6 text-blue-600"/>, label: "Deuda Total", value: last.total },
          { icon: <Building2 className="h-6 w-6 text-green-600"/>, label: "Entidades", value: last.total ? data.periodos[data.periodos.length-1].entidades.length : 0 },
          { icon: <AlertTriangle className="h-6 w-6 text-yellow-600"/>, label: "En Riesgo", value: last.enRiesgo },
          { icon: <Calendar className="h-6 w-6 text-purple-600"/>, label: "Períodos", value: evolutionData.length },
        ].map(({ icon, label, value }) => (
          <Card key={label} className="shadow-sm border-0">
            <CardContent className="flex items-center gap-3">
              {icon}
              <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="text-xl font-semibold">
                  {label === "Deuda Total" ? formatCurrency(value) : value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Gráficos con tabs */}
      <Tabs defaultValue="evolucion" className="space-y-4">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="evolucion">Evolución</TabsTrigger>
          <TabsTrigger value="distribucion">Distribución</TabsTrigger>
          <TabsTrigger value="ranking">Ranking</TabsTrigger>
          <TabsTrigger value="estados">Estados</TabsTrigger>
        </TabsList>

        {/* Evolución Total */}
        <TabsContent value="evolucion">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Evolución de Deuda Total</CardTitle>
              <CardDescription>Monto acumulado por período</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ total: { label: "Deuda Total", color: "var(--chart-1)" } }}>
                <AreaChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="periodo"/>
                  <YAxis tickFormatter={formatCurrency}/>
                  <Tooltip content={<ChartTooltipContent formatter={v=>formatCurrency(v)}/>}/>
                  <defs>
                    <linearGradient id="gradientTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area dataKey="total" type="monotone" stroke="var(--chart-1)" fill="url(#gradientTotal)" fillOpacity={0.4} strokeWidth={2}/>
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Distribución */}
        <TabsContent value="distribucion">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Distribución por Entidad</CardTitle>
              <CardDescription>% deuda actual</CardDescription>
            </CardHeader>
            <CardContent>
              <DistribucionEntidad entitiesData ={entitiesData} />
              {/* <ChartContainer config={{ monto: { label: "Monto", color: "var(--chart-2)" } }}>
                <PieChart>
                  <Pie data={entitiesData} dataKey="monto" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                    {entitiesData.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]}/>))}
                  </Pie>
                  <Tooltip content={<ChartTooltipContent formatter={v=>formatCurrency(v)}/>}/>
                </PieChart>
              </ChartContainer> */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ranking */}
        <TabsContent value="ranking">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Ranking por Monto</CardTitle>
              <CardDescription>Entidades ordenadas por deuda</CardDescription>
            </CardHeader>
            <CardContent>
              <RankingDeuda chupitoPame={entitiesData} />
              {/* <ChartContainer config={{ monto: { label: "Monto", color: "var(--chart-2)" } }}>
                <BarChart data={[...entitiesData].sort((a,b)=>b.monto-a.monto)}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60}/>
                  <YAxis tickFormatter={formatCurrency}/>
                  <Tooltip content={<ChartTooltipContent formatter={v=>formatCurrency(v)}/>}/>
                  <Bar dataKey="monto" fill="var(--chart-2)" />
                </BarChart>
              </ChartContainer> */}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Estados */}
        <TabsContent value="estados">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Estados por Período</CardTitle>
              <CardDescription>Cantidad según estado</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{ enRiesgo: { label: "En Riesgo", color: "#f59e0b" }, enRevision: { label: "En Revisión", color: "#8b5cf6" }, procesoJud: { label: "Judicial", color: "#ef4444" } }}>
                <BarChart data={evolutionData}>
                  <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="periodo"/>
                  <YAxis/>
                  <Tooltip/>
                  <Legend />
                  <Bar dataKey="enRiesgo" fill="#f59e0b"/>
                  <Bar dataKey="enRevision" fill="#8b5cf6"/>
                  <Bar dataKey="procesoJud" fill="#ef4444"/>
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
