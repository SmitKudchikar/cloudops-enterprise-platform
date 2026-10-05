import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { leave } from './services/leave';
import { Leave, CreateLeaveRequest } from './models/leave';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  // All leave records
  leaves: Leave[] = [];

  // Loading and error messages
  loading = true;
  error = '';

  // Used to determine whether we are creating or editing
  editing = false;
  editingId: number | null = null;

  // Leave form
  newLeave: CreateLeaveRequest = {
    employeeId: 1,
    leaveType: '',
    reason: '',
    startDate: '',
    endDate: ''
  };

  constructor(private leaveService: leave) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  // =========================
  // GET - Load all leaves
  // =========================
  loadLeaves(): void {

    this.loading = true;
    this.error = '';

    this.leaveService.getLeaves().subscribe({

      next: (data) => {
        this.leaves = data;
        this.loading = false;
      },

      error: (err) => {
        console.error('Error loading leaves:', err);
        this.error = 'Unable to load leave records.';
        this.loading = false;
      }

    });
  }

  // =========================
  // POST - Create leave
  // =========================
  createLeave(): void {

    this.error = '';

    this.leaveService.createLeave(this.newLeave).subscribe({

      next: (createdLeave) => {

        console.log('Leave created:', createdLeave);

        this.leaves.push(createdLeave);

        this.resetForm();
      },

      error: (err) => {

        console.error('Error creating leave:', err);

        this.error = 'Unable to create leave.';
      }

    });
  }

  // =========================
  // Start editing a leave
  // =========================
  editLeave(leaveRecord: Leave): void {

    this.editing = true;
    this.editingId = leaveRecord.leaveId;

    this.newLeave = {
      employeeId: leaveRecord.employeeId,
      leaveType: leaveRecord.leaveType,
      reason: leaveRecord.reason,
      startDate: leaveRecord.startDate,
      endDate: leaveRecord.endDate,
      status: leaveRecord.status ?? undefined
    };

  }

  // =========================
  // PUT - Update leave
  // =========================
  updateLeave(): void {

    if (this.editingId === null) {
      return;
    }

    this.error = '';

    this.leaveService
      .updateLeave(this.editingId, this.newLeave)
      .subscribe({

        next: (updatedLeave) => {

          console.log('Leave updated:', updatedLeave);

          const index = this.leaves.findIndex(
            leaveRecord => leaveRecord.leaveId === this.editingId
          );

          if (index !== -1) {
            this.leaves[index] = updatedLeave;
          }

          this.resetForm();
        },

        error: (err) => {

          console.error('Error updating leave:', err);

          this.error = 'Unable to update leave.';
        }

      });

  }

  // =========================
  // DELETE - Delete leave
  // =========================
  deleteLeave(id: number): void {

    const confirmed = confirm(
      'Are you sure you want to delete this leave request?'
    );

    if (!confirmed) {
      return;
    }

    this.error = '';

    this.leaveService.deleteLeave(id).subscribe({

      next: (message) => {

        console.log('Leave deleted:', message);

        this.leaves = this.leaves.filter(
          leaveRecord => leaveRecord.leaveId !== id
        );

      },

      error: (err) => {

        console.error('Error deleting leave:', err);

        this.error = 'Unable to delete leave.';
      }

    });

  }

  // =========================
  // Cancel editing
  // =========================
  cancelEdit(): void {

    this.resetForm();

  }

  // =========================
  // Reset form
  // =========================
  resetForm(): void {

    this.editing = false;
    this.editingId = null;

    this.newLeave = {
      employeeId: 1,
      leaveType: '',
      reason: '',
      startDate: '',
      endDate: ''
    };

  }

}