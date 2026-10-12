import type { CSSProperties } from "react";

export type FeatureScreenKey = "agents" | "analytics" | "booking" | "calls" | "campaigns" | "developers" | "knowledge" | "languages" | "speech" | "voices";

export const featureScreenByProduct: Record<string, FeatureScreenKey> = {
  "voice-agents": "agents",
  "voice-cloning": "voices",
  "realtime-tts": "speech",
  "multilingual-speech": "languages",
  "api-access": "developers",
  "team-workflows": "campaigns",
  "speech-analytics": "analytics",
  "sentiment-detection": "analytics",
  "conversation-insights": "calls",
  "quality-controls": "knowledge",
  "book-appointments": "booking",
};

const screenLabels: Record<FeatureScreenKey, { eyebrow: string; title: string; metric: string; action: string }> = {
  agents: { eyebrow: "Agent workspace", title: "Configured voice agents", metric: "Sample view", action: "Agent updated" },
  analytics: { eyebrow: "Performance", title: "Conversation analytics", metric: "Sample view", action: "Report refreshed" },
  booking: { eyebrow: "Scheduling", title: "Live appointment calendar", metric: "Sample view", action: "Slot confirmed" },
  calls: { eyebrow: "Call activity", title: "Conversation records", metric: "Sample view", action: "Call reviewed" },
  campaigns: { eyebrow: "Deployment", title: "Campaign progress", metric: "Sample view", action: "Campaign running" },
  developers: { eyebrow: "Developer tools", title: "API endpoints and events", metric: "Sample view", action: "Request completed" },
  knowledge: { eyebrow: "Knowledge", title: "Approved information sources", metric: "Sample view", action: "Source synced" },
  languages: { eyebrow: "Language studio", title: "Localized voice workflows", metric: "Sample view", action: "Language approved" },
  speech: { eyebrow: "Speech studio", title: "Realtime speech generation", metric: "Sample view", action: "Audio generated" },
  voices: { eyebrow: "Voice library", title: "Approved brand voices", metric: "Sample view", action: "Voice approved" },
};

function Status({ children, tone = "live" }: { children: string; tone?: "live" | "paused" | "scheduled" }) {
  return <span className={`pf-ui-status is-${tone}`}><i />{children}</span>;
}

function AgentsPanel() {
  return <div className="pf-ui-table pf-ui-agents"><div className="pf-ui-search">Search by agent, team, or phone number</div><div className="pf-ui-columns"><span>Agent</span><span>Phone route</span><span>Status</span></div>{[["After-hours Reception", "Support", "+91 98765 41023", "Paused"], ["Appointment Desk", "Operations", "+91 98765 41021", "Live"], ["Customer Support", "Support", "+91 98765 41020", "Live"], ["Lead Qualification", "Sales", "+91 98765 41022", "Live"]].map(([name, team, phone, status]) => <div className="pf-ui-row" key={name}><span><b>{name}</b><small>{team}</small></span><span>{phone}</span><Status tone={status === "Paused" ? "paused" : "live"}>{status}</Status></div>)}</div>;
}

function CampaignsPanel() {
  return <div className="pf-ui-table pf-ui-campaigns"><div className="pf-ui-columns"><span>Campaign</span><span>Progress</span><span>Results</span><span>Status</span></div>{[["Appointment reminders", "67%", "396 completed", "Running"], ["Patient follow-up", "0%", "284 queued", "Scheduled"], ["Customer feedback", "100%", "472 completed", "Completed"]].map(([name, progress, result, status]) => <div className="pf-ui-row" key={name}><span><b>{name}</b><small>Voice operations</small></span><span><b>{progress}</b><small><i className="pf-ui-progress" style={{ "--progress": progress } as CSSProperties} /></small></span><span><b>{result}</b><small>Verified outcome</small></span><Status tone={status === "Scheduled" ? "scheduled" : "live"}>{status}</Status></div>)}</div>;
}

