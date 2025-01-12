import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService, User } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  username: string = ''; // Username of the logged-in user
  user: User | null = null;
  loading: boolean = false;
  error: string | null = null;
  editMode: boolean = false; // Flag to toggle between view and edit modes

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
    this.profileForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.username = localStorage.getItem('username') || '';
    if (!this.username) {
      this.error = 'User not logged in.';
      return;
    }
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.loading = true;
    this.userService.getUser(this.username).subscribe({
      next: (data: User) => {
        this.user = data;
        this.profileForm.patchValue({
          fullname: data.fullname,
          email: data.email,
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading user profile:', err);
        this.error = 'Failed to load user profile.';
        this.loading = false;
      },
    });
  }

  updateProfile(): void {
    if (this.profileForm.invalid) {
      return;
    }

    const updatedUser: Partial<User> = {
      fullname: this.profileForm.value.fullname,
      email: this.profileForm.value.email,
    };

    this.userService.updateUser(this.username, updatedUser as User).subscribe({
      next: (updatedUser) => {
        alert('Profile updated successfully!');
        this.user = updatedUser;
        this.toggleEditMode(); // Switch back to view mode
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.error = 'Failed to update profile.';
      },
    });
  }

  toggleEditMode(): void {
    this.editMode = !this.editMode;

    // If entering edit mode, reset form to current user values
    if (this.editMode && this.user) {
      this.profileForm.patchValue({
        fullname: this.user.fullname,
        email: this.user.email,
      });
    }
  }
}
