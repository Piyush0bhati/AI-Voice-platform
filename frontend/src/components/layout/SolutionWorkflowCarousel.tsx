"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type WorkflowSlide = {
  title: string;
  body: string;
};

const slideFacts = [
  [["24/7", "inbound and outbound coverage"], ["Live", "actions during conversations"], ["Warm", "handoffs with full context"]],
  [["Clear", "approved conversation paths"], ["Secure", "controlled workflow access"], ["Fast", "real-time intent routing"]],
  [["Ready", "structured caller details"], ["Connected", "business tools and calendars"], ["Human", "review whenever it matters"]],
] as const;

const slidePromises = ["24/7 call handling", "Every request gets a clear path", "From conversation to completed action"] as const;

function conciseTitle(title: string) {
  const firstClause = title.split(/\b(?:and|with|before|while)\b/i)[0].trim();
  const words = firstClause.split(/\s+/).slice(0, 5);
  while (["a", "an", "the", "to", "for", "into", "through"].includes(words.at(-1)?.toLowerCase() ?? "")) words.pop();
  return words.join(" ") || title;
}

export function SolutionWorkflowCarousel({
  items,
  slug,
  kindLabel = "Solution",
}: {
  items: readonly WorkflowSlide[];
  slug: string;
  kindLabel?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % items.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [items.length, paused]);

  const move = (direction: number) => {
    setActive((current) => (current + direction + items.length) % items.length);
  };

  return (
    <div
      className="solution-workflow-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="solution-carousel-controls">
        <button aria-label="Previous workflow" onClick={() => move(-1)} type="button">‹</button>
        <div aria-label={`Workflow ${active + 1} of ${items.length}`}>
          {items.map((item, index) => (
            <button
              aria-label={`Show ${item.title}`}
              className={index === active ? "is-active" : ""}
              key={item.title}
              onClick={() => setActive(index)}
              type="button"
            />
          ))}
        </div>
        <button aria-label="Next workflow" onClick={() => move(1)} type="button">›</button>
      </div>

      <div className="solution-carousel-window">
        <div className="solution-carousel-track" style={{ transform: `translate3d(-${active * 100}%, 0, 0)` }}>
          {items.map((item, index) => {
            const title = conciseTitle(item.title);
            const words = title.split(" ");
            const splitAt = Math.ceil(words.length / 2);
            return <article className={`solution-carousel-card is-tone-${index % 4}`} key={`${item.title}-${index}`}>
              <div className="solution-carousel-badge">{kindLabel} · {slug.replaceAll("-", " ")}</div>
              <div className="solution-carousel-editorial">
                <h2>
                  <span>{words.slice(0, splitAt).join(" ")}</span>
                  <em>{words.slice(splitAt).join(" ")}</em>
                </h2>
                <div className="solution-carousel-detail">
                  <p>{item.body}</p>
                  <div>
                    <Link href="/contact">Contact Sales</Link>
                    <Link href="#workflows">Explore Workflow</Link>
                  </div>
                </div>
              </div>
              <strong className="solution-carousel-promise">{slidePromises[index % slidePromises.length]}</strong>
              <div className="solution-carousel-facts">
                {slideFacts[index % slideFacts.length].map(([value, label]) => (
                  <span key={value}><b>{value}</b><small>{label}</small></span>
                ))}
              </div>
            </article>;
          })}
        </div>
      </div>
    </div>
  );
}
