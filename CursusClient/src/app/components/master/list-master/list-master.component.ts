import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { Master } from '../../../entities/master';
import { CandidatureService } from '../../../services/candidature.service'; // Import the Candidature service
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-master',
  templateUrl: './list-master.component.html',
  styleUrls: ['./list-master.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ListMasterComponent implements OnInit {
  masters: Master[] = [];
  userId: number | undefined; // Store the user ID
  userFullName: string | null = null; // Store the user's full name

  constructor(
    private masterService: MasterService,
    private candidatureService: CandidatureService, // Inject the Candidature service
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMasters();
    this.userId = Number(localStorage.getItem('userId')); // Retrieve the userId from localStorage
  }

  // Fetch all the masters
  getMasters(): void {
    this.masterService.getAll().subscribe((masters) => {
      console.log(masters);
      this.masters = masters;
    });
  }

  createCandidature(masterId: number): void {
    if (!this.userId) {
      console.error('User is not logged in.');
      return;
    }

    // Call the Candidature service to create the candidature
    this.candidatureService
      .createCandidature(this.userId, masterId) // No need to pass dateDeSoumission or etat
      .subscribe(
        (response) => {
          console.log('Candidature created successfully:', response);
          alert('Candidature created successfully!');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error creating candidature:', error);
          alert('Failed to create candidature.');
        }
      );
  }
}
