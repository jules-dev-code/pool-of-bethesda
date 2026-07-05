"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession, getSession } from "@/lib/auth/session";
import { logActivity } from "@/lib/services/activity-log";
import type { ActionResult } from "@/lib/types";

interface LoginInput {
  email: string;
  password: string;
}

export async function loginAction(input: LoginInput): Promise<ActionResult> {
  const { email, password } = input;

  if (!email || !password) {
    return { success: false, message: "Email et mot de passe requis." };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { success: false, message: "Identifiants incorrects." };
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return { success: false, message: "Identifiants incorrects." };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });

  await logActivity({
    userId: user.id,
    action: "LOGIN",
    entity: "User",
    entityId: user.id,
  });

  return { success: true, message: "Connexion réussie." };
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}

export async function requireSession() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}
