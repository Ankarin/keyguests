import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";
import { useTranslations } from "next-intl";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

export const FeaturesSection = () => {
  const t = useTranslations("Features");

  const featuresArray: FeaturesProps[] = [
    {
      icon: "TabletSmartphone",
      title: t("features.1.title"),
      description: t("features.1.description"),
    },
    {
      icon: "BadgeCheck",
      title: t("features.2.title"),
      description: t("features.2.description"),
    },
    {
      icon: "Goal",
      title: t("features.3.title"),
      description: t("features.3.description"),
    },
    {
      icon: "PictureInPicture",
      title: t("features.4.title"),
      description: t("features.4.description"),
    },
    {
      icon: "MousePointerClick",
      title: t("features.5.title"),
      description: t("features.5.description"),
    },
    {
      icon: "Newspaper",
      title: t("features.6.title"),
      description: t("features.6.description"),
    },
  ];

  return (
    <section id="features" className="container py-24 ">
      {/*<h2 className="text-lg text-primary text-center mb-2 tracking-wider">*/}
      {/*  {t("label")}*/}
      {/*</h2>*/}

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        {t("title")}
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
        {t("description")}
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuresArray.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle className="text-center">{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
