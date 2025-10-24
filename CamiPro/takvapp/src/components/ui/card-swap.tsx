"use client";

import React, {
  Children,
  cloneElement,
  createRef,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import gsap from "gsap";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

interface CardSwapProps {
  children: ReactNode;
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  skewAmount?: number;
  easing?: "elastic" | "power";
}

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  index: number,
  distX: number,
  distY: number,
  total: number,
): Slot => ({
  x: index * distX,
  y: -index * distY,
  z: -index * distX * 1.5,
  zIndex: total - index,
});

const placeNow = (element: HTMLDivElement, slot: Slot, skew: number): void => {
  gsap.set(element, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] transition-transform duration-300 ${className}`.trim()}
    />
  ),
);
Card.displayName = "Card";

const CardSwap = ({
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
}: CardSwapProps) => {
  const config = useMemo(
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
    [easing],
  );

  const childArray = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArray.map(() => createRef<HTMLDivElement>()),
    [childArray],
  );
  const slots = useMemo(() => {
    const total = childArray.length;
    return Array.from({ length: total }, (_, index) =>
      makeSlot(index, cardDistance, verticalDistance, total),
    );
  }, [childArray, cardDistance, verticalDistance]);

  const order = useRef<number[]>(
    Array.from({ length: childArray.length }, (_, index) => index),
  );
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const loopRef = useRef<gsap.core.Tween | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropOffset = useMemo(() => Math.min(height * 0.22, 140), [height]);

  useEffect(() => {
    const total = refs.length;

    refs.forEach((reference, index) => {
      if (reference.current) {
        placeNow(reference.current, slots[index], skewAmount);
      }
    });

    const swap = () => {
      if (tlRef.current) return;
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const frontElement = refs[front].current;
      if (!frontElement) return;

      const timeline = gsap.timeline({
        defaults: { ease: config.ease },
        smoothChildTiming: true,
        onComplete: () => {
          order.current = [...rest, front];
          tlRef.current = null;
        },
      });
      tlRef.current = timeline;

      timeline.to(frontElement, {
        y: `+=${dropOffset}`,
        duration: config.durDrop,
      });

      timeline.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((index, loopIndex) => {
        const element = refs[index].current;
        if (!element) return;
        const slot = slots[loopIndex];
        if (!slot) return;
        timeline.set(element, { zIndex: slot.zIndex }, "promote");
        timeline.to(
          element,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
          },
          `promote+=${loopIndex * 0.15}`,
        );
      });

      const backSlot = slots[slots.length - 1];
      if (!backSlot) return;
      timeline.addLabel(
        "return",
        `promote+=${config.durMove * config.returnDelay}`,
      );
      timeline.call(() => {
        gsap.set(frontElement, { zIndex: backSlot.zIndex });
      }, undefined, "return");
      timeline.set(frontElement, { x: backSlot.x, z: backSlot.z }, "return");
      timeline.to(
        frontElement,
        { y: backSlot.y, duration: config.durReturn },
        "return",
      );
    };

    const scheduleNext = () => {
      loopRef.current?.kill();
      loopRef.current = gsap.delayedCall(delay / 1000, () => {
        swap();
        scheduleNext();
      });
    };

    const kickoff = gsap.delayedCall(0.1, () => {
      swap();
      scheduleNext();
    });

    const node = containerRef.current;

    const cleanup = () => {
      kickoff.kill();
      loopRef.current?.kill();
      tlRef.current?.kill();
      tlRef.current = null;
    };

    if (pauseOnHover && node) {
      const pause = () => {
        tlRef.current?.pause();
        loopRef.current?.pause();
      };

      const resume = () => {
        tlRef.current?.resume();
        loopRef.current?.resume();
      };

      node.addEventListener("mouseenter", pause);
      node.addEventListener("mouseleave", resume);

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
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
    config,
    refs,
    slots,
    dropOffset,
  ]);

  const renderedChildren = childArray.map((child, index) => {
    if (!isValidElement(child)) return child;
    const element = child as React.ReactElement<any>;
    return cloneElement(
      element,
      {
        key: index,
        ref: refs[index],
        style: { width, height, ...(element.props.style ?? {}) },
        onClick: (event: React.MouseEvent<HTMLDivElement>) => {
          element.props.onClick?.(event);
          onCardClick?.(index);
        },
      } as any,
    );
  });

  return (
    <div
      ref={containerRef}
      className="absolute bottom-0 right-0 origin-bottom-right perspective-[900px] overflow-visible transform translate-x-[42%] translate-y-[64%] scale-[0.52] sm:translate-x-[38%] sm:translate-y-[58%] sm:scale-[0.6] md:translate-x-[34%] md:translate-y-[54%] md:scale-[0.74] lg:translate-x-[32%] lg:translate-y-[54%] lg:scale-90 xl:translate-x-[28%] xl:translate-y-[56%] xl:scale-95 2xl:translate-x-[26%] 2xl:translate-y-[58%] 2xl:scale-100"
      style={{ width, height }}
    >
      {renderedChildren}
    </div>
  );
};

export default CardSwap;
