# CHAROL Landing Page

Landing page moderna para **CHAROL Karaoke Restobar**, construida con **React 18** y **Vite**, con una estética cálida y premium inspirada en experiencias visuales tipo Framer.

## Descripción

Este proyecto presenta una web de una sola página pensada para un restaurante / polleria con experiencia nocturna, karaoke, shows y celebraciones. La interfaz prioriza:

- Hero con carrusel automático
- Navegación sticky y responsive
- Scroll inmersivo con animaciones
- Secciones editoriales con imágenes grandes
- CTA claros para WhatsApp, llamada y ubicación

## Tecnologias

- **React 18**
- **Vite**
- **GSAP**
- **ScrollTrigger**
- **CSS puro** con variables y media queries
- **HTML semantico**

## Estructura

La pagina se organiza en estas secciones:

1. `Navbar`
2. `Hero` con carousel automatico
3. `Marquee` de categorias
4. `Experience`
5. `Event`
6. `Celebrations`
7. `Menu`
8. `Gallery`
9. `Reservation`
10. `Location`
11. `Footer`

## Animaciones

El sitio usa GSAP para crear una experiencia de scroll mas inmersiva:

- Entrada inicial del navbar y hero
- Carrusel automatico en el hero
- Efectos parallax suaves
- Reveals con scroll usando `ScrollTrigger`
- Marquee continuo
- Rotacion de elementos decorativos
- Transiciones fluidas en cards y botones
- Barra de progreso superior de scroll

Tambien se respeta `prefers-reduced-motion` para reducir o desactivar animaciones en sistemas que lo requieran.

## Contenido del negocio

La pagina esta orientada a **CHAROL Karaoke Restobar**, ubicado en **Los Olivos, Lima**.

Incluye accesos rapidos para:

- Reservar por WhatsApp
- Llamar al negocio
- Ver ubicacion en Google Maps
- Visitar Instagram

> Nota: algunos datos, como direccion exacta de ingreso o agenda de eventos, deben confirmarse con el negocio antes de publicarse oficialmente.

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Luego abre la URL que muestra Vite, normalmente:

```bash
http://localhost:5173
```

## Build de produccion

```bash
npm run build
```

## Vista previa del build

```bash
npm run preview
```

## Variables visuales

El proyecto centraliza colores y medidas en `src/styles.css` mediante CSS variables. Entre las mas importantes:

- `--black`
- `--charcoal`
- `--red`
- `--gold`
- `--warm`
- `--wrap`

## Fuentes

Se usan tipografias de Google Fonts cargadas en CSS:

- `DM Sans` para texto general
- `Oswald` para titulares y elementos con mas presencia visual

## Archivos principales

- [`src/App.jsx`](src/App.jsx): estructura principal, datos de contenido y logica de animaciones
- [`src/styles.css`](src/styles.css): sistema visual completo, responsive y animaciones CSS complementarias
- [`src/main.jsx`](src/main.jsx): punto de entrada y error boundary
- [`index.html`](index.html): documento base de Vite

## Notas tecnicas

- El hero usa imagenes externas como contenido referencial.
- El carrusel principal avanza automaticamente cada pocos segundos.
- La navegacion es sticky, compacta al hacer scroll y tiene indicadores activos por seccion.
- La galeria horizontal queda anclada en escritorio para mejorar la sensacion de scroll inmersivo.
- En mobile, las secciones se reorganizan para mantener legibilidad y rendimiento.

## Recomendaciones para seguir mejorandolo

- Sustituir las imagenes referenciales por fotografias oficiales de la marca.
- Confirmar direccion final, horarios y datos de contacto.
- Si el negocio crece, separar cada seccion en componentes individuales para facilitar mantenimiento.

## Licencia

Proyecto interno / demostrativo para CHAROL. Ajusta este apartado segun el uso real que le vayas a dar.
