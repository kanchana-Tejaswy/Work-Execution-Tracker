import { cn } from "@/lib/utils";

interface RiskIndicatorBadgeProps {
  level: 'GREEN' | 'YELLOW' | 'RED';
}

export function RiskIndicatorBadge({ level }: RiskIndicatorBadgeProps) {
  const styles = {
    GREEN: "bg-status-success/10 text-status-success border-status-success/20",
    YELLOW: "bg-status-warning/10 text-status-warning border-status-warning/20",
    RED: "bg-status-error/10 text-status-error border-status-error/20",
  };

  const dots = {
    GREEN: "bg-status-success",
    YELLOW: "bg-status-warning",
    RED: "bg-status-error",
  };

  const labels = {
    GREEN: "Operational",
    YELLOW: "Attention",
    RED: "Critical",
  };

  return (
    <span className={cn(
      "badge px-2 py-0.5 whitespace-nowrap shadow-sm",
      styles[level]
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full", dots[level])}></span>
      {labels[level]}
    </span>
  );
}
