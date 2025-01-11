import { Component, OnInit } from '@angular/core';
import { FaculteService } from '../../../services/faculte.service'; // Import FaculteService
import { Faculte } from '../../../entities/faculte'; // Import Faculte class
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-faculte',
  templateUrl: './list-faculte.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./list-faculte.component.css'],
})
export class ListFaculteComponent implements OnInit {
  facultes: Faculte[] = []; // Array to store the list of faculties

  constructor(private faculteService: FaculteService) {}

  ngOnInit(): void {
    this.getFacultes(); // Fetch the list of faculties when the component is initialized
  }

  // Method to get the list of faculties
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

  // Method to delete a faculty
  deleteFaculte(faculteId: number): void {
    if (confirm('Are you sure you want to delete this faculte?')) {
      this.faculteService.deleteFaculte(faculteId).subscribe(
        () => {
          this.facultes = this.facultes.filter(
            (faculte) => faculte.id !== faculteId
          ); // Remove deleted faculte from the list
          console.log('Faculte deleted successfully');
        },
        (error) => {
          console.error('Error deleting faculte:', error);
        }
      );
    }
  }
}
