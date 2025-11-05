import type React from "react"
import type { Metadata } from "next"
import { Audiowide } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const audiowide = Audiowide({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-audiowide",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${audiowide.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
