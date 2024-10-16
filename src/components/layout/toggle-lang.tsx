"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";

type Locale = "en" | "zh-hk" | "zh-cn";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function onSelectChange(newLocale: Locale) {
    // Construct the new path with the selected locale
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    router.push(newPath);
  }

  if (!mounted) {
    return (
      <div className="w-[120px] h-[40px] bg-gray-200 animate-pulse rounded-md">
        {/* Placeholder for SSR */}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <Select defaultValue={locale} onValueChange={onSelectChange}>
        <SelectTrigger className="w-[120px]" aria-label={t("selectLanguage")}>
          <SelectValue placeholder={t("selectLanguage")} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">{t(`locale.en`)}</SelectItem>
          <SelectItem value="hk">{t(`locale.zh-hk`)}</SelectItem>
          <SelectItem value="cn">{t(`locale.zh-cn`)}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
