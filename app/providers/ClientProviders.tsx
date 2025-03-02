'use client';

import ConvexClientProvider from "@/app/providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "./QueryProvider";

const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={pubKey!}>
      <ConvexClientProvider>
        <QueryProvider>{children}</QueryProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
