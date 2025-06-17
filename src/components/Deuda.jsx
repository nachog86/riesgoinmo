// Deuda.jsx
import React from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card'
import { User, DollarSign, Building2, CreditCard } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const formatCurrency = (amount) =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount * 1000)

const getSituacionBadge = (situacion) => {
  switch (situacion) {
    case 1:
      return <Badge className="bg-green-100 text-green-800">Normal</Badge>
    case 2:
      return <Badge className="bg-yellow-100 text-yellow-800">Riesgo Bajo</Badge>
    case 3:
      return <Badge className="bg-orange-100 text-orange-800">Riesgo Medio</Badge>
    default:
      return <Badge variant="destructive">Riesgo Alto</Badge>
  }
}

export default function Deuda({ data }) {
  const totalMonto = data?.periodos?.reduce((total, p) => total + p.entidades.reduce((sum, e) => sum + e.monto, 0), 0)
  const totalEntidades = data?.periodos?.reduce((total, p) => total + p.entidades.length, 0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumen de la Deuda</CardTitle>
        <CardDescription>Información general del deudor</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex gap-3 items-start">
          <User className="h-6 w-6 text-blue-600 mt-1" />
          <div>
            <p className="text-muted-foreground text-sm">Denominación</p>
            <p className="font-semibold">{data.denominacion}</p>
            <p className="text-muted-foreground text-sm">CUIT/CUIL: {data.identificacion}</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <DollarSign className="h-6 w-6 text-green-600 mt-1" />
          <div>
            <p className="text-muted-foreground text-sm">Monto total</p>
            <p className="font-semibold">{formatCurrency(totalMonto)}</p>
          </div>
        </div>
        <div className="flex gap-3 items-start">
          <Building2 className="h-6 w-6 text-blue-500 mt-1" />
          <div>
            <p className="text-muted-foreground text-sm">Entidades</p>
            <p className="font-semibold">{totalEntidades}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3 items-center">
          <CreditCard className="h-5 w-5 text-purple-600" />
          <span className="text-muted-foreground text-sm">
            Estado actual: {getSituacionBadge(1)}
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}
