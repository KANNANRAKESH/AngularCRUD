import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServiceService } from '../services.service';

declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userForm: any;
  users: any;

  constructor(public fb: FormBuilder, private service: ServiceService) {
    this.userForm = this.fb.group({
      id: [''],
      Name: [''],
      PhoneNo: [''],
    });
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  submitForm() {
    const userData = this.userForm.value;
    if (userData.id) {
      this.service.UpdateUser(userData.id, userData).subscribe(
        (data: any) => {
          console.log(data);
          alert('User updated successfully');
          this.userForm.reset();
          this.getAllUsers();
        },
        (error) => {
          console.error(error);
          alert('Error occurred while updating user');
        }
      );
    } else {
      this.service.AddUser(userData).subscribe(
        (data: any) => {
          console.log(data);
          alert('User added successfully');
          this.userForm.reset();
          this.getAllUsers();
        },
        (error) => {
          console.error(error);
          alert('Error occurred while adding user');
        }
      );
    }
  }

  getAllUsers() {
    this.service.GetAllUsers().subscribe((data: any) => {
      console.log('users', data);
      this.users = data;
    });
  }

  deleteuser(id: any) {
    this.service.DeleteUser(id).subscribe((data: any) => {
      alert('User deleted successfully');
      this.getAllUsers();
    });
  }

  getByIdUser(id: any) {
    this.service.GetUserById(id).subscribe((data: any) => {
      console.log('user detail', data);
      this.userForm.patchValue(data);
      $('#home-tab').click();
    });
  }
}
