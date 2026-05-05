import { blogsDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/blogs/[id]">) {
  const { id } = await ctx.params;
  const blog = blogsDB.getById(id);
  if (!blog) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(blog);
}

export async function PUT(request: NextRequest, ctx: RouteContext<"/api/blogs/[id]">) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const data = await request.json();
  const updated = blogsDB.update(id, data);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/blogs/[id]">) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const deleted = blogsDB.delete(id);
  if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
