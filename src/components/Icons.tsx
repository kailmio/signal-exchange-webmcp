type IconName = "mark" | "forge" | "focus" | "idea" | "reveal" | "control" | "check" | "clock" | "undo";

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  const common = { width: size, height: size, viewBox: "0 0 48 48", fill: "none", "aria-hidden": true } as const;
  if (name === "mark") {
    return <svg {...common}><circle cx="24" cy="24" r="17"/><path d="m24 7 4 12 12 5-12 4-4 13-4-13-12-4 12-5 4-12Z"/><circle cx="24" cy="24" r="3"/></svg>;
  }
  if (name === "forge") {
    return <svg {...common}><path d="M8 28h32M13 28l5-8h12l5 8M21 28v9h6v-9M24 5v8M13 9l5 6M35 9l-5 6"/></svg>;
  }
  if (name === "focus") {
    return <svg {...common}><circle cx="24" cy="24" r="14"/><circle cx="24" cy="24" r="6"/><path d="M24 3v8M24 37v8M3 24h8M37 24h8"/></svg>;
  }
  if (name === "undo") {
    return <svg {...common}><path d="m18 13-9 8 9 8"/><path d="M10 21h17c7 0 12 5 12 12"/></svg>;
  }
  if (name === "clock") {
    return <svg {...common}><circle cx="24" cy="24" r="17"/><path d="M24 13v12l8 5"/></svg>;
  }
  if (name === "check") {
    return <svg {...common}><circle cx="24" cy="24" r="17"/><path d="m16 24 6 6 11-13"/></svg>;
  }
  if (name === "reveal") {
    return <svg {...common}><path d="m24 7 3 10 10 3-10 3-3 10-3-10-10-3 10-3 3-10Z"/><path d="m36 29 1.5 4.5L42 35l-4.5 1.5L36 41l-1.5-4.5L30 35l4.5-1.5L36 29Z"/></svg>;
  }
  if (name === "control") {
    return <svg {...common}><circle cx="24" cy="17" r="7"/><path d="M11 41c1-9 6-14 13-14s12 5 13 14"/></svg>;
  }
  return <svg {...common}><path d="M24 6c-8 0-14 6-14 14 0 5 2 8 6 11 2 2 3 4 3 7h10c0-3 1-5 3-7 4-3 6-6 6-11 0-8-6-14-14-14Z"/><path d="M19 42h10M18 22c3-4 8-4 11 0"/></svg>;
}
