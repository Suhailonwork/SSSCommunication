import { randomUUID } from "node:crypto";
import applicationSeed from "@/data/applications.json";
import blogSeed from "@/data/blogs.json";
import careerSeed from "@/data/careers.json";
import contactSeed from "@/data/contacts.json";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  seoTitle: string;
  seoDescription: string;
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  published: boolean;
  deadline: string;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  careerId: string;
  careerTitle: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  coverLetter: string;
  resumeUrl?: string;
  status: "pending" | "reviewing" | "shortlisted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  createdAt: string;
  read: boolean;
}

// In-memory stores seeded from the JSON files in src/data.
// Kept on globalThis so they survive dev Hot Module Reloading. Note: on a
// serverless host (e.g. Vercel) writes are per-instance and reset on cold
// start — reads always work, but created/updated records are not durable.
const globalForStore = globalThis as typeof globalThis & {
  __sssStore?: {
    blogs: Blog[];
    careers: Career[];
    applications: Application[];
    contacts: ContactMessage[];
  };
};

const store =
  globalForStore.__sssStore ??
  (globalForStore.__sssStore = {
    blogs: structuredClone(blogSeed as Blog[]),
    careers: structuredClone(careerSeed as Career[]),
    applications: structuredClone(applicationSeed as Application[]),
    contacts: structuredClone(contactSeed as ContactMessage[]),
  });

const clone = <T>(value: T): T => structuredClone(value);

export const blogsDB = {
  getAll: async () => clone(store.blogs),
  getPublished: async () => clone(store.blogs.filter((b) => b.published)),
  getById: async (id: string) => {
    const blog = store.blogs.find((b) => b.id === id);
    return blog ? clone(blog) : null;
  },
  getBySlug: async (slug: string) => {
    const blog = store.blogs.find((b) => b.slug === slug);
    return blog ? clone(blog) : null;
  },
  create: async (data: Omit<Blog, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newBlog: Blog = {
      ...data,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    store.blogs.push(newBlog);
    return clone(newBlog);
  },
  update: async (id: string, data: Partial<Blog>) => {
    const blog = store.blogs.find((b) => b.id === id);
    if (!blog) return null;
    Object.assign(blog, data, { id, updatedAt: new Date().toISOString() });
    return clone(blog);
  },
  delete: async (id: string) => {
    const index = store.blogs.findIndex((b) => b.id === id);
    if (index === -1) return false;
    store.blogs.splice(index, 1);
    return true;
  },
};

export const careersDB = {
  getAll: async () => clone(store.careers),
  getPublished: async () => clone(store.careers.filter((c) => c.published)),
  getById: async (id: string) => {
    const career = store.careers.find((c) => c.id === id);
    return career ? clone(career) : null;
  },
  create: async (data: Omit<Career, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date().toISOString();
    const newCareer: Career = {
      ...data,
      id: randomUUID(),
      createdAt: now,
      updatedAt: now,
    };
    store.careers.push(newCareer);
    return clone(newCareer);
  },
  update: async (id: string, data: Partial<Career>) => {
    const career = store.careers.find((c) => c.id === id);
    if (!career) return null;
    Object.assign(career, data, { id, updatedAt: new Date().toISOString() });
    return clone(career);
  },
  delete: async (id: string) => {
    const index = store.careers.findIndex((c) => c.id === id);
    if (index === -1) return false;
    store.careers.splice(index, 1);
    return true;
  },
};

export const applicationsDB = {
  getAll: async () => clone(store.applications),
  getById: async (id: string) => {
    const application = store.applications.find((a) => a.id === id);
    return application ? clone(application) : null;
  },
  getByCareer: async (careerId: string) =>
    clone(store.applications.filter((a) => a.careerId === careerId)),
  create: async (
    data: Omit<Application, "id" | "createdAt" | "updatedAt" | "status">
  ) => {
    const now = new Date().toISOString();
    const newApplication: Application = {
      ...data,
      id: randomUUID(),
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    store.applications.push(newApplication);
    return clone(newApplication);
  },
  update: async (id: string, data: Partial<Application>) => {
    const application = store.applications.find((a) => a.id === id);
    if (!application) return null;
    Object.assign(application, data, {
      id,
      updatedAt: new Date().toISOString(),
    });
    return clone(application);
  },
  delete: async (id: string) => {
    const index = store.applications.findIndex((a) => a.id === id);
    if (index === -1) return false;
    store.applications.splice(index, 1);
    return true;
  },
};

export const contactsDB = {
  getAll: async () => clone(store.contacts),
  create: async (data: Omit<ContactMessage, "id" | "createdAt" | "read">) => {
    const newMessage: ContactMessage = {
      ...data,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    store.contacts.push(newMessage);
    return clone(newMessage);
  },
  markRead: async (id: string) => {
    const message = store.contacts.find((c) => c.id === id);
    if (!message) return null;
    message.read = true;
    return clone(message);
  },
};
