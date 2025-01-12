import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CandidatureService } from '../../../services/candidature.service';
import { Candidature } from '../../../entities/candidature';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-list-user-candidature',
  templateUrl: './list-user-candidature.component.html',
  styleUrls: ['./list-user-candidature.component.css'],
  imports: [FormsModule, CommonModule, RouterModule],
})
export class ListUserCandidatureComponent implements OnInit {
  candidatures: Candidature[] = [];
  userId: number | null = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private candidatureService: CandidatureService
  ) {}

  ngOnInit(): void {
    // Get the userId from the route parameters
    this.route.paramMap.subscribe((params) => {
      this.userId = Number(params.get('userId'));
      if (this.userId) {
        this.loadCandidatures();
      } else {
        this.errorMessage = 'Invalid user ID.';
        this.isLoading = false;
      }
    });
  }

  loadCandidatures(): void {
    this.candidatureService.getCandidaturesByUser(this.userId!).subscribe(
      (data) => {
        this.candidatures = data;
        this.isLoading = false;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching candidatures:', error);
        this.errorMessage = 'Could not load candidatures.';
        this.isLoading = false;
      }
    );
  }
}
