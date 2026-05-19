import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OfficeService } from '../../core/services/office.service';
import { OfficeDto, CreateOfficeDto } from '../../core/models/office.model';

@Component({
  selector: 'app-offices',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <h1 class="page-title">Offices</h1>
        <button class="btn-primary" (click)="openModal()">
          <span class="material-icons">add</span> Add Office
        </button>
      </div>

      <div class="glass-panel">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Employees</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let office of offices">
              <td>{{ office.id }}</td>
              <td><strong>{{ office.name }}</strong></td>
              <td>{{ office.location }}</td>
              <td>{{ office.phone }}</td>
              <td><span class="badge">{{ office.employeeCount }}</span></td>
              <td>
                <div class="actions">
                  <button class="btn-icon text-primary" (click)="editOffice(office)">
                    <span class="material-icons">edit</span>
                  </button>
                  <button class="btn-icon text-danger" (click)="deleteOffice(office.id)">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="offices.length === 0">
              <td colspan="6" class="text-center py-4">No offices found. Add one to get started.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Simple Modal Overlay -->
      <div class="modal-overlay" *ngIf="isModalOpen">
        <div class="glass-panel modal-content fade-in">
          <h2>{{ currentOffice.id ? 'Edit' : 'Add' }} Office</h2>
          <form (ngSubmit)="saveOffice()" #officeForm="ngForm">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" class="form-control" [(ngModel)]="currentOffice.name" name="name" required>
            </div>
            <div class="form-group">
              <label class="form-label">Location</label>
              <input type="text" class="form-control" [(ngModel)]="currentOffice.location" name="location" required>
            </div>
            <div class="form-group">
              <label class="form-label">Phone</label>
              <input type="text" class="form-control" [(ngModel)]="currentOffice.phone" name="phone" required>
            </div>
            <div class="modal-actions">
              <button type="button" class="btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-primary" [disabled]="!officeForm.form.valid">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      background: var(--primary-color);
      color: white;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .actions {
      display: flex;
      gap: 0.5rem;
    }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .btn-icon:hover {
      background: rgba(0,0,0,0.05);
    }
    .text-primary { color: var(--primary-color); }
    .text-danger { color: #ef4444; }
    .text-center { text-align: center; }
    .py-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    
    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.4);
      backdrop-filter: blur(4px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
    .modal-content {
      width: 100%;
      max-width: 500px;
      padding: 2rem;
      background: var(--surface-color);
    }
    .modal-content h2 {
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }
    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 1rem;
      margin-top: 2rem;
    }
    .btn-secondary {
      background: white;
      border: 1px solid var(--border-color);
      padding: 0.5rem 1.25rem;
      border-radius: 6px;
      cursor: pointer;
      font-weight: 500;
    }
    .btn-secondary:hover {
      background: #f9fafb;
    }
  `]
})
export class OfficesComponent implements OnInit {
  offices: OfficeDto[] = [];
  isModalOpen = false;
  currentOffice: any = { name: '', location: '', phone: '' };

  constructor(private officeService: OfficeService) {}

  ngOnInit() {
    this.loadOffices();
  }

  loadOffices() {
    this.officeService.getAll().subscribe(data => {
      this.offices = data;
    });
  }

  openModal() {
    this.currentOffice = { name: '', location: '', phone: '' };
    this.isModalOpen = true;
  }

  editOffice(office: OfficeDto) {
    this.currentOffice = { ...office };
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveOffice() {
    if (this.currentOffice.id) {
      this.officeService.update(this.currentOffice.id, this.currentOffice).subscribe({
        next: () => {
          this.loadOffices();
          this.closeModal();
        },
        error: (err) => {
          console.error('Update failed:', err);
          let detail = '';
          if (err.error) {
            detail = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
          } else {
            detail = err.message || 'Unknown error';
          }
          alert(`Failed to update office (Status ${err.status}): ${detail}`);
        }
      });
    } else {
      this.officeService.create(this.currentOffice).subscribe({
        next: () => {
          this.loadOffices();
          this.closeModal();
        },
        error: (err) => {
          console.error('Create failed:', err);
          let detail = '';
          if (err.error) {
            detail = typeof err.error === 'string' ? err.error : JSON.stringify(err.error);
          } else {
            detail = err.message || 'Unknown error';
          }
          alert(`Failed to create office (Status ${err.status}): ${detail}`);
        }
      });
    }
  }

  deleteOffice(id: number) {
    if (confirm('Are you sure you want to delete this office?')) {
      this.officeService.delete(id).subscribe(() => {
        this.loadOffices();
      });
    }
  }
}
