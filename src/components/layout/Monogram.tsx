export default function Monogram() {
  return (
    <span
      aria-hidden
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/10 bg-ink-800/80 shadow-panel"
    >
      <span className="font-mono text-[11px] font-semibold tracking-tight text-mist-100">
        DT
      </span>
      <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent-cyan/80 shadow-[0_0_0_2px_rgba(11,18,32,1)]" />
    </span>
  );
}
