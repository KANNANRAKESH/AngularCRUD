import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../services.service';

 @Component({
   selector: 'app-form-api',
   templateUrl: './form-api.component.html',
   styleUrls: ['./form-api.component.css']
 })
export class FormApiComponent implements OnInit {
  form!: FormGroup;
  id!: number;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: ServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = +idParam;
      this.getDataById(this.id);
    }
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      Name: ['', Validators.required],
      PhoneNo: ['', Validators.required],
      Atendance: [''],
      Gender:[''],
    });
  }

  getDataById(id: number) {
    this.dataService.GetUserById(id).subscribe(data => {
      this.form.patchValue(data);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.id) {
        this.dataService.UpdateUser(this.id, this.form.value).subscribe(() => {
          this.router.navigate(['/Table']);
        });
      } else {
        this.dataService.AddUser(this.form.value).subscribe(() => {
          this.router.navigate(['/Table']);
        });
      }
    }
  }
   
  goBack() {
    this.router.navigate(['/Table']); 
  }
}
