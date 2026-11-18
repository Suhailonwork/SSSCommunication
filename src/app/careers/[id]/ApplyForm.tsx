import { Phone, Mail } from "lucide-react";

interface ApplyFormProps {
  careerId: string;
  careerTitle: string;
}

export default function ApplyForm({ careerTitle }: ApplyFormProps) {
  return (
    <div className="card overflow-hidden">
      <div className="bg-primary p-5">
        <h3 className="font-bold text-white text-lg">Apply for this Position</h3>
        <p className="text-white/70 text-sm mt-1">Call us to apply for {careerTitle}.</p>
      </div>
      <div className="p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Phone size={28} className="text-primary" />
        </div>
        <p className="text-slate-500 text-sm mb-2">To apply, call our HR team directly:</p>
        <a
          href="tel:+919868480116"
          className="block text-2xl font-extrabold text-primary hover:text-primary-dark transition-colors mb-6"
        >
          +91 98684 80116
        </a>
        <a
          href="tel:+919868480116"
          className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 mb-3"
        >
          <Phone size={16} /> Call to Apply
        </a>
        <a
          href="mailto:info@sssdelhi.in"
          className="w-full border border-primary text-primary font-bold py-3 rounded-xl hover:bg-primary hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <Mail size={16} /> Email Us
        </a>
        <p className="text-slate-400 text-xs mt-4">Mon – Sat, 9:00 AM – 7:00 PM</p>
      </div>
    </div>
  );
}
