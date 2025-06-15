import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IEmailUpdate } from '../../../../core/model/user/IEmailUpdate.interface';
import { UserService } from '../../../../core/services/userService/user.service';
import { AuthService } from '../../../../core/services/authService/auth.service';

@Component({
  selector: 'app-update-email-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-email-form.component.html',
  styleUrl: './update-email-form.component.css'
})
export class UpdateEmailFormComponent {
  @Input() userId: string = '';
  @Input() oldEmail: string = '';
  @Output() save = new EventEmitter<IEmailUpdate>();
  @Output() cancel = new EventEmitter<void>();

  emailForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private authService: AuthService ) {
    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.emailForm.valid) {

      this.save.emit({
        userId: this.userId,
        oldEmail: this.oldEmail,
        newEmail: this.emailForm.value.newEmail
      });
      const userId = this.authService.getUserIdFromToken();
      const data = {
        userId: userId,
        oldEmail: this.oldEmail,
        newEmail: this.emailForm.value.newEmail
      }
      this.userService.updateEmail(userId, data).subscribe({
        next: (response) => {
          console.log('Email updated successfully:', response);
          this.emailForm.reset();
        },
        error: (error) => {
          console.error('Error updating email:', error);
        }
      });

    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
