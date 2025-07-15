import { Component, Input, Output, EventEmitter } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";

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

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

@Component({
  selector: "app-character-viewer",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./character-viewer.component.html",
  styleUrls: ["./character-viewer.component.css"],
})
export class CharacterViewerComponent {
  @Input() character: Character | null = null;
  @Output() closeViewer = new EventEmitter<void>();

  episodes: Episode[] = [];

  constructor(private http: HttpClient) {}

  ngOnChanges() {
    if (this.character) {
      this.loadEpisodes();
    }
  }

  loadEpisodes() {
    this.episodes = [];

    if (!this.character?.episode || this.character.episode.length === 0) {
      return;
    }

    this.character.episode.forEach((episodeData, index) => {
      // Verificar si es una URL de la API o un episodio editado localmente
      if (episodeData.startsWith("http")) {
        // Es una URL de la API, hacer petición HTTP
        this.http.get<Episode>(episodeData).subscribe(
          (episode) => this.episodes.push(episode),
          (error) => console.error("Error al cargar el episodio:", error)
        );
      } else {
        // Es un episodio editado localmente, crear objeto Episode mock
        const mockEpisode: Episode = {
          id: index + 1000, // ID único para episodios locales
          name: episodeData,
          air_date: "Fecha personalizada",
          episode: `E${index + 1}`, // Código de episodio genérico
        };
        this.episodes.push(mockEpisode);
      }
    });
  }

  close() {
    this.closeViewer.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains("modal-overlay")) {
      this.close();
    }
  }
}
