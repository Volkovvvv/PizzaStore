export type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
