import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';
import { OfficeService } from '../../core/services/office.service';
import { EmployeeService } from '../../core/services/employee.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fade-in">
      <div class="page-header">
        <h1 class="page-title">Dashboard</h1>
      </div>

      <div class="stats-grid">
        <div class="stat-card glass-panel">
          <div class="stat-icon">
            <span class="material-icons">location_city</span>
          </div>
          <div class="stat-content">
            <h3>Total Offices</h3>
            <h2>{{ totalOffices }}</h2>
          </div>
        </div>
        
        <div class="stat-card glass-panel">
          <div class="stat-icon">
            <span class="material-icons">people</span>
          </div>
          <div class="stat-content">
            <h3>Total Employees</h3>
            <h2>{{ totalEmployees }}</h2>
          </div>
        </div>
      </div>

      <div class="chart-container glass-panel mt-4">
        <h3 class="chart-title">Employees per Office</h3>
        <div style="position: relative; height:400px; width:100%">
          <canvas #employeeChart></canvas>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }
    .stat-card {
      display: flex;
      align-items: center;
      padding: 1.5rem;
      gap: 1.5rem;
    }
    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .stat-icon .material-icons {
      font-size: 2rem;
    }
    .stat-content h3 {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin: 0;
      font-weight: 500;
    }
    .stat-content h2 {
      font-size: 2rem;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.2;
    }
    .chart-container {
      padding: 1.5rem;
    }
    .chart-title {
      font-size: 1.1rem;
      margin-bottom: 1.5rem;
      color: var(--text-primary);
    }
    .mt-4 {
      margin-top: 2rem;
    }
  `]
})
export class DashboardComponent implements OnInit {
  @ViewChild('employeeChart') employeeChart!: ElementRef;
  totalOffices = 0;
  totalEmployees = 0;
  chart: any;

  constructor(
    private officeService: OfficeService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.officeService.getAll().subscribe(offices => {
      this.totalOffices = offices.length;
      
      const labels = offices.map(o => o.name);
      const data = offices.map(o => o.employeeCount);

      this.employeeService.getAll().subscribe(employees => {
        this.totalEmployees = employees.length;
      });

      this.createChart(labels, data);
    });
  }

  createChart(labels: string[], data: number[]) {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.employeeChart.nativeElement.getContext('2d');
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(79, 70, 229, 0.8)');   // Primary color
    gradient.addColorStop(1, 'rgba(236, 72, 153, 0.8)');  // Secondary color

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Number of Employees',
          data: data,
          backgroundColor: gradient,
          borderRadius: 8,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.05)',
            }
          },
          x: {
            grid: {
              display: false,
            }
          }
        }
      }
    });
  }
}
