import { Component } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { catchError, of, tap } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User = {
    email: '',
    role: '',
    phoneNumber: '',
    firstName: '',
    lastName: ''
  };

  constructor(
    private userService: UserService,
    public dialogRef: MatDialogRef<UserCreateComponent>
  ) { }

  isFormValid(user: User): boolean {
    // Add your form validation logic here
    // For example, check if required fields are filled
    return !!(
      user.email && 
      user.role && 
      user.phoneNumber && 
      user.firstName && 
      user.lastName
    );
  }

  createUser(user: User): void {
    console.log(user);
    // Check if form is valid
    if (this.isFormValid(user)) {
      this.userService.createUser(user).pipe(
        tap(() => {
          // Handle success or navigate to another page
          console.log('User created successfully');
          this.dialogRef.close('success'); // Close the dialog with success status
        }),
        catchError((error) => {
          // Handle error
          console.error('Error creating user:', error);
          return of(null);
        })
      ).subscribe();
    } else {
      // Handle form validation errors
      console.error('Form is not valid. Please fill in all required fields.');
    }
  }
}
