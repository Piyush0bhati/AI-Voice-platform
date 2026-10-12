const workflowCards = [
  { step: "01", title: "Configure", text: "Set the agent instructions, voice, language, and conversation boundaries." },
  { step: "02", title: "Connect", text: "Add the phone route, knowledge sources, APIs, and business tools the workflow needs." },
  { step: "03", title: "Test", text: "Run realistic calls and review each turn before making the agent available." },
  { step: "04", title: "Improve", text: "Use call outcomes and transcripts to refine prompts, tools, and handoff rules." },
] as const;

export function EnterpriseEfficiency() {
  return (
    <section className="vozon-operations-section">
      <div className="container">
        <div className="vozon-operations-heading">
          <div>
            <span>Voice operations</span>
            <h2 className="ss-text-reveal-blur">A practical path from agent setup to live calls.</h2>
          </div>
          <p>Build the workflow in stages, keep the connected systems visible, and bring a person in whenever the conversation requires judgment.</p>
        </div>
        <div className="vozon-operations-grid">
          {workflowCards.map((card) => (
            <article key={card.step}>
              <header><span>{card.step}</span><i aria-hidden="true" /></header>
              <div className="vozon-operation-ui" aria-hidden="true">
                <b />
                <div><i /><i /><i /></div>
                <strong />
              </div>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
