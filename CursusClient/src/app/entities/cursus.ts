import { Candidature } from './candidature';

export class Cursus {
  id: number;
  name: string;
  mention: string;
  duration: number;
  candidature: Candidature;

  constructor(
    id: number = 0,
    name: string = '',
    mention: string = '',
    duration: number = 0,
    candidature: Candidature = new Candidature()
  ) {
    this.id = id;
    this.name = name;
    this.mention = mention;
    this.duration = duration;
    this.candidature = candidature;
  }
}
