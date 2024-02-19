"use client"

import { SimpleMapsExample } from "./SimpleMaps"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>React Test Map</h1>
      <SimpleMapsExample />
    </main>
  )
}
