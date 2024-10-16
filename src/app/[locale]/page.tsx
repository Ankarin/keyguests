import { BenefitsSection } from "@/components/layout/sections/benefits";
import { ContactSection } from "@/components/layout/sections/contact";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { ServicesSection } from "@/components/layout/sections/services";
import { TeamSection } from "@/components/layout/sections/team";
import { useTranslations } from "next-intl";

export const metadata = {
  title: "Keyguests",
  openGraph: {
    type: "website",
    title: "Keyguests",
  },
};

export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ContactSection />
      <FooterSection />
    </>
  );
}
