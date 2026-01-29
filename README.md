# Formulario de Registro de Alumnos y Familiares

Este proyecto es una aplicación web premium para el registro de alumnos, diseñada con un enfoque educativo. Utiliza **HTML5**, **CSS Vanila** y **JavaScript (ES6+)** con patrones de diseño avanzados.

## 🚀 Cómo Cargar el Formulario

Puesto que el formulario carga datos dinámicamente desde un archivo `data.json`, **debe ejecutarse a través de un servidor local** para evitar errores de seguridad del navegador (CORS).

### Opción 1: Usando XAMPP (Recomendado)
1. Coloca la carpeta del proyecto dentro de `C:\xampp\htdocs\`.
2. Asegúrate de que el módulo **Apache** esté iniciado en el Panel de Control de XAMPP.
3. Abre tu navegador y ve a: `http://localhost/Formulario-de-Registro-de-Alumnos-y-Familiares/`

### Opción 2: VS Code (Live Server)
1. Abre la carpeta en VS Code.
2. Si tienes instalada la extensión "Live Server", haz clic derecho en `index.html` y selecciona **"Open with Live Server"**.

---

## 📝 Cómo Usar el Formulario

El formulario está dividido en 5 pasos lógicos para facilitar la introducción de datos:

1.  **Datos del Alumno**: Introduce el nombre, apellidos y DNI. El campo **DNI** acepta cualquier combinación de 8 números y 1 letra (ej: `12345678A`).
2.  **Familiares Asociados**: Es obligatorio añadir al menos un familiar. Puedes añadir varios usando el botón "Añadir Familiar".
3.  **Dirección**: Completa los datos de ubicación. El Código Postal debe tener exactamente 5 dígitos.
4.  **Datos Académicos**: Selecciona los niveles de estudio y el colegio de procedencia.
5.  **Información Médica**: Opcionalmente, indica alergias o medicación.

### Finalización y Envío
*   Al hacer clic en **"Finalizar Registro"**, se validará que todos los campos requeridos sean correctos.
*   Si todo es correcto, aparecerá un **Modal de Resumen** con todos los datos introducidos usando el patrón *Builder* para organizar la información.
*   Haz clic en **"Confirmar y Enviar"** para simular el procesamiento de los datos.

---

## 🛠️ Detalles Técnicos
*   **Validación de DNI**: Solo comprueba el formato (8 números + 1 letra).
*   **Carga Dinámica**: Las opciones de idiomas, profesiones y niveles se cargan desde `data.json`.
*   **Arquitectura**: Utiliza el **Patrón Builder** (definido en `js/models.js`) para construir los objetos complejos de Alumno y Familiar de forma limpia.
