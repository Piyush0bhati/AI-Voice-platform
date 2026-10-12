type SoftwareMode =
  | "calendar"
  | "intake"
  | "handoff"
  | "dispatch"
  | "timeline"
  | "routing"
  | "verification"
  | "claim"
  | "knowledge"
  | "campaign"
  | "order"
  | "language"
  | "lead"
  | "queue";

const modesBySolution: Record<string, readonly SoftwareMode[]> = {
  healthcare: ["calendar", "intake", "handoff", "timeline"],
  logistics: ["dispatch", "timeline", "routing", "campaign"],
  "financial-services": ["verification", "calendar", "handoff", "timeline"],
  insurance: ["claim", "knowledge", "routing", "timeline"],
  "home-services": ["dispatch", "calendar", "routing", "timeline"],
  "retail-consumer": ["order", "knowledge", "routing", "campaign"],
  "travel-hospitality": ["calendar", "language", "handoff", "timeline"],
  "debt-collection": ["campaign", "verification", "routing", "timeline"],
  "lead-qualification": ["lead", "calendar", "campaign", "routing"],
  "customer-support": ["knowledge", "timeline", "handoff", "routing"],
  receptionists: ["queue", "calendar", "handoff", "routing"],
  "dispatch-service": ["dispatch", "routing", "timeline", "queue"],
};

const labels: Record<SoftwareMode, { kicker: string; title: string; status: string }> = {
  calendar: { kicker: "Live availability", title: "Scheduling workspace", status: "Slot held" },
  intake: { kicker: "Structured capture", title: "Intake workflow", status: "4 of 5 complete" },
  handoff: { kicker: "Context transfer", title: "Human handoff", status: "Team ready" },
  dispatch: { kicker: "Live operations", title: "Dispatch control", status: "Route updated" },
  timeline: { kicker: "Operational state", title: "Status timeline", status: "In progress" },
  routing: { kicker: "Decision engine", title: "Routing rules", status: "Path selected" },
  verification: { kicker: "Secure workflow", title: "Caller verification", status: "Verified" },
  claim: { kicker: "Structured intake", title: "Claim capture", status: "Ready for review" },
  knowledge: { kicker: "Approved answers", title: "Knowledge retrieval", status: "3 sources matched" },
  campaign: { kicker: "Outbound operations", title: "Follow-up campaign", status: "Running" },
  order: { kicker: "Customer operations", title: "Order resolution", status: "Action created" },
  language: { kicker: "Language routing", title: "Multilingual conversation", status: "Language detected" },
  lead: { kicker: "Revenue workflow", title: "Lead qualification", status: "Qualified" },
  queue: { kicker: "Inbound operations", title: "Call queue", status: "Answering now" },
};

function CalendarView() {
  return <div className="ssv-calendar"><header><button type="button">‹</button><b>October 14–18</b><button type="button">›</button></header><div className="ssv-days">{[["MON","14"],["TUE","15"],["WED","16"],["THU","17"],["FRI","18"]].map(([day,date], index) => <span className={index === 2 ? "is-active" : ""} key={day}><small>{day}</small><b>{date}</b></span>)}</div><div className="ssv-slots"><span>09:30</span><span className="is-selected">14:30</span><span>16:15</span></div><footer><i>✓</i><span><b>Wednesday at 2:30 PM</b><small>Confirmation and reminder ready</small></span><button type="button">Confirm</button></footer></div>;
}

function IntakeView() {
  return <div className="ssv-form"><div className="ssv-progress"><span><i style={{ width: "82%" }} /></span><b>82%</b></div>{[["Patient name","Priya Sharma"],["Callback number","Confirmed"],["Reason for call","Follow-up visit"],["Preferred location","Central clinic"]].map(([label,value], index) => <label key={label}><span>{label}</span><b>{value}</b><i className={index < 3 ? "is-done" : ""}>{index < 3 ? "✓" : ""}</i></label>)}<footer><span><i />Required fields validated</span><button type="button">Continue</button></footer></div>;
}

function HandoffView() {
  return <div className="ssv-handoff"><div className="ssv-callers"><span><i>AI</i><b>Vozon agent</b><small>Caller context ready</small></span><em>→</em><span><i>HM</i><b>Human team</b><small>Available now</small></span></div><section><small>Handoff summary</small><p>Intent, collected details, urgency, actions completed, and the caller&apos;s requested next step.</p><div><span>Warm transfer</span><span>Summary attached</span></div></section><footer><button type="button">Transfer with context</button><span><i />Connecting</span></footer></div>;
}

