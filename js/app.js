document.addEventListener('DOMContentLoaded', () => {
    // --- Datos y Elementos ---
    let datosJson = null;
    const formulario = document.getElementById('formularioRegistro');
    const contenedorFamiliares = document.getElementById('contenedorFamiliares');
    const btnAgregarFamiliar = document.getElementById('btnAgregarFamiliar');
    const plantillaFamiliar = document.getElementById('plantillaFamiliar');
    const modalResumen = document.getElementById('modalResumen');
    const cuerpoResumen = document.getElementById('cuerpoResumen');
    const modalAviso = document.getElementById('modalAviso');
    const avisoTitulo = document.getElementById('avisoTitulo');
    const avisoMensaje = document.getElementById('avisoMensaje');
    const btnAceptoAviso = document.getElementById('btnAceptoAviso');
    const botonesCerrar = document.querySelectorAll('.cerrar-modal');

    // Selectores de dirección
    const selPais = document.getElementById('direccionPais');
    const selCiudad = document.getElementById('direccionCiudad');
    const selPoblacion = document.getElementById('direccionPoblacion');

    // --- Inicialización ---
    cargarOpcionesFormulario();
    agregarFamiliar(); // Añadir el primer familiar obligatorio

    // --- Escuchadores de Eventos ---
    btnAgregarFamiliar.addEventListener('click', () => agregarFamiliar());


    botonesCerrar.forEach(btn => {
        btn.onclick = () => {
            modalResumen.style.display = "none";
            modalAviso.style.display = "none";
        };
    });

    btnAceptoAviso.onclick = () => {
        modalAviso.style.display = "none";
    };

    window.onclick = (evento) => {
        if (evento.target == modalResumen) modalResumen.style.display = "none";
        if (evento.target == modalAviso) modalAviso.style.display = "none";
    };

    formulario.addEventListener('submit', manejarEnvioFormulario);

    // --- Funciones de Utilidad ---

    function mostrarAviso(mensaje, titulo = "Aviso") {
        avisoTitulo.textContent = titulo;
        avisoMensaje.textContent = mensaje;
        modalAviso.style.display = "block";
    }

    /**
     * Carga las opciones desde data.json y puebla los selects estáticos
     */
    async function cargarOpcionesFormulario() {
        try {
            const respuesta = await fetch('data.json');
            datosJson = await respuesta.json();

            // Poblar selects compartidos entre Alumno/Familiar
            poblarSelect('alumnoLengua', datosJson.languages);
            poblarSelect('alumnoIdiomas', datosJson.languages);
            poblarSelect('academiaNivel', datosJson.academicLevels);
            poblarSelect('academiaIdiomas', datosJson.languages);
            poblarSelect('academiaSolicitado', datosJson.studyRequested);
            poblarSelect('medicaAlergias', datosJson.allergies);


            // Actualizar campos de familiares existentes si los hay
            actualizarTodosLosSelectsFamiliares();

        } catch (error) {
            console.error('Error al cargar los datos JSON:', error);
        }
    }

    function poblarSelect(id, opciones) {
        const elemento = document.getElementById(id);
        if (!elemento) return;

        // Mantener la primera opción (Seleccione...)
        const primeraOpcion = elemento.querySelector('option[value=""]');
        elemento.innerHTML = '';
        if (primeraOpcion) elemento.appendChild(primeraOpcion);

        opciones.forEach(opt => {
            const o = document.createElement('option');
            o.value = opt;
            o.textContent = opt;
            elemento.appendChild(o);
        });
    }

    function agregarFamiliar() {
        const clon = plantillaFamiliar.content.cloneNode(true);
        const tarjeta = clon.querySelector('.tarjeta-familiar');
        const indice = contenedorFamiliares.children.length + 1;
        tarjeta.querySelector('.indice-familiar').textContent = indice;

        // Poblar selects para este clon específico
        if (datosJson) {
            poblarElementoSelect(tarjeta.querySelector('.fam-profesion'), datosJson.professions);
            poblarElementoSelect(tarjeta.querySelector('.fam-lengua'), datosJson.languages);
            poblarElementoSelect(tarjeta.querySelector('.fam-idiomas'), datosJson.languages);
        }

        // Lógica del botón eliminar
        tarjeta.querySelector('.btn-eliminar-familiar').onclick = function () {
            if (contenedorFamiliares.children.length > 1) {
                tarjeta.remove();
                actualizarIndicesFamiliares();
            } else {
                mostrarAviso("Es obligatorio tener al menos un familiar.");
            }
        };

        contenedorFamiliares.appendChild(clon);
    }

    function poblarElementoSelect(select, opciones) {
        const primeraOpcion = select.querySelector('option[value=""]');
        select.innerHTML = '';
        if (primeraOpcion) select.appendChild(primeraOpcion);
        opciones.forEach(opt => {
            const o = document.createElement('option');
            o.value = opt;
            o.textContent = opt;
            select.appendChild(o);
        });
    }

    function actualizarIndicesFamiliares() {
        Array.from(contenedorFamiliares.children).forEach((tarjeta, i) => {
            tarjeta.querySelector('.indice-familiar').textContent = i + 1;
        });
    }

    function actualizarTodosLosSelectsFamiliares() {
        if (!datosJson) return;
        document.querySelectorAll('.fam-profesion').forEach(s => poblarElementoSelect(s, datosJson.professions));
        document.querySelectorAll('.fam-lengua').forEach(s => poblarElementoSelect(s, datosJson.languages));
        document.querySelectorAll('.fam-idiomas').forEach(s => poblarElementoSelect(s, datosJson.languages));
    }

    // --- Lógica de Validación ---

    function validarDNI(dni) {
        if (!dni) return false;
        dni = dni.toUpperCase().trim();

        // Ahora solo comprobamos el formato: (8 números + letra) o (letra + 7 números + letra)
        const regex = /^([0-9]{8}|[XYZ][0-9]{7})[A-Z]$/;
        return regex.test(dni);
    }

    function validarCP(cp) {
        return /^[0-9]{5}$/.test(cp);
    }

    function validarFormulario() {
        let esValido = true;
        const requeridos = formulario.querySelectorAll('[required]');

        requeridos.forEach(campo => {
            const grupo = campo.closest('.grupo-formulario') || campo.parentElement;
            let campoValido = true;

            if (campo.tagName === 'SELECT' && campo.multiple) {
                campoValido = campo.selectedOptions.length > 0;
            } else if (!campo.value.trim()) {
                campoValido = false;
            }

            // Validaciones personalizadas
            if (campoValido) {
                if (campo.id === 'alumnoDNI' || campo.classList.contains('fam-dni')) {
                    if (!validarDNI(campo.value)) campoValido = false;
                }
                if (campo.id === 'direccionCP') {
                    if (!validarCP(campo.value)) campoValido = false;
                }
            }

            if (!campoValido) {
                grupo.classList.add('invalido');
                esValido = false;
            } else {
                grupo.classList.remove('invalido');
            }
        });

        return esValido;
    }

    // --- Envío del Formulario y Uso del Patrón Builder ---

    function manejarEnvioFormulario(e) {
        e.preventDefault();

        if (!validarFormulario()) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        // PATRÓN BUILDER EN ACCIÓN
        const constructorAlumno = new ConstructorAlumno();

        // 1. Datos del Alumno
        const idiomasAlumno = Array.from(document.getElementById('alumnoIdiomas').selectedOptions).map(o => o.value);
        constructorAlumno.establecerDatosPersonales(
            document.getElementById('alumnoNombre').value,
            document.getElementById('alumnoApellidos').value,
            document.getElementById('alumnoDNI').value,
            document.getElementById('alumnoLengua').value,
            idiomasAlumno
        );

        // 2. Familiares
        document.querySelectorAll('.tarjeta-familiar').forEach(tarjeta => {
            const constructorFam = new ConstructorFamiliar();
            const idiomasFam = Array.from(tarjeta.querySelector('.fam-idiomas').selectedOptions).map(o => o.value);

            const familiar = constructorFam
                .establecerNombre(tarjeta.querySelector('.fam-nombre').value)
                .establecerApellidos(tarjeta.querySelector('.fam-apellidos').value)
                .establecerDni(tarjeta.querySelector('.fam-dni').value)
                .establecerProfesion(tarjeta.querySelector('.fam-profesion').value)
                .establecerCiudadNacimiento(tarjeta.querySelector('.fam-ciudad').value)
                .establecerLenguaMaterna(tarjeta.querySelector('.fam-lengua').value)
                .establecerIdiomasConocidos(idiomasFam)
                .construir();

            constructorAlumno.agregarFamiliar(familiar);
        });

        // 3. Dirección
        constructorAlumno.establecerDireccion(
            selPais.value,
            selCiudad.value,
            selPoblacion.value,
            document.getElementById('direccionCompleta').value,
            document.getElementById('direccionCP').value
        );

        // 4. Datos Académicos
        const idiomasAca = Array.from(document.getElementById('academiaIdiomas').selectedOptions).map(o => o.value);
        constructorAlumno.establecerDatosAcademicos(
            document.getElementById('academiaColegio').value,
            document.getElementById('academiaNivel').value,
            idiomasAca,
            document.getElementById('academiaSolicitado').value
        );

        // 5. Información Médica
        const alergias = Array.from(document.getElementById('medicaAlergias').selectedOptions).map(o => o.value);
        constructorAlumno.establecerInfoMedica(alergias, document.getElementById('medicaMedicacion').value);

        const alumnoFinal = constructorAlumno.construir();
        mostrarResumen(alumnoFinal);
    }

    function mostrarResumen(alumno) {
        let html = `
            <div class="grupo-resumen">
                <h4>Datos del Alumno</h4>
                <div class="item-resumen"><span class="etiqueta-resumen">Nombre:</span> ${alumno.nombre} ${alumno.apellidos}</div>
                <div class="item-resumen"><span class="etiqueta-resumen">DNI:</span> ${alumno.dni}</div>
                <div class="item-resumen"><span class="etiqueta-resumen">Lengua:</span> ${alumno.lenguaMaterna}</div>
                <div class="item-resumen"><span class="etiqueta-resumen">Idiomas:</span> ${alumno.idiomasConocidos.join(', ')}</div>
            </div>
            
            <div class="grupo-resumen">
                <h4>Familiares (${alumno.familiares.length})</h4>
                ${alumno.familiares.map((f, i) => `
                    <div style="margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #ddd;">
                        <strong>Familiar ${i + 1}:</strong> ${f.nombre} ${f.apellidos} (${f.dni})<br>
                        <small>Profesión: ${f.profesion || 'No indicada'} | Ciudad Nac.: ${f.ciudadNacimiento}</small>
                    </div>
                `).join('')}
            </div>

            <div class="grupo-resumen">
                <h4>Dirección</h4>
                <div class="item-resumen"><span class="etiqueta-resumen">Ubicación:</span> ${alumno.direccion.poblacion}, ${alumno.direccion.ciudad}, ${alumno.direccion.pais}</div>
                <div class="item-resumen"><span class="etiqueta-resumen">CP:</span> ${alumno.direccion.codigoPostal}</div>
            </div>

            <div class="grupo-resumen">
                <h4>Datos Académicos</h4>
                <div class="item-resumen"><span class="etiqueta-resumen">Colegio:</span> ${alumno.datosAcademicos.colegioProcedencia}</div>
                <div class="item-resumen"><span class="etiqueta-resumen">Nivel Solicitado:</span> ${alumno.datosAcademicos.nivelSolicitado}</div>
            </div>
        `;

        cuerpoResumen.innerHTML = html;
        modalResumen.style.display = "block";
    }

    // Lógica del botón de confirmación
    document.getElementById('btnConfirmar').onclick = () => {
        mostrarAviso("¡Registro completado con éxito! Los datos han sido procesados.", "Éxito");
        modalResumen.style.display = "none";
        formulario.reset();
        // Resetear partes dinámicas
        contenedorFamiliares.innerHTML = '';
        agregarFamiliar();
    };
});
