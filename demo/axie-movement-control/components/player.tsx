import { useFrame } from '@react-three/fiber'
import { CapsuleCollider, RapierRigidBody, RigidBody } from '@react-three/rapier'
import { Pomodoro } from '@sms0nhaaa/r3f-axie-starter'
import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Vector3 } from 'three'

import { useControls } from '@/hooks/use-controls'

const SPEED = 10

const direction = new Vector3()
const frontVector = new Vector3()
const sideVector = new Vector3()

export default function Player() {
  const playerRef = useRef<THREE.Group | null>(null)
  const physicRef = useRef<RapierRigidBody>(null)
  const [animation, setAnimation] = useState('idle')
  const { up, down, left, right, jump } = useControls()

  useEffect(() => {
    setAnimation(up || down || left || right ? 'walk' : 'idle')
  }, [up, down, left, right])

  useFrame(({ camera }) => {
    if (!playerRef.current) return
    if (!physicRef.current) return

    if (up || down || left || right) {
      up && playerRef.current.rotation.set(0, Math.PI, 0)
      down && playerRef.current.rotation.set(0, 0, 0)
      left && playerRef.current.rotation.set(0, -Math.PI / 2 + (up ? -Math.PI / 4 : down ? Math.PI / 4 : 0), 0)
      right && playerRef.current.rotation.set(0, Math.PI / 2 + (up ? Math.PI / 4 : down ? -Math.PI / 4 : 0), 0)
    }

    if (jump)
      physicRef.current.setLinvel({ x: physicRef.current.linvel().x, y: 3, z: physicRef.current.linvel().z }, true)

    frontVector.set(0, 0, Number(down) - Number(up))
    sideVector.set(Number(left) - Number(right), 0, 0)
    direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED)
    physicRef.current.setLinvel({ x: direction.x, y: physicRef.current.linvel().y, z: direction.z }, true)

    const translation = physicRef.current.translation()

    playerRef.current.position.set(translation.x, translation.y - 1, translation.z)
    camera.position.z = translation.z + 7
    camera.position.x = translation.x
    camera.lookAt(playerRef.current.position.clone().setY(1))
  })

  return (
    <group>
      <RigidBody
        ref={physicRef}
        canSleep={true}
        colliders={false}
        enabledRotations={[false, false, false]}
        position={[0, 5, 0]}
      >
        <CapsuleCollider args={[0.5, 0.5]}></CapsuleCollider>
      </RigidBody>
      <group ref={playerRef}>
        <Pomodoro
          animation={animation}
          outline={{ color: 'black', opacity: 1, thickness: 0.03 }}
          position={[0, 0, 0]}
          timeScale={1}
        />
      </group>
    </group>
  )
}