function DispatchView() {
  return <div className="ssv-dispatch"><div className="ssv-map"><span className="pin pin-a">A</span><span className="pin pin-b">B</span><span className="pin pin-c">C</span><svg aria-hidden="true" viewBox="0 0 500 260"><path d="M45 210 C125 165, 145 65, 245 110 S355 225, 460 60" /><path className="route-live" d="M45 210 C125 165, 145 65, 245 110 S355 225, 460 60" /></svg><aside><b>ETA 18 min</b><small>Route recalculated</small></aside></div><footer><span><i />Unit 24</span><span>Priority job</span><button type="button">Notify team</button></footer></div>;
}

function TimelineView() {
  return <div className="ssv-timeline"><div className="ssv-shipment"><span><small>REFERENCE</small><b>VX-20841</b></span><strong>Live</strong></div>{[["Request received","09:31","done"],["Details verified","09:34","done"],["Action in progress","09:36","active"],["Confirmation","Pending",""]].map(([name,time,state]) => <div className={`ssv-event is-${state}`} key={name}><i>{state === "done" ? "✓" : ""}</i><span><b>{name}</b><small>{time}</small></span></div>)}</div>;
}

function RoutingView() {
  return <div className="ssv-routing"><div className="ssv-route-source"><i>☎</i><span><small>Incoming intent</small><b>Urgent request</b></span></div><div className="ssv-route-line"><i /><i /><i /></div><div className="ssv-route-options"><span><i>01</i><b>Automated action</b><small>Eligible</small></span><span className="is-active"><i>02</i><b>Priority team</b><small>Selected</small></span><span><i>03</i><b>Callback queue</b><small>Available</small></span></div><footer>Rules evaluated in 42 ms <b>Path 02 selected</b></footer></div>;
}

function VerificationView() {
  return <div className="ssv-verify"><div className="ssv-shield">✓<span /></div><section><small>Verification sequence</small>{[["Phone ownership","Complete"],["Security response","Complete"],["Account match","Confirmed"]].map(([name,status]) => <p key={name}><i>✓</i><b>{name}</b><span>{status}</span></p>)}</section><footer><b>Identity verified</b><span>Approved workflow unlocked</span></footer></div>;
}

function ClaimView() {
  return <div className="ssv-claim"><div className="ssv-claim-head"><span><small>Claim intake</small><b>New incident</b></span><strong>76%</strong></div><div className="ssv-claim-grid"><label><small>Incident type</small><b>Vehicle damage</b></label><label><small>Date</small><b>October 08</b></label><label><small>Location</small><b>Verified</b></label><label><small>Attachments</small><b>3 received</b></label></div><div className="ssv-claim-note"><i>!</i><span><b>Specialist review required</b><small>Coverage decision remains with authorized staff</small></span></div><button type="button">Submit structured intake</button></div>;
}

function KnowledgeView() {
  return <div className="ssv-knowledge"><div className="ssv-search">Search approved knowledge <b>⌘ K</b></div><div className="ssv-knowledge-results">{[["Policy handbook","94% match"],["Service guide","88% match"],["Escalation rules","82% match"]].map(([name,match], index) => <article className={index === 0 ? "is-active" : ""} key={name}><i>0{index + 1}</i><span><b>{name}</b><small>{match}</small></span><em>→</em></article>)}</div><footer><i />Answer grounded in approved sources</footer></div>;
}

function CampaignView() {
  return <div className="ssv-campaign"><header><span><small>Active campaign</small><b>Customer follow-up</b></span><button type="button">Pause</button></header><div className="ssv-campaign-metrics"><span><small>Processed</small><b>842</b></span><span><small>Completed</small><b>704</b></span><span><small>Needs review</small><b>38</b></span></div><div className="ssv-campaign-bar"><i style={{ width: "72%" }} /></div><div className="ssv-campaign-stream"><span><i />Call completed <b>Just now</b></span><span><i />Callback scheduled <b>1 min</b></span><span><i />Human review queued <b>3 min</b></span></div></div>;
}

