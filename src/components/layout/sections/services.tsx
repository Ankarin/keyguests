"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";

enum ProService {
  YES = 1,
  NO = 0,
}

interface ServiceProps {
  title: string;
  pro: ProService;
  description: string;
}

export const ServicesSection = () => {
  const t = useTranslations("Flow");

  // Dynamically build the service list using translations
  const serviceList: ServiceProps[] = [
    {
      title: t("items.1.title"),
      description: t("items.1.description"),
      pro: ProService.NO,
    },
    {
      title: t("items.2.title"),
      description: t("items.2.description"),
      pro: ProService.NO,
    },
    {
      title: t("items.3.title"),
      description: t("items.3.description"),
      pro: ProService.NO,
    },
    {
      title: t("items.4.title"),
      description: t("items.4.description"),
      pro: ProService.YES,
    },
  ];

  return (
    <section id="flow" className="container py-24">
      {/*<h2 className="text-lg text-primary text-center mb-2 tracking-wider">*/}
      {/*  {t("title")}*/}
      {/*</h2>*/}

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {t("title")}
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        {t("description")}
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 w-full lg:w-[60%] mx-auto">
        {serviceList.map(({ title, description, pro }) => (
          <Card
            key={title}
            className="bg-muted/60 dark:bg-card h-full relative"
          >
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
};
