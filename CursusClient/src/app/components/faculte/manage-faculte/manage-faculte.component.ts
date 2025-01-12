import { Component, OnInit } from '@angular/core';
import { FaculteService } from '../../../services/faculte.service';
import { Faculte } from '../../../entities/faculte';
import { Master } from '../../../entities/master';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-faculte',
  templateUrl: './manage-faculte.component.html',
  imports: [CommonModule, RouterModule, FormsModule],
  styleUrls: ['./manage-faculte.component.css'],
})
export class ManageFaculteComponent implements OnInit {
  facultes: Faculte[] = [];
  selectedFaculte: Faculte = new Faculte(); // Initialize with an empty Faculte object
  isEditing = false;

  constructor(private faculteService: FaculteService) {}

  ngOnInit(): void {
    this.getFacultes(); // Fetch faculties when the component is initialized
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

  // Edit an existing faculte
  editFaculte(faculte: Faculte): void {
    this.isEditing = true;
    this.selectedFaculte = { ...faculte }; // Make a copy of the faculty to edit
  }

  // Save the changes to the faculte
  saveFaculte(): void {
    if (this.selectedFaculte.id) {
      this.faculteService
        .updateFaculte(this.selectedFaculte.id, this.selectedFaculte)
        .subscribe(
          (updatedFaculte) => {
            const index = this.facultes.findIndex(
              (f) => f.id === updatedFaculte.id
            );
            if (index > -1) {
              this.facultes[index] = updatedFaculte; // Update the faculty in the list
            }
            this.isEditing = false;
            this.selectedFaculte = new Faculte(); // Reset after saving
            console.log('Faculte updated successfully');
          },
          (error) => {
            console.error('Error updating faculte:', error);
          }
        );
    }
  }

  // Cancel the editing
  cancelEdit(): void {
    this.isEditing = false;
    this.selectedFaculte = new Faculte(); // Reset after cancel
  }

  // Delete a faculte
  deleteFaculte(faculteId: number): void {
    if (confirm('Are you sure you want to delete this faculte?')) {
      this.faculteService.deleteFaculte(faculteId).subscribe(
        () => {
          this.facultes = this.facultes.filter((f) => f.id !== faculteId); // Remove the deleted faculte
          console.log('Faculte deleted successfully');
        },
        (error) => {
          console.error('Error deleting faculte:', error);
        }
      );
    }
  }
}
