export const dynamic = "force-dynamic";

import { contactsDB } from "@/lib/db";
import { MessageSquare, Mail, Phone } from "lucide-react";

export default async function AdminContactsPage() {
  const contacts = (await contactsDB.getAll()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6 page-enter">
      <div>
        <h2 className="text-2xl font-bold text-primary">Contact Messages</h2>
        <p className="text-slate-500 text-sm mt-1">{contacts.length} total messages · {contacts.filter((c) => !c.read).length} unread</p>
      </div>

      <div className="space-y-4">
        {contacts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm text-center py-16">
            <MessageSquare size={40} className="text-slate-200 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No messages yet</p>
          </div>
        ) : (
          contacts.map((msg) => (
            <div key={msg.id} className={`bg-white rounded-2xl border shadow-sm p-6 ${!msg.read ? "border-primary/30 bg-primary/2" : "border-slate-100"}`}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {msg.name[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-slate-800">{msg.name}</div>
                      <div className="text-slate-400 text-xs">{new Date(msg.createdAt).toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  {!msg.read && <span className="badge bg-primary text-white text-[10px]">New</span>}
                  <span className="badge bg-slate-100 text-slate-600 text-xs">{msg.subject}</span>
                </div>
              </div>

              <p className="text-slate-600 text-sm leading-relaxed mb-4 bg-slate-50 rounded-xl p-4">{msg.message}</p>

              <div className="flex flex-wrap gap-4 text-sm">
                <a href={`mailto:${msg.email}`} className="flex items-center gap-2 text-primary hover:underline">
                  <Mail size={14} /> {msg.email}
                </a>
                {msg.phone && (
                  <a href={`tel:${msg.phone}`} className="flex items-center gap-2 text-primary hover:underline">
                    <Phone size={14} /> {msg.phone}
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
