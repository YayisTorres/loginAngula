import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface Character {
  id: number;
  name: string;
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
  image: string;
  episode: string[];
  url: string;
  created: string;
}

@Component({
  selector: "app-character-editor",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./character-editor.component.html",
  styleUrls: ["./character-editor.component.css"],
})
export class CharacterEditorComponent {
  @Input() character: Character | null = null;
  @Output() closeEditor = new EventEmitter<void>();
  @Output() saveCharacter = new EventEmitter<Character>();

  editedCharacter: Character = {
    id: 0,
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
    origin: { name: "", url: "" },
    location: { name: "", url: "" },
    image: "",
    episode: [],
    url: "",
    created: "",
  };

  editedEpisodes: string[] = [];
  newEpisode: string = "";

  ngOnChanges() {
    if (this.character) {
      this.editedCharacter = { ...this.character };
      // Convertir URLs de episodios a nombres simples para edición local
      this.editedEpisodes = this.character.episode.map((ep) => {
        if (ep.startsWith("http")) {
          // Si es una URL de la API, extraer solo el número del episodio
          const episodeId = ep.split("/").pop();
          return `Episodio ${episodeId}`;
        }
        return ep; // Si ya es un nombre simple, mantenerlo
      });
    }
  }

  addEpisode() {
    if (this.newEpisode.trim()) {
      this.editedEpisodes.push(this.newEpisode.trim());
      this.newEpisode = "";
    }
  }

  removeEpisode(index: number) {
    this.editedEpisodes.splice(index, 1);
  }

  saveChanges() {
    // Actualizar los episodios en el personaje editado
    this.editedCharacter.episode = [...this.editedEpisodes];
    this.saveCharacter.emit(this.editedCharacter);
  }

  close() {
    this.closeEditor.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      this.close();
    }
  }
}
