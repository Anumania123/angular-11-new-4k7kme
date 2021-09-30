import { Injectable } from '@angular/core';
import { Employee } from '../model/employee';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiUrl: string = 'https://jsonplaceholder.typicode.com/users';
  constructor(private http: HttpClient) {}
  editUser(employee: Employee) {
    return this.http.put(this.apiUrl + 'UpdateEmployeeDetails/', employee);
  }
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}`);
  }
  addUser(user: Employee): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<string>(
      `${this.apiUrl}/InsertUserDetails/`,
      user,
      httpOptions
    );
  }
  updateUser(user: Employee): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.put<string>(
      `${this.apiUrl}/UpdateEmployeeDetails/`,
      user,
      httpOptions
    );
  }
  deleteUser(userId: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.delete<string>(
      `${this.apiUrl}/DeleteUserDetails?id=` + userId,
      httpOptions
    );
  }
}
