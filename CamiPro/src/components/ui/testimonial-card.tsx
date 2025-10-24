import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
}: TestimonialCardProps) {
  const Card = (href ? "a" : "div") as keyof JSX.IntrinsicElements;

  return (
    <Card
      {...(href ? { href, target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "flex max-w-[320px] flex-col gap-4 rounded-3xl border border-black/5 bg-white/90 p-6 text-start shadow-sm transition-colors duration-300 hover:border-primary/30 hover:bg-white dark:border-white/10 dark:bg-white/[0.05] dark:hover:border-primary/30 dark:hover:bg-white/[0.08]",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={author.avatar} alt={author.name} />
          <AvatarFallback>{author.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-base font-semibold text-foreground dark:text-white">
            {author.name}
          </h3>
          <p className="text-sm text-muted-foreground">{author.handle}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground sm:text-base">{text}</p>
    </Card>
  );
}
