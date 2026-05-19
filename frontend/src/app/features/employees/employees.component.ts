import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { OfficeService } from '../../core/services/office.service';
import { EmployeeDto } from '../../core/models/employee.model';
import { OfficeDto } from '../../core/models/office.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <h1 class="page-title">Employees</h1>
        <button class="btn-primary" (click)="openModal()">
          <span class="material-icons">add</span> Add Employee
        </button>
      </div>

      <div class="glass-panel">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Salary</th>
              <th>Office</th>
              <th>Hire Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let emp of employees">
              <td><strong>{{ emp.fullName }}</strong></td>
              <td>{{ emp.email }}</td>
              <td>{{ emp.position }}</td>
              <td>{{ emp.salary | currency }}</td>
              <td>
                <span class="badge badge-office">
                  <span class="material-icons text-xs">business</span>
                  {{ emp.officeName }}
                </span>
              </td>
              <td>{{ emp.hireDate | date:'mediumDate' }}</td>
              <td>
                <div class="actions">
                  <button class="btn-icon text-primary" (click)="editEmployee(emp)">
                    <span class="material-icons">edit</span>
                  </button>
                  <button class="btn-icon text-danger" (click)="deleteEmployee(emp.id)">
                    <span class="material-icons">delete</span>
                  </button>
                </div>
              </td>
            </tr>
            <tr *ngIf="employees.length === 0">
              <td colspan="7" class="text-center py-4">No employees found. Add one to get started.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Simple Modal Overlay -->
      <div class="modal-overlay" *ngIf="isModalOpen">
        <div class="glass-panel modal-content fade-in">
          <h2>{{ currentEmployee.id ? 'Edit' : 'Add' }} Employee</h2>
          <form (ngSubmit)="saveEmployee()" #empForm="ngForm">
            <div class="grid-2">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-control" [(ngModel)]="currentEmployee.fullName" name="fullName" required>
              </div>
              <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-control" [(ngModel)]="currentEmployee.email" name="email" required>
              </div>
              <div class="form-group">
                <label class="form-label">Position</label>
                <input type="text" class="form-control" [(ngModel)]="currentEmployee.position" name="position" required>
              </div>
              <div class="form-group">
                <label class="form-label">Salary</label>
                <input type="number" class="form-control" [(ngModel)]="currentEmployee.salary" name="salary" required min="0">
              </div>
              <div class="form-group">
                <label class="form-label">Hire Date</label>
                <input type="date" class="form-control" [(ngModel)]="currentEmployee.hireDate" name="hireDate" required>
              </div>
              <div class="form-group">
                <label class="form-label">Office</label>
                <select class="form-control" [(ngModel)]="currentEmployee.officeId" name="officeId" required>
                  <option [ngValue]="null" disabled>Select Office</option>
                  <option *ngFor="let office of offices" [value]="office.id">{{ office.name }}</option>
                </select>
              </div>
            </div>
            
            <div class="modal-actions">
              <button type="button" class="btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-primary" [disabled]="!empForm.form.valid">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 500;
    }
    .badge-office {
      background: rgba(236, 72, 153, 0.1);
      color: var(--secondary-color);
    }
    .text-xs { font-size: 1rem; }
    .actions { display: flex; gap: 0.5rem; }
    .btn-icon {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: background 0.2s;
    }
    .btn-icon:hover { background: rgba(0,0,0,0.05); }
    .text-primary { color: var(--primary-color); }
    .text-danger { color: #ef4444; }
    .text-center { text-align: center; }
    .py-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    
    .grid-2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

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
      max-width: 650px;
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
    .btn-secondary:hover { background: #f9fafb; }
    
    @media(max-width: 600px) {
      .grid-2 { grid-template-columns: 1fr; }
    }
  `]
})
export class EmployeesComponent implements OnInit {
  employees: EmployeeDto[] = [];
  offices: OfficeDto[] = [];
  isModalOpen = false;
  currentEmployee: any = { 
    fullName: '', email: '', position: '', 
    salary: 0, hireDate: '', officeId: null 
  };

  constructor(
    private employeeService: EmployeeService,
    private officeService: OfficeService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.employeeService.getAll().subscribe(data => {
      this.employees = data;
    });
    this.officeService.getAll().subscribe(data => {
      this.offices = data;
    });
  }

  openModal() {
    const today = new Date().toISOString().split('T')[0];
    this.currentEmployee = { 
      fullName: '', email: '', position: '', 
      salary: 0, hireDate: today, officeId: null 
    };
    this.isModalOpen = true;
  }

  editEmployee(emp: EmployeeDto) {
    this.currentEmployee = { ...emp };
    // Format date for input type="date"
    if (this.currentEmployee.hireDate) {
      this.currentEmployee.hireDate = new Date(this.currentEmployee.hireDate).toISOString().split('T')[0];
    }
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  saveEmployee() {
    if (this.currentEmployee.id) {
      this.employeeService.update(this.currentEmployee.id, this.currentEmployee).subscribe({
        next: () => {
          this.loadData();
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
          alert(`Failed to update employee (Status ${err.status}): ${detail}`);
        }
      });
    } else {
      this.employeeService.create(this.currentEmployee).subscribe({
        next: () => {
          this.loadData();
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
          alert(`Failed to create employee (Status ${err.status}): ${detail}`);
        }
      });
    }
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.delete(id).subscribe(() => {
        this.loadData();
      });
    }
  }
}
