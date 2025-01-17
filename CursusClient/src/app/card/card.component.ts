import { Component, Input } from '@angular/core';
interface Link {
  name: string;
  routerLink: string;
}
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() imageUrl: string = 'https://picsum.photos/id/1011/800/450';
  @Input() title: string = 'This is some title';
  @Input() description: string = 'Curabitur convallis ac quam vitae laoreet...';
  @Input() links: Link[] = [
    { name: 'Link 1', routerLink: '#' },
    { name: 'Link 2', routerLink: '#' }
  ];
}