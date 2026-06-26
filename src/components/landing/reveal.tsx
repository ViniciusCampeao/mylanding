import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}

export function Reveal({ children, delay = 0, className, as: Tag = "div" }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Comp = Tag as any;
  return (
    <Comp
      ref={ref as any}
      className={cn("reveal", visible && "reveal-in", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Comp>
  );
}
