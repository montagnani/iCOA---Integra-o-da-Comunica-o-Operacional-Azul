// ================================
// PEGAR OS ELEMENTOS DO HTML
// ================================

const botaoNovaOcorrencia =
    document.getElementById("novaOcorrencia");

const formularioOcorrencia =
    document.getElementById("formularioOcorrencia");

const formOcorrencia =
    document.getElementById("formOcorrencia");

const cancelarOcorrencia =
    document.getElementById("cancelarOcorrencia");

const listaOcorrencias =
    document.getElementById("listaOcorrencias");

const semOcorrencias =
    document.getElementById("semOcorrencias");

const contador =
    document.getElementById("contadorOcorrencias");


// ================================
// PEGAR OCORRÊNCIAS SALVAS
// ================================

let ocorrenciasSalvas =
    JSON.parse(localStorage.getItem("ocorrencias")) || [];


// ================================
// PEGAR SOMENTE OCORRÊNCIAS ATIVAS
// ================================

ocorrenciasSalvas =
    ocorrenciasSalvas.filter(function(ocorrencia) {

        return ocorrencia.status !== "Encerrada";

    });

let quantidadeOcorrencias =
    ocorrenciasSalvas.length;

contador.textContent =
    quantidadeOcorrencias;


// ================================
// SALVAR OCORRÊNCIA
// ================================

function salvarOcorrencia(ocorrencia) {

    let ocorrencias =
        JSON.parse(localStorage.getItem("ocorrencias")) || [];

    ocorrencias.push(ocorrencia);

    localStorage.setItem(
        "ocorrencias",
        JSON.stringify(ocorrencias)
    );
}


// ================================
// CRIAR CARD DA OCORRÊNCIA
// ================================

function criarCardOcorrencia(dados) {

    // ================================
    // DEFINIR COR DA GRAVIDADE
    // ================================

    let corStatus = "amarelo";
    let textoStatus = "MÉDIA";

    if (dados.gravidade === "Alta") {

        corStatus = "vermelho";
        textoStatus = "ALTA";

    } else if (dados.gravidade === "Baixa") {

        corStatus = "verde";
        textoStatus = "BAIXA";

    }


    // ================================
    // CRIAR CARD
    // ================================

    const ocorrencia =
        document.createElement("div");

    ocorrencia.classList.add("ocorrencia");


    // ================================
    // CONTEÚDO DO CARD
    // ================================

    ocorrencia.innerHTML = `

        <div class="status-ocorrencia ${corStatus}">
        </div>

        <div class="informacoes-ocorrencia">

            <div class="linha-superior">

                <strong>
                    ${dados.voo}
                </strong>

                <span class="status texto-${corStatus}">
                    ${textoStatus}
                </span>

            </div>

            <h4>
                ${dados.tipo}
            </h4>

            <p>
                ${dados.descricao}
            </p>

            <div class="detalhes">

                <span>
                    ✈ ${dados.aeronave}
                </span>

                <span>
                    🔧 ${dados.setor}
                </span>

                <span>
                    ● ${dados.status || "Em andamento"}
                </span>

            </div>

        </div>

        <div class="acoes-ocorrencia">

            <button
                class="botao-encerrar"
                type="button"
            >
                Encerrar
            </button>

            <button
                class="botao-excluir"
                type="button"
            >
                Excluir
            </button>

        </div>

    `;


    // ================================
    // ADICIONAR CARD NA LISTA
    // ================================

    listaOcorrencias.appendChild(ocorrencia);


    // ================================
    // ESCONDER MENSAGEM INICIAL
    // ================================

    semOcorrencias.style.display =
        "none";


    // ================================
    // BOTÃO ENCERRAR
    // ================================

    const botaoEncerrar =
        ocorrencia.querySelector(".botao-encerrar");


    botaoEncerrar.addEventListener(
        "click",
        function() {

            const confirmar =
                confirm(
                    "Deseja encerrar esta ocorrência?"
                );

            if (!confirmar) {
                return;
            }


            // ================================
            // PEGAR OCORRÊNCIAS DO STORAGE
            // ================================

            let ocorrencias =
                JSON.parse(
                    localStorage.getItem("ocorrencias")
                ) || [];


            // ================================
            // ALTERAR STATUS
            // ================================

            ocorrencias =
                ocorrencias.map(function(item) {

                    if (item.id === dados.id) {

                        item.status =
                            "Encerrada";

                    }

                    return item;

                });


            // ================================
            // SALVAR NOVAMENTE
            // ================================

            localStorage.setItem(
                "ocorrencias",
                JSON.stringify(ocorrencias)
            );


            // ================================
            // REMOVER CARD DA TELA
            // ================================

            ocorrencia.remove();


            // ================================
            // ATUALIZAR CONTADOR
            // ================================

            quantidadeOcorrencias--;

            contador.textContent =
                quantidadeOcorrencias;


            // ================================
            // MOSTRAR MENSAGEM SE ESTIVER VAZIO
            // ================================

            if (quantidadeOcorrencias === 0) {

                semOcorrencias.style.display =
                    "block";

            }


            // ================================
            // MENSAGEM
            // ================================

            alert(
                "Ocorrência encerrada com sucesso!"
            );

        }
    );


    // ================================
    // BOTÃO EXCLUIR
    // ================================

    const botaoExcluir =
        ocorrencia.querySelector(".botao-excluir");


    botaoExcluir.addEventListener(
        "click",
        function() {

            const confirmar =
                confirm(
                    "Deseja realmente excluir esta ocorrência?"
                );

            if (!confirmar) {
                return;
            }


            // ================================
            // REMOVER DA TELA
            // ================================

            ocorrencia.remove();


            // ================================
            // PEGAR OCORRÊNCIAS DO STORAGE
            // ================================

            let ocorrencias =
                JSON.parse(
                    localStorage.getItem("ocorrencias")
                ) || [];


            // ================================
            // REMOVER PELO ID
            // ================================

            ocorrencias =
                ocorrencias.filter(function(item) {

                    return item.id !== dados.id;

                });


            // ================================
            // SALVAR NOVAMENTE
            // ================================

            localStorage.setItem(
                "ocorrencias",
                JSON.stringify(ocorrencias)
            );


            // ================================
            // ATUALIZAR CONTADOR
            // ================================

            quantidadeOcorrencias--;

            contador.textContent =
                quantidadeOcorrencias;


            // ================================
            // MOSTRAR MENSAGEM SE ESTIVER VAZIO
            // ================================

            if (quantidadeOcorrencias === 0) {

                semOcorrencias.style.display =
                    "block";

            }

        }
    );

}


