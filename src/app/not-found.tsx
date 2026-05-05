import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen bg-surface pt-20 pb-20 text-center px-4">
        <div className="text-8xl font-black text-primary/10 mb-4">404</div>
        <h1 className="text-3xl font-bold text-primary mb-4">Page Not Found</h1>
        <p className="text-slate-500 text-lg max-w-md mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-4">
          <Link href="/" className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
            Go Home
          </Link>
          <Link href="/contact" className="border border-primary text-primary font-semibold px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition-colors">
            Contact Us
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
