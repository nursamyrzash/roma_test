"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/analytics";

interface TrackedLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> {
  event: AnalyticsEvent;
  eventProps?: Record<string, string | number | boolean>;
  children: ReactNode;
}

/** Plain, unstyled tracked anchor — for links that don't need Button's CTA styling (footer links, inline text links, Instagram handle). */
export function TrackedLink({ event, eventProps, children, ...rest }: TrackedLinkProps) {
  return (
    <a {...rest} onClick={() => trackEvent(event, eventProps)}>
      {children}
    </a>
  );
}
