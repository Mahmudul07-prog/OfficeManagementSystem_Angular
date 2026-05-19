import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div class="sidebar">
      <div class="logo">
        <span class="material-icons">business</span>
        <h2>OfficeApp</h2>
      </div>
      <nav class="nav-menu">
        <a routerLink="/dashboard" routerLinkActive="active" class="nav-item">
          <span class="material-icons">dashboard</span>
          <span>Dashboard</span>
        </a>
        <a routerLink="/offices" routerLinkActive="active" class="nav-item">
          <span class="material-icons">location_city</span>
          <span>Offices</span>
        </a>
        <a routerLink="/employees" routerLinkActive="active" class="nav-item">
          <span class="material-icons">people</span>
          <span>Employees</span>
        </a>
      </nav>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 260px;
      background-color: var(--sidebar-bg);
      color: var(--sidebar-text);
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }
    .logo {
      padding: 2rem 1.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .logo h2 {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: 1px;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .nav-menu {
      padding: 1.5rem 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.875rem 1.5rem;
      color: rgba(255,255,255,0.7);
      text-decoration: none;
      transition: all 0.2s ease;
      position: relative;
    }
    .nav-item:hover, .nav-item.active {
      color: #fff;
      background-color: rgba(255,255,255,0.05);
    }
    .nav-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: var(--primary-color);
      border-radius: 0 4px 4px 0;
    }
    .nav-item .material-icons {
      font-size: 1.25rem;
    }
  `]
})
export class SidebarComponent {}
