//Constructor
function Enviarform(nombre, email, msg) {
    this.nombre = nombre;
    this.email = email;
    this.msg = msg;
}

//get yhe input from HTML
const inputNombre = document.getElementById("txtNombre");
const inputEmail = document.getElementById("txtEmail");
const inputMsg = document.getElementById("txtMensaje");
let p;

function registrar() {

    //crear objeto
    //desplejar el oj
    let newEnviarform = new Enviarform(inputNombre.value, inputEmail.value, inputMsg.value);
    console.log(newEnviarform);

    if (inputNombre.value == "") {
        alert("Ingrese el nombre")
    } else {
        display(newEnviarform);
    }

    //alert("Registro exitoso!")
}

function display(enviarform) {
    const list = document.getElementById("list");
    p = `
        <div>
            <p>${enviarform.nombre} - ${enviarform.email} - ${enviarform.msg}</p>
        </div>
    `;

    list.innerHTML += p; // insert lista
}

// objetos
let enviarform1 = new Enviarform("Mario Jiménez Montes", "jimenez@uabc.edu.mx", "Tengo una duda con respecto a mi proceso de movilidad");
let enviarform2 = new Enviarform("Juan Iván García", "ivan.garcia@uabc.edu.mx", "Si ya cuento con mi aceptación que proceso sigue a continuacioón.");

display(enviarform1);
display(enviarform2);