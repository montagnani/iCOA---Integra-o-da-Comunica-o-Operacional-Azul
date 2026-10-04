// ========================================
// iCOA — COMUNICAÇÕES DO CCO
// ========================================


// ========================================
// PEGAR ELEMENTOS DO HTML
// ========================================

const botoesAreas =
    document.querySelectorAll(".area-comunicacao-item");

const listaMensagens =
    document.getElementById("listaMensagens");

const conversaVazia =
    document.getElementById("conversaVazia");

const nomeArea =
    document.getElementById("nomeArea");

const descricaoArea =
    document.getElementById("descricaoArea");

const iconeConversa =
    document.getElementById("iconeConversa");

const campoMensagem =
    document.getElementById("mensagem");

const formMensagem =
    document.getElementById("formMensagem");

const botaoEnviar =
    document.getElementById("botaoEnviar");

const informacaoMensagem =
    document.getElementById("informacaoMensagem");


// ========================================
// ÁREA SELECIONADA
// ========================================

let areaSelecionada = null;


// ========================================
// ÍCONES DAS ÁREAS
// ========================================

const iconesAreas = {

    "Manutenção": "🔧",

    "Atendimento": "🎧",

    "Handling": "🧳",

    "Comercial": "💼"

};


// ========================================
// DESCRIÇÕES DAS ÁREAS
// ========================================

const descricoesAreas = {

    "Manutenção":
        "Comunicação com o setor de Manutenção.",

    "Atendimento":
        "Comunicação com o setor de Atendimento.",

    "Handling":
        "Comunicação com o setor de Handling.",

    "Comercial":
        "Comunicação com o setor Comercial."

};


// ========================================
// PEGAR MENSAGENS DO LOCALSTORAGE
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
// SELECIONAR UMA ÁREA
// ========================================

botoesAreas.forEach(function(botao) {

    botao.addEventListener(
        "click",
        function() {

            // ------------------------------
            // PEGAR ÁREA
            // ------------------------------

            areaSelecionada =
                botao.dataset.area;


            // ------------------------------
            // REMOVER SELEÇÃO ANTERIOR
            // ------------------------------

            botoesAreas.forEach(function(item) {

                item.classList.remove("ativo");

            });


            // ------------------------------
            // ATIVAR ÁREA SELECIONADA
            // ------------------------------

            botao.classList.add("ativo");


            // ------------------------------
            // ATUALIZAR CABEÇALHO
            // ------------------------------

            nomeArea.textContent =
                areaSelecionada;


            descricaoArea.textContent =
                descricoesAreas[areaSelecionada];


            iconeConversa.textContent =
                iconesAreas[areaSelecionada];


            // ------------------------------
            // HABILITAR CAMPO
            // ------------------------------

            campoMensagem.disabled = false;

            botaoEnviar.disabled = false;


            informacaoMensagem.textContent =
                "Enviando como CCO";


            // ------------------------------
            // MOSTRAR CONVERSA
            // ------------------------------

            mostrarMensagens();


            // ------------------------------
            // FOCAR NO CAMPO
            // ------------------------------

            campoMensagem.focus();

        }
    );

});


// ========================================
// MOSTRAR MENSAGENS
// ========================================

function mostrarMensagens() {

    // ------------------------------
    // LIMPAR ÁREA
    // ------------------------------

    listaMensagens.innerHTML = "";


    // ------------------------------
    // VERIFICAR SE EXISTEM MENSAGENS
    // ------------------------------

    const mensagens =
        comunicacoes[areaSelecionada] || [];


    // ------------------------------
    // NENHUMA MENSAGEM
    // ------------------------------

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
                Envie uma mensagem para iniciar
                a comunicação com ${areaSelecionada}.
            </p>

        `;


        listaMensagens.appendChild(vazio);

        return;

    }


    // ------------------------------
    // MOSTRAR MENSAGENS
    // ------------------------------

    mensagens.forEach(function(mensagem) {

        criarMensagem(mensagem);

    });


    // ------------------------------
    // IR PARA O FINAL
    // ------------------------------

    listaMensagens.scrollTop =
        listaMensagens.scrollHeight;

}


// ========================================
// CRIAR MENSAGEM NA TELA
// ========================================

function criarMensagem(mensagem) {

    const elemento =
        document.createElement("div");


    // ------------------------------
    // DEFINIR LADO
    // ------------------------------

    if (mensagem.remetente === "CCO") {

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


    // ------------------------------
    // FORMATAR HORA
    // ------------------------------

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


    // ------------------------------
    // CONTEÚDO
    // ------------------------------

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


    // ------------------------------
    // ADICIONAR NA CONVERSA
    // ------------------------------

    listaMensagens.appendChild(elemento);

}


// ========================================
// ENVIAR MENSAGEM
// ========================================

formMensagem.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // ------------------------------
        // VERIFICAR ÁREA
        // ------------------------------

        if (!areaSelecionada) {

            return;

        }


        // ------------------------------
        // PEGAR TEXTO
        // ------------------------------

        const texto =
            campoMensagem.value.trim();


        // ------------------------------
        // NÃO ENVIAR VAZIO
        // ------------------------------

        if (!texto) {

            return;

        }


        // ------------------------------
        // CRIAR MENSAGEM
        // ------------------------------

        const novaMensagem = {

            id: Date.now(),

            remetente: "CCO",

            destinatario:
                areaSelecionada,

            texto: texto,

            data:
                new Date().toISOString()

        };


        // ------------------------------
        // CRIAR CONVERSA SE NÃO EXISTIR
        // ------------------------------

        if (!comunicacoes[areaSelecionada]) {

            comunicacoes[areaSelecionada] = [];

        }


        // ------------------------------
        // ADICIONAR MENSAGEM
        // ------------------------------

        comunicacoes[areaSelecionada].push(
            novaMensagem
        );


        // ------------------------------
        // SALVAR
        // ------------------------------

        salvarComunicacoes();


        // ------------------------------
        // LIMPAR CAMPO
        // ------------------------------

        campoMensagem.value = "";


        // ------------------------------
        // ATUALIZAR CONVERSA
        // ------------------------------

        mostrarMensagens();


        // ------------------------------
        // FOCAR NOVAMENTE
        // ------------------------------

        campoMensagem.focus();

    }
);


// ========================================
// CONTADOR DE MENSAGENS
// ========================================

function atualizarBadges() {

    const nomesBadges = {

        "Manutenção":
            "badgeManutencao",

        "Atendimento":
            "badgeAtendimento",

        "Handling":
            "badgeHandling",

        "Comercial":
            "badgeComercial"

    };


    Object.keys(nomesBadges).forEach(function(area) {

        const badge =
            document.getElementById(
                nomesBadges[area]
            );


        if (!badge) {
            return;
        }


        const mensagens =
            comunicacoes[area] || [];


        // ------------------------------
        // POR ENQUANTO MOSTRA O TOTAL
        // ------------------------------

        if (mensagens.length > 0) {

            badge.textContent =
                mensagens.length;

        } else {

            badge.textContent = "";

        }

    });

}


// ========================================
// ATUALIZAR BADGES AO ABRIR
// ========================================

atualizarBadges();


// ========================================
// CONSOLE
// ========================================

console.log(
    "iCOA — Comunicações do CCO carregado."
);