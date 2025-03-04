"use client";

import {
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { SignUpButton, SignInButton, UserButton } from "@clerk/nextjs";
import VideoSection from "@/components/video/VideoSection";
import TopStories from "@/components/TopStories";

export default function Home() {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">The News</h1>
          <UserButton />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Authenticated>
          <div className="space-y-12">
            <TopStories />
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">News Videos</h2>
              <VideoSection />
            </div>
          </div>
        </Authenticated>
        <Unauthenticated>
          <SignInForm />
        </Unauthenticated>
      </main>
    </>
  );
}

function SignInForm() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold">Welcome to The News</h2>
        <p className="text-gray-600">Sign in to access the latest news and updates</p>
      </div>
      
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <SignInButton mode="modal">
          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            Sign in
          </button>
        </SignInButton>
        
        <SignUpButton mode="modal">
          <button className="w-full bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-900 transition-colors">
            Create account
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
