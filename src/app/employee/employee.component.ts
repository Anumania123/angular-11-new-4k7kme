import { Component, OnInit } from '@angular/core';
import { Employee } from '../model/employee';
import { ColDef, GridApi, ColumnApi } from 'ag-grid-community';
import { EmployeeService } from '../services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  // row data and column definitions
  public users: Employee[];
  public columnDefs: ColDef[];
  // gridApi and columnApi
  private api: GridApi;
  private columnApi: ColumnApi;
  constructor(
    private userService: EmployeeService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.columnDefs = this.createColumnDefs();
  }
  ngOnInit() {
    this.userService.getEmployees().subscribe((data) => {
      this.users = data;
    });
  }
  // one grid initialisation, grap the APIs and auto resize the columns to fit the available space
  onGridReady(params): void {
    this.api = params.api;
    this.columnApi = params.columnApi;
    this.api.sizeColumnsToFit();
  }
  // create column definitions
  private createColumnDefs() {
    return [
      {
        headerName: 'User Name',
        field: 'UserName',
        filter: true,
        enableSorting: true,
        editable: true,
        sortable: true,
      },
      {
        headerName: 'Email Id',
        field: 'EmailId',
        filter: true,
        editable: true,
        sortable: true,
      },
      {
        headerName: 'Gender',
        field: 'Gender',
        filter: true,
        sortable: true,
        editable: true,
        cellRenderer: '<a href="edit-user">{{email}}</a>',
      },
      {
        headerName: 'Address',
        field: 'Address',
        filter: true,
        editable: true,
        sortable: true,
      },
      {
        headerName: 'Mobile',
        field: 'MobileNo',
        filter: true,
        editable: true,
      },
    ];
  }
  status: any;
  //Update user
  editUser() {
    debugger;
    const d = this.api.getEditingCells();
    if (this.api.getSelectedRows().length == 0) {
      this.toastr.error('error', 'Please select a User for update');
      return;
    }
    var row = this.api.getSelectedRows();
    this.userService.updateUser(row[0]).subscribe((data) => {
      this.toastr.success('success', data);
      this.ngOnInit();
    });
  }
  //Delete user
  deleteUser() {
    debugger;
    var selectedRows = this.api.getSelectedRows();
    if (selectedRows.length == 0) {
      this.toastr.error('error', 'Please select a User for deletion');
      return;
    }
    this.userService.deleteUser(selectedRows[0].UserId).subscribe((data) => {
      this.toastr.success('success', data);
      this.ngOnInit();
      this.api.refreshRows(null);
    });
  }
  Add() {
    this.router.navigate(['addUser']);
  }
}
