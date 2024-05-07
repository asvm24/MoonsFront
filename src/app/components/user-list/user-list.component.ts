import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { UserCreateComponent } from '../user-create/user-create.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) { }

  
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.email).subscribe(() => {
      this.loadUsers(); // Reload users after deletion
    });
  }
  dialogIsOpen = false;

  openCreateUserDialog(): void {
    if (!this.dialogIsOpen) {
      this.dialogIsOpen = true;
      const dialogRef = this.dialog.open(UserCreateComponent, {
        width: '400px',
        disableClose: false, 
        hasBackdrop: true 
      });
  
      dialogRef.afterClosed().subscribe(() => {
        this.dialogIsOpen = false;
        this.loadUsers();
      });
    }
  }
  
}


