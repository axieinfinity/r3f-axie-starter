'use client'

import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'

import Player from '@/components/player'

export default function Home() {
  return (
    <main className="flex w-screen h-screen">
      <Canvas shadows camera={{ fov: 75, position: [0, 4, 0] }}>
        <ambientLight intensity={2} />
        <directionalLight intensity={1} position={[10, 10, 5]} />

        <OrbitControls />

        <Physics debug>
          <RigidBody type="fixed">
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={'hotpink'} />
            </mesh>
          </RigidBody>

          <RigidBody type="fixed">
            <mesh position={[2, 0, 4]}>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={'hotpink'} />
            </mesh>
          </RigidBody>

          <RigidBody type="fixed">
            <mesh receiveShadow position={[0, -0.5, 0]}>
              <boxGeometry args={[20, 1, 20]} />
              <meshStandardMaterial color="lightblue" />
            </mesh>
          </RigidBody>

          <Player />
        </Physics>
      </Canvas>
    </main>
  )
}
