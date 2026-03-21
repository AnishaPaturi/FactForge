import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const styles = `
  .ff-chart-card {
    background: rgba(4, 14, 28, 0.78);
    border: 1px solid rgba(0, 200, 255, 0.12);
    border-radius: 14px;
    padding: 1.4rem;
    backdrop-filter: blur(16px);
    box-shadow: 0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04);
  }

  .ff-chart-title {
    font-family: 'Orbitron', sans-serif;
    font-size: 0.78rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(0,200,255,0.75);
    margin-bottom: 1rem;
  }

  .recharts-default-tooltip {
    background: rgba(4, 14, 28, 0.95) !important;
    border: 1px solid rgba(0,200,255,0.2) !important;
    border-radius: 8px !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 0.8rem !important;
    color: #e2f0ff !important;
  }

  .recharts-tooltip-label {
    color: rgba(0,200,255,0.7) !important;
    font-weight: 600 !important;
  }

  .recharts-legend-item-text {
    color: rgba(255,255,255,0.55) !important;
    font-family: 'Inter', sans-serif !important;
    font-size: 0.78rem !important;
  }
`

const COLORS = ["#22d3ee", "#f59e0b", "#f87171"];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'rgba(4,14,28,0.95)',
        border: '1px solid rgba(0,200,255,0.2)',
        borderRadius: '8px',
        padding: '8px 12px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.8rem',
        color: '#e2f0ff',
      }}>
        <span style={{ color: 'rgba(0,200,255,0.7)', fontWeight: 600 }}>{payload[0].name}</span>
        <span style={{ marginLeft: 8, color: '#fff', fontWeight: 500 }}>{payload[0].value}</span>
      </div>
    );
  }
  return null;
};

export default function ConfidenceChart({ data }) {
  if (!data || data.length === 0) return null;

  let high = 0, medium = 0, low = 0;

  data.forEach((item) => {
    if (item.confidence >= 80) high++;
    else if (item.confidence >= 50) medium++;
    else low++;
  });

  const chartData = [
    { name: "High", value: high },
    { name: "Medium", value: medium },
    { name: "Low", value: low }
  ];

  return (
    <>
      <style>{styles}</style>
      <div className="ff-chart-card">
        <p className="ff-chart-title">Confidence Distribution</p>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              outerRadius={78}
              innerRadius={36}
              paddingAngle={3}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={{ stroke: 'rgba(255,255,255,0.2)' }}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                  stroke="rgba(4,14,28,0.8)"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span style={{ color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter,sans-serif', fontSize: '0.78rem' }}>
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}