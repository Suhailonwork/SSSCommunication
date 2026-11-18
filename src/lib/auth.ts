import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "sss_admin_token";

function getAuthConfig() {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const jwtSecret = process.env.JWT_SECRET;

  if (
    process.env.NODE_ENV === "production" &&
    (!username || !password || !jwtSecret)
  ) {
    throw new Error(
      "ADMIN_USERNAME, ADMIN_PASSWORD, and JWT_SECRET must be configured in production."
    );
  }

  return {
    username: username || "admin",
    password: password || "SSSAdmin@2024",
    jwtSecret: new TextEncoder().encode(
      jwtSecret || "development-only-jwt-secret"
    ),
  };
}

export async function signToken(payload: Record<string, string>) {
  const { jwtSecret } = getAuthConfig();
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(jwtSecret);
}

export async function verifyToken(token: string) {
  const { jwtSecret } = getAuthConfig();
  try {
    const { payload } = await jwtVerify(token, jwtSecret);
    return payload;
  } catch {
    return null;
  }
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function createSession(username: string, password: string) {
  const config = getAuthConfig();
  if (username !== config.username || password !== config.password) {
    return null;
  }
  const token = await signToken({ username, role: "admin" });
  return token;
}

export function isValidCredentials(username: string, password: string) {
  const config = getAuthConfig();
  return username === config.username && password === config.password;
}

export { COOKIE_NAME };