function OrderView() {
  return <div className="ssv-order"><header><span><small>Order</small><b>#VZ-10482</b></span><strong>Exception detected</strong></header><div className="ssv-order-track"><i className="done">✓</i><span /><i className="done">✓</i><span /><i className="active">!</i><span /><i /></div><div className="ssv-order-labels"><span>Confirmed</span><span>Shipped</span><span>Delivery</span><span>Resolved</span></div><section><i>!</i><span><b>Delivery confirmation missing</b><small>Carrier status retrieved and support workflow opened</small></span></section><button type="button">Create resolution</button></div>;
}

function LanguageView() {
  return <div className="ssv-language"><aside>{[["EN","English"],["HI","हिन्दी"],["BN","বাংলা"],["AS","অসমীয়া"]].map(([code,name], index) => <span className={index === 1 ? "is-active" : ""} key={code}><i>{code}</i><b>{name}</b></span>)}</aside><section><header><span><small>Detected</small><b>Hindi</b></span><i />Live</header><p>मैं अपनी बुकिंग का समय बदलना चाहती हूँ।</p><p>ज़रूर, मैं उपलब्ध समय देख रही हूँ।</p><footer>Response language switched automatically</footer></section></div>;
}

function LeadView() {
  return <div className="ssv-lead"><div className="ssv-score"><span>86</span><b>Qualified</b><small>High purchase intent</small></div><section>{[["Team size","25–50"],["Timeline","This quarter"],["Use case","Customer support"],["Next step","Demo booked"]].map(([key,value]) => <p key={key}><span>{key}</span><b>{value}</b></p>)}</section><footer><i />CRM fields ready <button type="button">Route to sales</button></footer></div>;
}

function QueueView() {
  return <div className="ssv-queue"><header><span><small>Inbound queue</small><b>4 active calls</b></span><i />Live</header>{[["New consultation","00:42","AI handling"],["Service question","01:18","Resolving"],["Existing customer","02:06","Transfer ready"],["After-hours request","00:24","Collecting details"]].map(([name,time,status], index) => <article className={index === 2 ? "is-active" : ""} key={name}><i>{index + 1}</i><span><b>{name}</b><small>{status}</small></span><time>{time}</time></article>)}</div>;
}

function SoftwareBody({ mode }: { mode: SoftwareMode }) {
  if (mode === "calendar") return <CalendarView />;
  if (mode === "intake") return <IntakeView />;
  if (mode === "handoff") return <HandoffView />;
  if (mode === "dispatch") return <DispatchView />;
  if (mode === "timeline") return <TimelineView />;
  if (mode === "routing") return <RoutingView />;
  if (mode === "verification") return <VerificationView />;
  if (mode === "claim") return <ClaimView />;
  if (mode === "knowledge") return <KnowledgeView />;
  if (mode === "campaign") return <CampaignView />;
  if (mode === "order") return <OrderView />;
  if (mode === "language") return <LanguageView />;
  if (mode === "lead") return <LeadView />;
  return <QueueView />;
}

export function SolutionSoftwareVisual({ slug, stage, label, compact = false }: { slug: string; stage: number; label: string; compact?: boolean }) {
  const modes = modesBySolution[slug] ?? modesBySolution.receptionists;
  const mode = modes[stage % modes.length];
  const copy = labels[mode];
  return (
    <div className={`ssv-shell ssv-v2 is-${mode}${compact ? " is-compact" : ""}`}>
      <div className="ssv-appbar">
        <span className="ssv-app-brand"><i>V</i><b>Vozon</b><small>Voice operations</small></span>
        <span className="ssv-app-status"><i />Illustrative workflow</span>
        <button type="button" aria-label="More options">•••</button>
      </div>
      <div className="ssv-workspace">
        <aside className="ssv-sidebar" aria-hidden="true">
          <i className="is-active">⌁</i><i>◫</i><i>◇</i><i>↗</i><i>⚙</i>
          <span />
          <i>?</i>
        </aside>
        <section className="ssv-main">
          <header className="ssv-context">
            <span><small>{copy.kicker}</small><strong>{label}</strong></span>
            <b><i />{copy.status}</b>
          </header>
          <div className="ssv-body"><SoftwareBody mode={mode} /></div>
        </section>
      </div>
      <i className="ssv-cursor" aria-hidden="true" />
    </div>
  );
}
