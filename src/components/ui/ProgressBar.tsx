import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ progress, className, showLabel = false }: ProgressBarProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="h-1.5 w-full bg-surface-border rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary-accent transition-all duration-700 ease-out shadow-[0_0_8px_rgba(79,70,229,0.3)]"
          style={{ width: `${progress}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-2">
          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Progress</span>
          <span className="text-[10px] text-primary-accent font-bold uppercase tracking-tight">{progress}%</span>
        </div>
      )}
    </div>
  );
}
