export const ANIMATIONS = [
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
] as const

export type AxieStarter = 'pomodoro' | 'buba' | 'puffy'

export declare type Animation = (typeof ANIMATIONS)[number]

export type OutlinesProps = {
  color: string
  opacity: number
  thickness: number
}

export type AxieStarterProps = {
  animation?: Animation
  timeScale?: number
  outline?: OutlinesProps
}
