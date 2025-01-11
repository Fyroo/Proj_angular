import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from '../../../services/master.service';
import { CandidatureService } from '../../../services/candidature.service';
import { Candidature } from '../../../entities/candidature';
import { Master } from '../../../entities/master';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-candidature',
  templateUrl: './list-candidature.component.html',
  imports: [CommonModule],
  styleUrls: ['./list-candidature.component.css'],
})
export class ListCandidatureComponent implements OnInit {
  candidatures: Candidature[] = [];
  master!: Master;
  masterId!: number;
  errorMessage: string = '';

  constructor(
    private masterService: MasterService,
    private candidatureService: CandidatureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract masterId from route parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('masterId');
      if (id) {
        this.masterId = +id; // Convert to number
        this.loadMasterData(); // Fetch master and candidatures
      } else {
        this.errorMessage = 'Master ID is missing.';
      }
    });
  }

  loadMasterData(): void {
    // Fetch the master by its ID
    this.masterService.getCandidatures(this.masterId).subscribe(
      (data) => {
        console.log('Candidatures:', data);
        this.candidatures = data; // Bind to the component
      },
      (error) => {
        console.error('Error fetching candidatures:', error);
      }
    );
  }

  loadCandidatures(): void {
    this.masterService.getCandidatures(this.masterId).subscribe(
      (data) => {
        this.candidatures = data;
      },
      (error) => {
        console.error('Error fetching candidatures:', error);
        this.errorMessage =
          'Failed to load candidatures for the selected master. Please try again.';
      }
    );
  }

  onDelete(candidatureId: number): void {
    if (confirm('Are you sure you want to delete this candidature?')) {
      this.candidatureService.deleteCandidature(candidatureId).subscribe(
        () => {
          this.candidatures = this.candidatures.filter(
            (candidature) => candidature.id !== candidatureId
          );
          console.log('Candidature deleted successfully.');
        },
        (error) => {
          console.error('Error deleting candidature:', error);
          this.errorMessage = 'Failed to delete candidature. Please try again.';
        }
      );
    }
  }

  onEdit(candidatureId: number): void {
    this.router.navigate(['/edit-candidature', candidatureId]);
  }
}
