// // App.jsx
// import React, { useState } from 'react'
// import Deuda from './components/Deuda'
// import DeudaHistorica from './components/DeudaHistorica'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import axios from 'axios'
// import DeudaChequesRechazados from './components/DeudaChequesRechazados'

// function App() {
//   const [dni, setDni] = useState("")
//   const [deuda, setDeuda] = useState(null)
//   const [historico, setHistorico] = useState(null)
//   const [chequesRechazados, setChequesRechazados] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const handleBuscar = async () => {
//     if (!dni) return;
//     setLoading(true)
  
//     try {
//       const [situacionRes, historicoRes] = await Promise.all([
//         axios.get(`https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/${dni}`),
//         axios.get(`https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/Historicas/${dni}`)
//       ])
  
//       setDeuda(situacionRes.data.results)
//       setHistorico(historicoRes.data.results)
  
//       // Consulta aparte para cheques con manejo específico
//       try {
//         const chequesRes = await axios.get(
//           `https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/ChequesRechazados/${dni}`
//         )
//         setChequesRechazados(chequesRes.data)
//       } catch (err) {
//         if (err.response?.status === 404) {
//           setChequesRechazados({ status: 0, errorMessages: ['No hay cheques rechazados.'] })
//         } else {
//           console.error('Error en cheques rechazados:', err)
//           setChequesRechazados({ status: 0, errorMessages: ['Error al consultar cheques.'] })
//         }
//       }
  
//     } catch (error) {
//       console.error("Error general en APIs de deuda:", error)
//       setDeuda(null)
//       setHistorico(null)
//       setChequesRechazados({ status: 0, errorMessages: ['No se pudo consultar la información.'] })
//     } finally {
//       setLoading(false)
//     }
//   }
  


//   return (
//     <div className="min-h-screen bg-gray-100 p-6 space-y-6">
//       <div className="max-w-4xl mx-auto space-y-4">
//         <div className="flex gap-2 mb-4">
//           <Input
//             type="text"
//             placeholder="Ingrese DNI"
//             value={dni}
//             onChange={(e) => setDni(e.target.value)}
//             className="w-48"
//           />
//           <Button onClick={handleBuscar} disabled={loading}>
//             {loading ? "Buscando..." : "Buscar"}
//           </Button>
//         </div>

//         {deuda && <Deuda data={deuda} />}
//         {historico && <DeudaHistorica historico={historico} />}
//         {chequesRechazados && <DeudaChequesRechazados chequesDataInicial={chequesRechazados} />}
//       </div>
//     </div>
//   )
// }

// export default App
// App.jsx
import React, { useState } from 'react'
import Deuda from './components/Deuda'
import DeudaHistorica from './components/DeudaHistorica'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import DeudaChequesRechazados from './components/DeudaChequesRechazados'



function App() {
  const [dni, setDni] = useState("")
  const [deuda, setDeuda] = useState(null)
  const [historico, setHistorico] = useState(null)
  const [chequesRechazados, setChequesRechazados] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleBuscar = async () => {
    if (!dni) return
    setLoading(true)

    try {
      const [situacionRes, historicoRes] = await Promise.all([
        axios.get(`https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/${dni}`),
        axios.get(`https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/Historicas/${dni}`)
      ])

      setDeuda(situacionRes.data.results)
      setHistorico(historicoRes.data.results)

      try {
        const chequesRes = await axios.get(
          `https://api.bcra.gob.ar/centraldedeudores/v1.0/Deudas/ChequesRechazados/${dni}`
        )
        setChequesRechazados(chequesRes.data)
      } catch (err) {
        if (err.response?.status === 404) {
          setChequesRechazados({
            status: 0,
            errorMessages: ['No hay cheques rechazados.']
          })
        } else {
          console.error('Error en cheques rechazados:', err)
          setChequesRechazados({
            status: 0,
            errorMessages: ['Error al consultar cheques.']
          })
        }
      }

    } catch (error) {
      console.error("Error general en APIs de deuda:", error)
      setDeuda(null)
      setHistorico(null)
      setChequesRechazados({
        status: 0,
        errorMessages: ['No se pudo consultar la información.']
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 space-y-6">
      <div className="max-w-4xl mx-auto space-y-4">
        <div className="flex gap-2 mb-4">
          
          <Input
            type="text"
            placeholder="Ingrese DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            className="w-48"
          />
          <Button onClick={handleBuscar} disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </div>

        {/* Solo renderiza si hay algo */}
        {deuda && <Deuda data={deuda} />}
        {historico && <DeudaHistorica historico={historico} />}
        {chequesRechazados && (
          <DeudaChequesRechazados chequesDataInicial={chequesRechazados} />
        )}
      </div>
    </div>
  )
}

export default App
