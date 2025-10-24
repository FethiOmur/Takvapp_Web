"use client";

import React, { useMemo, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface JobCardProps {
  companyLogo: React.ReactNode;
  companyName: string;
  jobTitle: string;
  salary: string;
  tags: string[];
  postedDate: string;
  variant?: "pink" | "yellow" | "blue" | "purple";
  className?: string;
  onClick?: () => void;
  media?: React.ReactNode;
}

const variantClasses = {
  pink: "border-t-pink-500",
  yellow: "border-t-yellow-500",
  blue: "border-t-blue-500",
  purple: "border-t-purple-500",
};

export const AnimatedJobCard = ({
  companyLogo,
  companyName,
  jobTitle,
  salary,
  tags,
  postedDate,
  variant = "purple",
  className,
  onClick,
  media,
}: JobCardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const springConfig = useMemo(
    () => ({ stiffness: 320, damping: 28, mass: 0.55 }),
    [],
  );

  const onMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = cardRef.current;
    if (!node) return;

    const { left, top, width, height } = node.getBoundingClientRect();
    mouseX.set(event.clientX - left - width / 2);
    mouseY.set(event.clientY - top - height / 2);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const rotateX = useTransform(mouseY, [-150, 150], [10, -10]);
  const rotateY = useTransform(mouseX, [-150, 150], [-10, 10]);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      className={cn(
        "relative w-full max-w-sm shrink-0 transform-gpu cursor-pointer overflow-hidden rounded-xl bg-card p-6 shadow-md transition-shadow duration-300 hover:shadow-2xl",
        "border-t-4",
        variantClasses[variant],
        className,
      )}
      aria-label={`Job opening: ${jobTitle} at ${companyName}`}
      tabIndex={0}
    >
      <div style={{ transform: "translateZ(18px)" }} className="space-y-4">
        {media && (
          <div className="relative overflow-hidden rounded-2xl border border-border/40 bg-neutral-950/20">
            {media}
          </div>
        )}

        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            {companyLogo}
          </div>
          <span className="font-semibold text-muted-foreground">
            {companyName}
          </span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-card-foreground">{jobTitle}</h3>
          <p className="text-sm text-primary">{salary}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="pt-2 text-right text-xs text-muted-foreground">
          {postedDate}
        </div>
      </div>
    </motion.div>
  );
};

