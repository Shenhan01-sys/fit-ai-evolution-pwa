"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface DumbbellProps {
  position?: [number, number, number]
  scale?: number
  rotation?: [number, number, number]
}

export default function Dumbbell3D({ position = [0, 0, 0], scale = 1, rotation = [0, 0, 0] }: DumbbellProps) {
  const groupRef = useRef<THREE.Group>(null)
  const rotationSpeedRef = useRef({ x: Math.random() * 0.01, y: Math.random() * 0.015 })

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x += rotationSpeedRef.current.x
      groupRef.current.rotation.y += rotationSpeedRef.current.y
      groupRef.current.position.y += Math.sin(Date.now() * 0.001) * 0.001
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={rotation}>
      {/* Left Weight Plate */}
      <mesh position={[-1.5, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
        <meshPhongMaterial color="#80EE98" emissive="#46DFB1" shininess={100} />
      </mesh>

      {/* Right Weight Plate */}
      <mesh position={[1.5, 0, 0]}>
        <cylinderGeometry args={[0.6, 0.6, 0.3, 32]} />
        <meshPhongMaterial color="#46DFB1" emissive="#80EE98" shininess={100} />
      </mesh>

      {/* Center Bar */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 3.2, 16]} />
        <meshPhongMaterial color="#09D1C7" emissive="#15919B" shininess={120} />
      </mesh>

      {/* Left Grip */}
      <mesh position={[-0.8, 0, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshPhongMaterial color="#15919B" emissive="#09D1C7" shininess={80} />
      </mesh>

      {/* Right Grip */}
      <mesh position={[0.8, 0, 0]}>
        <boxGeometry args={[0.4, 0.3, 0.3]} />
        <meshPhongMaterial color="#0C6478" emissive="#46DFB1" shininess={80} />
      </mesh>

      {/* Glow effect using a transparent sphere */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial color="#80EE98" transparent={true} opacity={0.05} wireframe={false} />
      </mesh>
    </group>
  )
}
