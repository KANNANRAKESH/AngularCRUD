// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-table-api',
//   templateUrl: './table-api.component.html',
//   styleUrls: ['./table-api.component.css']
// })
// export class TableApiComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../services.service';

 @Component({
   selector: 'app-table-api',
   templateUrl: './table-api.component.html',
   styleUrls: ['./table-api.component.css']
 })
export class TableApiComponent implements OnInit {
  data!: any[];

  constructor(private dataService: ServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.dataService.GetAllUsers().subscribe(data => {
      this.data = data;
    });
  }

  edit(id: number) {
    this.router.navigate(['/Form', id]);
  }

  delete(id: number) {
    this.dataService.DeleteUser(id).subscribe(() => {
      this.getData();
    });
  }
   goForm() {
    this.router.navigate(['/Form']);
    
  }
}