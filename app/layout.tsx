import "@/app/globals.css"

import { Inter } from 'next/font/google'

import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Corporación MJCL",
  description: "Corporación MJCL dirigidos a compañías públicas y privadas",
  icons: {
    icon: "/logo-mjcl.png",
    shortcut: "/logo-mjcl.png",
    apple: "/logo-mjcl.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo-mjcl.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
