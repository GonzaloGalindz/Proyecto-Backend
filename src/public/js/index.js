const socketClient = io();

const formProd = document.getElementById("formProduct");
const nameProduct = document.getElementById("nameProduct");
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
    name: nameProduct.value,
    code: code.value,
    price: Number(price.value),
    stock: Number(stock.value),
    description: description.value,
  };
  socketClient.emit("agregar", objProd);
  nameProduct.value = "";
  code.value = "";
  price.value = "";
  stock.value = "";
  description.value = "";
};

formDelete.onsubmit = (e) => {
  e.preventDefault();
  socketClient.emit("eliminar", id.value);
  id.value = "";
};

socketClient.on("added", (newProduct) => {
  if (typeof newProduct === "object") {
    const addRow = `
        <tr>
            <td>${newProduct.name}</td>
            <td>${newProduct.code}</td>
            <td>${newProduct.price}</td>
            <td>${newProduct.stock}</td>
            <td>${newProduct.description}</td>
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
                  <td>${objProd.name}</td>
                  <td>${objProd.code}</td>
                  <td>${objProd.price}</td>
                  <td>${objProd.stock}</td>
                  <td>${objProd.description}</td>
              </tr>`;
      })
      .join(" ");
    tableProds.innerHTML = addRow;
  }
});

//Chat
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

//add product y view detail
document.addEventListener("Purchase", () => {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("button-detail")) {
      const productId = event.target.getAttribute("pid-data");
      viewDetails(productId);
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("button-add-product")) {
      const productId = event.target.getAttribute("pid-data");
      addToCart(productId);
    }
  });
});
