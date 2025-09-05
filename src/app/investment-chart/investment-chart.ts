import { Component, input, ChangeDetectionStrategy, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvestmentResult } from '../models/model';

@Component({
  selector: 'app-investment-chart',
  imports: [CommonModule],
  templateUrl: './investment-chart.html',
  styleUrl: './investment-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InvestmentChart implements OnInit, OnDestroy {
  investmentResults = input.required<InvestmentResult[]>();
  
  private chart: any = null;
  private chartCanvas: HTMLCanvasElement | null = null;
  
  // Computed chart data
  chartData = computed(() => {
    const results = this.investmentResults();
    return {
      labels: results.map(r => `Year ${r.year}`),
      investmentValues: results.map(r => r.InvestmentValue),
      totalInterest: results.map(r => r.TotalInterest),
      investmentCapital: results.map(r => r.InvestmentCapital)
    };
  });

  ngOnInit() {
    // Load Chart.js dynamically
    this.loadChartJS().then(() => {
      this.createChart();
      // Create pie chart after a short delay to ensure DOM is ready
      setTimeout(() => {
        this.createPieChart();
      }, 100);
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private async loadChartJS(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && (window as any).Chart) {
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }

  private createChart() {
    const canvas = document.getElementById('investmentChart') as HTMLCanvasElement;
    if (!canvas) return;

    this.chartCanvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = this.chartData();
    
    this.chart = new (window as any).Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Investment Value',
            data: data.investmentValues,
            borderColor: '#59C197',
            backgroundColor: 'rgba(89, 193, 151, 0.1)',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#59C197',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Total Interest',
            data: data.totalInterest,
            borderColor: '#5962c1',
            backgroundColor: 'rgba(89, 98, 193, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointBackgroundColor: '#5962c1',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          },
          {
            label: 'Investment Capital',
            data: data.investmentCapital,
            borderColor: '#e74c3c',
            backgroundColor: 'rgba(231, 76, 60, 0.1)',
            borderWidth: 3,
            fill: false,
            tension: 0.4,
            pointBackgroundColor: '#e74c3c',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Investment Growth Over Time',
            font: {
              size: 18,
              weight: 'bold'
            },
            color: '#fff'
          },
          legend: {
            display: true,
            position: 'top',
            labels: {
              color: '#fff',
              font: {
                size: 14
              },
              usePointStyle: true,
              padding: 20
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#59C197',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context: any) {
                return context.dataset.label + ': ' + 
                       new Intl.NumberFormat('en-US', {
                         style: 'currency',
                         currency: 'USD'
                       }).format(context.parsed.y);
              }
            }
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Years',
              color: '#fff',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#fff',
              font: {
                size: 12
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Amount ($)',
              color: '#fff',
              font: {
                size: 14,
                weight: 'bold'
              }
            },
            ticks: {
              color: '#fff',
              font: {
                size: 12
              },
              callback: function(value: any) {
                return new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(value);
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        animation: {
          duration: 2000,
          easing: 'easeInOutQuart'
        }
      }
    });
  }

  // Method to update chart when data changes
  updateChart() {
    if (this.chart) {
      const data = this.chartData();
      this.chart.data.labels = data.labels;
      this.chart.data.datasets[0].data = data.investmentValues;
      this.chart.data.datasets[1].data = data.totalInterest;
      this.chart.data.datasets[2].data = data.investmentCapital;
      this.chart.update('active');
    }
  }

  // Method to create a pie chart showing final distribution
  createPieChart() {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = this.chartData();
    const finalResults = this.investmentResults();
    const lastResult = finalResults[finalResults.length - 1];

    new (window as any).Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Investment Capital', 'Total Interest'],
        datasets: [{
          data: [lastResult.InvestmentCapital, lastResult.TotalInterest],
          backgroundColor: [
            'rgba(231, 76, 60, 0.8)',
            'rgba(89, 98, 193, 0.8)'
          ],
          borderColor: [
            '#e74c3c',
            '#5962c1'
          ],
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Final Portfolio Distribution',
            color: '#fff',
            font: {
              size: 16,
              weight: 'bold'
            }
          },
          legend: {
            position: 'bottom',
            labels: {
              color: '#fff',
              padding: 20,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
              label: function(context: any) {
                const value = context.parsed;
                const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return context.label + ': ' + 
                       new Intl.NumberFormat('en-US', {
                         style: 'currency',
                         currency: 'USD'
                       }).format(value) + ' (' + percentage + '%)';
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          duration: 2000
        }
      }
    });
  }

  // Method to export chart as image
  exportChart() {
    if (this.chartCanvas) {
      const link = document.createElement('a');
      link.download = 'investment-chart.png';
      link.href = this.chartCanvas.toDataURL();
      link.click();
    }
  }
}
