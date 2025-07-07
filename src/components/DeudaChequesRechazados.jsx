// import React from 'react';
// import { Card, CardContent } from '@/components/ui/card';


// function DeudaChequesRechazados({ chequesDataInicial }) {
   
//     const chequesData = chequesDataInicial.results
    
//   return (
//     <div>
//       {chequesData && (
//         <Card>
//           <CardContent className="space-y-4 p-6">
//             <h2 className="text-xl font-semibold">
//               Cheques Rechazados - {chequesData.denominacion}
//             </h2>
//             <p className="text-gray-600">
//               Identificación: {chequesData.identificacion}
//             </p>
//             {Array.isArray(chequesData.causales) ? (
//               chequesData.causales.map((causal, i) => (
//                 <div key={i} className="border-t pt-4">
//                   <p className="font-medium">Causal: {causal.causal}</p>
//                   {Array.isArray(causal.entidades) && 
//                     causal.entidades.map((ent, j) => (
//                       <div key={j} className="space-y-2 mt-2">
//                         {Array.isArray(ent.detalle) &&
//                           ent.detalle.map((detalle, k) => (
//                             <div key={k} className="border p-4 rounded-lg bg-gray-100">
//                               <p className="font-semibold">
//                                 Cheque N°: {detalle.nroCheque}
//                               </p>
//                               <p>Entidad: {detalle.denomJuridica}</p>
//                               <p>Fecha de Rechazo: {detalle.fechaRechazo}</p>
//                               <p>Monto: ${detalle.monto}</p>
//                               <p>
//                                 Estado de Multa:{' '}
//                                 {detalle.estadoMulta || 'N/A'}
//                               </p>
//                               {detalle.fechaPago && (
//                                 <p>Fecha de Pago: {detalle.fechaPago}</p>
//                               )}
//                               {detalle.fechaPagoMulta && (
//                                 <p>Fecha Pago Multa: {detalle.fechaPagoMulta}</p>
//                               )}
//                               {detalle.procesoJud && (
//                                 <p className="text-red-600 font-bold">
//                                   ⚠️ En proceso judicial
//                                 </p>
//                               )}
//                             </div>
//                           ))}
//                       </div>
//                     ))}
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 italic">
//                 No se encontraron cheques rechazados.
//               </p>
//             )}
//           </CardContent>
//         </Card>
//       )}
//     </div>
//   );
// }

// export default DeudaChequesRechazados;
import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'

function DeudaChequesRechazados({ chequesDataInicial }) {
  if (!chequesDataInicial) return null

  const { status, results, errorMessages } = chequesDataInicial

  // ✅ Caso 1: si status === 0 pero no hay causales
  if (status === 0 && (!results?.causales || results.causales.length === 0)) {
    return (
      <Alert variant="default" className="mt-4">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertTitle>No se encontraron cheques rechazados</AlertTitle>
        <AlertDescription>
          Este CUIT no posee registros de cheques rechazados.
        </AlertDescription>
      </Alert>
    )
  }

  // ❌ Caso 2: error explícito
  if (status === 0 && Array.isArray(errorMessages)) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error al consultar cheques</AlertTitle>
        <AlertDescription>{errorMessages[0]}</AlertDescription>
      </Alert>
    )
  }

  // ✅ Caso 3: datos válidos
  const { identificacion, denominacion, causales } = results || {}

  return (
    <Card className="mt-6">
      <CardContent className="space-y-6 p-6">
        <h2 className="text-xl font-semibold">
          Cheques Rechazados - {denominacion}
        </h2>
        <p className="text-gray-600">CUIT/CUIL: {identificacion}</p>

        {causales.map((causal, i) => (
          <div key={i} className="space-y-4 border-t pt-4">
            <p className="font-medium">Causal: {causal.causal}</p>

            {causal.entidades.map((entidad, j) => (
              <div key={j} className="space-y-2 mt-2">
                {entidad.detalle.map((detalle, k) => (
                  <div key={k} className="border p-4 rounded-lg bg-gray-100 space-y-1">
                    <p className="font-semibold">Cheque N°: {detalle.nroCheque}</p>
                    <p>Entidad: {detalle.denomJuridica}</p>
                    <p>Fecha de Rechazo: {detalle.fechaRechazo}</p>
                    <p>Monto: ${detalle.monto}</p>
                    <p>Estado de Multa: {detalle.estadoMulta || 'N/A'}</p>
                    {detalle.fechaPago && <p>Fecha de Pago: {detalle.fechaPago}</p>}
                    {detalle.fechaPagoMulta && <p>Fecha Pago Multa: {detalle.fechaPagoMulta}</p>}
                    {detalle.procesoJud && (
                      <p className="text-red-600 font-bold">⚠️ En proceso judicial</p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default DeudaChequesRechazados






