// ========================================
// iCOA — COMUNICAÇÕES DA MANUTENÇÃO
// ========================================


// ========================================
// PEGAR ELEMENTOS DO HTML
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
// ÁREA DA CONVERSA
// ========================================

const areaSelecionada = "Manutenção";
const destinatario = "CCO";


// ========================================
// PEGAR COMUNICAÇÕES
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

    // ----------------------------------------
    // PEGAR CONVERSA COM O CCO
    // ----------------------------------------

    const mensagens =
        comunicacoes["Manutenção"] || [];


    // ----------------------------------------
    // NENHUMA MENSAGEM
    // ----------------------------------------

    if (mensagens.length === 0) {

        const vazio =
            document.createElement("div");

        vazio.classList.add("conversa-vazia");

        vazio.innerHTML = `
            <div class="icone-vazio">
                💬
            </div>

            <h4>
                Nenhuma mensagem
            </h4>

            <p>
                A comunicação com o CCO aparecerá aqui.
            </p>
        `;

        listaMensagens.appendChild(vazio);

        return;
    }


    // ----------------------------------------
    // CRIAR MENSAGENS
    // ----------------------------------------

    mensagens.forEach(function(mensagem) {

        criarMensagem(mensagem);

    });


    // ----------------------------------------
    // IR PARA O FINAL
    // ----------------------------------------

    listaMensagens.scrollTop =
        listaMensagens.scrollHeight;
}


// ========================================
// CRIAR MENSAGEM
// ========================================

function criarMensagem(mensagem) {

    const elemento =
        document.createElement("div");


    // ----------------------------------------
    // DEFINIR LADO DA MENSAGEM
    // ----------------------------------------

    if (mensagem.remetente === "Manutenção") {

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


    // ----------------------------------------
    // FORMATAR HORA
    // ----------------------------------------

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


    // ----------------------------------------
    // MOSTRAR MENSAGEM
    // ----------------------------------------

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


        // ----------------------------------------
        // PEGAR TEXTO
        // ----------------------------------------

        const texto =
            campoMensagem.value.trim();


        // ----------------------------------------
        // NÃO ENVIAR VAZIO
        // ----------------------------------------

        if (!texto) {
            return;
        }


        // ----------------------------------------
        // CRIAR MENSAGEM
        // ----------------------------------------

        const novaMensagem = {

            id: Date.now(),

            remetente:
                "Manutenção",

            destinatario:
                "CCO",

            texto:
                texto,

            data:
                new Date().toISOString()
        };


        // ----------------------------------------
        // CRIAR CONVERSA
        // ----------------------------------------

        if (!comunicacoes["Manutenção"]) {

            comunicacoes["Manutenção"] = [];

        }


        // ----------------------------------------
        // ADICIONAR MENSAGEM
        // ----------------------------------------

        comunicacoes["Manutenção"].push(
            novaMensagem
        );


        // ----------------------------------------
        // SALVAR
        // ----------------------------------------

        salvarComunicacoes();


        // ----------------------------------------
        // LIMPAR CAMPO
        // ----------------------------------------

        campoMensagem.value = "";


        // ----------------------------------------
        // ATUALIZAR CONVERSA
        // ----------------------------------------

        mostrarMensagens();


        // ----------------------------------------
        // ATUALIZAR NOTIFICAÇÕES
        // ----------------------------------------

        atualizarNotificacao();


        // ----------------------------------------
        // VOLTAR PARA O CAMPO
        // ----------------------------------------

        campoMensagem.focus();

    }
);


// ========================================
// NOTIFICAÇÕES
// ========================================

function atualizarNotificacao() {

    const mensagens =
        comunicacoes["Manutenção"] || [];


    // ----------------------------------------
    // PEGAR QUANTIDADE DE MENSAGENS DO CCO
    // ----------------------------------------

    const mensagensCCO =
        mensagens.filter(function(mensagem) {

            return mensagem.remetente === "CCO";

        });


    // ----------------------------------------
    // PEGAR QUANTIDADE JÁ LIDA
    // ----------------------------------------

    const mensagensLidas =
        parseInt(
            localStorage.getItem(
                "mensagensLidasManutencao"
            )
        ) || 0;


    // ----------------------------------------
    // CALCULAR NOVAS MENSAGENS
    // ----------------------------------------

    const novasMensagens =
        mensagensCCO.length - mensagensLidas;


    // ----------------------------------------
    // MOSTRAR OU ESCONDER BADGES
    // ----------------------------------------

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
// MARCAR MENSAGENS COMO LIDAS
// ========================================

function marcarMensagensComoLidas() {

    const mensagens =
        comunicacoes["Manutenção"] || [];


    // ----------------------------------------
    // CONTAR MENSAGENS DO CCO
    // ----------------------------------------

    const mensagensCCO =
        mensagens.filter(function(mensagem) {

            return mensagem.remetente === "CCO";

        });


    // ----------------------------------------
    // SALVAR QUANTIDADE LIDA
    // ----------------------------------------

    localStorage.setItem(
        "mensagensLidasManutencao",
        mensagensCCO.length
    );


    // ----------------------------------------
    // ESCONDER NOTIFICAÇÕES
    // ----------------------------------------

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
        dadosAtualizados["Manutenção"] || [];


    const quantidadeAnterior =
        (comunicacoes["Manutenção"] || []).length;


    // ----------------------------------------
    // VERIFICAR SE CHEGOU MENSAGEM
    // ----------------------------------------

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
// ATUALIZAR A CADA 1 SEGUNDO
// ========================================

setInterval(
    verificarNovasMensagens,
    1000
);


// ========================================
// CARREGAR AO ABRIR
// ========================================

mostrarMensagens();


// ========================================
// MARCAR MENSAGENS DO CCO COMO LIDAS
// ========================================

marcarMensagensComoLidas();


// ========================================
// NOTIFICAÇÃO INICIAL
// ========================================

atualizarNotificacao();


// ========================================
// CONSOLE
// ========================================

console.log(
    "iCOA — Comunicações da Manutenção carregado."
);