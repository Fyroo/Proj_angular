import { Master } from './master';

export class Faculte {
  id: number;
  name: string;
  location: string;
  masters: Master[];

  constructor(
    id: number = 0,
    name: string = '',
    location: string = '',
    masters: Master[] = []
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.masters = masters;
  }
}
