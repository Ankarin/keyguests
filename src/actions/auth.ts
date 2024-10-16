"use server";
import { createClient } from "@/utils/supabase/server";
import { nanoid } from "nanoid";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void | string> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
}

export async function logout(): Promise<void | string> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) return error.message;
}

export async function signup({
  email,
  password,
  origin,
}: {
  email: string;
  password: string;
  origin: string;
}): Promise<void | string> {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/api/confirm-callback`,
    },
  });

  console.log(data);
  const res = await supabase
    .from("users")
    .insert([{ email: email, qr_id: nanoid(12) }]);
  if (error) throw error;
}

export async function forgot({
  email,
  origin,
}: {
  email: string;
  origin: string;
}): Promise<string> {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/api/reset-callback`,
  });
  if (error) throw error;
  else {
    return "success";
  }
}
export async function reset({
  password,
}: {
  password: string;
}): Promise<string | void> {
  const supabase = createClient();
  const { error, data } = await supabase.auth.updateUser({
    password: password,
  });
  console.log(data);
  console.log(error);
  if (error) throw error;
}
