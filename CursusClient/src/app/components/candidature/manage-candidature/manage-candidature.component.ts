import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CandidatureService } from '../../../services/candidature.service';
import { Candidature } from '../../../entities/candidature';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-candidature',
  templateUrl: './manage-candidature.component.html',
  styleUrls: ['./manage-candidature.component.css'],
  imports: [RouterModule, CommonModule, FormsModule],
})
export class ManageCandidatureComponent implements OnInit {
  candidatures: Candidature[] = [];
  masterId: number | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private candidatureService: CandidatureService
  ) {}

  ngOnInit(): void {
    // Get the masterId from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.masterId = Number(params.get('masterId'));
      if (this.masterId) {
        this.loadCandidatures();
      } else {
        this.errorMessage = 'Invalid master ID.';
        this.isLoading = false;
      }
    });
  }

  loadCandidatures(): void {
    this.candidatureService.getCandidaturesByMaster(this.masterId!).subscribe(
      (data) => {
        this.candidatures = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching candidatures:', error);
        this.errorMessage = 'Could not load candidatures.';
        this.isLoading = false;
      }
    );
  }

  updateEtat(candidature: Candidature, newEtat: string): void {
    this.candidatureService
      .updateCandidatureEtat(candidature.id, newEtat)
      .subscribe(
        (updatedCandidature) => {
          candidature.etat = updatedCandidature.etat; // Update the local data
          alert('Candidature status updated successfully!');
        },
        (error) => {
          console.error('Error updating candidature status:', error);
          alert('Failed to update candidature status.');
        }
      );
  }

  deleteCandidature(candidatureId: number): void {
    if (confirm('Are you sure you want to delete this candidature?')) {
      this.candidatureService.deleteCandidature(candidatureId).subscribe(
        () => {
          this.candidatures = this.candidatures.filter(
            (c) => c.id !== candidatureId
          ); // Remove from local data
          alert('Candidature deleted successfully!');
        },
        (error) => {
          console.error('Error deleting candidature:', error);
          alert('Failed to delete candidature.');
        }
      );
    }
  }
}
