import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = false,
  dark = false,
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: string;
  center?: boolean;
  dark?: boolean;
}) {
  return (
    <div className={center ? "mx-auto mb-9 max-w-[56ch] text-center" : "mb-9"}>
      {eyebrow && (
        <span
          className={`mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest before:h-0.5 before:w-4 ${
            dark ? "text-accent before:bg-accent" : "text-primary before:bg-primary"
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl uppercase leading-tight tracking-tight font-normal md:text-4xl">
        {title}
      </h2>
      {body && <p className="mt-3 leading-relaxed text-ink-soft">{body}</p>}
    </div>
  );
}
