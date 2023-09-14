import { GizmoHelper, GizmoViewport, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Buba, Pomodoro, Puffy } from '@sonhaaa/r3f-axie-starter-test'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import React from 'react'

export default function Scene() {
  const { animation, timeScale } = useControls({
    animation: {
      value: 'idle',
      options: [
        'idle',
        'idleattack',
        'idlecarryitem',
        'jump',
        'run',
        'runattack',
        'runcarryitem',
        'walk',
        'walkattack',
        'walkcarryitem',
      ],
    },
    timeScale: {
      value: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
    },
    axie: {
      value: 'buba',
      options: ['pomodoro', 'puffy'],
    },
  })

  return (
    <Canvas>
      <OrbitControls />

      <Perf position="top-left" />

      <ambientLight intensity={2} />
      <directionalLight intensity={1} position={[10, 10, 5]} />
      <directionalLight intensity={2} position={[-10, -10, -5]} />
      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        enablePan={false}
        maxPolarAngle={Math.PI / 0.01}
        minPolarAngle={Math.PI / 10}
        rotateSpeed={1.1}
      />

      <GizmoHelper alignment="bottom-right" margin={[80, 80]}>
        <GizmoViewport axisColors={['red', 'green', 'blue']} labelColor="black" />
      </GizmoHelper>

      <Buba
        animation={animation.toString()}
        outline={{ color: 'black', opacity: 1, thickness: 0.03 }}
        position={[0, 0, 0]}
        timeScale={timeScale}
      />
      <Puffy
        animation={animation.toString()}
        outline={{ color: 'black', opacity: 1, thickness: 0.03 }}
        position={[2, 0, 0]}
        timeScale={timeScale}
      />
      <Pomodoro
        animation={animation.toString()}
        outline={{ color: 'black', opacity: 1, thickness: 0.03 }}
        position={[-2, 0, 0]}
        timeScale={timeScale}
      />
    </Canvas>
  )
}
