import { Faculte } from './faculte';
import { Candidature } from './candidature';

export class Master {
  id: number;
  name: string;
  specialization: string;
  faculte: Faculte | null;
  candidatures: Candidature[];
  faculteName: string;

  constructor(
    id: number = 0,
    name: string = '',
    specialization: string = '',
    faculte: Faculte = new Faculte(),
    candidatures: Candidature[] = [],
    faculteName: string = ''
  ) {
    this.id = id;
    this.name = name;
    this.specialization = specialization;
    this.faculte = faculte;
    this.candidatures = candidatures;
    this.faculteName = faculteName;
  }
}
