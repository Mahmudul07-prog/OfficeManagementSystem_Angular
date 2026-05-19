import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="glass-panel auth-card fade-in">
        <div class="auth-header">
          <h2>Create Account</h2>
          <p>Join OfficeApp today</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" #registerForm="ngForm">
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input type="text" class="form-control" [(ngModel)]="fullName" name="fullName" required>
          </div>

          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
          </div>

          <div *ngIf="error" class="error-msg">{{ error }}</div>
          
          <button type="submit" class="btn-primary w-100" [disabled]="!registerForm.form.valid || isLoading">
            {{ isLoading ? 'Creating account...' : 'Register' }}
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Already have an account? <a routerLink="/login">Sign in</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, var(--bg-color) 0%, #fce7f3 100%);
      padding: 1rem;
    }
    .auth-card {
      width: 100%;
      max-width: 400px;
      padding: 2.5rem;
    }
    .auth-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .auth-header h2 {
      color: var(--secondary-color);
      font-size: 1.75rem;
    }
    .auth-header p {
      color: var(--text-secondary);
      font-size: 0.95rem;
    }
    .w-100 {
      width: 100%;
      padding: 0.75rem;
      font-size: 1rem;
    }
    .auth-footer {
      margin-top: 1.5rem;
      text-align: center;
      font-size: 0.9rem;
    }
    .auth-footer a {
      color: var(--secondary-color);
      text-decoration: none;
      font-weight: 600;
    }
    .error-msg {
      color: #ef4444;
      font-size: 0.85rem;
      margin-bottom: 1rem;
      text-align: center;
    }
  `]
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.error = '';
    this.authService.register({ fullName: this.fullName, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = 'Registration failed. Please check your details.';
        this.isLoading = false;
      }
    });
  }
}
