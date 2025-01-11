import { Master } from './master';
import { Cursus } from './cursus';
import { User } from './user';

export class Candidature {
  id: number;
  nom: string;
  prenom: string;
  etat: string;
  dateDeSoumission: Date;
  master: Master;
  cursus: Cursus[];
  user: User; // Added the user field to the class

  constructor(
    id: number = 0,
    nom: string = '',
    prenom: string = '',
    etat: string = '',
    dateDeSoumission: Date = new Date(),
    master: Master = new Master(),
    cursus: Cursus[] = [],
    user: User = new User(0, '', '', '', '', []) // Added user initialization
  ) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.etat = etat;
    this.dateDeSoumission = dateDeSoumission;
    this.master = master;
    this.cursus = cursus;
    this.user = user; // Initialize user
  }
}
