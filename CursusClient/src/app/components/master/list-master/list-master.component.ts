import { Component, OnInit } from '@angular/core';
import { MasterService } from '../../../services/master.service';
import { Master } from '../../../entities/master';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-list-master',
  templateUrl: './list-master.component.html',
  imports: [CommonModule, RouterModule],
  styleUrls: ['./list-master.component.css'],
})
export class ListMasterComponent implements OnInit {
  masters: Master[] = [];

  constructor(private masterService: MasterService) {}

  ngOnInit(): void {
    this.getMasters();
  }

  // Use the correct method name `getAll` from the service
  getMasters(): void {
    this.masterService.getAll().subscribe((masters) => {
      console.log(masters);
      this.masters = masters;
    });
  }

  // Use the correct method name `delete` from the service
  deleteMaster(id: number): void {
    if (confirm('Are you sure you want to delete this master?')) {
      this.masterService.delete(id).subscribe(() => {
        this.masters = this.masters.filter((master) => master.id !== id);
      });
    }
  }
}
