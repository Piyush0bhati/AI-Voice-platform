"use client";

import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

type Cleanup = () => void;

const hiddenTiles = [
  "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
  "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
  "polygon(65.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
  "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
  "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
  "polygon(65.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
  "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
  "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
  "polygon(65.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
];

const visibleTiles = [
  "polygon(0% 0%, 34.33% 0%, 34.33% 34.33%, 0% 34.33%)",
  "polygon(32.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 34.33%)",
  "polygon(65.66% 0%, 100% 0%, 100% 33.33%, 65.66% 34.33%)",
  "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
  "polygon(30.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
  "polygon(65.66% 33.33%, 100% 32.33%, 100% 66.66%, 65.66% 66.66%)",
  "polygon(0% 65.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
  "polygon(30.33% 66.66%, 66.66% 65.66%, 66.66% 100%, 33.33% 100%)",
  "polygon(65.66% 66.66%, 100% 65.66%, 100% 100%, 65.66% 100%)",
];

export function LandingAnimationEngine() {
  useLayoutEffect(() => {
    const root = document.querySelector<HTMLElement>(".arsly-theme");
    if (!root) return;

    let destroyed = false;
    let cleanup: Cleanup | undefined;

    const initialize = () => {
      if (destroyed) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) {
        root.classList.add("landing-reduced-motion");
        cleanup = () => root.classList.remove("landing-reduced-motion");
        return;
      }

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
    root.classList.add("landing-motion-ready");

    const cleanups: Cleanup[] = [];
    const createdMasks: HTMLElement[] = [];
    const splits: SplitText[] = [];

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1,
      effects: true,
      smoothTouch: 0.1,
    });

    const context = gsap.context(() => {
      root.querySelectorAll<HTMLElement>(".ss-text-reveal-blur").forEach((heading) => {
        if (heading.closest(".hero-section")) {
          gsap.set(heading, { autoAlpha: 1, clearProps: "filter,transform" });
          return;
        }
        const split = new SplitText(heading, { type: "words,chars", mask: "chars" });
        const isInnerPageHeading = Boolean(heading.closest(".marketing-site"));
        splits.push(split);
        gsap.set(heading, { autoAlpha: 1 });
        gsap.set(split.chars, {
          yPercent: 50,
          scaleY: 0,
          transformOrigin: "center bottom",
          autoAlpha: 0,
          filter: "blur(6px)",
        });
        gsap.to(split.chars, {
          scrollTrigger: { trigger: heading, start: "top 85%", once: true },
          yPercent: 0,
          scaleY: 1,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: isInnerPageHeading ? 0.42 : 0.5,
          stagger: isInnerPageHeading ? 0.012 : 0.03,
          delay: isInnerPageHeading ? 0.08 : 0.2,
          ease: "power3.out",
        });
      });

      root.querySelectorAll<HTMLElement>("[data-ss-reveal]").forEach((element) => {
        if (element.closest(".pinned-container")) return;
        gsap.from(element, {
          x: Number(element.dataset.x || 0),
          y: Number(element.dataset.y || 0),
          autoAlpha: 0,
          filter: "blur(10px)",
          duration: Number(element.dataset.duration || 0.6),
          delay: Number(element.dataset.delay || 0),
          ease: element.dataset.ease || "power2.out",
          scrollTrigger: { trigger: element, start: "top 90%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>("[data-ss-reveal-group]").forEach((group) => {
        if (group.closest(".pinned-container")) return;
        Array.from(group.children).forEach((child, index) => {
          gsap.from(child, {
            x: Number(group.dataset.x || 0),
            y: Number(group.dataset.y || 0),
            autoAlpha: 0,
            filter: "blur(10px)",
            duration: Number(group.dataset.duration || 0.6),
            delay: Number(group.dataset.delay || 0) + index * Number(group.dataset.stagger || 0.1),
            ease: group.dataset.ease || "power2.out",
            scrollTrigger: { trigger: child, start: "top 90%", once: true },
          });
        });
      });

      root.querySelectorAll<HTMLElement>(".ss-parallax-area").forEach((area) => {
        if (!window.matchMedia("(hover: hover)").matches) return;
        const items = Array.from(area.querySelectorAll<HTMLElement>(".ss-parallax-item")).map((item) => ({
          strength: Number(item.dataset.parallaxStrength || 20),
          moveX: gsap.quickTo(item, "x", { duration: 0.4, ease: "power3.out" }),
          moveY: gsap.quickTo(item, "y", { duration: 0.4, ease: "power3.out" }),
        }));
        if (!items.length) return;

        const onMove = (event: MouseEvent) => {
          const rect = area.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          items.forEach(({ moveX, moveY, strength }) => {
            moveX(x * strength);
            moveY(y * strength);
          });
        };
        const onLeave = () => items.forEach(({ moveX, moveY }) => { moveX(0); moveY(0); });
        area.addEventListener("mousemove", onMove);
        area.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          area.removeEventListener("mousemove", onMove);
          area.removeEventListener("mouseleave", onLeave);
        });
      });

      root.querySelectorAll<HTMLElement>("[data-tilt]").forEach((card) => {
        const speed = Number(card.dataset.tiltSpeed || 0.3);
        const max = Number(card.dataset.tiltMax || 10);
        const onMove = (event: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const rotationX = ((event.clientY - rect.top) / rect.height - 0.5) * (2 * max);
          const rotationY = ((event.clientX - rect.left) / rect.width - 0.5) * (-2 * max);
          gsap.to(card, { rotationX, rotationY, transformPerspective: 1000, ease: "power2.out", duration: speed });
        };
        const onLeave = () => gsap.to(card, { rotationX: 0, rotationY: 0, ease: "power2.out", duration: speed * 2 });
        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          card.removeEventListener("mousemove", onMove);
          card.removeEventListener("mouseleave", onLeave);
        });
      });

      root.querySelectorAll<HTMLElement>(".img-clip-anim-box").forEach((box) => {
        const image = box.querySelector<HTMLImageElement>(".img-clip-anim");
        if (!image) return;
        const masks = Array.from({ length: 9 }, (_, index) => {
          const mask = document.createElement("span");
          mask.className = `mask mask-${index + 1}`;
          Object.assign(mask.style, {
            backgroundImage: `url(${image.currentSrc || image.src})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "absolute",
            inset: "0",
          });
          box.appendChild(mask);
          createdMasks.push(mask);
          return mask;
        });
        gsap.set(masks, { clipPath: (index: number) => hiddenTiles[index] });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: box, start: "top 75%", once: true } });
        [[0], [1, 3], [2, 4, 6], [5, 7], [8]].forEach((indexes, groupIndex) => {
          timeline.to(indexes.map((index) => masks[index]), {
            clipPath: (_index: number, target: HTMLElement) => visibleTiles[masks.indexOf(target)],
            duration: 1,
            ease: "power4.out",
            stagger: 0.1,
          }, groupIndex * 0.125);
        });
      });

      gsap.matchMedia().add("(min-width: 992px)", () => {
        root.querySelectorAll<HTMLElement>(".pinned-container").forEach((section) => {
          const pinned = section.querySelector<HTMLElement>(".pinned-element");
          const column = pinned?.parentElement;
          if (!pinned || !column) return;

          const pinTop = () => (root.querySelector<HTMLElement>(".header")?.offsetHeight || 0) + 28;
          const syncWidth = () => {
            const styles = window.getComputedStyle(column);
            const horizontalPadding = parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
            pinned.style.width = `${Math.max(column.clientWidth - horizontalPadding, 0)}px`;
          };

          syncWidth();
          ScrollTrigger.create({
            trigger: column,
            pin: pinned,
            start: () => `top top+=${pinTop()}`,
            end: () => {
              const localOffset = column.offsetTop + pinned.offsetTop;
              return `+=${Math.max(section.offsetHeight - pinned.offsetHeight - localOffset, 0)}`;
            },
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onRefreshInit: syncWidth,
            onRefresh: syncWidth,
            onKill: () => pinned.style.removeProperty("width"),
          });
        });

        root.querySelectorAll<HTMLElement>(".sticky-cards-container").forEach((container) => {
          const cards = Array.from(container.querySelectorAll<HTMLElement>(".sticky-card"));
          const spacer = Number(container.dataset.stickySpacer || 20);
          const top = Number(container.dataset.stickyTop || 200);
          const scale = gsap.utils.distribute({ base: 0.8, amount: 0.2 });
          cards.forEach((card, index) => {
            const end = () => `bottom top+=${top + card.offsetHeight + cards.length * spacer}`;
            card.style.zIndex = String(index + 1);
            gsap.to(card, {
              scale: scale(index, card, cards),
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: `top ${top}px`,
                endTrigger: container,
                end,
                scrub: true,
                invalidateOnRefresh: true,
              },
            });
            ScrollTrigger.create({
              trigger: card,
              start: `top-=${index * spacer} ${top}px`,
              endTrigger: container,
              end,
              pin: true,
              pinSpacing: false,
              invalidateOnRefresh: true,
            });
          });
        });
      });

      const header = root.querySelector<HTMLElement>(".header");
      if (header) {
        ScrollTrigger.create({
          start: "top -80",
          onEnter: () => header.classList.add("pinned"),
          onLeaveBack: () => header.classList.remove("pinned"),
        });
      }
    }, root);

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 250);

      cleanup = () => {
        window.clearTimeout(refresh);
        cleanups.forEach((itemCleanup) => itemCleanup());
        context.revert();
        splits.forEach((split) => split.revert());
        createdMasks.forEach((mask) => mask.remove());
        smoother.kill();
        root.classList.remove("landing-motion-ready");
      };
    };

    if (document.fonts.status === "loaded") {
      initialize();
    } else {
      void document.fonts.ready.then(initialize);
    }

    return () => {
      destroyed = true;
      cleanup?.();
    };
  }, []);

  return null;
}
