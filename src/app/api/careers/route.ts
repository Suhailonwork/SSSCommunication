import { careersDB } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const careers = careersDB.getPublished();
  return Response.json(careers);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const { title, department, location, type, experience, salary, description, responsibilities, requirements, benefits, published, deadline } = data;

  if (!title || !department || !description) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const career = careersDB.create({
    title,
    department,
    location: location || "New Delhi",
    type: type || "Full-time",
    experience: experience || "",
    salary: salary || "",
    description,
    responsibilities: responsibilities || [],
    requirements: requirements || [],
    benefits: benefits || [],
    published: Boolean(published),
    deadline: deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
  });

  return Response.json(career, { status: 201 });
}
