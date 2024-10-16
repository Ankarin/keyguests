"use client";
import InfoContent, { FormDataType } from "@/app/[locale]/me/info-content";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Blocks } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG as QRCode } from "qrcode.react";

export const HeroSection = () => {
  const qrUrl = "https://www.keyguests.com/en/info/wu8CbygPs0LV";
  const t = useTranslations("HomePage");
  const { theme } = useTheme();

  const example: FormDataType = {
    email: "chavdia.anastasia@gmail.com",
    phone: "+778909876",
    gender: "male",
    lastName: "Doe",
    birthdate: "1966-09-15T20:00:00.000Z",
    dietTypes: ["Vegan"],
    firstName: "John",
    otherDiet: "Yes, I am following a plant-based (vegan) diet.",
    pregnancy: "no",
    allergyTypes: ["Fish gelatine", "Molluscs", "Fish"],
    disabilities: "yes",
    cardiacIssues: "no",
    otherConcerns:
      "Yes, I would appreciate recommendations on healthy, plant-based dining options.",
    otherAllergies: "Yes, I am allergic to shellfish.",
    skinConditions: "yes",
    intoleranceTypes: ["Fish gelatine", "Soya", "Molluscs", "Fish"],
    pregnancyDetails: "",
    scentSensitivity: "yes",
    sleepPreferences: "yes",
    emergencyContact1: {
      email: "chavdia.anastasia@gmail.com",
      phone: "89160286678",
      address: "Tabidze street 66",
    },
    emergencyContact2: {},
    medicalConditions: "yes",
    medicationStorage: "no",
    otherIntolerances: "",
    roomAccommodations: "yes",
    disabilitiesDetails: "No, I do not have any mobility issues.",
    emergencyConditions: "no",
    generalHealthConcern: "yes",
    healthConcernDetails:
      "Yes, I would appreciate a calm, quiet environment as I am sensitive to noise, which can affect my mental well-being.",
    healthConcernForStay: "yes",
    skinConditionsDetails:
      "No, I do not have any skin sensitivities, butI have tension in my lower back and shoulders, so I’d like extra focus in those areas.",
    scentSensitivityDetails:
      "Yes, I am allergic to lavender essential oil, so please avoid using it.",
    sleepPreferencesDetails:
      "I would appreciate an air purifier in the room due to my asthma",
    medicalConditionsDetails:
      "Yes, I have asthma, and I may require air quality adjustments during my stay.",
    medicationStorageDetails: "",
    visionHearingImpairments: "no",
    roomAccommodationsDetails:
      "Yes, I prefer the room to be cooler, around 20°C (68°F), and I would like a coffee machine and bathrobes in the room, please.",
    emergencyConditionsDetails: "",
    generalHealthConcernDetails:
      "Yes, I try to maintain a balanced diet and a consistent sleep schedule while traveling. I also prefer environments with good air quality.",
  };

  return (
    <section id="hero" className="container w-full">
      <div className="grid place-items-center lg:max-w-screen-xl gap-8 mx-auto py-20 md:py-24">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
            <Blocks className="h-4 w-4" />{" "}
            <Separator className="mx-2 h-4" orientation="vertical" />{" "}
            <span>{t("top-label")}</span>
          </div>

          <div className="max-w-screen-md mx-auto text-center text-4xl md:text-6xl font-bold">
            <h1>
              {t("title")}
              <br />
              <span className="text-transparent px-2 bg-gradient-to-r from-[#237A57] to-primary bg-clip-text">
                {t("accent")}
              </span>
              <br />
              {t("title2")}
            </h1>
          </div>

          <p className="max-w-screen-sm mx-auto text-xl text-muted-foreground">
            {t("about")}
          </p>

          <div className="space-y-4 md:space-y-0 md:space-x-4">
            <Link href="/me">
              <Button className="w-5/6 md:w-1/4 font-bold group/arrow">
                {t("cta")}
                <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative group mt-14">
          <Card className="w-full text-center max-w-md mx-auto">
            <CardHeader>
              <CardTitle>QR Code Example</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Link
                  target="_blank"
                  href={qrUrl}
                  className="break-all text-blue-700 underline"
                >
                  {qrUrl}
                </Link>
              </div>
              <div className="flex justify-center">
                {qrUrl && <QRCode value={qrUrl} size={260} />}
              </div>
            </CardContent>
          </Card>{" "}
        </div>
        <InfoContent formData={example} />
      </div>
    </section>
  );
};
