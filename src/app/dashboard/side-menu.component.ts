import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  template: `
   <div class="side-menu" [class.open]="isOpen">
      <button class="close-btn" (click)="closeMenu()">×</button>
      <div class="menu-header">
        <h3>🛸 Bienvenidos </h3>
      </div>
      <nav>
        <ul>
          <li>
            <button (click)="onShowCharacters()" class="menu-item">
              <span class="icon">👥</span>
              PERSONAJES R&M
            </button>
          </li>
          <li>
            <button (click)="onShowUsers()" class="menu-item">
              <span class="icon">👤</span>
              USUARIOS
            </button>
          </li>
          <li>
            <button (click)="onLogout()" class="menu-item">
              <span class="icon">🚪</span>
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </nav>
    </div>
    @if (isOpen) {
      <div class="overlay" (click)="closeMenu()"></div>
    }
  `,
  styles: [`
    .side-menu {
      position: fixed;
      top: 0;
      left: -300px;
      width: 300px;
      height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
      transition: left 0.3s ease;
      z-index: 1001;
      color: white;
    }

    .side-menu.open {
      left: 0;
    }

    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    }

    .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      color: white;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 1.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .close-btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: rotate(90deg);
    }

    .menu-header {
      padding: 2rem 1.5rem 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .menu-header h3 {
      margin: 0;
      font-size: 1.5rem;
      font-weight: 600;
      text-align: center;
    }

    nav ul {
      list-style: none;
      padding: 1rem 0;
      margin: 0;
    }

    nav ul li {
      margin-bottom: 0.5rem;
    }

    .menu-item {
      display: flex;
      align-items: center;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      color: white;
      width: 100%;
      padding: 1rem 1.5rem;
      transition: all 0.3s ease;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .menu-item:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: translateX(5px);
    }

    .icon {
      margin-right: 1rem;
      font-size: 1.2rem;
      width: 24px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .side-menu {
        width: 250px;
        left: -250px;
      }
    }
  `]
})
export class SideMenuComponent {
  @Input() isOpen = false;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() showCharacters = new EventEmitter<void>();
  @Output() showUsers = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  closeMenu() {
    this.menuToggle.emit();
  }

  onShowCharacters() {
    this.showCharacters.emit();
    this.closeMenu();
  }

  onShowUsers() {
    this.showUsers.emit();
    this.closeMenu();
  }

  onLogout() {
    this.logout.emit();
    this.closeMenu();
  }
}