import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { Master } from '../../../entities/master';
import { Router, RouterModule } from '@angular/router';
import { Faculte } from '../../../entities/faculte';
import { FaculteService } from '../../../services/faculte.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-master',
  templateUrl: './manage-master.component.html',
  styleUrls: ['./manage-master.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class ManageMasterComponent implements OnInit {
  masters: Master[] = []; // Store the list of masters
  isEditing: { [key: number]: boolean } = {}; // Store editing state for each master
  facultes: Faculte[] = []; // List of faculties

  constructor(
    private masterService: MasterService,
    private faculteService: FaculteService, // Inject FaculteService to fetch faculties
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMasters(); // Fetch all masters on component initialization
    this.getFacultes(); // Fetch the list of faculties
  }

  // Fetch all the masters
  getMasters(): void {
    this.masterService.getAll().subscribe((masters) => {
      this.masters = masters;
    });
  }

  // Fetch the list of faculties
  getFacultes(): void {
    this.faculteService.getFacultes().subscribe(
      (data) => {
        this.facultes = data;
      },
      (error) => {
        console.error('Error fetching facultes:', error);
      }
    );
  }

  // Toggle the edit mode for a specific master
  toggleEdit(masterId: number): void {
    this.isEditing[masterId] = !this.isEditing[masterId];
  }

  // Save the updated master
  saveMaster(master: Master): void {
    if (this.isEditing[master.id]) {
      this.masterService.update(master.id, master).subscribe(
        (updatedMaster) => {
          console.log('Master updated:', updatedMaster);
          this.toggleEdit(master.id); // Toggle edit mode off after saving
          this.getMasters(); // Refresh the list of masters after update
        },
        (error) => {
          console.error('Error updating master:', error);
        }
      );
    }
  }

  // Delete a master
  deleteMaster(id: number): void {
    if (confirm('Are you sure you want to delete this master?')) {
      this.masterService.delete(id).subscribe(() => {
        this.masters = this.masters.filter((master) => master.id !== id);
        console.log('Master deleted');
      });
    }
  }
}
