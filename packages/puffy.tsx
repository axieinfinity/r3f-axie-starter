import { Outlines, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useGraph } from '@react-three/fiber'
import React, { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { GLTF, SkeletonUtils } from 'three-stdlib'

import { ANIMATIONS, BASE_URL } from './constants'
import { AxieStarterProps } from './types'

type GLTFResult = GLTF & {
  nodes: {
    SM_Tail_M_1: THREE.SkinnedMesh
    SM_Back_M_1: THREE.SkinnedMesh
    SM_Ear_R_1: THREE.SkinnedMesh
    SM_Ear_L_1: THREE.SkinnedMesh
    SM_Horn_M_1: THREE.SkinnedMesh
    SM_Eye_M_1: THREE.SkinnedMesh
    SM_Mouth_1: THREE.SkinnedMesh
    SM_Body: THREE.SkinnedMesh
    Hip_JNT: THREE.Bone
    Knee_R_JNT: THREE.Bone
    Knee_L_JNT: THREE.Bone
    Horn_M_2_JNT: THREE.Bone
    Horn_MT_1_JNT: THREE.Bone
    Back_M_1_JNT: THREE.Bone
    Ear_R_1_JNT: THREE.Bone
    Ear_L_1_JNT: THREE.Bone
    Tail_M_1_JNT: THREE.Bone
    Mouth_1_JNT: THREE.Bone
    EyesSup_L_1_JNT: THREE.Bone
    EyesSup_R_1_JNT: THREE.Bone
    Eyes_L_1_JNT: THREE.Bone
    Eyes_R_1_JNT: THREE.Bone
  }
}

export default function Puffy({
  outline = undefined,
  animation = 'idle',
  timeScale = 0.7,
  ...props
}: JSX.IntrinsicElements['group'] & AxieStarterProps) {
  const group = useRef<THREE.Group>(null)

  const { scene, animations } = useGLTF(`${BASE_URL}starter_puffy.glb`)
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes } = useGraph(clone) as unknown as GLTFResult

  const texture = useTexture(`${BASE_URL}puffy_texture.jpg`)

  const animationData = useMemo(() => ANIMATIONS.puffy[animation], [animation])
  const { mixer } = useAnimations(animations, group)

  useEffect(() => {
    if (!group.current) return

    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.center = new THREE.Vector2(0.5, 0.5)
    texture.rotation = Math.PI
    texture.flipY = false

    const clip = THREE.AnimationClip.parse(animationData)
    const action = new THREE.AnimationAction(mixer, clip, group.current)

    action.reset().fadeIn(0.2).play()

    return () => {
      action.fadeOut(0.2)
    }
  }, [texture, mixer, animationData])

  useEffect(() => {
    mixer.timeScale = timeScale
  }, [timeScale])

  useEffect(() => {
    texture.wrapS = THREE.RepeatWrapping
    texture.repeat.x = -1
    texture.center = new THREE.Vector2(0.5, 0.5)
    texture.rotation = Math.PI
    texture.flipY = false
  }, [texture])

  return (
    <group ref={group} name="puffy" {...props} dispose={null}>
      <group>
        <group name="JointBase_Grp">
          <group name="Root_Character">
            <primitive object={nodes.Hip_JNT} />
            <group name="Horn_M_1_OffSet" position={[0, 0.877, 0.446]} rotation={[1.066, 0, 0]}>
              <group name="Horn_M_1_JNT">
                <primitive object={nodes.Horn_M_2_JNT} />
                <primitive object={nodes.Horn_MT_1_JNT} />
              </group>
            </group>
            <group name="Back_M_1_OffSet" position={[0, 0.862, -0.327]} rotation={[0.614, 0, 0]}>
              <primitive object={nodes.Back_M_1_JNT} />
            </group>
            <group name="Ear_R_1_OffSet" position={[-0.341, 0.875, 0.323]} rotation={[-2.982, -0.519, 0.744]}>
              <primitive object={nodes.Ear_R_1_JNT} />
            </group>
            <group name="Ear_L_1_OffSet" position={[0.341, 0.875, 0.323]} rotation={[0.159, -0.519, 0.744]}>
              <primitive object={nodes.Ear_L_1_JNT} />
            </group>
            <group name="Tail_M_1_OffSet" position={[0, 0.185, -0.327]} rotation={[-0.775, 0, 0]}>
              <primitive object={nodes.Tail_M_1_JNT} />
            </group>
            <group name="Mouth_Decal_OffSet" position={[0, 0.471, 0.537]} rotation={[0.032, 0, 0]}>
              <primitive object={nodes.Mouth_1_JNT} />
            </group>
            <group name="Eyes_M_1_OffSet" position={[0, 0.728, 0.511]} rotation={[-0.253, 0, 0]}>
              <group name="Eyes_M_1_JNT">
                <group name="EyesSUP_M_1_JNT" position={[0, -0.088, -0.007]}>
                  <group name="EyesSup_M_2_JNT">
                    <primitive object={nodes.EyesSup_L_1_JNT} />
                    <primitive object={nodes.EyesSup_R_1_JNT} />
                  </group>
                  <group name="Eyes_M_2_JNT">
                    <primitive object={nodes.Eyes_L_1_JNT} />
                    <primitive object={nodes.Eyes_R_1_JNT} />
                  </group>
                </group>
              </group>
            </group>
            <group name="Root_Back_L_JNT" position={[0.253, 0.812, -0.276]} rotation={[0.536, -0.54, -0.036]} />
            <group name="Root_Back_M_JNT" position={[0, 0.862, -0.327]} rotation={[0.614, 0, 0]} />
            <group name="Root_Back_R_JNT" position={[-0.253, 0.812, -0.276]} rotation={[-2.605, -0.54, -0.036]} />
            <group name="Root_Ear_L_JNT" position={[0.341, 0.875, 0.323]} rotation={[0.159, -0.519, 0.744]} />
            <group name="Root_Ear_R_JNT" position={[-0.341, 0.875, 0.323]} rotation={[-2.982, -0.519, 0.744]} />
            <group name="Root_Eye_Accessory_L_JNT" position={[0.266, 0.778, 0.443]} rotation={[-0.328, 0.366, 0.039]} />
            <group name="Root_Eye_Accessory_R_JNT" position={[-0.266, 0.778, 0.443]} rotation={[2.814, 0.366, 0.039]} />
            <group name="Root_Eye_Accessory_M_JNT" position={[0, 0.728, 0.511]} rotation={[-0.253, 0, 0]} />
            <group name="Root_Eye_L_JNT" position={[0.23, 0.719, 0.475]} rotation={[-0.253, 0.365, 0]} />
            <group name="Root_Eye_M_JNT" position={[0, 0.728, 0.511]} rotation={[-0.253, 0, 0]} />
            <group name="Root_Eye_R_JNT" position={[-0.23, 0.719, 0.475]} rotation={[2.889, 0.365, 0]} />
            <group name="Root_Horn_L_JNT" position={[0.114, 0.97, 0.35]} rotation={[0.597, -0.021, -0.187]} />
            <group name="Root_Horn_M_JNT" position={[0, 0.877, 0.446]} rotation={[1.066, 0, 0]} />
            <group name="Root_Horn_R_JNT" position={[-0.114, 0.97, 0.35]} rotation={[-2.544, -0.021, -0.187]} />
            <group name="Root_Horn_T_JNT" position={[0, 0.979, 0.356]} rotation={[0.565, 0, 0]} />
            <group
              name="Root_Mouth_Accessory_L_JNT"
              position={[0.195, 0.456, 0.503]}
              rotation={[0.118, 0.328, -0.029]}
            />
            <group
              name="Root_Mouth_Accessory_R_JNT"
              position={[-0.195, 0.456, 0.503]}
              rotation={[-3.024, 0.328, -0.029]}
            />
            <group name="Root_Mouth_JNT" position={[0, 0.471, 0.537]} rotation={[0.032, 0, 0]} />
            <group name="Root_Mouth_Model_JNT" position={[0, 0.578, 0.536]} rotation={[-0.077, 0, 0]} />
            <group name="Root_Tail_L_JNT" position={[0.161, 0.19, -0.322]} rotation={[-0.753, -0.227, 0.005]} />
            <group name="Root_Tail_M_JNT" position={[0, 0.185, -0.327]} rotation={[-0.775, 0, 0]} />
            <group name="Root_Tail_R_JNT" position={[-0.161, 0.19, -0.322]} rotation={[2.389, -0.227, 0.005]} />
          </group>
        </group>
        <group name="SM_Mesh">
          <skinnedMesh geometry={nodes.SM_Tail_M_1.geometry} name="SM_Tail_M_1" skeleton={nodes.SM_Tail_M_1.skeleton}>
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh geometry={nodes.SM_Back_M_1.geometry} name="SM_Back_M_1" skeleton={nodes.SM_Back_M_1.skeleton}>
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh geometry={nodes.SM_Ear_R_1.geometry} name="SM_Ear_R_1" skeleton={nodes.SM_Ear_R_1.skeleton}>
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh geometry={nodes.SM_Ear_L_1.geometry} name="SM_Ear_L_1" skeleton={nodes.SM_Ear_L_1.skeleton}>
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh geometry={nodes.SM_Horn_M_1.geometry} name="SM_Horn_M_1" skeleton={nodes.SM_Horn_M_1.skeleton}>
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
          <skinnedMesh geometry={nodes.SM_Eye_M_1.geometry} name="SM_Eye_M_1" skeleton={nodes.SM_Eye_M_1.skeleton}>
            <meshStandardMaterial map={texture} />
          </skinnedMesh>
          <skinnedMesh geometry={nodes.SM_Mouth_1.geometry} name="SM_Mouth_1" skeleton={nodes.SM_Mouth_1.skeleton}>
            <meshStandardMaterial map={texture} />
          </skinnedMesh>
          <skinnedMesh geometry={nodes.SM_Body.geometry} name="SM_Body" skeleton={nodes.SM_Body.skeleton}>
            <meshStandardMaterial map={texture} />
            {outline && (
              <Outlines
                angle={0}
                color={outline.color}
                opacity={outline.opacity}
                screenspace={false}
                thickness={outline.thickness}
                transparent={false}
              />
            )}
          </skinnedMesh>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload(`${BASE_URL}starter_puffy.glb`)