function CallsPanel() {
  return <div className="pf-ui-table pf-ui-calls"><div className="pf-ui-columns"><span>Agent</span><span>Direction</span><span>Duration</span><span>Outcome</span></div>{[["Appointment Desk", "Inbound", "03:42", "Completed"], ["Lead Qualification", "Outbound", "02:18", "Qualified"], ["Customer Support", "Inbound", "05:06", "Transferred"], ["After-hours Reception", "Inbound", "01:54", "Callback"]].map(([agent, direction, duration, outcome]) => <div className="pf-ui-row" key={`${agent}-${outcome}`}><span><b>{agent}</b><small>Today · just now</small></span><span>{direction}</span><span>{duration}</span><Status tone={outcome === "Callback" ? "scheduled" : "live"}>{outcome}</Status></div>)}</div>;
}

function DeveloperPanel() {
  return <div className="pf-ui-developer"><div className="pf-ui-flow">{["Authenticate", "Create call", "Receive event", "Fetch result"].map((item, index) => <span key={item}><i>0{index + 1}</i><b>{item}</b></span>)}</div><div className="pf-ui-endpoints"><header><b>Available endpoints</b><Status>7 routes</Status></header>{[["GET", "/api/v1/agents"], ["POST", "/api/v1/calls"], ["GET", "/api/v1/call-logs"], ["GET", "/api/v1/calls/{callId}"], ["POST", "/api/v1/webhooks"]].map(([method, endpoint]) => <p key={endpoint}><b>{method}</b><code>{endpoint}</code><span>↗</span></p>)}</div></div>;
}

function KnowledgePanel() {
  return <div className="pf-ui-table pf-ui-knowledge"><div className="pf-ui-summary"><span><b>4</b> Sources</span><span><b>126</b> Documents</span><span><b>100%</b> Synced</span></div><div className="pf-ui-columns"><span>Knowledge source</span><span>Content</span><span>Updated</span><span>Status</span></div>{[["Service handbook", "42 documents", "Today"], ["Appointment policies", "18 documents", "Today"], ["Product FAQs", "51 documents", "Yesterday"], ["Escalation guide", "15 documents", "Yesterday"]].map(([source, content, updated]) => <div className="pf-ui-row" key={source}><span><b>{source}</b><small>Approved workspace source</small></span><span>{content}</span><span>{updated}</span><Status>Synced</Status></div>)}</div>;
}

function AnalyticsPanel() {
  const points = [44, 56, 68, 81, 65, 72, 88, 61, 76, 91, 70, 84];
  return <div className="pf-ui-analytics"><div className="pf-ui-metrics">{[["Total calls", "1,284"], ["Completion", "91%"], ["Talk time", "79h 33m"], ["Active now", "6"]].map(([label, value]) => <span key={label}><small>{label}</small><b>{value}</b></span>)}</div><div className="pf-ui-chart"><header><span><b>Conversation momentum</b><small>Completed conversations over 30 days</small></span><Status>Strong signal</Status></header><div>{points.map((point, index) => <i key={index} style={{ height: `${point}%` }} />)}</div><footer><span><i />Completed</span><span>91% completion across this period</span></footer></div></div>;
}

function BookingPanel() {
  const days = [
    ["Mon", "14", "9:30", "2:00"],
    ["Tue", "15", "10:15", "4:30"],
    ["Wed", "16", "11:00", "2:30"],
    ["Thu", "17", "9:45", "3:15"],
    ["Fri", "18", "10:30", "4:00"],
  ];
  return <div className="pf-ui-booking"><div className="pf-ui-booking-bar"><span><b>October 14–18</b><small>Asia/Kolkata · Clinic calendar</small></span><button type="button">Today</button></div><div className="pf-ui-calendar">{days.map(([day, date, first, second], index) => <article className={index === 2 ? "is-selected" : ""} key={day}><header><small>{day}</small><b>{date}</b></header><span>{first}</span><span>{second}</span></article>)}</div><div className="pf-ui-booking-result"><i>✓</i><span><b>Wednesday, 2:30 PM</b><small>Appointment Desk · confirmation ready</small></span><strong>Confirm slot</strong></div></div>;
}

