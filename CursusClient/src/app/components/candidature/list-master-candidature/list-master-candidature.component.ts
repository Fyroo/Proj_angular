import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Candidature } from '../../../entities/candidature';
import { CandidatureService } from '../../../services/candidature.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-master-candidature',
  templateUrl: './list-master-candidature.component.html',
  styleUrls: ['./list-master-candidature.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ListMasterCandidatureComponent implements OnInit {
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
        console.log(data);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching candidatures:', error);
        this.errorMessage = 'Could not load candidatures.';
        this.isLoading = false;
      }
    );
  }
}
