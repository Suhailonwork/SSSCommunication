"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";
import { Loader2 } from "lucide-react";

function PendingIndicator() {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <Loader2
      size={14}
      className="ml-1.5 inline-block animate-spin text-current opacity-80 align-middle"
      aria-hidden
    />
  );
}

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  showPending?: boolean;
}

export default function NavLink({ children, showPending = true, ...props }: NavLinkProps) {
  return (
    <Link {...props}>
      {children}
      {showPending && <PendingIndicator />}
    </Link>
  );
}
