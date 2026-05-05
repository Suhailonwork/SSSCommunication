import { contactsDB } from "@/lib/db";

export async function POST(request: Request) {
  const data = await request.json();
  const { name, email, phone, subject, message } = data;

  if (!name || !email || !subject || !message) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Invalid email" }, { status: 400 });
  }

  const msg = contactsDB.create({
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || "",
    subject: subject.trim(),
    message: message.trim(),
  });

  return Response.json(msg, { status: 201 });
}
