// Mostrar correos enviados
document.addEventListener('DOMContentLoaded', function () {

    // Mostrar estudiantes
    displayCorreos();

  });

//Constructor
function Enviarform(nombre, ap, am, email, msg) {
    this.nombre = nombre;
    this.ap = ap;
    this.am = am;
    this.email = email;
    this.msg = msg;
}

//get yhe input from HTML
const inputNombre = document.getElementById("txtNombre");
const inputAp = document.getElementById("txtAp");
const inputAm = document.getElementById("txtAm");
const inputEmail = document.getElementById("txtEmail");
const inputMsg = document.getElementById("txtMensaje");

// Recuperar email guardados o inicializar arreglo vacío
let correos = JSON.parse(localStorage.getItem("correos")) || [];

function registrar() {

    // Obtener valores ya recortados
    const nombre = inputNombre.value.trim();
    const ap = inputAp.value.trim();
    const am = inputAm.value.trim();
    const email = inputEmail.value.trim();
    const msg = inputMsg.value.trim();

    // Verificar si algún campo está vacío
    if (nombre === "" && ap === "" && am === "" && email === "" && msg === "") {
        msg_error("Todos los campos son obligatorios.");
    } else if (nombre === "") {
        msg_error("El nombre es obligatorio.");
    } else if (ap === "") {
        msg_error("El apellido paterno es obligatorio.");
    } else if (am === "") {
        msg_error("El apellido materno es obligatorio.");
    } else if (email === "") {
        msg_error("El correo electrónico es obligatorio.");
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        msg_error("El correo electrónico no es válido.");
    } else if (msg === "") {
        msg_error("El mensaje no puede estar vacío.");
    } else{

        //crear objeto
        let newEnviarform = new Enviarform(inputNombre.value, inputAp.value, inputAm.value, inputEmail.value, inputMsg.value);

        // Agregar el nuevo estudiante al arreglo 'correos' para almacenarlo en la memoria local
        correos.push(newEnviarform);

        // Guardar el arreglo de correos actualizado en el almacenamiento local (localStorage), 
        // convirtiendo el arreglo en una cadena JSON para que pueda ser almacenado como texto
        localStorage.setItem("correos", JSON.stringify(correos));

        // Se llamad ala funcion para enviad correo
        msg_enviado();

        // Limpiar el formulario
        document.getElementById('forma-contacto').reset();
    }
}

// Mostrar los correo registrados en una tabla con sweet alert2
function displayCorreos() {
    swal({
        type: '',
        title: '',
        text: '',
        html: `
            <div style="text-align: center;">
                <lord-icon src="https://cdn.lordicon.com/dpggoewm.json" trigger="loop"
                    colors="primary:#c69cf4,secondary:#f4f19c,tertiary:#30e8bd"
                    style="width:148px;height:148px">
                </lord-icon>
                <br>
                <h3 class="green-text"><strong>Mensajes Recibidos</strong></h3>
                <br>             
                <table style="width:100%; border-collapse: collapse; text-align: left;">
                    <thead>
                        <tr style="text-align: center;background: #4caf50;border-top-width: 1px;background: #4caf50;color: white;cursor: pointer;text-shadow: 0.1em 0.1em 0.15em #333;border: 4px 4px solid #7fe482;letter-spacing: 1px;">
                            <th style= "border: 1px solid #ddd; padding: 8px;"> # </th>
                            <th style= "border: 1px solid #ddd; padding: 8px;"> Nombre </th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Apellido Paterno</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Apellido Materno</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Email</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Mensaje</th>
                            <th style="border: 1px solid #ddd; padding: 8px;">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tabla-body"></tbody>
                </table>
                <br><br>
            </div>
        `,
        animation: false,
        customClass: "animate__animated animate__bounceIn",
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: true, 
        allowEscapeKey: true, 
        showCloseButton: true,
        width: 1200,
        onOpen: () => renderTablaCorreos(correos), // Llama a la función de renderizado cuando la alerta se abre
    });
}

// Función para renderizar la tabla con los datos de 'correos'
function renderTablaCorreos(correos) {
    const tbody = document.getElementById("tabla-body");

    if (!tbody) {
        console.error("No se encontró el cuerpo de la tabla");
        return;
    }

    if (!correos || correos.length === 0) {
        tbody.innerHTML = `<tr style="background-color: #D7FBD9;border: 4px 4px solid #7fe482;">
                                <td colspan='7' style="color: #ff0000; font-weight: 600; text-align: center; border: 1px solid #ddd; padding: 8px;">No hay correos para mostrar</td>
                            </tr>`;
        return;
    }

    tbody.innerHTML = ""; // Limpia la tabla antes de renderizar
    let rows = ""; // Almacena las filas antes de insertarlas

    correos.forEach((correo, index) => {
        rows += `
            <tr style="background-color: #D7FBD9;border: 4px 4px solid #7fe482;">
                <td style="text-align: center; border: 1px solid #ddd; padding: 8px;">${index + 1}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${correo.nombre}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${correo.ap}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${correo.am}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${correo.email}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${correo.msg}</td>
                <td style="text-align: center; border: 1px solid #ddd; padding: 8px;">
                    <button onclick="deleteCorreo(${index})" class="btn btn-danger btn-sm" 
                        data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar ${correo.nombre}">
                        <ion-icon name="trash-outline"></ion-icon>
                    </button>
                </td>
            </tr>
        `;
    });

    tbody.insertAdjacentHTML("beforeend", rows); // Inserta el HTML una sola vez
}

// Eliminar un correo
function deleteCorreo(index){
    correos.splice(index, 1); // Elimina el estudiante en la posición indicada
    localStorage.setItem("correos", JSON.stringify(correos));
    displayCorreos();
}

// Borrar todos los datos del ls
function clearStorage(){
    localStorage.removeItem("correos");
    correos = []; // Reiniciar el arreglo
    displayCorreos();
}

// Funciones creadas para enviar alertas con sweet alert 2
// alerta de mensaje enviado
function msg_enviado() {
    swal({
        type: '',
        title: '',
        text: '',
        html: '<lord-icon src="https://cdn.lordicon.com/dpggoewm.json" trigger="loop" colors="primary:#c69cf4,secondary:#f4f19c,tertiary:#30e8bd" style="width:148px;height:148px"></lord-icon>' +
            '<br>' +
            '<b><h3 class=\"green-text\"><strong>Mensaje enviado con éxito!</strong></h3></b>',
        animation: false,
        customClass: "animate__animated animate__bounceIn",
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        width: 400,
        onOpen: () => {
            // Usamos setTimeout para retrasar la llamada a displayCorreos()
            setTimeout(() => {
                displayCorreos(); // Llama a la función 'displayCorreos' después del tiempo especificado
            }, 2000); // 2000 milisegundos = 2 segundos (puedes ajustar el tiempo)
        },
    });
}

// alerta de error
function msg_error(msg) {
    swal({
        type: '',
        title: '',
        text: '',
        html: '<lord-icon src="https://cdn.lordicon.com/azxkyjta.json" trigger="loop" colors="primary:#ffc738,secondary:#e83a30" style="width:128px;height:128px"></lord-icon>' +
            '<br>' +
            '<b><h3><strong>Atención :(</strong></h3></b>' +
            '<h4 style=\"text-align: center !important; margin-top: 20px\"><span class=\"red-text\">' + msg + '</span></h4>' +
            '<br>',
        animation: false,
        customClass: "animate__animated animate__tada",
        showCancelButton: false,
        showConfirmButton: false,
        showCloseButton: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        width: 400,
    })
}