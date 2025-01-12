import { Component, OnInit } from '@angular/core';
import { FaculteService } from '../../../services/faculte.service';
import { Faculte } from '../../../entities/faculte';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-faculte',
  templateUrl: './list-faculte.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./list-faculte.component.css'],
})
export class ListFaculteComponent implements OnInit {
  facultes: Faculte[] = [];

  constructor(private faculteService: FaculteService) {}

  ngOnInit(): void {
    this.getFacultes(); // Fetch the list of faculties when the component is initialized
  }

  getFacultes(): void {
    this.faculteService.getFacultes().subscribe(
      (data) => {
        this.facultes = data;
        console.log('Facultes fetched successfully:', data);
      },
      (error) => {
        console.error('Error fetching facultes:', error);
      }
    );
  }
}
