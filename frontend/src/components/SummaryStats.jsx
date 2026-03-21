// export default function SummaryStats({ stats }) {
//   return (
//     <div className="stats-grid">
//       <div className="stat-box">
//         <h3>{stats.total}</h3>
//         <p>Total Claims</p>
//       </div>

//       <div className="stat-box">
//         <h3>{stats.true}</h3>
//         <p>True</p>
//       </div>

//       <div className="stat-box">
//         <h3>{stats.false}</h3>
//         <p>False</p>
//       </div>

//       <div className="stat-box">
//         <h3>{stats.reliability}%</h3>
//         <p>Reliability</p>
//       </div>
//     </div>
//   );
// }



const STAT_ICONS = {
  total:       { icon: "⬡", accent: "rgba(0,200,255,0.7)"  },
  true:        { icon: "✓", accent: "#4ade80"               },
  false:       { icon: "✕", accent: "#f87171"               },
  reliability: { icon: "%", accent: "#fbbf24"               },
}

export default function SummaryStats({ stats }) {
  const items = [
    { key: "total",       value: stats.total,            label: "Total Claims"  },
    { key: "true",        value: stats.true,             label: "True"          },
    { key: "false",       value: stats.false,            label: "False"         },
    { key: "reliability", value: `${stats.reliability}%`,label: "Reliability"  },
  ]

  return (
    <div className="stats-grid">
      {items.map(({ key, value, label }) => {
        const { accent } = STAT_ICONS[key]
        return (
          <div key={key} className="stat-box">
            <h3 style={{ color: accent, textShadow: `0 0 20px ${accent}55` }}>
              {value}
            </h3>
            <p>{label}</p>
          </div>
        )
      })}
    </div>
  )
}