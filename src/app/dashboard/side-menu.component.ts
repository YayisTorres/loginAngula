import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
} from "@angular/core";

@Component({
  selector: "app-side-menu",
  standalone: true,
  template: `
    <!-- Overlay para cerrar al hacer click fuera -->
    <div class="overlay" [class.show]="isOpen" (click)="closeMenu()"></div>

    <div class="side-menu" [class.open]="isOpen">
      <div class="menu-header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-icon">
              <i class="fas fa-rocket"></i>
            </div>
            <h3 class="menu-title">Dashboard</h3>
          </div>
          <button class="close-btn" (click)="closeMenu()">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <nav class="menu-nav">
        <ul class="menu-list">
          <li class="menu-section-title">
            <span>Gestión</span>
          </li>
          <li>
            <button (click)="onShowUsers()" class="menu-item">
              <div class="menu-item-icon users-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="menu-item-content">
                <span class="menu-item-title">Usuarios</span>
                <span class="menu-item-subtitle">Gestionar usuarios</span>
              </div>
              <div class="menu-item-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </button>
          </li>
          <li>
            <button (click)="onShowRickAndMorty()" class="menu-item">
              <div class="menu-item-icon characters-icon">
                <i class="fas fa-rocket"></i>
              </div>
              <div class="menu-item-content">
                <span class="menu-item-title">Rick & Morty</span>
                <span class="menu-item-subtitle">Ver personajes</span>
              </div>
              <div class="menu-item-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </button>
          </li>

          <li class="menu-divider"></li>

          <li class="menu-section-title">
            <span>Cuenta</span>
          </li>
          <li>
            <button (click)="onLogout()" class="menu-item logout-item">
              <div class="menu-item-icon logout-icon">
                <i class="fas fa-sign-out-alt"></i>
              </div>
              <div class="menu-item-content">
                <span class="menu-item-title">Cerrar Sesión</span>
                <span class="menu-item-subtitle">Salir del sistema</span>
              </div>
              <div class="menu-item-arrow">
                <i class="fas fa-chevron-right"></i>
              </div>
            </button>
          </li>
        </ul>
      </nav>

      <div class="menu-footer">
        <div class="footer-content">
          <p class="footer-text">Dashboard v1.0</p>
          <p class="footer-subtext">Rick & Morty Admin</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
      }

      .overlay.show {
        opacity: 1;
        visibility: visible;
      }

      .side-menu {
        position: fixed;
        top: 0;
        left: -320px;
        width: 320px;
        height: 100vh;
        background: white;
        box-shadow: 4px 0 20px rgba(0, 0, 0, 0.15);
        transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 1000;
        display: flex;
        flex-direction: column;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
      }

      .side-menu.open {
        left: 0;
      }

      .menu-header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 1.5rem;
        color: white;
      }

      .header-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .logo-section {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .logo-icon {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        backdrop-filter: blur(10px);
      }

      .menu-title {
        margin: 0;
        font-size: 1.3rem;
        font-weight: 700;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      }

      .close-btn {
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 35px;
        height: 35px;
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
      }

      .close-btn:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: scale(1.05);
      }

      .menu-nav {
        flex: 1;
        padding: 1.5rem 0;
        overflow-y: auto;
      }

      .menu-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .menu-section-title {
        padding: 0.5rem 1.5rem;
        margin-bottom: 0.5rem;
      }

      .menu-section-title span {
        font-size: 0.8rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      .menu-divider {
        height: 1px;
        background: #e2e8f0;
        margin: 1rem 1.5rem;
      }

      .menu-item {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        cursor: pointer;
        width: 100%;
        padding: 1rem 1.5rem;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }

      .menu-item::before {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          90deg,
          transparent,
          rgba(102, 126, 234, 0.1),
          transparent
        );
        transition: left 0.5s;
      }

      .menu-item:hover::before {
        left: 100%;
      }

      .menu-item:hover {
        background: linear-gradient(135deg, #f8f9ff 0%, #f0f8ff 100%);
        transform: translateX(5px);
      }

      .menu-item:active {
        transform: translateX(3px);
      }

      .menu-item-icon {
        width: 45px;
        height: 45px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        color: white;
        margin-right: 1rem;
        transition: all 0.3s ease;
      }

      .users-icon {
        background: linear-gradient(135deg, #48bb78, #38a169);
      }

      .characters-icon {
        background: linear-gradient(135deg, #667eea, #764ba2);
      }

      .logout-icon {
        background: linear-gradient(135deg, #f56565, #e53e3e);
      }

      .menu-item:hover .menu-item-icon {
        transform: scale(1.1);
      }

      .menu-item-content {
        flex: 1;
        text-align: left;
      }

      .menu-item-title {
        display: block;
        font-size: 1rem;
        font-weight: 600;
        color: #2d3748;
        margin-bottom: 0.2rem;
      }

      .menu-item-subtitle {
        display: block;
        font-size: 0.8rem;
        color: #64748b;
        font-weight: 400;
      }

      .menu-item-arrow {
        color: #cbd5e1;
        font-size: 0.8rem;
        transition: all 0.3s ease;
      }

      .menu-item:hover .menu-item-arrow {
        color: #667eea;
        transform: translateX(3px);
      }

      .logout-item:hover {
        background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
      }

      .logout-item:hover .menu-item-title {
        color: #dc2626;
      }

      .logout-item:hover .menu-item-arrow {
        color: #dc2626;
      }

      .menu-footer {
        padding: 1.5rem;
        border-top: 1px solid #e2e8f0;
        background: #f8f9fa;
      }

      .footer-content {
        text-align: center;
      }

      .footer-text {
        font-size: 0.9rem;
        font-weight: 600;
        color: #2d3748;
        margin: 0 0 0.2rem 0;
      }

      .footer-subtext {
        font-size: 0.8rem;
        color: #64748b;
        margin: 0;
      }

      @media (max-width: 480px) {
        .side-menu {
          width: 280px;
          left: -280px;
        }

        .menu-header {
          padding: 1rem;
        }

        .menu-title {
          font-size: 1.1rem;
        }

        .menu-item {
          padding: 0.8rem 1rem;
        }

        .menu-item-icon {
          width: 40px;
          height: 40px;
          margin-right: 0.8rem;
        }

        .menu-item-title {
          font-size: 0.9rem;
        }

        .menu-item-subtitle {
          font-size: 0.75rem;
        }
      }
    `,
  ],
})
export class SideMenuComponent {
  @Input() isOpen = false;
  @Output() menuToggle = new EventEmitter<void>();
  @Output() showUsers = new EventEmitter<void>();
  @Output() showRickAndMorty = new EventEmitter<void>();
  @Output() logout = new EventEmitter<void>();

  // Cerrar menú al presionar Escape
  @HostListener("document:keydown.escape", ["$event"])
  onEscapeKey(event: KeyboardEvent) {
    if (this.isOpen) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.menuToggle.emit();
  }

  onShowUsers() {
    this.showUsers.emit();
    this.closeMenu();
  }

  onShowRickAndMorty() {
    this.showRickAndMorty.emit();
    this.closeMenu();
  }

  onLogout() {
    this.logout.emit();
  }
}
