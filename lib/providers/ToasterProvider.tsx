"use client"

import { Toaster } from "sonner"

export function ToasterProvider() {
  return (
    <Toaster 
      position="top-center"
      expand={false}
      richColors
      closeButton
    />
  )
}
