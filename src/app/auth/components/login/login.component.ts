import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FormService} from '../../../shared/services/form.service';
import {CrudService} from '../../../shared/services/crud.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService
  ) {}

  async createForm() {
    this.formGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    await this.createForm();
  }

  async onSubmit() {
    if (this.formGroup.valid) {
      await this.crudService.form.submitLoginForm(this.formGroup.value);
    }
  }
}
