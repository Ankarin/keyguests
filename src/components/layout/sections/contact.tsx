"use client";
import { sendEmail } from "@/server/mail";
import { Building2, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  email: z.string().email(),
  message: z.string(),
});

export const ContactSection = () => {
  const t = useTranslations("Contact");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setSuccess(false);
    const { firstName, lastName, email, message } = values;

    try {
      await sendEmail(firstName, lastName, email, message);
      setSuccess(true);
    } catch (error) {
      console.error("Failed to send email", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="container pb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            {/*<h2 className="text-lg text-primary mb-2 tracking-wider">*/}
            {/*  {t("label")}*/}
            {/*</h2>*/}

            <h2 className="text-3xl md:text-4xl font-bold">{t("title")}</h2>
          </div>
          <p className="mb-8 text-muted-foreground lg:w-5/6">
            {/*{t("description")}*/}
          </p>

          <div className="flex flex-col gap-4">
            {/*<div>*/}
            {/*  <div className="flex gap-2 mb-1">*/}
            {/*    <Building2 />*/}
            {/*    <div className="font-bold">{t("find_us")}</div>*/}
            {/*  </div>*/}

            {/*  <div>{t("address")}</div>*/}
            {/*</div>*/}

            <div>
              <div className="flex gap-2 mb-1">
                <Mail />
                <div className="font-bold">{t("email")}</div>
              </div>

              <div>{t("email_address")}</div>
            </div>
          </div>
        </div>

        <Card className="bg-muted/60 dark:bg-card">
          <CardHeader className="text-primary text-2xl"> </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid w-full gap-4"
              >
                <div className="flex flex-col md:!flex-row gap-8">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.first_name.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`${t("form.first_name.label")}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>{t("form.last_name.label")}</FormLabel>
                        <FormControl>
                          <Input
                            placeholder={`${t("form.last_name.label")}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.email.label")}</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={`${t("form.email.label")}`}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("form.message.label")}</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={5}
                            placeholder={`${t("form.message.label")}`}
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {!success && (
                  <Button type="submit" disabled={loading} className="mt-4">
                    {t("form.send_button")}
                  </Button>
                )}
              </form>
            </Form>
            {success && (
              <div className="mt-4 text-green-600">{t("form.success")}</div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
