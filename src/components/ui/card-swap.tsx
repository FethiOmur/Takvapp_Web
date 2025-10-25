"use client";

import React, { useRef, useEffect, useMemo, Children, createRef, forwardRef } from "react";
import gsap from "gsap";

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent) => void;
}

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const { className = "", ...rest } = props;
  return (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] transition-transform duration-300 ${className}`.trim()}
    />
  );
});

Card.displayName = "Card";

export interface CardSwapProps {
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "power";
  children: React.ReactNode;
}

export default function CardSwap({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 3200,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = "elastic",
  children,
}: CardSwapProps) {
  const easingConfig = useMemo(
    () =>
      easing === "elastic"
        ? {
            ease: "elastic.out(0.6,0.9)",
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: "power2.inOut",
            durDrop: 0.7,
            durMove: 0.68,
            durReturn: 0.64,
            promoteOverlap: 0.38,
            returnDelay: 0.18,
          },
    [easing]
  );

  const childArray = useMemo(() => Children.toArray(children), [children]);
  const cardRefs = useMemo(() => childArray.map(() => createRef<HTMLDivElement>()), [childArray]);

  const positions = useMemo(() => {
    const count = childArray.length;
    return Array.from({ length: count }, (_, i) =>
      getPosition(i, cardDistance, verticalDistance, count)
    );
  }, [childArray, cardDistance, verticalDistance]);

  const orderRef = useRef<number[]>(Array.from({ length: childArray.length }, (_, i) => i));
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const delayTimerRef = useRef<gsap.core.Tween | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const dropDistance = useMemo(() => Math.min(height * 0.22, 140), [height]);

  useEffect(() => {
    cardRefs.length;
    cardRefs.forEach((ref, i) => {
      if (ref.current) {
        setCardPosition(ref.current, positions[i], skewAmount);
      }
    });

    const cycleCards = () => {
      if (timelineRef.current || orderRef.current.length < 2) return;

      const [topIndex, ...rest] = orderRef.current;
      const topCard = cardRefs[topIndex].current;
      if (!topCard) return;

      const tl = gsap.timeline({
        defaults: { ease: easingConfig.ease },
        smoothChildTiming: true,
        onComplete: () => {
          orderRef.current = [...rest, topIndex];
          timelineRef.current = null;
        },
      });

      timelineRef.current = tl;

      tl.to(topCard, {
        y: `+=${dropDistance}`,
        duration: easingConfig.durDrop,
      });

      tl.addLabel("promote", `-=${easingConfig.durDrop * easingConfig.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const card = cardRefs[idx].current;
        if (!card) return;
        const pos = positions[i];
        if (!pos) return;

        tl.set(card, { zIndex: pos.zIndex }, "promote");
        tl.to(
          card,
          {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            duration: easingConfig.durMove,
          },
          `promote+=${i * 0.15}`
        );
      });

      const lastPos = positions[positions.length - 1];
      if (lastPos) {
        tl.addLabel("return", `promote+=${easingConfig.durMove * easingConfig.returnDelay}`);
        tl.call(() => {
          gsap.set(topCard, { zIndex: lastPos.zIndex });
        }, undefined, "return");
        tl.set(topCard, { x: lastPos.x, z: lastPos.z }, "return");
        tl.to(
          topCard,
          {
            y: lastPos.y,
            duration: easingConfig.durReturn,
          },
          "return"
        );
      }
    };

    const loop = () => {
      delayTimerRef.current?.kill();
      delayTimerRef.current = gsap.delayedCall(delay / 1000, () => {
        cycleCards();
        loop();
      });
    };

    const startTimer = gsap.delayedCall(0.1, () => {
      cycleCards();
      loop();
    });

    const container = containerRef.current;

    const cleanup = () => {
      startTimer.kill();
      delayTimerRef.current?.kill();
      timelineRef.current?.kill();
      timelineRef.current = null;
    };

    if (pauseOnHover && container) {
      const handleMouseEnter = () => {
        timelineRef.current?.pause();
        delayTimerRef.current?.pause();
      };

      const handleMouseLeave = () => {
        timelineRef.current?.resume();
        delayTimerRef.current?.resume();
      };

      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
        cleanup();
      };
    }

    return cleanup;
  }, [
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easingConfig,
    cardRefs,
    positions,
    dropDistance,
  ]);

  const wrappedChildren = childArray.map((child, index) => {
    if (!React.isValidElement(child)) return child;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const props: any = {
      key: index,
      ref: cardRefs[index],
      style: {
        width,
        height,
        ...((child.props as { style?: React.CSSProperties }).style || {}),
      },
      onClick: (e: React.MouseEvent) => {
        (child.props as { onClick?: (e: React.MouseEvent) => void }).onClick?.(e);
        onCardClick?.(index);
      },
    };

    return React.cloneElement(child, props);
  });

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 right-0 origin-bottom-right perspective-[900px] overflow-visible transform translate-x-[42%] translate-y-[64%] scale-[0.52] sm:translate-x-[38%] sm:translate-y-[58%] sm:scale-[0.6] md:translate-x-[34%] md:translate-y-[54%] md:scale-[0.74] lg:translate-x-[32%] lg:translate-y-[54%] lg:scale-90 xl:translate-x-[28%] xl:translate-y-[56%] xl:scale-95 2xl:translate-x-[26%] 2xl:translate-y-[58%] 2xl:scale-100"
      style={{ width, height }}
    >
      {wrappedChildren}
    </div>
  );
}

function getPosition(index: number, cardDistance: number, verticalDistance: number, total: number) {
  return {
    x: index * cardDistance,
    y: -index * verticalDistance,
    z: -index * cardDistance * 1.5,
    zIndex: total - index,
  };
}

function setCardPosition(
  element: HTMLElement,
  position: { x: number; y: number; z: number; zIndex: number },
  skewY: number
) {
  gsap.set(element, {
    x: position.x,
    y: position.y,
    z: position.z,
    xPercent: -50,
    yPercent: -50,
    skewY,
    transformOrigin: "center center",
    zIndex: position.zIndex,
    force3D: true,
  });
}
