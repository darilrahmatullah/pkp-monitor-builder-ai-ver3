import type React from "react"
export default function Car() {
  return null
}

Car.Header = function CarHeader({ children }: { children: React.ReactNode }) {
  return <header>{children}</header>
}
