export default function WarningBanner({ warning }) {
  if (!warning || warning.level === "none") return null;

  const colors = {
    high: "bg-red-500/10 border-red-500/40 text-red-400",
    medium: "bg-yellow-500/10 border-yellow-500/40 text-yellow-300",
    low: "bg-blue-500/10 border-blue-500/40 text-blue-300",
  };

  return (
    <div className={`p-3 rounded-lg border ${colors[warning.level]} mb-4`}>
      <p className="text-sm font-semibold">
        {warning.message}
      </p>
    </div>
  );
}