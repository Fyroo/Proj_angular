import { Master } from './master';
import { Cursus } from './cursus';

export class Candidature {
  id: number;
  nom: string;
  prenom: string;
  etat: string;
  dateDeSoumission: Date;
  master: Master;
  cursus: Cursus[];

  constructor(
    id: number = 0,
    nom: string = '',
    prenom: string = '',
    etat: string = '',
    dateDeSoumission: Date = new Date(),
    master: Master = new Master(),
    cursus: Cursus[] = []
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.etat = etat;
    this.dateDeSoumission = dateDeSoumission;
    this.master = master;
    this.cursus = cursus;
  }
}
