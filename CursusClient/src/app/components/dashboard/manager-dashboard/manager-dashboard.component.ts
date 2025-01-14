import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ManageMasterComponent } from '../../master/manage-master/manage-master.component';

@Component({
  selector: 'app-manager-dashboard',
  imports: [RouterModule, ManageMasterComponent],
  templateUrl: './manager-dashboard.component.html',
  styleUrl: './manager-dashboard.component.css',
})
export class ManagerDashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
