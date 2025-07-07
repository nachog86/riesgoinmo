import React from "react"

export function DistribucionEntidad({ entitiesData }) {
  if (!entitiesData || entitiesData.length === 0) return null

  const total = entitiesData.reduce((sum, d) => sum + d.monto, 0)

  const data = entitiesData
    .filter((d) => d.monto > 0)
    .sort((a, b) => b.monto - a.monto)
    .map((d, i) => {
      const porcentaje = total > 0 ? (d.monto / total) * 100 : 0
      return {
        key: d.name.toUpperCase(),
        value: porcentaje,
        porcentaje,
        destacado: i === 0,
      }
    })

  const maxPorcentaje = Math.max(...data.map((d) => d.porcentaje))

  return (
    <div className="w-full h-full grid gap-4 py-4">
      {data.map((d, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col">
            <div
              className={`text-sm font-medium whitespace-nowrap ${
                d.destacado
                  ? "bg-lime-500 dark:bg-[#00F2FF] text-transparent bg-clip-text"
                  : "text-gray-700 dark:text-zinc-300"
              }`}
            >
              {d.key}
            </div>
            <div
              className={`text-xs ${
                d.destacado
                  ? "text-teal-500 dark:text-[#7AED5C]"
                  : "text-gray-400 dark:text-zinc-500"
              }`}
            >
              
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative rounded-sm h-3 bg-gray-200 dark:bg-zinc-800 overflow-hidden w-full">
              <div
                className={`absolute inset-0 rounded-r-sm bg-gradient-to-r ${
                  d.destacado
                    ? "from-lime-300 to-teal-300 dark:from-[#00F2FF] dark:to-[#7AED5C]"
                    : "from-zinc-400 to-gray-400 dark:from-zinc-500 dark:to-zinc-400"
                }`}
                style={{
                  width: `${(d.porcentaje / maxPorcentaje) * 100}%`,
                }}
              />
            </div>
            <div
              className={`text-sm whitespace-nowrap ${
                d.destacado
                  ? "bg-teal-400 dark:bg-[#7AED5C] text-transparent bg-clip-text"
                  : "text-gray-500 dark:text-zinc-400"
              } tabular-nums`}
            >
              {d.porcentaje.toFixed(1)}%
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}





