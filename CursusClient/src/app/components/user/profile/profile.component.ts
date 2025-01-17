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

export interface Role {
  id: number;
  name: string;
}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  editMode: { [key: string]: boolean } = {
    email: false,
    fullname: false
  };
  profileForm: FormGroup;
  username: string = ''; // Username of the logged-in user
  user: User | null = null;
  roles: Role[]=[]; // Roles of the logged-in user
  loading: boolean = false;
  error: string | null = null;
Object: any;
   // Flag to toggle between view and edit modes

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
    //get user roles
    const rolesString = localStorage.getItem('roles') || '';
    this.roles = JSON.parse(rolesString);
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
  toggleEdit(field: string): void {
    this.editMode[field] = !this.editMode[field];
    if (this.editMode[field]) {
      this.profileForm.patchValue({
        [field]: (this.user as any)?.[field]
      });
    }
  }
  saveField(field: string): void {
    const updatedUser: Partial<User> = {
      fullname: this.profileForm.value.fullname,
      email: this.profileForm.value.email,
    };
    if (this.profileForm.get(field)?.valid) {
      this.userService.updateUser(this.username,  updatedUser as User).subscribe({
        next: (updatedUser) => {
          this.user = updatedUser;
          this.editMode[field] = false;
        },
        error: (error) => {
          console.error('Error updating user:', error);
        }
      });
    }
  }
}
