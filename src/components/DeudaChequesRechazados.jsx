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
  const { status, errorMessages, entidades } = chequesDataInicial || {}

  // 🔴 Si hay un error controlado (status 0 o error API)
  if (status === 0 && errorMessages?.length) {
    return (
      <Alert variant="default" className="mt-4">
        <AlertCircle className="h-4 w-4 text-yellow-600" />
        <AlertTitle>No hay cheques rechazados</AlertTitle>
        <AlertDescription>{errorMessages[0]}</AlertDescription>
      </Alert>
    )
  }

  // 🟢 Si hay cheques válidos
  if (Array.isArray(entidades) && entidades.length > 0) {
    return (
      <Card className="mt-6">
        <CardContent className="space-y-6 p-6">
          <h2 className="text-xl font-semibold">Cheques Rechazados</h2>
          {entidades.map((entidad, i) => (
            <div key={i} className="space-y-4 border-t pt-4">
              {entidad.detalle.map((detalle, j) => (
                <div key={j} className="border p-4 rounded-lg bg-gray-100 space-y-1">
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
        </CardContent>
      </Card>
    )
  }

  // 🟡 Si no hay nada en absoluto
  return (
    <Alert variant="default" className="mt-4">
      <AlertCircle className="h-4 w-4 text-yellow-600" />
      <AlertTitle>No se encontraron cheques rechazados</AlertTitle>
      <AlertDescription>Este CUIT no posee registros de cheques rechazados.</AlertDescription>
    </Alert>
  )
}

export default DeudaChequesRechazados

