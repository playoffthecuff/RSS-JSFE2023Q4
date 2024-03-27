export interface Car {
  color: string;
  id: number;
  name: string;
}

export type Callback = () => void | ((...args: string[]) => void);
