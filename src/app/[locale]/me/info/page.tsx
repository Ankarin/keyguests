"use client";

import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDatePicker } from "@/components/ui/calendar-date-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import supabase from "@/utils/supabase/client";

const allergens = [
  "Gluten",
  "Crustaceans",
  "Egg",
  "Fish",
  "Fish gelatine",
  "Soya",
  "Peanuts",
  "Soy bean oil",
  "Vegetable oil",
  "Milk (lactose)",
  "Nuts",
  "Celery",
  "Mustard",
  "Sesame",
  "Sulphites",
  "Lupines",
  "Molluscs",
];

const diets = [
  "Alcohol-free",
  "Vegan",
  "Halal",
  "Vegetarian",
  "Kosher",
  "Gluten-free",
  "Dairy-free",
  "Low-sodium",
  "Low-fat",
  "Diabetic",
  "Other",
];

const formSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  birthdate: z.date({ required_error: "A date of birth is required." }),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Please select a gender.",
  }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits." }),
  generalHealthConcern: z.enum(["yes", "no"]),
  generalHealthConcernDetails: z.string().optional(),
  healthConcernForStay: z.enum(["yes", "no"]),
  healthConcernDetails: z.string().optional(),
  medicalConditions: z.enum(["yes", "no"]),
  medicalConditionsDetails: z.string().optional(),
  allergyTypes: z.array(z.string()).optional(),
  otherAllergies: z.string().optional(),
  intoleranceTypes: z.array(z.string()).optional(),
  otherIntolerances: z.string().optional(),
  dietTypes: z.array(z.string()).optional(),
  otherDiet: z.string().optional(),
  roomAccommodations: z.enum(["yes", "no"]),
  roomAccommodationsDetails: z.string().optional(),
  sleepPreferences: z.enum(["yes", "no"]),
  sleepPreferencesDetails: z.string().optional(),
  medicationStorage: z.enum(["yes", "no"]),
  medicationStorageDetails: z.string().optional(),
  scentSensitivity: z.enum(["yes", "no"]),
  scentSensitivityDetails: z.string().optional(),
  skinConditions: z.enum(["yes", "no"]),
  skinConditionsDetails: z.string().optional(),
  pregnancy: z.enum(["yes", "no"]),
  pregnancyDetails: z.string().optional(),
  cardiacIssues: z.enum(["yes", "no"]),
  cardiacIssuesDetails: z.string().optional(),
  emergencyConditions: z.enum(["yes", "no"]),
  emergencyConditionsDetails: z.string().optional(),
  visionHearingImpairments: z.enum(["yes", "no"]),
  visionHearingImpairmentsDetails: z.string().optional(),
  disabilities: z.enum(["yes", "no"]),
  disabilitiesDetails: z.string().optional(),
  emergencyContact1: z.object({
    phone: z
      .string()
      .min(1, { message: "Emergency contact phone is required." }),
    email: z.string().email({ message: "Invalid email address." }),
    address: z
      .string()
      .min(1, { message: "Emergency contact address is required." }),
  }),
  emergencyContact2: z
    .object({
      phone: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
    })
    .optional(),
  otherConcerns: z.string().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function GuestHealthForm() {
  const [step, setStep] = useState(1);
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthdate: new Date(),
      allergyTypes: [],
      intoleranceTypes: [],
      dietTypes: [],
      generalHealthConcern: "no",
      healthConcernForStay: "no",
      medicalConditions: "no",
      roomAccommodations: "no",
      sleepPreferences: "no",
      medicationStorage: "no",
      scentSensitivity: "no",
      skinConditions: "no",
      pregnancy: "no",
      cardiacIssues: "no",
      emergencyConditions: "no",
      visionHearingImpairments: "no",
      disabilities: "no",
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    async function fetchData() {
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
        .select("form")
        .eq("id", user.id)
        .single();

      if (res.data && res.data.form) {
        // Modify the data as needed
        const modifiedData = {
          ...res.data.form,
          birthdate: new Date(res.data.form.birthdate), // Example modification
        };

        // Update the form with the modified data
        form.reset(modifiedData);
      }
    }

    fetchData();
  }, [form]);

  const router = useRouter();
  async function onSubmit(values: FormSchema) {
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
    const newRandomString = nanoid(12);
    const res = await supabase
      .from("users")
      .update({ form: values })
      .eq("id", user.id);

    toast({
      title: "Form submitted",
      description: "Thank you for submitting your health information.",
    });
    router.push("/me");
    console.log(values);
  }

  const nextStep = async () => {
    const fields = getFieldsForStep(step);
    const result = await form.trigger(fields);
    if (result) {
      setStep(step + 1);
    } else {
      toast({
        title: "Validation Error",
        description: "Please check the form for errors.",
        variant: "destructive",
      });
    }
  };

  const prevStep = () => setStep(step - 1);

  const getFieldsForStep = (step: number): (keyof FormSchema)[] => {
    switch (step) {
      case 1:
        return [
          "firstName",
          "lastName",
          "birthdate",
          "gender",
          "email",
          "phone",
        ];
      case 2:
        return [
          "generalHealthConcern",
          "generalHealthConcernDetails",
          "healthConcernForStay",
          "healthConcernDetails",
          "medicalConditions",
          "medicalConditionsDetails",
        ];
      case 3:
        return [
          "allergyTypes",
          "otherAllergies",
          "intoleranceTypes",
          "otherIntolerances",
          "dietTypes",
          "otherDiet",
        ];
      case 4:
        return [
          "roomAccommodations",
          "roomAccommodationsDetails",
          "sleepPreferences",
          "sleepPreferencesDetails",
          "medicationStorage",
          "medicationStorageDetails",
        ];
      case 5:
        return [
          "scentSensitivity",
          "scentSensitivityDetails",
          "skinConditions",
          "skinConditionsDetails",
          "pregnancy",
          "pregnancyDetails",
          "cardiacIssues",
          "cardiacIssuesDetails",
          "emergencyConditions",
          "emergencyConditionsDetails",
          "visionHearingImpairments",
          "visionHearingImpairmentsDetails",
          "disabilities",
          "disabilitiesDetails",
        ];
      case 6:
        return ["emergencyContact1", "emergencyContact2", "otherConcerns"];
      default:
        return [];
    }
  };

  const RequiredFieldIndicator = () => <span className="text-red-500">*</span>;

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">
        Guest Information Form
      </h1>
      <p className="text-sm text-muted-foreground text-center">
        Help hotels provide tailored services and ensure a safer, more
        comfortable guest experience.
      </p>
      <p className="text-sm text-muted-foreground text-center">
        Fields marked with <RequiredFieldIndicator /> are required.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Personal Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        First Name <RequiredFieldIndicator />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Last Name <RequiredFieldIndicator />
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="birthdate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      Date of birth <RequiredFieldIndicator />
                    </FormLabel>
                    <FormControl>
                      <CalendarDatePicker
                        date={{ from: field.value, to: field.value }}
                        numberOfMonths={1}
                        onDateSelect={(range) => field.onChange(range?.from)}
                        className="narrow-calendar"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Gender <RequiredFieldIndicator />
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" id="male" />
                          </FormControl>
                          <FormLabel htmlFor="male" className="font-normal">
                            Male
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="female" id="female" />
                          </FormControl>
                          <FormLabel htmlFor="female" className="font-normal">
                            Female
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="other" id="other" />
                          </FormControl>
                          <FormLabel htmlFor="other" className="font-normal">
                            Other
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Email <RequiredFieldIndicator />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Phone Number <RequiredFieldIndicator />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Medical History
              </h2>
              <FormField
                control={form.control}
                name="generalHealthConcern"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Any concern for general health? (eating, sleeping habits,
                      etc…)
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("generalHealthConcern") === "yes" && (
                <FormField
                  control={form.control}
                  name="generalHealthConcernDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please provide details:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any general health concerns"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="healthConcernForStay"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Do you have any health concerns important for your stay
                      and travel?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("healthConcernForStay") === "yes" && (
                <FormField
                  control={form.control}
                  name="healthConcernDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please provide details:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your health concerns for your stay"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="medicalConditions"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Do you have any known medical conditions that hotel staff
                      should be aware of?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("medicalConditions") === "yes" && (
                <FormField
                  control={form.control}
                  name="medicalConditionsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please provide details:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your medical conditions"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Food and Beverage
              </h2>
              <FormField
                control={form.control}
                name="allergyTypes"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Do you have any allergies? If yes, please select all
                        that apply:
                      </FormLabel>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {allergens.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="allergyTypes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            item,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherAllergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Allergies</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="List any other allergies"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="intoleranceTypes"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Do you have any food intolerances? If yes, please select
                        all that apply:
                      </FormLabel>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {allergens.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="intoleranceTypes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            item,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherIntolerances"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Intolerances</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="List any other intolerances"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dietTypes"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel className="text-base">
                        Are you following any specific dietary regime? If yes,
                        please select all that apply:
                      </FormLabel>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {diets.map((item) => (
                        <FormField
                          key={item}
                          control={form.control}
                          name="dietTypes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item}
                                className="flex flex-row items-start space-x-3 space-y-0"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([
                                            ...(field.value || []),
                                            item,
                                          ])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item,
                                            ),
                                          );
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">
                                  {item}
                                </FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherDiet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other Dietary Regime</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Specify other dietary regime"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Rooms Division
              </h2>
              <FormField
                control={form.control}
                name="roomAccommodations"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Are there any accommodations or modifications needed in
                      your room for accessibility?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("roomAccommodations") === "yes" && (
                <FormField
                  control={form.control}
                  name="roomAccommodationsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormDescription>
                        e.g., first floor, near elevator, no staircase...
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any needed room accommodations"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="sleepPreferences"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Do you have any specific sleep preferences or
                      requirements?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("sleepPreferences") === "yes" && (
                <FormField
                  control={form.control}
                  name="sleepPreferencesDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormDescription>
                        e.g., hypoallergenic pillows
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="List any sleep preferences"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="medicationStorage"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Are you taking any medications that require special
                      storage?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("medicationStorage") === "yes" && (
                <FormField
                  control={form.control}
                  name="medicationStorageDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormDescription>
                        e.g., special refrigeration
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="List medications requiring special storage"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                SPA and Health Concerns
              </h2>
              <FormField
                control={form.control}
                name="scentSensitivity"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Are you sensitive to any specific scents, oils,
                      fragrances, or cleaning chemicals?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("scentSensitivity") === "yes" && (
                <FormField
                  control={form.control}
                  name="scentSensitivityDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="List any scent sensitivities"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="skinConditions"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Do you have any skin sensitivities or conditions that
                      should be considered for spa treatments?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("skinConditions") === "yes" && (
                <FormField
                  control={form.control}
                  name="skinConditionsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any skin conditions"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="pregnancy"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Are you pregnant or have any related conditions that
                      require special considerations?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("pregnancy") === "yes" && (
                <FormField
                  control={form.control}
                  name="pregnancyDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Provide details about pregnancy or related conditions"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="cardiacIssues"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Do you have any cardiac or high blood pressure issues that
                      may affect your activity choices?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("cardiacIssues") === "yes" && (
                <FormField
                  control={form.control}
                  name="cardiacIssuesDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any cardiac or blood pressure issues"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="emergencyConditions"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Do you have a history of fainting, seizures, or other
                      conditions requiring emergency response?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("emergencyConditions") === "yes" && (
                <FormField
                  control={form.control}
                  name="emergencyConditionsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any conditions requiring emergency response"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="visionHearingImpairments"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Do you have any vision or hearing impairments that hotel
                      staff should accommodate?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("visionHearingImpairments") === "yes" && (
                <FormField
                  control={form.control}
                  name="visionHearingImpairmentsDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any vision or hearing impairments"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="disabilities"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>
                      Do you have any physical disabilities or mobility issues
                      that require special assistance?
                    </FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-row space-x-4"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="yes" />
                          </FormControl>
                          <FormLabel className="font-normal">Yes</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="no" />
                          </FormControl>
                          <FormLabel className="font-normal">No</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("disabilities") === "yes" && (
                <FormField
                  control={form.control}
                  name="disabilitiesDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Please specify:</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe any physical disabilities or mobility issues"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Emergency Contact Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Primary Emergency Contact <RequiredFieldIndicator />
                  </h3>
                  <FormField
                    control={form.control}
                    name="emergencyContact1.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Phone Number <RequiredFieldIndicator />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Emergency contact phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact1.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Email <RequiredFieldIndicator />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Emergency contact email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact1.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Address <RequiredFieldIndicator />
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Emergency contact address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Secondary Emergency Contact (Optional)
                  </h3>
                  <FormField
                    control={form.control}
                    name="emergencyContact2.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Secondary emergency contact phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact2.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Secondary emergency contact email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="emergencyContact2.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Secondary emergency contact address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="otherConcerns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Are there any other health concerns or preferences that
                      the hotel should be aware of to enhance your stay?
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List your personal preferences here"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between items-center">
            <div className="space-x-2">
              {step > 1 && (
                <Button type="button" onClick={prevStep} variant="outline">
                  Previous
                </Button>
              )}
              {step < 6 && (
                <Button type="button" onClick={nextStep}>
                  Next
                </Button>
              )}
            </div>
            {step === 6 && <Button type="submit">Submit</Button>}
          </div>
        </form>
      </Form>
    </div>
  );
}
