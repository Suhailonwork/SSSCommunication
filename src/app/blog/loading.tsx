import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BlogLoading() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 hero-gradient grid-pattern relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-7 w-32 bg-white/10 rounded-full mx-auto mb-6 animate-pulse" />
            <div className="h-12 w-3/4 max-w-xl bg-white/10 rounded-xl mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-2/3 max-w-md bg-white/10 rounded mx-auto animate-pulse" />
          </div>
        </section>
        <section className="py-16 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-12 mb-12 flex gap-3">
              <div className="h-12 w-72 bg-white rounded-lg border border-slate-100 animate-pulse" />
              <div className="h-12 w-20 bg-white rounded-lg border border-slate-100 animate-pulse hidden sm:block" />
              <div className="h-12 w-20 bg-white rounded-lg border border-slate-100 animate-pulse hidden sm:block" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card overflow-hidden animate-pulse">
                  <div className="bg-slate-100 h-44" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-24 bg-slate-100 rounded" />
                    <div className="h-5 w-full bg-slate-100 rounded" />
                    <div className="h-5 w-3/4 bg-slate-100 rounded" />
                    <div className="h-3 w-full bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
