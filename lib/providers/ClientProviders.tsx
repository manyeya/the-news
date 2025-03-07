'use client';

import ConvexClientProvider from "@/app/providers/ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import QueryProvider from "./QueryProvider";
import { OfflineIndicator } from "@/components/OfflineIndicator";
import dynamic from 'next/dynamic';
import { VideoProvider } from "@/components/video/Player/VideoContext";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const pubKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

// avoid hydration issues
//----------------------
const DynamicOfflineIndicator = dynamic(() => Promise.resolve(OfflineIndicator), {
  ssr: false
});

const DynamicTheme = dynamic(() => Promise.resolve(ThemeProvider), {
  ssr: false
});
//----------------------

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={pubKey!}>
      <ConvexClientProvider>
        <QueryProvider>
          <VideoProvider>
            <DynamicTheme
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange

            >
              {children}
            </DynamicTheme>
            <DynamicOfflineIndicator />
          </VideoProvider>
        </QueryProvider>
      </ConvexClientProvider>
    </ClerkProvider>
  );
}
