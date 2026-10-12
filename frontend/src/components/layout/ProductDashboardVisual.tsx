import type { FeatureScreenKey } from "@/components/layout/ProductFeatureScreen";

const dashboardCaptureByScreen: Record<FeatureScreenKey, { src: string; status: string; detail: string }> = {
  agents: {
    src: "/images/product-dashboard/agent-builder.png",
    status: "Agent online",
    detail: "Realtime pipeline operational",
  },
  analytics: {
    src: "/images/product-dashboard/analytics.png",
    status: "Analytics view ready",
    detail: "Illustrative workspace data",
  },
  booking: {
    src: "/images/product-dashboard/appointments.png",
    status: "Booking view ready",
    detail: "Illustrative workspace data",
  },
  calls: {
    src: "/images/product-dashboard/calls.png",
    status: "Call completed",
    detail: "Transcript and outcome ready",
  },
  campaigns: {
    src: "/images/product-dashboard/campaigns.png",
    status: "Campaign view ready",
    detail: "Illustrative workspace data",
  },
  developers: {
    src: "/images/product-dashboard/developers.png",
    status: "Production API online",
    detail: "Request event received",
  },
  knowledge: {
    src: "/images/product-dashboard/knowledge.png",
    status: "Knowledge view ready",
    detail: "Illustrative workspace data",
  },
  languages: {
    src: "/images/product-dashboard/agent-behavior.png",
    status: "Language routing ready",
    detail: "English, Hindi, Bengali, Assamese",
  },
  speech: {
    src: "/images/product-dashboard/agent-builder.png",
    status: "Realtime speech active",
    detail: "Gemini Live pipeline connected",
  },
  voices: {
    src: "/images/product-dashboard/agent-config.png",
    status: "Voice profile ready",
    detail: "Speed and pitch controls applied",
  },
};

export function ProductDashboardVisual({
  screen,
  label,
  compact = false,
}: {
  screen: FeatureScreenKey;
  label: string;
  compact?: boolean;
}) {
  const capture = dashboardCaptureByScreen[screen];

  return (
    <figure className={`pdv-dashboard ${compact ? "is-compact" : ""}`}>
      <div className="pdv-browser-bar" aria-hidden="true">
        <span /><span /><span />
        <b>Vozon dashboard · {label}</b>
      </div>
      <div className="pdv-image-wrap">
        <img src={capture.src} alt={`Real Vozon dashboard showing ${label}`} />
        <span className="pdv-scan-line" aria-hidden="true" />
        <span className="pdv-live-card">
          <i />
          <span><b>{capture.status}</b><small>{capture.detail}</small></span>
        </span>
        <span className="pdv-cursor" aria-hidden="true">➤</span>
      </div>
      <figcaption><i />Vozon dashboard interface · illustrative workspace data</figcaption>
    </figure>
  );
}
