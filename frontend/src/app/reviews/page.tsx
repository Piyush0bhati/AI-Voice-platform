import type { Metadata } from "next";

import { RubozInnerPage } from "@/components/layout/RubozInnerPage";
import { customerReviews } from "@/config/customerReviews";

export const metadata: Metadata = {
  title: "Customer Reviews | Vozon",
  description: "Read feedback shared with Vozon.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <RubozInnerPage
      id="reviews-page"
      eyebrow="Customer feedback"
      title="What people shared"
      accent="with Vozon."
      summary="Read the feedback shared with Vozon about enquiries, appointments, and everyday customer conversations."
      highlights={["Healthcare", "Professional services", "Customer enquiries"]}
      sectionEyebrow="In their words"
      sectionTitle="Feedback from different customer workflows."
      sectionSummary="Each review is shown without generated portraits, invented job titles, or decorative company claims."
      cards={customerReviews.map((review) => ({
        eyebrow: "Customer feedback",
        title: review.name,
        body: review.quote,
        detail: "",
      }))}
      workflow={[
        { title: "Understand the caller", body: "Give each person a clear first response and identify why they called." },
        { title: "Capture useful context", body: "Collect the details a team needs without making the conversation feel like a form." },
        { title: "Complete or route the task", body: "Answer, book, update, or bring in a person based on the workflow." },
        { title: "Improve from real calls", body: "Review outcomes and adjust the experience around what customers actually need." },
      ]}
      primaryAction={{ href: "/services/voice-agents", label: "Explore voice agents" }}
      secondaryAction={{ href: "/contact", label: "Discuss your workflow" }}
    />
  );
}
