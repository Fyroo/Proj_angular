import { Component, OnInit } from '@angular/core';
import { CursusService } from '../../../services/cursus.service';
import { Cursus } from '../../../entities/cursus';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-cursus',
  templateUrl: './manage-cursus.component.html',
  styleUrls: ['./manage-cursus.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ManageCursusComponent implements OnInit {
  cursuses: Cursus[] = []; // List of Cursus
  newCursus: Cursus = new Cursus(); // Object for adding/editing a Cursus
  userId: number | null = null; // Logged-in user ID
  editMode: boolean = false; // Toggle between add and edit modes

  constructor(private cursusService: CursusService) {}

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId')); // Get userId from localStorage
    if (this.userId) {
      this.getCursusesByUser();
    }
  }

  // Fetch all Cursus for the logged-in user
  getCursusesByUser(): void {
    this.cursusService.getCursusesByUser(this.userId!).subscribe(
      (cursuses) => {
        this.cursuses = cursuses;
      },
      (error) => {
        console.error('Error fetching Cursus:', error);
      }
    );
  }

  // Add or update a Cursus
  saveCursus(): void {
    if (!this.userId) {
      console.error('User ID is missing.');
      return;
    }

    if (this.editMode) {
      // Edit existing Cursus
      this.cursusService
        .updateCursus(this.newCursus.id, this.newCursus)
        .subscribe(
          (updatedCursus) => {
            const index = this.cursuses.findIndex(
              (c) => c.id === updatedCursus.id
            );
            if (index !== -1) {
              this.cursuses[index] = updatedCursus; // Update the list
            }
            this.resetForm();
          },
          (error) => {
            console.error('Error updating Cursus:', error);
          }
        );
    } else {
      // Add new Cursus
      this.cursusService.createCursus(this.userId, this.newCursus).subscribe(
        (createdCursus) => {
          this.cursuses.push(createdCursus); // Add to the list
          this.resetForm();
        },
        (error) => {
          console.error('Error creating Cursus:', error);
        }
      );
    }
  }

  // Prepare the form for editing
  editCursus(cursus: Cursus): void {
    this.newCursus = { ...cursus }; // Clone the Cursus for editing
    this.editMode = true;
  }

  // Reset the form
  resetForm(): void {
    this.newCursus = new Cursus();
    this.editMode = false;
  }

  // Delete a Cursus
  deleteCursus(cursusId: number): void {
    if (confirm('Are you sure you want to delete this Cursus?')) {
      this.cursusService.deleteCursus(cursusId).subscribe(
        () => {
          this.cursuses = this.cursuses.filter((c) => c.id !== cursusId); // Remove from the list
        },
        (error) => {
          console.error('Error deleting Cursus:', error);
        }
      );
    }
  }
}
