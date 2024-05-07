import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { catchError, tap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  form: FormGroup;
  fields = [
    { name: 'email', placeholder: 'Email' },
    { name: 'firstName', placeholder: 'First Name' },
    { name: 'lastName', placeholder: 'Last Name' },
    { name: 'role', placeholder: 'Role' },
    { name: 'phoneNumber', placeholder: 'Phone Number' }
  ];
  

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserCreateComponent>
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
  }

  createUser(): void {
    if (this.form.valid) {
      const user = this.form.value;
      this.userService.createUser(user).pipe(
        tap(() => {
          console.log('User created successfully');
          this.dialogRef.close();
        }),
        catchError((error) => {
          console.error('Error creating user:', error);
          // Handle error
          return [];
        })
      ).subscribe();
    } else {
      console.error('Form is not valid. Please fill in all required fields.');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}