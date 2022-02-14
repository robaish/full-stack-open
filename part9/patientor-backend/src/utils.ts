import { v4 as uuid } from 'uuid';

export const generateId = (): string => {
  const id: string = uuid();
  return id;
};