function VoicesPanel() {
  return <div className="pf-ui-voices"><div className="pf-ui-voice-main"><span className="pf-ui-avatar">AN</span><div><small>Selected voice</small><h4>Anuradha</h4><p>Warm, clear, multilingual delivery</p></div><Status>Approved</Status></div><div className="pf-ui-waveform" aria-hidden="true">{Array.from({ length: 31 }, (_, index) => <i key={index} />)}</div><div className="pf-ui-voice-list">{[["Support", "Natural"], ["Campaign", "Energetic"], ["Training", "Calm"]].map(([name, style], index) => <span className={index === 0 ? "is-active" : ""} key={name}><i>{name.slice(0, 1)}</i><b>{name}</b><small>{style}</small><em>▶</em></span>)}</div></div>;
}

function SpeechPanel() {
  return <div className="pf-ui-speech"><div className="pf-ui-speech-editor"><small>Text input</small><p>Your appointment is confirmed for Wednesday at two thirty in the afternoon.</p><footer><span>English · Anuradha</span><b>Generate speech</b></footer></div><aside><small>Voice settings</small>{[["Speed", "1.0x"], ["Stability", "72%"], ["Expression", "Warm"]].map(([name, value]) => <p key={name}><span>{name}</span><b>{value}</b></p>)}</aside><div className="pf-ui-player"><i>▶</i><span><b /><em /></span><small>00:08</small></div></div>;
}

function LanguagesPanel() {
  const languages = [["অসমীয়া", "AS"], ["हिन्दी", "HI"], ["বাংলা", "BN"], ["English", "EN"]];
  return <div className="pf-ui-languages"><aside>{languages.map(([name, code], index) => <span className={index === 1 ? "is-active" : ""} key={code}><i>{code}</i><b>{name}</b><small>{index === 1 ? "Active" : "Ready"}</small></span>)}</aside><section><header><span><small>Detected language</small><b>Hindi · हिन्दी</b></span><Status>Live</Status></header><div className="pf-ui-language-chat"><p>क्या मैं अपनी अपॉइंटमेंट बदल सकती हूँ?</p><p>हाँ, उपलब्ध समय देख रही हूँ।</p></div><footer><i />Response language switched automatically</footer></section></div>;
}

function FeatureBody({ screen }: { screen: FeatureScreenKey }) {
  if (screen === "analytics") return <AnalyticsPanel />;
  if (screen === "booking") return <BookingPanel />;
  if (screen === "calls") return <CallsPanel />;
  if (screen === "campaigns") return <CampaignsPanel />;
  if (screen === "developers") return <DeveloperPanel />;
  if (screen === "knowledge") return <KnowledgePanel />;
  if (screen === "languages") return <LanguagesPanel />;
  if (screen === "speech") return <SpeechPanel />;
  if (screen === "voices") return <VoicesPanel />;
  return <AgentsPanel />;
}

export function ProductFeatureScreen({ screen, compact = false, label }: { screen: FeatureScreenKey; compact?: boolean; label?: string }) {
  const copy = screenLabels[screen];
  return <div className={`pf-focused-screen is-${screen}${compact ? " is-compact" : ""}`}><header><span><i />{label ?? copy.eyebrow}</span><b>{copy.metric}</b></header><div className="pf-focused-viewport"><FeatureBody screen={screen} /></div><footer><strong>{copy.title}</strong><span>Illustrative Vozon interface</span></footer><i className="pf-demo-cursor" aria-hidden="true" /><span className="pf-demo-toast"><i>✓</i>{copy.action}</span></div>;
}
