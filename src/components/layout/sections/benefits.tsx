import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { ArrowRight, icons } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

export const BenefitsSection = () => {
  const t = useTranslations("Benefits");
  const benefitList: BenefitsProps[] = [
    {
      icon: "Blocks",
      title: t("benefits.1.title"),
      description: t("benefits.1.description"),
    },
    {
      icon: "LineChart",
      title: t("benefits.2.title"),
      description: t("benefits.2.description"),
    },
    {
      icon: "Wallet",
      title: t("benefits.3.title"),
      description: t("benefits.3.description"),
    },
    {
      icon: "Sparkle",
      title: t("benefits.4.title"),
      description: t("benefits.4.description"),
    },
  ];
  return (
    <section id="benefits" className="container pb-24">
      <div className="grid lg:grid-cols-2 place-items-center justify-center lg:gap-24">
        <div>
          {/*<h2 className="text-lg text-primary mb-2 tracking-wider">*/}
          {/*  {t("label")}*/}
          {/*</h2>*/}

          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("title")}</h2>
          <p className="text-xl text-muted-foreground mb-8">
            {t("description")}
          </p>
          <Link href="/me">
            <Button className="w-5/6 md:w-1/4 font-bold group/arrow mt-4 mb-16 w-full">
              Try yourself
              <ArrowRight className="size-5 ml-2 group-hover/arrow:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
