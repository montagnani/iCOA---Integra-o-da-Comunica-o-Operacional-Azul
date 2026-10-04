




/*
const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(event) {


event.preventDefault();

const usuario = document.getElementById("usuario").value;
const senha = document.getElementById("senha").value;


// LOGIN DO CCO

if (usuario === "cco" && senha === "1234") {

    window.location.href = "CCO/CCO.html";

} else {

    alert("Usuário ou senha incorretos.");

}


});
*/






/* atual*/

const formulario = document.querySelector("form");

formulario.addEventListener("submit", function(event) {


event.preventDefault();

const usuario = document.getElementById("usuario").value;
const senha = document.getElementById("senha").value;


// LOGIN DO CCO

if (usuario === "cco" && senha === "1234") {

    window.location.href = "CCO/CCO.html";

    return;
}


// LOGIN DA MANUTENÇÃO

if (usuario === "manutencao" && senha === "1234") {

    window.location.href = "MANUTENCAO/MANUTENCAO.html";

    return;
}



// LOGIN DA handling

if (usuario === "handling" && senha === "1234") {

    window.location.href = "handling/handling.html";

    return;
}



// LOGIN DA comercial

if (usuario === "comercial" && senha === "1234") {

    window.location.href = "comercial/comercial.html";

    return;
}




// LOGIN Do atendimento

if (usuario === "atendimento" && senha === "1234") {

    window.location.href = "atendimento/atendimento.html";

    return;
}



// LOGIN INCORRETO

alert("Usuário ou senha incorretos.");


});


