# Diario Aurora - Suscripción

Este proyecto es parte del desarrollo continuo del Diario Aurora, iniciado en la clase 6.  
La funcionalidad agregada corresponde a la clase 10 e incluye validaciones, envío al servidor, manejo de errores y almacenamiento local de datos del formulario.

## Archivos principales

- `index.html` - Portada principal del diario.
- `subscription.html` - Página de suscripción con formulario.
- `styles/base.css` - Estilos generales del sitio.
- `styles/subscription.css` - Estilos específicos para el formulario de suscripción y el modal.
- `subscription.js` - Validaciones, envío por método GET, manejo del modal y localStorage.

## Funcionalidades implementadas

- Validaciones en tiempo real para todos los campos del formulario.
- Título dinámico que se modifica a medida que se completa el campo "Nombre completo".
- Envío de los datos del formulario al servidor mediante método GET con query params:
  http://curso-dev-2021.herokuapp.com/newsletter?nombre=Juan&apellido=Perez
- Modal emergente para mostrar mensajes de éxito o error.
- Uso de localStorage para guardar los datos si el envío es exitoso.
- Precarga automática del formulario con los datos almacenados en localStorage.
- Diseño responsive:
  - En celulares: campos apilados en una sola columna.
  - En escritorio: distribución en dos columnas con el botón centrado.

## Tecnologías utilizadas

- HTML5
- CSS3 (Flexbox y Media Queries)
- JavaScript (DOM, eventos, validaciones, fetch, localStorage)

## Visualización online

El proyecto puede verse en GitHub Pages:  
https://maximoambro.github.io/DesarrolloWebAmbrosino/

## Fecha

26 de junio de 2025
