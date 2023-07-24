const firebaseConfig = {
  apiKey: "AIzaSyA3vCC-VzNMeiqfX-Sd_JlvmxzJePQt2NU",
  authDomain: "registroweb-e4967.firebaseapp.com",
  projectId: "registroweb-e4967",
  storageBucket: "registroweb-e4967.appspot.com",
  messagingSenderId: "963488014581",
  appId: "1:963488014581:web:ce292acb6d0d0188ad65bc"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
// Initialize Firebase Authentication and get a reference to the service
const auth = firebase.auth();

//Llamando elememtos en html
let btnRegistrar = document.getElementById('btnRegistrar');
let btnIngresar = document.getElementById('btnIngresar');
let contenidoDeLaWeb = document.getElementById('contenidoDeLaWeb');
let formulario = document.getElementById('formulario');
let btnCerrarSesion = document.getElementById('btnCerrarSesion');
let btnGoogle = document.getElementById('btnGoogle');
let btnFacebook = document.getElementById('btnFacebook');
let txtTitulo = document.getElementById('txtTitulo');
let txtDescripcion = document.getElementById('txtDescripcion');
let botonpublicar = document.getElementById('botonpublicar');


//funcion registrar
btnRegistrar.addEventListener('click', () => {
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("Inicio de Sesión Correcto")
      cargarJSON();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar')
      formulario.classList.replace('mostrar', 'ocultar')
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage)
      // ...
    });

})
//funcion inciar sesion
btnIngresar.addEventListener('click', () => {
  let email = document.getElementById('txtEmail').value;
  let password = document.getElementById('txtPassword').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log("Inicio sesion correctamente")
      cargarJSON();
      verDatosEnPantalla();
      contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
      formulario.classList.replace('mostrar', 'ocultar');

    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
})
//Cerrar sesion//
btnCerrarSesion.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("se cerro");
    contenidoDeLaWeb.classList.replace('mostrar', 'ocultar');
    formulario.classList.replace('ocultar', 'mostrar');
  }).catch((error) => {
    // An error happened.
    console.log("error");
  });
})
//funcion estado de usuario
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var uid = user.uid;
    cargarJSON();
    verDatosEnPantalla();
    contenidoDeLaWeb.classList.replace('ocultar', 'mostrar');
    formulario.classList.replace('mostrar', 'ocultar');
    //...
  } else {
    contenidoDeLaWeb.classList('mostrar', 'ocultar');
    formulario.classList.replace('ocultar', 'mostrar');
  }
});
//funcion google
btnGoogle.addEventListener('click', () => {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;

      console.log("Su sesion con Google se realizo correctamente");
    }).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error al enlazar Google");
    });
})
//funcion Facebook
btnFacebook.addEventListener('click', () => {
  var provider = new firebase.auth.FacebookAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      var credential = result.credential;
      console.log("Su sesion con Facebook se realizo correctamente");
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log("error al enlazar Facebook");
    });
})

//funcion json
function cargarJSON() {
  fetch('producto.json')
    .then(function (res) {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      let html = '';
      data.forEach((productos) => {
        html += `
        <div class="producto" >
        <p>${productos.marca}</p>
        <p>${productos.modelo}</p>
        <img src="${productos.img}" width="100px" class="imgProducto">
        <p>${productos.precio}</p>
        </div>
        `;
      });
      document.getElementById('resultado').innerHTML = html;
    })
}

//funcion agregar datos de Firestore
botonpublicar.addEventListener('click', () => {
  db.collection("divMimuro").add({
    titulo: txtTitulo = document.getElementById('txtTitulo').value,
    desripcion: txtDescripcion = document.getElementById('txtDescripcion').value,
  })
    .then((docRef) => {
      console.log("Se guardo Correctamente" , docRef.id);   
      verDatosEnPantalla();
    })
    .catch((error) => {
      console.log("Error al Guardar" , error);
    });
})

//funcion leer datos de firestore MEJORADOOO
function verDatosEnPantalla() {
  db.collection("divMimuro").get().then((querySnapshot) => {
    let html = '';
    querySnapshot.forEach((doc) => {
      console.log(`${doc.data().titulo}`);
      console.log(`${doc.data().desripcion}`);
      var listarDatos = `
      <li class="listarDatos">
      <h5 class="listarDatosH5"> ${doc.data().titulo} </h5>
      <p> ${doc.data().desripcion} </p>
      </li>
      `;
      html += listarDatos;  
    }); document.getElementById('verDatosEnPantallaTexto').innerHTML = html;
  })
}


