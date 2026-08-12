"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

type Variant = "primary" | "ghost" | "dark";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary: "bg-primary text-white hover:bg-primary-dim",
  ghost: "bg-transparent text-ink border border-ink hover:border-primary hover:text-primary",
  dark: "bg-panel text-panel-text hover:opacity-90",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-card px-6 py-3.5 text-sm font-bold uppercase tracking-wide transition-transform hover:-translate-y-0.5";

interface TrackingProps {
  event?: AnalyticsEvent;
  eventProps?: Record<string, string | number | boolean>;
}

type LinkVariant = TrackingProps & {
  href: string;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "onClick">;

type ButtonVariant = TrackingProps & {
  href?: undefined;
  variant?: Variant;
  children: ReactNode;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "onClick">;

export function Button(props: LinkVariant | ButtonVariant) {
  const { variant = "primary", children, className = "", event, eventProps, ...rest } = props;
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${className}`;

  function handleClick() {
    if (event) trackEvent(event, eventProps);
  }

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as Omit<LinkVariant, "variant" | "children" | "className" | "event" | "eventProps">;

    if (href.startsWith("tel:") || href.startsWith("mailto:")) {
      return (
        <a href={href} className={classes} onClick={handleClick} {...anchorRest}>
          {children}
        </a>
      );
    }
    if (/^https?:\/\//.test(href)) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={handleClick} {...anchorRest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={handleClick} {...anchorRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} onClick={handleClick} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
