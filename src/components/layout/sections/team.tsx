import GithubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import XIcon from "@/components/icons/x-icon";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

interface TeamProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  title: string;
  description: string;
  socialNetworks: SocialNetworkProps[];
}

interface SocialNetworkProps {
  name: string;
  url: string;
}

export const TeamSection = () => {
  const t = useTranslations("Team");

  const teamList: TeamProps[] = [
    {
      imageUrl: "/chavdia.png",
      firstName: t("members.1.first_name"),
      lastName: t("members.1.last_name"),
      title: t("members.1.title"),
      description: t("members.1.description"),
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/anastasia-chavdia-903481114/",
        },
      ],
    },
    {
      imageUrl: "/me.jpeg",
      firstName: t("members.2.first_name"),
      lastName: t("members.2.last_name"),
      title: t("members.2.title"),
      description: t("members.2.description"),
      socialNetworks: [
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/dmitry-loza-4128a7190/",
        },
        {
          name: "Github",
          url: "https://github.com/",
        },
      ],
    },
  ];

  const socialIcon = (socialName: string) => {
    switch (socialName) {
      case "LinkedIn":
        return <LinkedInIcon />;
      case "Github":
        return <GithubIcon />;
      case "X":
        return <XIcon />;
    }
  };

  return (
    <section className="container lg:w-[75%] py-24 mx-auto">
      <div className="text-center mb-8">
        {/*<h2 className="text-lg text-primary text-center mb-2 tracking-wider">*/}
        {/*  {t("label")}*/}
        {/*</h2>*/}
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          {t("title")}
        </h2>
        <p className="max-w-screen-sm mx-auto pt-4 text-xl text-muted-foreground">
          {t("about")}
        </p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 max-w-3xl sm:grid-cols-2 gap-8 place-content-center">
          {teamList.map(
            (
              {
                imageUrl,
                firstName,
                lastName,
                title,
                socialNetworks,
                description,
              },
              index,
            ) => (
              <Card
                key={index}
                className="bg-muted/60 dark:bg-card flex flex-col h-full overflow-hidden group/hoverimg"
              >
                <CardHeader className="p-0 gap-0">
                  <div className="h-full overflow-hidden">
                    <Image
                      src={imageUrl}
                      alt={`${firstName} ${lastName}`}
                      width={300}
                      height={300}
                      className="w-full aspect-square object-cover  transition-all duration-200 ease-linear size-full group-hover/hoverimg:saturate-100 group-hover/hoverimg:scale-[1.01]"
                    />
                  </div>
                  <CardTitle className="py-6 pb-4 px-6">
                    {firstName}
                    <span className="text-primary ml-2">
                      {lastName}, {title}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className={`pb-0 text-muted-foreground`}>
                  {description}
                </CardContent>
                <br />
                <CardFooter className="space-x-4 mt-auto">
                  {socialNetworks.map(({ name, url }, index) => (
                    <Link
                      key={index}
                      href={url}
                      target="_blank"
                      className="hover:opacity-80 transition-all"
                    >
                      {socialIcon(name)}
                    </Link>
                  ))}
                </CardFooter>
              </Card>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
