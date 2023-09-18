import { create } from 'zustand'

type AnimationState = {
  currentAnimation: string
  playAnimation: (currentAnimation: string) => void
}

export const useAnimation = create<AnimationState>()((set) => ({
  currentAnimation: 'idle',
  playAnimation: (currentAnimation: string) => set({ currentAnimation }),
}))
