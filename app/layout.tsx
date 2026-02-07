import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "The First Step - Interactive Workbook",
  description:
    "A simple starting point for people who know they don't want to keep doing what they're doing — but don't know what's next.",
}

export const viewport: Viewport = {
  themeColor: "#F8FAFC",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
