'use client';

import ConvexClientProvider from "@/app/providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "./QueryProvider";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import dynamic from 'next/dynamic';

const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// Dynamically load the offline indicator to avoid hydration issues
const DynamicOfflineIndicator = dynamic(() => Promise.resolve(OfflineIndicator), {
  ssr: false
});

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={pubKey!}>
      <ConvexClientProvider>
        <QueryProvider>
          {children}
          <DynamicOfflineIndicator />
        </QueryProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
