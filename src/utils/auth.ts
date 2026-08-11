export type UserRole = "admin" | "operations" | "maintenance";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
};

const AUTH_STORAGE_KEY = "wefixo-auth-user";

export const rolePermissions: Record<UserRole, string[]> = {
  admin: ["/dashboard", "/production", "/machines", "/inventory", "/maintenance", "/work-orders", "/machine-alerts", "/insights", "/demand-forecast", "/reports"],
  operations: ["/dashboard", "/production", "/inventory", "/work-orders", "/machine-alerts", "/demand-forecast"],
  maintenance: ["/machines", "/maintenance", "/work-orders", "/machine-alerts"],
};

const credentials: Array<{ email: string; password: string; user: AuthUser }> = [
  {
    email: "admin@wefixo.com",
    password: "admin123",
    user: {
      id: "admin",
      name: "Alicia Chen",
      email: "admin@wefixo.com",
      role: "admin",
      roleLabel: "Admin",
    },
  },
  {
    email: "ops@wefixo.com",
    password: "ops123",
    user: {
      id: "ops",
      name: "Marcus Reed",
      email: "ops@wefixo.com",
      role: "operations",
      roleLabel: "Operations Manager",
    },
  },
  {
    email: "maintenance@wefixo.com",
    password: "maint123",
    user: {
      id: "maint",
      name: "Nina Patel",
      email: "maintenance@wefixo.com",
      role: "maintenance",
      roleLabel: "Maintenance Engineer",
    },
  },
];

export function signIn(email: string, password: string): AuthUser | null {
  const matched = credentials.find(
    (entry) => entry.email.toLowerCase() === email.trim().toLowerCase() && entry.password === password,
  );

  if (!matched) {
    return null;
  }

  if (typeof window !== "undefined") {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(matched.user));
  }

  return matched.user;
}

export function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as AuthUser;
  } catch {
    return null;
  }
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function getDefaultRoute(role: UserRole): string {
  if (role === "maintenance") {
    return "/machines";
  }

  return "/dashboard";
}

export function getAllowedRoutes(role: UserRole): string[] {
  return rolePermissions[role] ?? [];
}

export function hasAccess(user: AuthUser | null, path: string): boolean {
  if (!user) {
    return false;
  }

  return getAllowedRoutes(user.role).includes(path);
}
