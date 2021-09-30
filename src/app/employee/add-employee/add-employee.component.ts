import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  @Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.css'],
  })
  submitted: boolean = false;
  employeeForm: any;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private userService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      Name: ['', Validators.required],
      EmailId: ['', Validators.required],
      Gender: ['', Validators.required],
      Address: ['', Validators.required],
      MobileNo: ['', Validators.required],
      PinCode: ['', Validators.required],
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) {
      return;
    }
    this.userService.addUser(this.employeeForm.value).subscribe((data) => {
      this.toastr.success('success', data.toString());
      this.router.navigate(['users']);
    });
  }
  Cancel() {
    this.router.navigate(['users']);
  }
}
