// Obtener los iconos para mostrar en el sweet alert
let json = '../img/icons';

//Constructor
function Enviarform(nombre, ap, am, email, msg) {
    this.nombre = nombre;
    this.ap = ap;
    this.am = nombre;
    this.email = email;
    this.msg = msg;
}

//get yhe input from HTML
const inputNombre = document.getElementById("txtNombre");
const inputAp = document.getElementById("txtAp");
const inputAm = document.getElementById("txtAm");
const inputEmail = document.getElementById("txtEmail");
const inputMsg = document.getElementById("txtMensaje");
let p;

function registrar() {

    //crear objeto
    //desplejar el objeto
    let newEnviarform = new Enviarform(inputNombre.value, inputAp.value, inputAm.value, inputEmail.value, inputMsg.value);

    // Validacion de los campos del formulario
    if (inputNombre.value.trim() === "" && inputAp.value.trim() === "" && inputAm.value.trim() === "" && inputEmail.value.trim() === "" && inputMsg.value.trim() === "") {
        msg_error("Todos los campos son obligatorios.");
    } else if (inputNombre.value.trim() === "") {
        msg_error("El nombre es obligatorio.");
    } else if (inputAp.value.trim() === "") {
        msg_error("El apellido paterno es obligatorio.");
    } else if (inputAm.value.trim() === "") {
        msg_error("El apellido materno es obligatorio.");
    } else if (inputEmail.value.trim() === "") {
        msg_error("El correo electrónico es obligatorio.");
    } else if (!/^\S+@\S+\.\S+$/.test(inputEmail.value.trim())) {
        msg_error("El correo electrónico no es válido.");
    } else if (inputMsg.value.trim() === "") {
        msg_error("El mensaje no puede estar vacío.");
    } else {
        display(newEnviarform);
    }
}

function display(enviarform) {
    msg_enviado(enviarform.nombre, enviarform.ap, enviarform.am, enviarform.email, enviarform.msg);

    // Limpiar el formulario
    document.getElementById('forma-contacto').reset();
}

// Funciones creadas para enviar alertas con sweet alert 2

// alerta de mensaje enviado
function msg_enviado(nombre, ap, am, email, msg) {
    swal({
        type: '',
        title: '',
        text: '',
        html: '<lord-icon src="' + `${json}/email.json` + '" trigger="loop" colors="primary:#c69cf4,secondary:#f4f19c,tertiary:#30e8bd" style="width:148px;height:148px"></lord-icon>' +
            '<br>' +
            '<b><h3 class=\"green-text\"><strong>Mensaje enviado con éxito!</strong></h3></b>',
        animation: false,
        customClass: "animate__animated animate__bounceIn",
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        width: 400,
    });
    setTimeout(function() {
        swal({
            type: '',
            title: '',
            text: '',
            html: '<lord-icon src="' + `${json}/email.json` + '" trigger="loop" colors="primary:#c69cf4,secondary:#f4f19c,tertiary:#30e8bd" style="width:148px;height:148px"></lord-icon>' +
                '<br>' +
                '<b><h3 class="green-text"><strong>Mensajes Recibidos</strong></h3></b><br>' +
                '<table style="width:100%; border-collapse: collapse; text-align: left;">' +
                '<thead>' +
                '<tr style="text-align: center;background: #4caf50;border-top-width: 1px;background: #4caf50;color: white;cursor: pointer;text-shadow: 0.1em 0.1em 0.15em #333;border: 4px 4px solid #7fe482;letter-spacing: 1px;">' +
                '<th style= "border: 1px solid #ddd; padding: 8px;"> Nombre </th>' +
                '<th style="border: 1px solid #ddd; padding: 8px;">Apellido Paterno</th>' +
                '<th style="border: 1px solid #ddd; padding: 8px;">Apellido Materno</th>' +
                '<th style="border: 1px solid #ddd; padding: 8px;">Email</th>' +
                '<th style="border: 1px solid #ddd; padding: 8px;">Mensaje</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody id="tabla-body">' +
                '<tr style="background-color: #D7FBD9;border: 4px 4px solid #7fe482;">' +
                '<td style="border: 1px solid #ddd; padding: 8px;">' + nombre + '</td>' +
                '<td style="border: 1px solid #ddd; padding: 8px;">' + ap + '</td>' +
                '<td style="border: 1px solid #ddd; padding: 8px;">' + am + '</td>' +
                '<td style="border: 1px solid #ddd; padding: 8px;">' + email + '</td>' +
                '<td style="border: 1px solid #ddd; padding: 8px;">' + msg + '</td>' +
                '</tr>' +
                '</tbody>' +
                '</table><br><br>',
            animation: false,
            customClass: "animated bounceIn",
            showCancelButton: false,
            showConfirmButton: false,
            showCloseButton: true,
            allowOutsideClick: true,
            allowEscapeKey: true,
            width: 1200,
        });
    }, 1000);
}

// alerta de error
function msg_error(msg) {
    swal({
        type: '',
        title: '',
        text: '',
        html: '<lord-icon src="' + `${json}/error.json` + '" trigger="loop" colors="primary:#ffc738,secondary:#e83a30" style="width:128px;height:128px"></lord-icon>' +
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