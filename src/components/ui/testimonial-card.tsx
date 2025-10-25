import type { CSSProperties, ElementType, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps extends HTMLAttributes<HTMLDivElement> {
  author: TestimonialAuthor;
  text: string;
  href?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
  ...rest
}: TestimonialCardProps) {
  const Component = (href ? "a" : "div") as ElementType;

  const style: CSSProperties = {
    opacity: "var(--testimonial-opacity, 1)",
    transform: "scale(var(--testimonial-scale, 1))",
  };

  return (
    <Component
      {...(href ? { href } : {})}
      {...rest}
      style={style}
      className={cn(
        "flex flex-col rounded-lg border-t origin-center",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        "p-4 text-start sm:p-6",
        "hover:from-muted/60 hover:to-muted/20",
        "max-w-[320px] sm:max-w-[320px]",
        "transition-[opacity,transform,colors] duration-300 ease-out will-change-[opacity,transform]",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md font-semibold leading-none">{author.name}</h3>
          <p className="text-sm text-muted-foreground">{author.handle}</p>
        </div>
      </div>
      <p className="sm:text-md mt-4 text-sm text-muted-foreground">{text}</p>
    </Component>
  );
}
