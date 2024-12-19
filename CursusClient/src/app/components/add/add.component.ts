import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  imports: [],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
})
export class AddComponent {
  constructor(public shared: SharedService, private router: Router) {
    this.router.navigate(['add']);
  }
  wanted = {
    name: '',
    award: 0,
    image: '',
  };
  ajouter() {
    this.shared.wanteds.push(this.wanted);
  }
}
