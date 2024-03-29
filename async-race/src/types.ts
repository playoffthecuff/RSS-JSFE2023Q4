export interface Car {
  color: string;
  id: number;
  name: string;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export interface SwitchEngine {
  success: boolean;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export type Callback = (
  event: MouseEvent,
) => Promise<void> | void | Promise<boolean>;
