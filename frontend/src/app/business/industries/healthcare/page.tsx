import { generateIndustryMetadata, IndustryPage } from "../IndustryPage";

export const metadata = generateIndustryMetadata("healthcare");

export default function HealthcarePage() {
  return <IndustryPage slug="healthcare" />;
}
