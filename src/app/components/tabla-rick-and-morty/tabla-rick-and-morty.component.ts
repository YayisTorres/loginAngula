import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CharacterViewerComponent } from "../character-viewer/character-viewer.component";
import { CharacterEditorComponent } from "../character-editor/character-editor.component";
import { Subject, debounceTime, distinctUntilChanged } from "rxjs";
import Swal from "sweetalert2";

interface Character {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: string[];
  url: string;
  created: string;
}

interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}

@Component({
  selector: "app-tabla-rick-and-morty",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CharacterViewerComponent,
    CharacterEditorComponent,
  ],
  templateUrl: "./tabla-rick-and-morty.component.html",
  styleUrls: ["./tabla-rick-and-morty.component.css"],
})
export class TablaRickAndMortyComponent implements OnInit {
  displayedCharacters: Character[] = [];
  currentPage = 1;
  itemsPerPage = 20;
  totalCharacters = 0;
  totalPages = 0;
  hasNextPage = true;
  searchTerm = "";
  private searchTerms = new Subject<string>();
  sortColumn: "id" | "name" = "id";
  sortDirection: "asc" | "desc" = "asc";
  selectedCharacter: Character | null = null;
  editingCharacter: Character | null = null;
  visiblePages: number[] = [];
  deletedCharacters: Set<number> = new Set();
  editedCharacters: Map<number, Character> = new Map();
  addedCharacters: Map<number, Character> = new Map();
  private nextNewId = -1; // IDs negativos para personajes nuevos

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadCharacters();
    this.setupSearch();
  }

  setupSearch() {
    this.searchTerms
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(() => {
        this.currentPage = 1;
        this.loadCharacters();
      });
  }

  loadCharacters() {
    const url = `https://rickandmortyapi.com/api/character/?page=${this.currentPage}&name=${this.searchTerm}`;
    this.http.get<ApiResponse>(url).subscribe({
      next: (data) => {
        let characters = data.results.map((char) => {
          if (this.editedCharacters.has(char.id)) {
            return { ...char, ...this.editedCharacters.get(char.id) };
          }
          return char;
        });

        // Agregar personajes locales si coinciden con la búsqueda
        const localCharacters = Array.from(
          this.addedCharacters.values()
        ).filter((char) =>
          char.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );

        this.displayedCharacters = [...localCharacters, ...characters];
        this.totalCharacters = data.info.count + this.addedCharacters.size;
        this.totalPages = data.info.pages;
        this.hasNextPage = !!data.info.next;
        this.updateVisiblePages();
        this.sortCharacters();
      },
      error: (error) => {
        console.error("Error fetching characters:", error);
        // Mostrar solo personajes locales si hay error en la API
        const localCharacters = Array.from(
          this.addedCharacters.values()
        ).filter((char) =>
          char.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.displayedCharacters = localCharacters;
        this.totalCharacters = this.addedCharacters.size;
        this.totalPages = 1;
        this.hasNextPage = false;
      },
    });
  }

  addNewCharacter() {
    const newCharacter: Character = {
      id: this.nextNewId--,
      name: "Nuevo Personaje",
      image: "/placeholder.svg?height=300&width=300",
      status: "Alive",
      species: "Human",
      type: "",
      gender: "unknown",
      origin: {
        name: "Earth",
        url: "",
      },
      location: {
        name: "Earth",
        url: "",
      },
      episode: [],
      url: "",
      created: new Date().toISOString(),
    };

    this.addedCharacters.set(newCharacter.id, newCharacter);
    this.editingCharacter = { ...newCharacter };
  }

  updateVisiblePages() {
    const totalVisible = 5;
    let start = Math.max(1, this.currentPage - Math.floor(totalVisible / 2));
    let end = Math.min(this.totalPages, start + totalVisible - 1);

    if (end - start + 1 < totalVisible) {
      start = Math.max(1, end - totalVisible + 1);
    }

    this.visiblePages = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.currentPage = page;
      this.loadCharacters();
    }
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.searchTerms.next(term);
  }

  changePage(delta: number) {
    this.goToPage(this.currentPage + delta);
  }

  sort(column: "id" | "name") {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortColumn = column;
      this.sortDirection = "asc";
    }
    this.sortCharacters();
  }

  sortCharacters() {
    this.displayedCharacters.sort((a, b) => {
      let aValue: string | number = this.sortColumn === "id" ? a.id : a.name;
      let bValue: string | number = this.sortColumn === "id" ? b.id : b.name;

      if (aValue < bValue) return this.sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return this.sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }

  viewCharacter(character: Character) {
    this.selectedCharacter = character;
  }

  closeViewer() {
    this.selectedCharacter = null;
  }

  editCharacter(character: Character) {
    this.editingCharacter = { ...character };
  }

  closeEditor() {
    this.editingCharacter = null;
  }

  saveCharacter(updatedCharacter: Character) {
    if (updatedCharacter.id < 0) {
      // Es un personaje agregado localmente
      this.addedCharacters.set(updatedCharacter.id, updatedCharacter);
    } else {
      // Es un personaje de la API que se editó
      this.editedCharacters.set(updatedCharacter.id, updatedCharacter);
    }

    const index = this.displayedCharacters.findIndex(
      (char) => char.id === updatedCharacter.id
    );
    if (index !== -1) {
      this.displayedCharacters[index] = updatedCharacter;
    } else {
      // Si es nuevo, agregarlo a la lista actual
      this.displayedCharacters.unshift(updatedCharacter);
    }

    Swal.fire({
      title: "¡Guardado!",
      text: `Los cambios en ${updatedCharacter.name} han sido guardados.`,
      icon: "success",
      confirmButtonText: "OK",
    });
    this.closeEditor();
  }

  deleteCharacter(character: Character) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres eliminar a ${character.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (character.id < 0) {
          // Es un personaje agregado localmente
          this.addedCharacters.delete(character.id);
        } else {
          // Es un personaje de la API
          this.deletedCharacters.add(character.id);
        }

        this.displayedCharacters = this.displayedCharacters.filter(
          (char) => char.id !== character.id
        );
        Swal.fire(
          "¡Eliminado!",
          `${character.name} ha sido eliminado de la tabla.`,
          "success"
        );
      }
    });
  }

  resetChanges() {
    this.deletedCharacters.clear();
    this.editedCharacters.clear();
    this.addedCharacters.clear();
    this.nextNewId = -1;
    this.loadCharacters();
    Swal.fire(
      "¡Cambios reseteados!",
      "Todos los cambios han sido deshechos.",
      "info"
    );
  }

  getMaxDisplayedIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.totalCharacters);
  }

  isDeleted(character: Character): boolean {
    return this.deletedCharacters.has(character.id);
  }
}
