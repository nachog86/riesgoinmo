import React from "react"

export function RankingDeuda({ chupitoPame }: { chupitoPame: DistribucionEntidad[] }) {
  if (!chupitoPame || chupitoPame.length === 0) return null

  const data = chupitoPame
    .filter((d) => d.monto > 0)
    .sort((a, b) => b.monto - a.monto)
    .map((d, i) => ({
      key: d.name.toUpperCase(),
      value: d.monto,
      destacado: i === 0, // el mayor monto
    }))

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="w-full h-full grid gap-4 py-4">
      {data.map((d, index) => (
        <React.Fragment key={index}>
          <div
            className={`text-sm whitespace-nowrap ${
              d.destacado
                ? "bg-lime-500 dark:bg-[#00F2FF] text-transparent bg-clip-text"
                : "text-gray-500 dark:text-zinc-400"
            }`}
          >
            {d.destacado && <span className="text-yellow-400">👑</span>}
            {d.key}
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
                  width: `${(d.value / maxValue) * 100}%`,
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
              {new Intl.NumberFormat("es-AR", {
                style: "currency",
                currency: "ARS",
                maximumFractionDigits: 0,
              }).format(d.value)}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

