"use client";

import { toast } from "@/components/ui/use-toast";
import supabase from "@/utils/supabase/client";
import Link from "next/link";
import { useState } from "react";
import { nanoid } from "nanoid"; // Import nanoid
import { QRCodeSVG as QRCode } from "qrcode.react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function QRCodeExample({ id }: { id: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const [qrUrl, setQrUrl] = useState(baseUrl + id);

  const generateQRCode = async () => {
    const newRandomString = nanoid(12);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return toast({
        title: "Authentication Error",
        description: "Please sign in to submit the form.",
        variant: "destructive",
      });
    }
    const res = await supabase
      .from("users")
      .update({ qr_id: newRandomString })
      .eq("id", user.id);
    setQrUrl(`${baseUrl}${newRandomString}`);
  };

  return (
    <Card className="w-full text-center max-w-md mx-auto">
      <CardHeader>
        <CardTitle>QR Code Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Link href={qrUrl} className="break-words">
            {qrUrl}
          </Link>
        </div>
        <div className="flex justify-center">
          {qrUrl && <QRCode value={qrUrl} size={260} />}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={generateQRCode} className="w-full">
          Generate New QR Code
        </Button>
      </CardFooter>
    </Card>
  );
}
