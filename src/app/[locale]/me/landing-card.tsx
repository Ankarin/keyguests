import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GuestInfoSummary() {
  const renderField = (label: string, value: string) => {
    return (
      <div className="mb-4">
        <span className="font-medium text-gray-700">{label}:</span>{" "}
        <span className="text-gray-900 font-semibold">{value}</span>
      </div>
    );
  };

  const formatDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const calculateAge = (birthdate: string) => {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const birthdate = "1999-03-14";

  const qrUrl = "https://www.keyguests.com/en/info/2w73IzcAVfhc";
  return (
    <div className="w-full p-2 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-primary">
          Guest Health Information Summary
        </h1>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            Personal Information
          </h2>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField("First Name", "John")}
              {renderField("Last Name", "Doe")}
              {renderField(
                "Date of Birth",
                `${formatDate(birthdate)} (Age: ${calculateAge(birthdate)})`,
              )}
              {renderField("Gender", "male")}
              {renderField("Email", "johndoe@gmail.com")}
              {renderField("Phone", "0850850855")}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link target="_blank" href={qrUrl}>
            <Button className="w-52">Se Full Example</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
