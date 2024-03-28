export interface Car {
  color: string;
  id: number;
  name: string;
}

export interface Engine {
  velocity: number;
  distance: number;
}

export type Callback = (
  event: MouseEvent,
) => void | void | (() => void) | ((...args: string[]) => void);
