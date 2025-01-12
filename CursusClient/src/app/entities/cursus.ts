export class Cursus {
  id: number;
  name: string;
  mention: string;
  duration: number;
  userId: number;

  constructor(
    id: number = 0,
    name: string = '',
    mention: string = '',
    duration: number = 0,
    userId: number = 0
  ) {
    this.id = id;
    this.name = name;
    this.mention = mention;
    this.duration = duration;
    this.userId = userId;
  }
}
