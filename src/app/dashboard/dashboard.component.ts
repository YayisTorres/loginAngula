import { Component, OnInit } from "@angular/core";
import { RouterOutlet, Router } from "@angular/router";
import { NgIf } from "@angular/common";
import { TablaConsultaComponent } from "../components/tabla-consulta/tabla-consulta.component";
import { TablaRickAndMortyComponent } from "../components/tabla-rick-and-morty/tabla-rick-and-morty.component";
import { SideMenuComponent } from "./side-menu.component";
import { AuthService } from "../../app/services/auth.service";
import { User } from "../../app/models/user.model";

@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [
    RouterOutlet,
    NgIf,
    TablaConsultaComponent,
    TablaRickAndMortyComponent,
    SideMenuComponent,
  ],
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  isMenuOpen = false;
  showUsersTable = false;
  showRickAndMortyTable = false;
  currentUser: User | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser) {
      this.router.navigate(["/login"]);
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleUsersTable() {
    this.showUsersTable = true;
    this.showRickAndMortyTable = false;
  }

  toggleRickAndMortyTable() {
    this.showRickAndMortyTable = true;
    this.showUsersTable = false;
  }

  goBack() {
    this.showUsersTable = false;
    this.showRickAndMortyTable = false;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

  getUserInitial(): string {
    return this.currentUser?.name.charAt(0).toUpperCase() || "U";
  }
}
