import type React from "react"
import Header from "../../components/layout/header"
import Sidebar from "../../components/layout/sidebar/sidebar"

type LayoutProps = {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Header />
      <Sidebar />
      <main className="ml-72 mt-32 p-6 bg-bgDef min-h-[calc(100vh-4rem)]">{children}</main>
    </div>
  )
}
