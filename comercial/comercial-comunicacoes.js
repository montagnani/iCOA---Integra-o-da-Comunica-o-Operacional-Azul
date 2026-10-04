// ========================================
// iCOA — COMUNICAÇÕES DO COMERCIAL
// ========================================


const listaMensagens =
    document.getElementById("listaMensagens");

const campoMensagem =
    document.getElementById("mensagem");

const formMensagem =
    document.getElementById("formMensagem");

const badgeCCO =
    document.getElementById("badgeCCO");

const badgeMenu =
    document.getElementById("badgeMenu");


// ========================================
// CONFIGURAÇÃO
// ========================================

const areaSelecionada = "Comercial";

const destinatario = "CCO";


// ========================================
// CARREGAR COMUNICAÇÕES
// ========================================

let comunicacoes =
    JSON.parse(
        localStorage.getItem("comunicacoes")
    ) || {};


// ========================================
// SALVAR COMUNICAÇÕES
// ========================================

function salvarComunicacoes() {

    localStorage.setItem(
        "comunicacoes",
        JSON.stringify(comunicacoes)
    );

}


// ========================================
// MOSTRAR MENSAGENS
// ========================================

function mostrarMensagens() {

    listaMensagens.innerHTML = "";


    const mensagens =
        comunicacoes["Comercial"] || [];


    if (mensagens.length === 0) {

        const vazio =
            document.createElement("div");

        vazio.classList.add("conversa-vazia");

        vazio.innerHTML = `
            <div class="icone-vazio">💬</div>

            <h4>Nenhuma mensagem</h4>

            <p>
                A comunicação com o CCO aparecerá aqui.
            </p>
        `;

        listaMensagens.appendChild(vazio);

        return;
    }


    mensagens.forEach(function(mensagem) {

        criarMensagem(mensagem);

    });


    listaMensagens.scrollTop =
        listaMensagens.scrollHeight;

}


// ========================================
// CRIAR MENSAGEM
// ========================================

function criarMensagem(mensagem) {

    const elemento =
        document.createElement("div");


    if (mensagem.remetente === "Comercial") {

        elemento.classList.add(
            "mensagem",
            "mensagem-enviada"
        );

    } else {

        elemento.classList.add(
            "mensagem",
            "mensagem-recebida"
        );

    }


    const data =
        new Date(mensagem.data);


    const hora =
        data.toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    elemento.innerHTML = `

        <strong>
            ${mensagem.remetente}
        </strong>

        <div>
            ${mensagem.texto}
        </div>

        <small>
            ${hora}
        </small>

    `;


    listaMensagens.appendChild(elemento);

}


// ========================================
// ENVIAR MENSAGEM
// ========================================

formMensagem.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const texto =
            campoMensagem.value.trim();


        if (!texto) {
            return;
        }


        const novaMensagem = {

            id: Date.now(),

            remetente:
                "Comercial",

            destinatario:
                "CCO",

            texto:
                texto,

            data:
                new Date().toISOString()

        };


        if (!comunicacoes["Comercial"]) {

            comunicacoes["Comercial"] = [];

        }


        comunicacoes["Comercial"].push(
            novaMensagem
        );


        salvarComunicacoes();


        campoMensagem.value = "";


        mostrarMensagens();


        atualizarNotificacao();


        campoMensagem.focus();

    }
);


// ========================================
// ATUALIZAR NOTIFICAÇÃO
// ========================================

function atualizarNotificacao() {

    const mensagens =
        comunicacoes["Comercial"] || [];


    const mensagensCCO =
        mensagens.filter(function(mensagem) {

            return mensagem.remetente === "CCO";

        });


    const mensagensLidas =
        parseInt(
            localStorage.getItem(
                "mensagensLidasComercial"
            )
        ) || 0;


    const novasMensagens =
        mensagensCCO.length -
        mensagensLidas;


    if (novasMensagens > 0) {

        badgeCCO.textContent =
            novasMensagens;

        badgeMenu.textContent =
            novasMensagens;

    } else {

        badgeCCO.textContent = "";

        badgeMenu.textContent = "";

    }

}


// ========================================
// MARCAR COMO LIDAS
// ========================================

function marcarMensagensComoLidas() {

    const mensagens =
        comunicacoes["Comercial"] || [];


    const mensagensCCO =
        mensagens.filter(function(mensagem) {

            return mensagem.remetente === "CCO";

        });


    localStorage.setItem(
        "mensagensLidasComercial",
        mensagensCCO.length
    );


    badgeCCO.textContent = "";

    badgeMenu.textContent = "";

}


// ========================================
// VERIFICAR NOVAS MENSAGENS
// ========================================

function verificarNovasMensagens() {

    const dadosAtualizados =
        JSON.parse(
            localStorage.getItem("comunicacoes")
        ) || {};


    const mensagensAtuais =
        dadosAtualizados["Comercial"] || [];


    const quantidadeAnterior =
        (
            comunicacoes["Comercial"] || []
        ).length;


    if (
        mensagensAtuais.length >
        quantidadeAnterior
    ) {

        comunicacoes =
            dadosAtualizados;


        mostrarMensagens();


        atualizarNotificacao();

    }

}


// ========================================
// ATUALIZAÇÃO AUTOMÁTICA
// ========================================

setInterval(
    verificarNovasMensagens,
    1000
);


// ========================================
// INICIALIZAÇÃO
// ========================================

mostrarMensagens();

marcarMensagensComoLidas();

atualizarNotificacao();


console.log(
    "iCOA — Comunicações do Comercial carregado."
);