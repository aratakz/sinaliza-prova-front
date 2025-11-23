import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../../shared/services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {FormService} from '../../../shared/services/form.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  formGroup: FormGroup;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private formService: FormService,
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
      await this.formService.submitLoginForm(this.formGroup.value);
    }
  }
}
