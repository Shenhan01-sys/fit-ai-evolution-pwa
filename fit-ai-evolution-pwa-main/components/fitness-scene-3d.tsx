"use client"

import { Canvas } from "@react-three/fiber"
import { PerspectiveCamera, Environment } from "@react-three/drei"
import { Suspense } from "react"
import Dumbbell3D from "./dumbbell-3d"
import FitnessBackground from "./fitness-background"

export default function FitnessScene3D() {
  return (
    <Canvas className="w-full h-full" dpr={[1, 1.5]}>
      <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={45} />

      <color attach="background" args={["#0C6478"]} />

      {/* Lighting */}
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#80EE98" />
      <directionalLight position={[-5, 3, 3]} intensity={0.8} color="#46DFB1" />
      <pointLight position={[0, 2, 4]} intensity={0.6} color="#09D1C7" />

      {/* 3D Elements */}
      <Suspense fallback={null}>
        <FitnessBackground />
        <Dumbbell3D position={[-3, 0, 0]} scale={1.2} />
        <Dumbbell3D position={[3, 0.5, -2]} scale={0.9} rotation={[0.5, 0.3, 0.2]} />
      </Suspense>

      {/* Environment for better lighting */}
      <Environment preset="night" intensity={0.5} />
    </Canvas>
  )
}
