import { StackItem } from './stack-item';

export interface Stack {
  yearCreated: number;
  owner: string;
  types: string;
  data: StackItem[];
}