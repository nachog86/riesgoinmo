// DeudaHistorica.jsx
import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AreaChart, Area, CartesianGrid, XAxis } from 'recharts'
import { DollarSign } from 'lucide-react'

const formatPeriod = (period) => {
  const year = period.substring(0, 4)
  const month = period.substring(4, 6)
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]
  return `${monthNames[parseInt(month) - 1]} ${year}`
}

const formatCurrency = (amount) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

export default function DeudaHistorica({ historico }) {
  const chartData = historico?.periodos?.map(p => ({
    month: formatPeriod(p.periodo),
    deuda: p.entidades.reduce((acc, e) => acc + e.monto, 0) * 1000
  })).reverse()

  const totalHistorico = chartData?.reduce((sum, p) => sum + p.deuda, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evolución de la Deuda</CardTitle>
        <CardDescription>
          Deuda total acumulada por mes. Total histórico: {formatCurrency(totalHistorico || 0)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{ deuda: { label: 'Deuda Total', color: 'var(--chart-1)' } }}>
          <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(v) => v.slice(0, 3)} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <defs>
              <linearGradient id="fillDeuda" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-deuda)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-deuda)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <Area dataKey="deuda" type="monotone" fill="url(#fillDeuda)" stroke="var(--color-deuda)" fillOpacity={0.4} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
