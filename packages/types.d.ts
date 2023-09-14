export const ANIMATIONS = [
  'idle',
  'idleattack',
  'idlecarryitem',
  'idlegethit',
  'cuttree',
  'jump',
  'run',
  'runattack',
  'runcarryitem',
  'rungethit',
  'runjump',
  'walk',
  'walkattack',
  'walkcarryitem',
  'walkjump',
] as const

export declare type Animation = (typeof ANIMATIONS)[number]
export declare type Color = ConstructorParameters<typeof THREE.Color> | THREE.Color | number | string

export type OutlinesProps = {
  color: Color
  opacity: number
  thickness: number
}

export interface AxieStarterProps {
  animation?: Animation
  timeScale?: number
  outline?: OutlinesProps
}
