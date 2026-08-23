export default function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-xl bg-charcoal-700/[0.07] ${className}`} />;
}