// ================================
// CARREGAR OCORRÊNCIAS SALVAS
// ================================

ocorrenciasSalvas.forEach(
    function(ocorrencia) {

        criarCardOcorrencia(
            ocorrencia
        );

    }
);


// ================================
// MENSAGEM INICIAL
// ================================

if (ocorrenciasSalvas.length === 0) {

    semOcorrencias.style.display =
        "block";

}


// ================================
// ABRIR FORMULÁRIO
// ================================

botaoNovaOcorrencia.addEventListener(
    "click",
    function() {

        formularioOcorrencia.style.display =
            "block";

    }
);


// ================================
// CANCELAR
// ================================

cancelarOcorrencia.addEventListener(
    "click",
    function() {

        formularioOcorrencia.style.display =
            "none";

        formOcorrencia.reset();

    }
);


// ================================
// REGISTRAR OCORRÊNCIA
// ================================

formOcorrencia.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        // ================================
        // PEGAR OS DADOS
        // ================================

        const voo =
            document.getElementById("voo").value;

        const aeronave =
            document.getElementById("aeronave").value;

        const tipo =
            document.getElementById("tipo").value;

        const gravidade =
            document.getElementById("gravidade").value;

        const descricao =
            document.getElementById("descricao").value;


        // ================================
        // PEGAR ÁREAS AFETADAS
        // ================================

        const areasAfetadas = [];

        document
            .querySelectorAll(
                ".checkbox input:checked"
            )
            .forEach(
                function(checkbox) {

                    areasAfetadas.push(
                        checkbox.value
                    );

                }
            );


        // ================================
        // CRIAR DADOS DA OCORRÊNCIA
        // ================================

        const dadosOcorrencia = {

            id: Date.now(),

            voo: voo,

            aeronave: aeronave,

            tipo: tipo,

            gravidade: gravidade,

            descricao: descricao,

            areas: areasAfetadas,

            setor: "Manutenção",

            status: "Em andamento"

        };


        // ================================
        // SALVAR
        // ================================

        salvarOcorrencia(
            dadosOcorrencia
        );


        // ================================
        // CRIAR CARD
        // ================================

        criarCardOcorrencia(
            dadosOcorrencia
        );


        // ================================
        // ATUALIZAR CONTADOR
        // ================================

        quantidadeOcorrencias++;

        contador.textContent =
            quantidadeOcorrencias;


        // ================================
        // FECHAR FORMULÁRIO
        // ================================

        formularioOcorrencia.style.display =
            "none";


        // ================================
        // LIMPAR FORMULÁRIO
        // ================================

        formOcorrencia.reset();


        // ================================
        // MENSAGEM
        // ================================

        alert(
            "Ocorrência registrada com sucesso!"
        );

    }
);