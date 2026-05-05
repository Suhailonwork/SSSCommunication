import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "src", "data");

function readJSON<T>(filename: string): T[] {
  const filePath = path.join(dataDir, filename);
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

function writeJSON<T>(filename: string, data: T[]): void {
  const filePath = path.join(dataDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

// Blog types
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

// Career types
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

// Application types
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

// Contact types
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

// Blog CRUD
export const blogsDB = {
  getAll: () => readJSON<Blog>("blogs.json"),
  getPublished: () => readJSON<Blog>("blogs.json").filter((b) => b.published),
  getById: (id: string) => readJSON<Blog>("blogs.json").find((b) => b.id === id),
  getBySlug: (slug: string) => readJSON<Blog>("blogs.json").find((b) => b.slug === slug),
  create: (data: Omit<Blog, "id" | "createdAt" | "updatedAt">) => {
    const all = readJSON<Blog>("blogs.json");
    const now = new Date().toISOString();
    const newBlog: Blog = {
      ...data,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    writeJSON("blogs.json", [...all, newBlog]);
    return newBlog;
  },
  update: (id: string, data: Partial<Blog>) => {
    const all = readJSON<Blog>("blogs.json");
    const idx = all.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    writeJSON("blogs.json", all);
    return all[idx];
  },
  delete: (id: string) => {
    const all = readJSON<Blog>("blogs.json");
    const filtered = all.filter((b) => b.id !== id);
    writeJSON("blogs.json", filtered);
    return filtered.length < all.length;
  },
};

// Career CRUD
export const careersDB = {
  getAll: () => readJSON<Career>("careers.json"),
  getPublished: () => readJSON<Career>("careers.json").filter((c) => c.published),
  getById: (id: string) => readJSON<Career>("careers.json").find((c) => c.id === id),
  create: (data: Omit<Career, "id" | "createdAt" | "updatedAt">) => {
    const all = readJSON<Career>("careers.json");
    const now = new Date().toISOString();
    const newCareer: Career = {
      ...data,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };
    writeJSON("careers.json", [...all, newCareer]);
    return newCareer;
  },
  update: (id: string, data: Partial<Career>) => {
    const all = readJSON<Career>("careers.json");
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    writeJSON("careers.json", all);
    return all[idx];
  },
  delete: (id: string) => {
    const all = readJSON<Career>("careers.json");
    const filtered = all.filter((c) => c.id !== id);
    writeJSON("careers.json", filtered);
    return filtered.length < all.length;
  },
};

// Applications CRUD
export const applicationsDB = {
  getAll: () => readJSON<Application>("applications.json"),
  getById: (id: string) => readJSON<Application>("applications.json").find((a) => a.id === id),
  getByCareer: (careerId: string) =>
    readJSON<Application>("applications.json").filter((a) => a.careerId === careerId),
  create: (data: Omit<Application, "id" | "createdAt" | "updatedAt" | "status">) => {
    const all = readJSON<Application>("applications.json");
    const now = new Date().toISOString();
    const newApp: Application = {
      ...data,
      id: Date.now().toString(),
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    writeJSON("applications.json", [...all, newApp]);
    return newApp;
  },
  update: (id: string, data: Partial<Application>) => {
    const all = readJSON<Application>("applications.json");
    const idx = all.findIndex((a) => a.id === id);
    if (idx === -1) return null;
    all[idx] = { ...all[idx], ...data, updatedAt: new Date().toISOString() };
    writeJSON("applications.json", all);
    return all[idx];
  },
  delete: (id: string) => {
    const all = readJSON<Application>("applications.json");
    const filtered = all.filter((a) => a.id !== id);
    writeJSON("applications.json", filtered);
    return filtered.length < all.length;
  },
};

// Contact CRUD
export const contactsDB = {
  getAll: () => readJSON<ContactMessage>("contacts.json"),
  create: (data: Omit<ContactMessage, "id" | "createdAt" | "read">) => {
    const all = readJSON<ContactMessage>("contacts.json");
    const newMsg: ContactMessage = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    writeJSON("contacts.json", [...all, newMsg]);
    return newMsg;
  },
  markRead: (id: string) => {
    const all = readJSON<ContactMessage>("contacts.json");
    const idx = all.findIndex((c) => c.id === id);
    if (idx === -1) return null;
    all[idx].read = true;
    writeJSON("contacts.json", all);
    return all[idx];
  },
};
