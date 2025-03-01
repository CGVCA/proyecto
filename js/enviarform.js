//Constructor
function Enviarform(nombre, email, msg) {
    this.nombre = nombre;
    this.email = email;
    this.msg = msg;
}

function register() {
    console.log("Registrando...");
}

// objetos
let enviarform1 = new Enviarform("Mario Jiménez Montes", "jimenez@uabc.edu.mx", "Tengo una duda con respecto a mi proceso de movilidad");
let enviarform2 = new Enviarform("Juan Iván García", "ivan.garcia@uabc.edu.mx", "Si ya cuento con mi aceptación que proceso sigue a continuacioón.");

console.log(enviarform1, enviarform2);