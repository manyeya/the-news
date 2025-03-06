"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function NewsletterForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
  }

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Enter your email"
        className="w-full"
      />
      <Button type="submit" className="w-full">
        Subscribe
      </Button>
    </form>
  )
}
