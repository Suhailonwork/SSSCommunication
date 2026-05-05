export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="relative w-14 h-14 mx-auto mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-primary font-black text-xs">S³</span>
          </div>
        </div>
        <p className="text-slate-400 text-sm font-medium">Loading...</p>
      </div>
    </div>
  );
}
