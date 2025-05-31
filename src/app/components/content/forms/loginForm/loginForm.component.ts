import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-loginForm',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loginForm.component.html',
  styleUrls: ['./loginForm.component.css']
})
export class LoginFormComponent implements OnInit {

  // ***************************************************************
  // * Variables Section
  // ***************************************************************

  // variable que almacena el formulario de login
  loginForm!: FormGroup;

  // ***************************************************************

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    // Inicializacion y validacion de los campos del formulario
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]

    });
  }

}
