import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CursusService } from '../../../services/cursus.service';
import { Cursus } from '../../../entities/cursus';
import { UserService, User } from '../../../services/user.service'; // Import UserService and User interface
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-cursus',
  templateUrl: './list-cursus.component.html',
  styleUrls: ['./list-cursus.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ListCursusComponent implements OnInit {
  userId: number | null = null; // User ID from route parameter
  user: User | null = null; // User details
  cursuses: Cursus[] = []; // List of Cursus for the given user ID

  constructor(
    private route: ActivatedRoute,
    private cursusService: CursusService,
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit(): void {
    // Fetch userId from route parameters
    this.route.params.subscribe((params) => {
      this.userId = Number(params['userId']);
      if (this.userId) {
        this.fetchUserDetails();
        this.fetchCursuses();
      }
    });
  }

  // Fetch user details
  fetchUserDetails(): void {
    this.userService.getUserById(this.userId!).subscribe(
      (user) => {
        this.user = user; // Store user details
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
  }

  // Fetch Cursuses for the given userId
  fetchCursuses(): void {
    this.cursusService.getCursusesByUser(this.userId!).subscribe(
      (cursuses) => {
        this.cursuses = cursuses;
      },
      (error) => {
        console.error('Error fetching Cursuses:', error);
      }
    );
  }
}
