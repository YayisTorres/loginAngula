# 🚀 Consumidor de API Angular - Rick and Morty

## 📖 Descripción

Este proyecto demuestra cómo consumir APIs públicas utilizando Angular 20. La aplicación consume tanto la [API Fake Store de Platzi](https://api.escuelajs.co/api/v1/users) como la [API de Rick and Morty](https://rickandmortyapi.com/api/character) para mostrar datos en tablas responsivas y paginadas con una interfaz de usuario moderna.

## 📸 Capturas de Pantalla

### 🔐 Pantalla de Login
![Login Screen](https://github.com/YayisTorres/loginAngula/blob/main/img/login.png)
*Formulario de autenticación con validaciones y diseño responsivo*

### 🛸 Tabla de Personajes Rick and Morty
![Rick and Morty Characters](https://github.com/YayisTorres/loginAngula/blob/main/img/tablariki.png)
*Vista principal mostrando personajes con búsqueda, filtros y paginación avanzada*

### 👥 Tabla de Usuarios 
![Users Table](https://github.com/YayisTorres/loginAngula/blob/main/img/tablausuario.png)
*Tabla de usuarios obtenidos de la API Fake Store con paginación*

### 📊 Dashboard Principal
![Dashboard](https://github.com/YayisTorres/loginAngula/blob/main/img/dashboard.png)
*Panel principal con navegación lateral y vista general de la aplicación*

## 🛠️ Configuración

1. Clona el repositorio
2. Ejecuta `npm install` para instalar las dependencias
3. Inicia el servidor de desarrollo con `ng serve`
4. Navega a `http://localhost:4200/`

## 🏗️ Estructura del Proyecto

### Componentes Principales

#### 🔐 LoginComponent
- **Ubicación**: `src/app/components/login/`
- **Propósito**: Maneja la autenticación de usuarios
- **Características**:
  - Formulario reactivo con validaciones
  - Manejo de errores de autenticación
  - Redirección automática al dashboard
  - Diseño responsivo y moderno

#### 📊 DashboardComponent
- **Ubicación**: `src/app/components/dashboard/`
- **Propósito**: Panel principal de la aplicación
- **Características**:
  - Navegación lateral colapsible
  - Vista general de estadísticas
  - Acceso rápido a todas las funcionalidades
  - Menú hamburguesa para dispositivos móviles

#### 📊 TablaConsultaComponent (API Fake Store)
- **Ubicación**: `src/app/components/tabla-consulta/`
- **Propósito**: Consume la API de usuarios de Platzi y los muestra en una tabla paginada
- **Características**:
  - Paginación automática
  - Indicador de carga
  - Manejo de errores
  - Diseño responsivo

#### 🛸 TablaConsultasRickMortyComponent (API Rick and Morty)
- **Ubicación**: `src/app/components/tabla-consultas-rick-morty/`
- **Propósito**: Consume la API de Rick and Morty para mostrar personajes
- **Características principales**:
  - **Búsqueda por nombre**: Filtro en tiempo real de personajes
  - **Filtro por estado**: Alive, Dead, Unknown
  - **Paginación avanzada**: Navegación inteligente entre páginas
  - **Indicadores visuales**: Estados con colores y iconos de género
  - **Manejo de errores**: Gestión robusta de errores de API

### 🔧 Servicios

#### UserService
- **Archivo**: `src/app/services/user.service.ts`
- **Métodos**:
  - `getUsers()`: Obtiene lista de usuarios de la API de Platzi
  - Manejo de paginación y errores

#### CharacterService
- **Archivo**: `src/app/services/character.service.ts`
- **Métodos principales**:
  - `getCharacters(page: number)`: Obtiene personajes paginados
  - `searchCharacters(name: string, status?: string, species?: string)`: Búsqueda avanzada con filtros
- **URL Base**: `https://rickandmortyapi.com/api/character`

### 📋 Modelos de Datos

#### Character Model
```typescript
interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: string;
}
```

#### ApiResponse Model
```typescript
interface ApiResponse {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: Character[];
}
```

### 🎨 Estilos CSS Principales

#### Componente Login
- **Formulario centrado**: Diseño card con sombras y bordes redondeados
- **Validaciones visuales**: Colores de error y éxito
- **Animaciones**: Transiciones suaves en focus y hover
- **Responsive**: Adaptable a dispositivos móviles

#### Dashboard
- **Layout flexible**: Sidebar colapsible con CSS Grid
- **Navegación**: Menú lateral con iconos y hover effects
- **Cards informativas**: Estadísticas con colores distintivos
- **Mobile-first**: Diseño que prioriza dispositivos móviles

#### Componente Rick and Morty
- **Estados de personajes**:
  - `.status-alive`: Verde para personajes vivos
  - `.status-dead`: Rojo para personajes muertos  
  - `.status-unknown`: Gris para estado desconocido
- **Iconos de género**: Representación visual con emojis
- **Paginación responsiva**: Adaptable a diferentes tamaños de pantalla
- **Loading states**: Indicadores de carga suaves

#### Tabla de Usuarios
- **Tabla responsiva**: Scroll horizontal en dispositivos pequeños
- **Alternating rows**: Colores alternados para mejor legibilidad
- **Hover effects**: Resaltado de filas al pasar el mouse
- **Paginación**: Controles de navegación estilizados

## 🚶‍♂️ Proceso de Desarrollo

### Fase 1: Configuración Inicial
1. **Configuración del Proyecto**: 
   - Inicializó un nuevo proyecto Angular utilizando Angular CLI con el comando `ng new consumo-APIS-Angular`
   - Configuró el proyecto para usar standalone components y el nuevo router de Angular

### Fase 2: Sistema de Autenticación
2. **LoginComponent**:
   - Implementó formulario reactivo con validaciones
   - Creó servicio de autenticación simulada
   - Configuró guardias de ruta para proteger rutas privadas

### Fase 3: Dashboard y Navegación
3. **DashboardComponent y SideMenuComponent**:
   - Desarrolló panel principal con estadísticas
   - Implementó menú lateral responsivo
   - Configuró navegación entre módulos

### Fase 4: API Fake Store (Primera Implementación)
4. **Creación del UserService**:
   - Desarrolló un `UserService` utilizando `ng generate service user`
   - Implementó método `getUsers()` con `HttpClient`
   - Utilizó RxJS para manejo asíncrono

5. **Modelo User y Componente TablaConsulta**:
   - Definió modelo `User` con propiedades: `id`, `name`, `email`, `password`, `role`, `avatar`
   - Implementó paginación y indicadores de carga

### Fase 5: Integración API Rick and Morty (Nueva Funcionalidad)
6. **CharacterService y Modelos**:
   - Creó `CharacterService` para consumir `https://rickandmortyapi.com/api/character`
   - Definió modelos `Character` y `ApiResponse`
   - Implementó búsqueda avanzada con filtros múltiples

7. **TablaConsultasRickMortyComponent**:
   - **Funcionalidades de búsqueda**:
     - Búsqueda por nombre en tiempo real
     - Filtro por estado (Alive/Dead/Unknown)
     - Combinación de filtros múltiples
   - **Sistema de paginación avanzado**:
     - Navegación inteligente con puntos suspensivos
     - Cálculo dinámico de páginas visibles
     - Métodos `nextPage()`, `previousPage()`, `goToPage()`
   - **Mejoras UX**:
     - Indicadores visuales de estado con `getStatusClass()`
     - Iconos de género con `getGenderIcon()`
     - Traducción de estados con `getStatusText()`

### Fase 6: Enrutamiento y Seguridad
8. **Configuración de rutas**: `app-routing.module.ts` con guardias de ruta
9. **Manejo de errores**: Interceptor HTTP global y notificaciones

## 💻 Funcionalidades en Acción - Consola del Navegador

### Respuesta API Rick and Morty
```javascript
// Ejemplo de respuesta exitosa en la consola
console.log("Personajes obtenidos:", response);
{
  "info": {
    "count": 826,
    "pages": 42,
    "next": "https://rickandmortyapi.com/api/character?page=2",
    "prev": null
  },
  "results": [
    {
      "id": 1,
      "name": "Rick Sanchez",
      "status": "Alive",
      "species": "Human",
      "gender": "Male",
      "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
      "location": {
        "name": "Citadel of Ricks"
      }
    }
  ]
}
```

### Búsqueda con Filtros
```javascript
// Búsqueda por nombre y estado
console.log("Buscando: Rick, Estado: Alive");
// URL generada: https://rickandmortyapi.com/api/character?name=Rick&status=Alive

// Resultado en consola
console.log("Resultados filtrados:", filteredResults);
// Muestra solo personajes llamados Rick que están vivos
```

### Manejo de Errores
```javascript
// Error cuando no se encuentran resultados
console.error("Error en la búsqueda:", error);
{
  "error": "There is nothing here",
  "status": 404
}

// La aplicación maneja el error y muestra mensaje al usuario
console.log("Mostrando mensaje: No se encontraron personajes");
```

### Paginación Dinámica
```javascript
// Cálculo de páginas visibles
console.log("Página actual:", this.currentPage);
console.log("Total de páginas:", this.totalPages);
console.log("Páginas visibles:", this.getPageNumbers());
// Resultado: [1, "...", 20, 21, 22, "...", 42]
```

## 📦 Dependencias Principales

- Angular 20
- RxJS
- HttpClient
- FormsModule
- CommonModule
- Angular Router
- Reactive Forms

## 🔧 Scripts Disponibles

```bash
# Desarrollo
ng serve

# Build para producción
ng build --prod

# Tests unitarios
ng test

# Tests e2e
ng e2e

# Linting
ng lint
```
## Autor 
Guadalupe DayaniravTorres Quiroz
correo: torresquirozdayanira@gmail.com
---

**Desarrollado  ❤️ usando Angular y las APIs de Platzi y Rick and Morty**
```

