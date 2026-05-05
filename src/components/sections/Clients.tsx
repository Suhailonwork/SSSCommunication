export default function Clients() {
  const clients = [
    { name: "Kotak Mahindra", abbr: "KOTAK" },
    { name: "Reliance", abbr: "RELIANCE" },
    { name: "Hero FinCorp", abbr: "HeroFin" },
    { name: "BAuto Finance", abbr: "BAuto" },
    { name: "Idea Cellular", abbr: "IDEA" },
    { name: "InternLaunch", abbr: "InternLaunch" },
  ];

  return (
    <section className="py-14 bg-surface border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-400 text-sm uppercase tracking-widest font-semibold mb-10">
          Trusted by Leading Brands
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-6 items-center">
          {clients.map((c) => (
            <div
              key={c.name}
              title={c.name}
              className="flex items-center justify-center h-16 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 px-4 group"
            >
              <span className="text-slate-400 font-bold text-xs sm:text-sm tracking-wide group-hover:text-primary transition-colors">
                {c.abbr}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
