import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FaculteService } from '../../../services/faculte.service'; // Import FaculteService
import { Faculte } from '../../../entities/faculte'; // Import Faculte class
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-faculte',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-faculte.component.html',
  styleUrls: ['./add-faculte.component.css'],
})
export class AddFaculteComponent implements OnInit {
  faculte: Faculte = new Faculte(); // Initialize empty Faculte

  constructor(
    private faculteService: FaculteService, // Inject FaculteService
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {}

  // Method to handle form submission
  onSubmit(): void {
    if (this.faculte.name && this.faculte.location) {
      this.faculteService.addFaculte(this.faculte).subscribe(
        (response) => {
          console.log('Faculte added successfully:', response);
          this.router.navigate(['/facultes']); // Redirect to list of faculties after adding
        },
        (error) => {
          console.error('Error adding faculte:', error);
        }
      );
    } else {
      console.log('Please fill in all fields');
    }
  }
}
