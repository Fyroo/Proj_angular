import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MasterService } from '../../../services/master.service';
import { Master } from '../../../entities/master';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FaculteService } from '../../../services/faculte.service';
import { Faculte } from '../../../entities/faculte';
@Component({
  selector: 'app-add-master',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-master.component.html',
  styleUrls: ['./add-master.component.css'],
})
export class AddMasterComponent implements OnInit {
  master: Master = {
    id: 0,
    name: '',
    specialization: '',
    faculte: null,
    candidatures: [],
    faculteName: '',
  };

  facultes: Faculte[] = [];

  constructor(
    private masterService: MasterService,
    private faculteService: FaculteService, // Inject FaculteService
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch facultes when the component is initialized
    this.faculteService.getFacultes().subscribe(
      (data) => {
        this.facultes = data; // Assign fetched facultes to the property
      },
      (error) => {
        console.error('Error fetching facultes:', error);
      }
    );
  }

  // Method to handle form submission
  onSubmit(): void {
    if (this.master.name && this.master.specialization && this.master.faculte) {
      // Submit the master with the correct faculte object
      console.log('Submitted JSON:', this.master);

      this.masterService.create(this.master).subscribe(
        (response) => {
          console.log('Master added successfully:', response);
          this.router.navigate(['/masters']); // Redirect after adding
        },
        (error) => {
          console.error('Error adding master:', error);
        }
      );
    } else {
      console.log('Please fill in all fields');
    }
  }
}
