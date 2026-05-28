export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-surface-border rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary-accent rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] animate-pulse">
          Synchronizing Signals...
        </p>
      </div>
    </div>
  );
}
