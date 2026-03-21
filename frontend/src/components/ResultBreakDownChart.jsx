
// import {
//   BarChart, Bar, XAxis, YAxis, Tooltip,
//   ResponsiveContainer, CartesianGrid, Cell
// } from "recharts";

// const COLORS = {
//   True:         "#22d3ee",
//   False:        "#f87171",
//   Partial:      "#fbbf24",
//   Unverifiable: "#64748b",
// }

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div style={{
//         background: 'rgba(4,14,28,0.96)',
//         border: '1px solid rgba(0,200,255,0.2)',
//         borderRadius: 8,
//         padding: '8px 14px',
//         fontFamily: 'Inter, sans-serif',
//         fontSize: '0.8rem',
//         color: '#e2f0ff',
//       }}>
//         <span style={{ color: 'rgba(0,200,255,0.7)', fontWeight: 600 }}>{label}</span>
//         <span style={{ marginLeft: 8, fontWeight: 500 }}>{payload[0].value}</span>
//       </div>
//     )
//   }
//   return null
// }

// export default function ResultBreakdownChart({ data }) {
//   if (!data || data.length === 0) return null;

//   let trueCount = 0, falseCount = 0, partialCount = 0, unverifiableCount = 0;

//   data.forEach((item) => {
//     if (item.verdict === "True") trueCount++;
//     else if (item.verdict === "False") falseCount++;
//     else if (item.verdict === "Partially True") partialCount++;
//     else unverifiableCount++;
//   });

//   const chartData = [
//     { name: "True",        value: trueCount },
//     { name: "False",       value: falseCount },
//     { name: "Partial",     value: partialCount },
//     { name: "Unverifiable",value: unverifiableCount }
//   ];

//   return (
//     <div className="card">
//       <h3 style={{ fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: '1rem', color: 'rgba(0,200,255,0.75)' }}>
//         Verification Breakdown
//       </h3>
//       <ResponsiveContainer width="100%" height={230}>
//         <BarChart data={chartData} barSize={30} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
//           <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
//           <XAxis
//             dataKey="name"
//             tick={{ fill: 'rgba(255,255,255,0.35)', fontFamily: 'Inter,sans-serif', fontSize: 11 }}
//             axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
//             tickLine={false}
//           />
//           <YAxis
//             tick={{ fill: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif', fontSize: 10 }}
//             axisLine={false}
//             tickLine={false}
//             allowDecimals={false}
//           />
//           <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
//           <Bar dataKey="value" radius={[6,6,0,0]}>
//             {chartData.map((entry, i) => (
//               <Cell
//                 key={i}
//                 fill={COLORS[entry.name] || '#64748b'}
//                 opacity={entry.value === 0 ? 0.2 : 1}
//               />
//             ))}
//           </Bar>
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

const COLORS = {
  True:         "#22d3ee",
  False:        "#f87171",
  Partial:      "#fbbf24",
  Unverifiable: "#64748b",
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(4,14,28,0.96)',
        border: '1px solid rgba(0,200,255,0.2)',
        borderRadius: 8,
        padding: '8px 14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8rem',
        color: '#e2f0ff',
      }}>
        <span style={{ color: 'rgba(0,200,255,0.7)', fontWeight: 600 }}>{label}</span>
        <span style={{ marginLeft: 8, fontWeight: 500 }}>{payload[0].value}</span>
      </div>
    )
  }
  return null
}

export default function ResultBreakdownChart({ data }) {
  if (!data || data.length === 0) return null;

  let trueCount = 0, falseCount = 0, partialCount = 0, unverifiableCount = 0;

  data.forEach((item) => {
    const v = (item.verdict || "").toLowerCase()
    if (v === "true") trueCount++;
    else if (v === "false") falseCount++;
    else if (v === "partial" || v === "partially true") partialCount++;
    else unverifiableCount++;
  });

  const chartData = [
    { name: "True",        value: trueCount },
    { name: "False",       value: falseCount },
    { name: "Partial",     value: partialCount },
    { name: "Unverifiable",value: unverifiableCount }
  ];

  return (
    <div className="card">
      <h3 style={{ fontSize: '0.78rem', letterSpacing: '0.1em', marginBottom: '1rem', color: 'rgba(0,200,255,0.75)' }}>
        Verification Breakdown
      </h3>
      <ResponsiveContainer width="100%" height={230}>
        <BarChart data={chartData} barSize={30} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: 'rgba(255,255,255,0.35)', fontFamily: 'Inter,sans-serif', fontSize: 11 }}
            axisLine={{ stroke: 'rgba(255,255,255,0.08)' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'rgba(255,255,255,0.25)', fontFamily: 'Inter,sans-serif', fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.03)' }} />
          <Bar dataKey="value" radius={[6,6,0,0]}>
            {chartData.map((entry, i) => (
              <Cell
                key={i}
                fill={COLORS[entry.name] || '#64748b'}
                opacity={entry.value === 0 ? 0.2 : 1}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}