import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="auth-container">
      <div class="glass-panel auth-card fade-in">
        <div class="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to continue to OfficeApp</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" #loginForm="ngForm">
          <div class="form-group">
            <label class="form-label">Email</label>
            <input type="email" class="form-control" [(ngModel)]="email" name="email" required>
          </div>
          
          <div class="form-group">
            <label class="form-label">Password</label>
            <input type="password" class="form-control" [(ngModel)]="password" name="password" required>
          </div>

          <div *ngIf="error" class="error-msg">{{ error }}</div>
          
          <button type="submit" class="btn-primary w-100" [disabled]="!loginForm.form.valid || isLoading">
            {{ isLoading ? 'Signing in...' : 'Sign In' }}
          </button>
        </form>
        
        <div class="auth-footer">
          <p>Don't have an account? <a routerLink="/register">Register</a></p>
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
      background: linear-gradient(135deg, var(--bg-color) 0%, #e0e7ff 100%);
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
      color: var(--primary-color);
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
      color: var(--primary-color);
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
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.isLoading = true;
    this.error = '';
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error || 'Invalid credentials. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
