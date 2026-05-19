import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  template: `
    <header class="header">
      <div class="search-bar">
        <!-- Optional search bar placeholder -->
      </div>
      <div class="user-profile">
        <div class="user-info">
          <span class="user-name">{{ userName }}</span>
          <span class="user-email">{{ userEmail }}</span>
        </div>
        <button class="logout-btn" (click)="logout()">
          <span class="material-icons">logout</span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    .header {
      height: 70px;
      background-color: var(--surface-color);
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2rem;
      box-shadow: var(--shadow-sm);
    }
    .user-profile {
      display: flex;
      align-items: center;
      gap: 1.5rem;
    }
    .user-info {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .user-name {
      font-weight: 600;
      color: var(--text-primary);
      font-size: 0.95rem;
    }
    .user-email {
      font-size: 0.8rem;
      color: var(--text-secondary);
    }
    .logout-btn {
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .logout-btn:hover {
      background: #ef4444;
      color: white;
    }
  `]
})
export class HeaderComponent implements OnInit {
  userName = '';
  userEmail = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.currentUserValue;
    if (user) {
      this.userName = user.fullName;
      this.userEmail = user.email;
    }
  }

  logout() {
    this.authService.logout();
  }
}
