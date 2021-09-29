import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { Employee } from '../model';
import { EmployeeService } from '../services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  users: Employee[];

  constructor(private userService: EmployeeService) {}

  ngOnInit() {
    this.loading = true;
    this.userService
      .getEmployees()
      .pipe(first())
      .subscribe((users) => {
        this.loading = false;
        this.users = users;
      });
  }
}
