import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";

export type FormDataType = {
  firstName: string;
  lastName: string;
  birthdate: string | Date;
  gender: "male" | "female" | "other";
  email: string;
  phone: string;
  generalHealthConcern: "yes" | "no";
  generalHealthConcernDetails?: string;
  healthConcernForStay: "yes" | "no";
  healthConcernDetails?: string;
  medicalConditions: "yes" | "no";
  medicalConditionsDetails?: string;
  allergyTypes?: string[];
  otherAllergies?: string;
  intoleranceTypes?: string[];
  otherIntolerances?: string;
  dietTypes?: string[];
  otherDiet?: string;
  roomAccommodations: "yes" | "no";
  roomAccommodationsDetails?: string;
  sleepPreferences: "yes" | "no";
  sleepPreferencesDetails?: string;
  medicationStorage: "yes" | "no";
  medicationStorageDetails?: string;
  scentSensitivity: "yes" | "no";
  scentSensitivityDetails?: string;
  skinConditions: "yes" | "no";
  skinConditionsDetails?: string;
  pregnancy: "yes" | "no";
  pregnancyDetails?: string;
  cardiacIssues: "yes" | "no";
  cardiacIssuesDetails?: string;
  emergencyConditions: "yes" | "no";
  emergencyConditionsDetails?: string;
  visionHearingImpairments: "yes" | "no";
  visionHearingImpairmentsDetails?: string;
  disabilities: "yes" | "no";
  disabilitiesDetails?: string;
  emergencyContact1: {
    phone: string;
    email: string;
    address: string;
  };
  emergencyContact2?: {
    phone?: string;
    email?: string;
    address?: string;
  };
  otherConcerns?: string;
};

export default function GuestHealthFormSummary({
  formData,
}: {
  formData: FormDataType;
}) {
  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-primary">{title}</h2>
      <div className="bg-white rounded-lg shadow-md p-6">{content}</div>
    </div>
  );

  const renderField = (label: string, value: string | string[] | undefined) => {
    if (value === undefined || value === "" || value === "no") return null;
    return (
      <div className="mb-4">
        <span className="font-medium text-gray-700">{label}:</span>{" "}
        {Array.isArray(value) ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {value.map((item, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-blue-100 text-blue-800"
              >
                {item}
              </Badge>
            ))}
          </div>
        ) : (
          <span className="text-gray-900 font-semibold">
            {value === "yes" ? "Yes" : value}
          </span>
        )}
      </div>
    );
  };

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString();
  };

  const calculateAge = (birthdate: string | Date) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-primary">
        Guest Information Summary
      </h1>

      {renderSection(
        "Personal Information",
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderField("First Name", formData.firstName)}
          {renderField("Last Name", formData.lastName)}
          {renderField(
            "Date of Birth",
            `${formatDate(formData.birthdate)} (Age: ${calculateAge(formData.birthdate)})`,
          )}
          {renderField("Gender", formData.gender)}
          {renderField("Email", formData.email)}
          {renderField("Phone", formData.phone)}
        </div>,
      )}

      {renderSection(
        "Medical History",
        <div className="space-y-4">
          {renderField(
            "General Health Concern",
            formData.generalHealthConcernDetails,
          )}
          {renderField(
            "Health Concern for Stay",
            formData.healthConcernDetails,
          )}
          {renderField("Medical Conditions", formData.medicalConditionsDetails)}
        </div>,
      )}

      {renderSection(
        "Food and Beverage",
        <div className="space-y-4">
          {renderField("Allergies", formData.allergyTypes)}
          {renderField("Other Allergies", formData.otherAllergies)}
          {renderField("Food Intolerances", formData.intoleranceTypes)}
          {renderField("Other Intolerances", formData.otherIntolerances)}
          {renderField("Dietary Regimes", formData.dietTypes)}
          {renderField("Other Dietary Regime", formData.otherDiet)}
        </div>,
      )}

      {renderSection(
        "Rooms Division",
        <div className="space-y-4">
          {renderField(
            "Room Accommodations",
            formData.roomAccommodationsDetails,
          )}
          {renderField("Sleep Preferences", formData.sleepPreferencesDetails)}
          {renderField("Medication Storage", formData.medicationStorageDetails)}
        </div>,
      )}

      {renderSection(
        "SPA and Health Concerns",
        <div className="space-y-4">
          {renderField("Scent Sensitivity", formData.scentSensitivityDetails)}
          {renderField("Skin Conditions", formData.skinConditionsDetails)}
          {renderField("Pregnancy", formData.pregnancyDetails)}
          {renderField("Cardiac Issues", formData.cardiacIssuesDetails)}
          {renderField(
            "Emergency Conditions",
            formData.emergencyConditionsDetails,
          )}
          {renderField(
            "Vision/Hearing Impairments",
            formData.visionHearingImpairmentsDetails,
          )}
          {renderField("Disabilities", formData.disabilitiesDetails)}
        </div>,
      )}

      {renderSection(
        "Emergency Contact Details",
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              Primary Emergency Contact
            </h3>
            {renderField("Phone", formData.emergencyContact1.phone)}
            {renderField("Email", formData.emergencyContact1.email)}
            {renderField("Address", formData.emergencyContact1.address)}
          </div>

          {formData.emergencyContact2 && (
            <div>
              <Separator className="my-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                Secondary Emergency Contact
              </h3>
              {renderField("Phone", formData.emergencyContact2.phone)}
              {renderField("Email", formData.emergencyContact2.email)}
              {renderField("Address", formData.emergencyContact2.address)}
            </div>
          )}
        </div>,
      )}

      {renderSection(
        "Other Concerns",
        <div>
          {renderField(
            "Additional Health Concerns or Preferences",
            formData.otherConcerns,
          )}
        </div>,
      )}
    </div>
  );
}
