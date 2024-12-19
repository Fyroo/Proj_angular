import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../services/shared.service';
@Component({
  selector: 'app-afficher',
  imports: [CommonModule, FormsModule],
  templateUrl: './afficher.component.html',
  styleUrl: './afficher.component.css',
})
export class AfficherComponent {
  constructor(public shared: SharedService) {}
  wanted = {
    name: '',
    award: 0,
    image: '',
  };
  ajouter() {
    this.shared.wanteds.push(this.wanted);
  }
}
