/**
 * Clase que representa a un Familiar.
 */
function Familiar() {
    this.nombre = "";
    this.apellidos = "";
    this.nif = "";
    this.profesion = "";
    this.ciudadNacimiento = "";
    this.lenguaMaterna = "";
    this.idiomasConocidos = [];
}

/**
 * Clase que representa a un Alumno.
 */
function Alumno() {
    this.nombre = "";
    this.apellidos = "";
    this.nif = "";
    this.lenguaMaterna = "";
    this.idiomasConocidos = [];
    this.familiares = [];
    this.direccion = {
        pais: "",
        ciudad: "",
        poblacion: "",
        direccionCompleta: "",
        codigoPostal: ""
    };
    this.datosAcademicos = {
        colegioProcedencia: "",
        nivelAlcanzado: "",
        idiomasEstudiados: [],
        nivelSolicitado: ""
    };
    this.infoMedica = {
        alergias: [],
        medicacion: ""
    };
}

//--- Constructor (Builder) para Familiar ---
function ConstructorFamiliar() {
    this.familiar = new Familiar();
}

ConstructorFamiliar.prototype.establecerNombre = function (nombre) {
    this.familiar.nombre = nombre;
    return this;
};

ConstructorFamiliar.prototype.establecerApellidos = function (apellidos) {
    this.familiar.apellidos = apellidos;
    return this;
};

ConstructorFamiliar.prototype.establecerNif = function (nif) {
    this.familiar.nif = nif;
    return this;
};

ConstructorFamiliar.prototype.establecerProfesion = function (profesion) {
    this.familiar.profesion = profesion;
    return this;
};

ConstructorFamiliar.prototype.establecerCiudadNacimiento = function (ciudad) {
    this.familiar.ciudadNacimiento = ciudad;
    return this;
};

ConstructorFamiliar.prototype.establecerLenguaMaterna = function (lengua) {
    this.familiar.lenguaMaterna = lengua;
    return this;
};

ConstructorFamiliar.prototype.establecerIdiomasConocidos = function (idiomas) {
    this.familiar.idiomasConocidos = idiomas;
    return this;
};

ConstructorFamiliar.prototype.construir = function () {
    return this.familiar;
};

//--- Constructor (Builder) para Alumno ---
function ConstructorAlumno() {
    this.alumno = new Alumno();
}

ConstructorAlumno.prototype.establecerDatosPersonales = function (nombre, apellidos, nif, lenguaMaterna, idiomasConocidos) {
    this.alumno.nombre = nombre;
    this.alumno.apellidos = apellidos;
    this.alumno.nif = nif;
    this.alumno.lenguaMaterna = lenguaMaterna;
    this.alumno.idiomasConocidos = idiomasConocidos;
    return this;
};

ConstructorAlumno.prototype.agregarFamiliar = function (familiar) {
    this.alumno.familiares.push(familiar);
    return this;
};

ConstructorAlumno.prototype.establecerDireccion = function (pais, ciudad, poblacion, direccionCompleta, codigoPostal) {
    this.alumno.direccion = { pais, ciudad, poblacion, direccionCompleta, codigoPostal };
    return this;
};

ConstructorAlumno.prototype.establecerDatosAcademicos = function (colegio, nivelAlcanzado, idiomasEstudiados, nivelSolicitado) {
    this.alumno.datosAcademicos = { colegioProcedencia: colegio, nivelAlcanzado, idiomasEstudiados, nivelSolicitado };
    return this;
};

ConstructorAlumno.prototype.establecerInfoMedica = function (alergias, medicacion) {
    this.alumno.infoMedica = { alergias, medicacion };
    return this;
};

ConstructorAlumno.prototype.construir = function () {
    return this.alumno;
};

// Exportación a la ventana para acceso global
window.Familiar = Familiar;
window.Alumno = Alumno;
window.ConstructorFamiliar = ConstructorFamiliar;
window.ConstructorAlumno = ConstructorAlumno;
