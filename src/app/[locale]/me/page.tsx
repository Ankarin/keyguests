"use server";
import InfoContent from "@/app/[locale]/me/info-content";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import QRCodeGenerator from "@/app/[locale]/me/qr-component";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page() {
  const supabase = createClient();
  const userRes = await supabase.auth.getUser();
  const userId = userRes.data.user?.id;
  const email = userRes.data.user?.email;
  if (!userId) {
    redirect("/login");
  }
  let res = await supabase.from("users").select("*").eq("id", userId).single();
  if (res.error) {
    if (res.error.code === "PGRST116") {
      await supabase.from("users").insert([{ email: email }]);
      res = await supabase.from("users").select("*").eq("id", userId).single();
    } else {
      alert(res.error.message);
      redirect("/");
    }
  }
  console.log(res);
  if (!res.data || !res.data.form) {
    redirect("/me/info");
  }
  return (
    <div>
      <QRCodeGenerator id={res.data.qr_id} />
      <div className="max-w-6xl flex justify-end">
        <Link href="/me/info">
          <Button>Edit</Button>
        </Link>
      </div>
      <InfoContent formData={res.data.form} />
    </div>
  );
}
