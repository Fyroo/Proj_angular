import { Role } from './role';
import { Candidature } from './candidature';
import { Cursus } from './cursus';

export class User {
  id: number;
  username: string;
  password: string;
  fullname: string;
  email: string | null;
  roles: Role[]; // Roles are represented as an array of Role objects
  candidatures: Candidature[]; // Assuming Candidature is another model in your frontend
  cursuss: Cursus[]; // Assuming Cursus is another model in your frontend

  constructor(
    id: number,
    username: string,
    password: string,
    fullname: string,
    email: string | null,
    roles: Role[],
    candidatures: Candidature[] = [],
    cursuss: Cursus[] = []
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.fullname = fullname;
    this.email = email;
    this.roles = roles;
    this.candidatures = candidatures;
    this.cursuss = cursuss;
  }
}
