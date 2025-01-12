import { Master } from './master';
import { User } from './user';
export class Candidature {
  id: number;
  etat: string;
  dateDeSoumission: Date;
  master: Master;
  user: User;

  constructor(
    id: number,
    etat: string,
    dateDeSoumission: Date,
    master: Master,
    user: User
  ) {
    this.id = id;
    this.etat = etat;
    this.dateDeSoumission = dateDeSoumission;
    this.master = master;
    this.user = user;
  }

  // Optionally, you can add methods here if needed
}
