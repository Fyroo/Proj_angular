import { Component, OnInit } from '@angular/core';
import { CandidatureService } from '../../../services/candidature.service';
import { Candidature } from '../../../entities/candidature';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-candidature',
  templateUrl: './add-candidature.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./add-candidature.component.css'],
})
export class AddCandidatureComponent implements OnInit {
  candidature: Candidature = new Candidature();
  masterId!: number;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private candidatureService: CandidatureService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Extract masterId from the route parameters
    this.route.paramMap.subscribe((params) => {
      const id = params.get('masterId');
      if (id) {
        this.masterId = +id; // Convert to number
      } else {
        this.errorMessage = 'Master ID is missing.';
      }
    });
  }

  onSubmit(): void {
    if (!this.masterId) {
      this.errorMessage = 'Master ID is required to add a candidature.';
      return;
    }

    this.candidatureService
      .addCandidature(this.masterId, this.candidature)
      .subscribe(
        (response) => {
          this.successMessage = 'Candidature added successfully.';
          console.log('Candidature added successfully', response);
          setTimeout(() => {
            this.router.navigate(['/candidature-list']); // Redirect to candidature list
          }, 2000);
        },
        (error) => {
          this.errorMessage = 'Error adding candidature. Please try again.';
          console.error('Error adding candidature', error);
        }
      );
  }
}
