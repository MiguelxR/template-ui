export const Roles = {
  ADMIN: "ADMIN",
  USER: "USER",
  GUEST: "GUEST",
} as const;

export type Roles = (typeof Roles)[keyof typeof Roles];
