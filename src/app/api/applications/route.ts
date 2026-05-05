import { applicationsDB } from "@/lib/db";

export async function GET() {
  const applications = applicationsDB.getAll();
  return Response.json(applications);
}

export async function POST(request: Request) {
  const data = await request.json();
  const { careerId, careerTitle, name, email, phone, experience, coverLetter } = data;

  if (!careerId || !name || !email || !phone) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return Response.json({ error: "Invalid email address" }, { status: 400 });
  }

  const application = applicationsDB.create({
    careerId,
    careerTitle: careerTitle || "Unknown Position",
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone.trim(),
    experience: experience || "Not specified",
    coverLetter: coverLetter || "",
  });

  return Response.json(application, { status: 201 });
}
