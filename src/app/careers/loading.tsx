import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CareersLoading() {
  return (
    <>
      <Navbar />
      <main>
        <section className="pt-32 pb-16 hero-gradient grid-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="h-7 w-32 bg-white/10 rounded-full mx-auto mb-5 animate-pulse" />
            <div className="h-14 w-3/4 max-w-2xl bg-white/10 rounded-xl mx-auto mb-4 animate-pulse" />
            <div className="h-5 w-2/3 max-w-md bg-white/10 rounded mx-auto animate-pulse" />
          </div>
        </section>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="card p-6 animate-pulse space-y-4">
                  <div className="h-5 w-3/4 bg-slate-100 rounded" />
                  <div className="h-3 w-1/2 bg-slate-100 rounded" />
                  <div className="h-3 w-full bg-slate-100 rounded" />
                  <div className="h-3 w-2/3 bg-slate-100 rounded" />
                  <div className="h-10 w-full bg-slate-100 rounded mt-4" />
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
