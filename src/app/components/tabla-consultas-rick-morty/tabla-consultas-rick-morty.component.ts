import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.model';
import { ApiResponse } from '../../models/api-response.model';

@Component({
  selector: 'app-tabla-consultas-rick-morty',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-consultas-rick-morty.component.html',
  styleUrls: ['./tabla-consultas-rick-morty.component.css']
})
export class TablaConsultasRickMortyComponent implements OnInit {
  characters: Character[] = [];
  loading = true;
  currentPage = 1;
  totalPages = 1;
  totalCharacters = 0;
  searchName = '';
  filterStatus = '';

  constructor(private characterService: CharacterService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.loading = true;
    
    if (this.searchName || this.filterStatus) {
      this.searchCharacters();
    } else {
      this.characterService.getCharacters(this.currentPage).subscribe({
        next: (response: ApiResponse) => {
          this.characters = response.results;
          this.totalPages = response.info.pages;
          this.totalCharacters = response.info.count;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error al obtener personajes:', error);
          this.loading = false;
        }
      });
    }
  }

  searchCharacters() {
    this.characterService.searchCharacters(this.searchName, this.filterStatus).subscribe({
      next: (response: ApiResponse) => {
        this.characters = response.results;
        this.totalPages = response.info.pages;
        this.totalCharacters = response.info.count;
        this.currentPage = 1;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error en la búsqueda:', error);
        this.characters = [];
        this.totalPages = 1;
        this.totalCharacters = 0;
        this.loading = false;
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.loadCharacters();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  goToPage(page: number | string) {
    if (typeof page === 'number' && page !== this.currentPage) {
      this.currentPage = page;
      this.loadCharacters();
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

  getStatusClass(status: string): string {
    return `status-${status.toLowerCase()}`;
  }

  getStatusText(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Alive': 'Vivo',
      'Dead': 'Muerto',
      'unknown': 'Desconocido'
    };
    return statusMap[status] || status;
  }

  getGenderIcon(gender: string): string {
    const genderIcons: { [key: string]: string } = {
      'Male': '♂️',
      'Female': '♀️',
      'Genderless': '⚧️',
      'unknown': '❓'
    };
    return genderIcons[gender] || '';
  }
}