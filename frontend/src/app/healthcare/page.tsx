import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "AI Phone Agents for Healthcare | Vozon",
  description: "AI phone agents for healthcare intake, appointment booking, patient support, reminders, and careful human escalation.",
  alternates: { canonical: "/healthcare" },
};

export default function HealthcareDirectPage() {
  redirect("/business/industries/healthcare");
}
