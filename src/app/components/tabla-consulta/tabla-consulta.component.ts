import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-tabla-consulta',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-consulta.component.html',
  styleUrls: ['./tabla-consulta.component.css']
})
export class TablaConsultaComponent implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  displayedUsers: User[] = [];
  loading = true;
  currentPage = 1;
  pageSize = 8;
  totalPages = 1;
  searchName = '';
  filterRole = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.applyFilters();
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
        this.loading = false;
      }
    });
  }

  applyFilters() {
    this.filteredUsers = this.users.filter(user => {
      const matchesName = this.searchName === '' || 
        user.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesRole = this.filterRole === '' || 
        user.role.toLowerCase() === this.filterRole.toLowerCase();
      
      return matchesName && matchesRole;
    });

    this.totalPages = Math.ceil(this.filteredUsers.length / this.pageSize);
    this.currentPage = 1;
    this.updateDisplayedUsers();
  }

  onSearch() {
    this.applyFilters();
  }

  updateDisplayedUsers() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.displayedUsers = this.filteredUsers.slice(start, end);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedUsers();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedUsers();
    }
  }

  goToPage(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.currentPage = page;
      this.updateDisplayedUsers();
    }
  }

  getPageNumbers(): (number | string)[] {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;
    
    if (this.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(this.totalPages);
      } else if (this.currentPage >= this.totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = this.totalPages - 3; i <= this.totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(this.totalPages);
      }
    }
    
    return pages;
  }

  getRoleClass(role: string): string {
    return `role-${role.toLowerCase().replace(/\s+/g, '-')}`;
  }

  getRoleIcon(role: string): string {
    const roleIcons: { [key: string]: string } = {
      'admin': '👑',
      'customer': '👤',
      'user': '👤',
      'manager': '💼',
      'employee': '👨‍💼'
    };
    return roleIcons[role.toLowerCase()] || '👤';
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.filteredUsers.length);
  }

  get totalUsers(): number {
    return this.filteredUsers.length;
  }

  onImageError(event: any) {
    event.target.src = 'https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1';
  }
}