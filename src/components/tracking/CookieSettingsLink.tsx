"use client";

import { OPEN_EVENT } from "./consent";

/** Footer link that reopens the cookie banner. */
export default function CookieSettingsLink({
  label,
  className,
  style,
}: {
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}
      className={className}
      style={style}
    >
      {label}
    </button>
  );
}
