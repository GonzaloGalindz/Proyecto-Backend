const socketClient = io();

const user = document.getElementById("correo");
const formulario = document.getElementById("formulario");
const inputMessage = document.getElementById("message");
const divChat = document.getElementById("chat");

let usuario;

Swal.fire({
  title: "BIENVENIDO",
  text: "Ingresa tu correo electronico",
  input: "text",
  inputValidator: (value) => {
    if (!value) {
      return "Necesitas ingresar tu correo";
    }
  },
}).then((correoDelUsuario) => {
  usuario = correoDelUsuario.value;
  user.innerText = `Hola ${usuario}`;
  socketClient.emit("usuarioNuevo", usuario);
});

formulario.onsubmit = (e) => {
  e.preventDefault();
  const infoMensaje = {
    correoDelUsuario: usuario,
    message: inputMessage.value,
  };
  socketClient.emit("mensaje", infoMensaje);
  inputMessage.value = "";
};

socketClient.on("chat", (messages) => {
  const chat = messages
    .map((objMessage) => {
      return `<p>${objMessage.correoDelUsuario}: ${objMessage.message}</p>`;
    })
    .join(" ");
  divChat.innerHTML = chat;
});

socketClient.on("broadcast", (usuario) => {
  Toastify({
    text: `${usuario} se ha conectado`,
    duration: 5000,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
  }).showToast();
});

const formProd = document.getElementById("formProduct");
const title = document.getElementById("title");
const description = document.getElementById("description");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const code = document.getElementById("code");
const tableProds = document.getElementById("bodyProd");
const formDelete = document.getElementById("deleteProduct");
const id = document.getElementById("id");

formProd.onsubmit = (e) => {
  e.preventDefault();
  const objProd = {
    title: title.value,
    description: description.value,
    price: Number(price.value),
    stock: Number(stock.value),
    code: code.value,
  };
  socketClient.emit("agregar", objProd);
  title.value = "";
  description.value = "";
  price.value = "";
  stock.value = "";
  code.value = "";
};

formDelete.onsubmit = (e) => {
  e.preventDefault();
  socketClient.emit("eliminar", Number(id.value));
  id.value = "";
};

socketClient.on("added", (newProduct) => {
  if (typeof newProduct === "object") {
    const addRow = `
        <tr>
            <td>${newProduct.id}</td>
            <td>${newProduct.title}</td>
            <td>${newProduct.description}</td>
            <td>${newProduct.price}</td>
            <td>${newProduct.stock}</td>
            <td>${newProduct.code}</td>
        </tr>`;
    tableProds.innerHTML += addRow;
  }
});

socketClient.on("deleted", (arrProducts) => {
  if (typeof arrProducts === "object") {
    const addRow = arrProducts
      .map((objProd) => {
        return `
              <tr>
                  <td>${objProd.id}</td>
                  <td>${objProd.title}</td>
                  <td>${objProd.description}</td>
                  <td>${objProd.price}</td>
                  <td>${objProd.stock}</td>
                  <td>${objProd.code}</td>
              </tr>`;
      })
      .join(" ");
    tableProds.innerHTML = addRow;
  }
});
