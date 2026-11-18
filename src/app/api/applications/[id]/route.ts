import { applicationsDB } from "@/lib/db";
import { getSession } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function GET(_req: NextRequest, ctx: RouteContext<"/api/applications/[id]">) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const app = await applicationsDB.getById(id);
  if (!app) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(app);
}

export async function PATCH(request: NextRequest, ctx: RouteContext<"/api/applications/[id]">) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const data = await request.json();
  const updated = await applicationsDB.update(id, data);
  if (!updated) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json(updated);
}

export async function DELETE(_req: NextRequest, ctx: RouteContext<"/api/applications/[id]">) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const deleted = await applicationsDB.delete(id);
  if (!deleted) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ success: true });
}
