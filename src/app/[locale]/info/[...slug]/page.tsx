"use server";
import InfoContent from "@/app/[locale]/me/info-content";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const supabase = createClient();
  console.log(params.slug);
  let res = await supabase
    .from("users")
    .select("*")
    .eq("qr_id", params.slug)
    .single();

  console.log(res);
  if (!res.data || !res.data.form) {
    redirect("/expired");
  }
  return (
    <div>
      <InfoContent formData={res.data.form} />
    </div>
  );
}
