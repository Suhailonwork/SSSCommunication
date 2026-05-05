import { blogsDB } from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function GET() {
  const blogs = blogsDB.getPublished();
  return Response.json(blogs);
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const data = await request.json();
  const { title, slug, excerpt, content, author, category, tags, published, readTime, seoTitle, seoDescription, coverImage, publishedAt } = data;

  if (!title || !slug || !excerpt || !content || !category) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  const blog = blogsDB.create({
    title,
    slug,
    excerpt,
    content,
    author: author || "SSS Communications Team",
    category,
    tags: tags || [],
    published: Boolean(published),
    readTime: Number(readTime) || 5,
    seoTitle: seoTitle || title,
    seoDescription: seoDescription || excerpt,
    coverImage: coverImage || "/blog/default.jpg",
    publishedAt: publishedAt || new Date().toISOString(),
  });

  return Response.json(blog, { status: 201 });
}
