import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { TablaConsultasRickMortyComponent } from '../components/tabla-consultas-rick-morty/tabla-consultas-rick-morty.component';
import { TablaConsultaComponent } from '../components/tabla-consulta/tabla-consulta.component';
import { SideMenuComponent } from './side-menu.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NgIf, TablaConsultasRickMortyComponent, TablaConsultaComponent, SideMenuComponent],
  template: `
    <div class="dashboard">
      <header class="header">
        <div class="header-content">
          <button class="hamburger-btn" (click)="toggleMenu()">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1 class="title">🛸Dashboard</h1>
        </div>
      </header>
      <main class="main-content">
        <app-side-menu 
          [isOpen]="isMenuOpen" 
          (menuToggle)="toggleMenu()" 
          (showCharacters)="toggleCharactersTable()"
          (showUsers)="toggleUsersTable()"
          (logout)="onLogout()">
        </app-side-menu>
        @if (showCharactersTable) {
          <app-tabla-consultas-rick-morty></app-tabla-consultas-rick-morty>
        } @else if (showUsersTable) {
          <app-tabla-consulta></app-tabla-consulta>
        } @else {
          <div class="welcome-section">
            <div class="welcome-card">
              <h2>¡Bienvenido! 🌌</h2>
              <p>Explora todos los personajes de la serie más interdimensional.</p>
              <button (click)="toggleCharactersTable()" class="explore-btn">
                Explorar Personajes
              </button>
              <button (click)="toggleUsersTable()" class="explore-btn">
                Explorar Usuarios
              </button>

            </div>
          </div>
        }
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .dashboard {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }

    .header-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 1rem 2rem;
      display: flex;
      align-items: center;
    }

    .hamburger-btn {
      background: none;
      border: none;
      cursor: pointer;
      margin-right: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 4px;
      padding: 8px;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .hamburger-btn:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .hamburger-btn span {
      width: 25px;
      height: 3px;
      background: white;
      border-radius: 2px;
      transition: all 0.3s ease;
    }

    .title {
      font-size: 1.8rem;
      color: white;
      margin: 0;
      font-weight: 600;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    .main-content {
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      position: relative;
      min-height: calc(100vh - 80px);
    }

    .welcome-section {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
    }

    .welcome-card {
      background: white;
      padding: 3rem;
      border-radius: 20px;
      text-align: center;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      max-width: 500px;
      width: 100%;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .welcome-card h2 {
      font-size: 2rem;
      margin: 0 0 1rem 0;
      background: linear-gradient(135deg, #667eea, #764ba2);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      font-weight: 700;
    }

    .welcome-card p {
      font-size: 1.1rem;
      color: #6c757d;
      margin: 0 0 2rem 0;
      line-height: 1.6;
    }

    .explore-btn {
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      border: none;
      padding: 1rem 2rem;
      border-radius: 50px;
      font-size: 1.1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }

    .explore-btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
    }

    @media (max-width: 768px) {
      .header-content {
        padding: 1rem;
      }

      .title {
        font-size: 1.3rem;
      }

      .main-content {
        padding: 1rem;
      }

      .welcome-card {
        padding: 2rem;
        margin: 1rem;
      }

      .welcome-card h2 {
        font-size: 1.5rem;
      }
    }
  `]
})
export class DashboardComponent {
  isMenuOpen = false;
  showCharactersTable = false;
  showUsersTable = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleCharactersTable() {
    this.showCharactersTable = !this.showCharactersTable;
    this.showUsersTable = false; // Ocultar usuarios cuando se muestran personajes
  }

  toggleUsersTable() {
    this.showUsersTable = !this.showUsersTable;
    this.showCharactersTable = false; // Ocultar personajes cuando se muestran usuarios
  }

  onLogout() {
    console.log('Logout clicked');
    // Implementa tu lógica de cierre de sesión aquí
  }
}