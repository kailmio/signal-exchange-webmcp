type IconName = "mark" | "signal" | "shield" | "clock" | "file" | "license" | "credits" | "spark" | "search" | "undo" | "lock" | "check";

const paths: Record<IconName, React.ReactNode> = {
  mark: <><circle cx="12" cy="12" r="9"/><path d="m12 2 2.3 7.7L22 12l-7.7 2.3L12 22l-2.3-7.7L2 12l7.7-2.3Z"/><circle cx="12" cy="12" r="2.5"/></>,
  signal: <><circle cx="12" cy="12" r="2"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="8"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2"/></>,
  shield: <><path d="M12 3 20 6v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  file: <><path d="M6 3h8l4 4v14H6Z"/><path d="M14 3v5h5M9 12h6m-6 4h6"/></>,
  license: <><path d="M4 9h16M6 9v9m4-9v9m4-9v9m4-9v9M3 20h18M12 3 3 7h18Z"/></>,
  credits: <><ellipse cx="12" cy="6" rx="7" ry="3"/><path d="M5 6v4c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 10v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4M5 14v4c0 1.7 3.1 3 7 3s7-1.3 7-3v-4"/></>,
  spark: <path d="m12 2 1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8Z"/>,
  search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 5 5"/></>,
  undo: <><path d="m8 7-5 5 5 5"/><path d="M4 12h9a7 7 0 0 1 7 7"/></>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
};

export function Icon({ name, size = 24 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}
