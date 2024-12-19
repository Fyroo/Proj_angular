import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AfficherComponent } from '../afficher/afficher.component';
import { AddComponent } from '../add/add.component';
@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {}
