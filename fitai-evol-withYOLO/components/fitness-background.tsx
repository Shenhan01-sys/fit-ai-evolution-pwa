"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

export default function FitnessBackground() {
  const particlesRef = useRef<THREE.Points>(null)

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x += 0.0001
      particlesRef.current.rotation.y += 0.0002
    }
  })

  // Create particle geometry
  const particleCount = 500
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  const colorPalette = [
    [0x80 / 255, 0xee / 255, 0x98 / 255], // Lime green
    [0x46 / 255, 0xdf / 255, 0xb1 / 255], // Mint
    [0x09 / 255, 0xd1 / 255, 0xc7 / 255], // Cyan
    [0x15 / 255, 0x91 / 255, 0x9b / 255], // Teal dark
  ]

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30

    const colorIndex = Math.floor(Math.random() * colorPalette.length)
    const [r, g, b] = colorPalette[colorIndex]
    colors[i * 3] = r
    colors[i * 3 + 1] = g
    colors[i * 3 + 2] = b
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.15} sizeAttenuation={true} vertexColors={true} transparent={true} opacity={0.6} />
    </points>
  )
}
