// ================================
// PEGAR A ÁREA DAS OCORRÊNCIAS
// ================================

const listaOcorrencias =
    document.getElementById("listaOcorrencias");

const semOcorrencias =
    document.getElementById("semOcorrencias");

const contador =
    document.getElementById("contadorOcorrencias");


// ================================
// PEGAR OCORRÊNCIAS DO STORAGE
// ================================

const ocorrencias =
    JSON.parse(localStorage.getItem("ocorrencias")) || [];


// ================================
// VERIFICAR OCORRÊNCIAS DO CCO
// ================================

const ocorrenciasCCO =
    ocorrencias.filter(function(ocorrencia) {

        return ocorrencia.areas.includes("CCO") &&
               ocorrencia.status !== "Encerrada";

    });


// ================================
// ATUALIZAR CONTADOR
// ================================

contador.textContent =
    ocorrenciasCCO.length;


// ================================
// MOSTRAR OCORRÊNCIAS
// ================================

if (ocorrenciasCCO.length > 0) {

    semOcorrencias.style.display =
        "none";


    ocorrenciasCCO.forEach(function(ocorrencia) {

        const card =
            document.createElement("div");

        card.classList.add("ocorrencia");


        // ================================
        // DEFINIR COR DA GRAVIDADE
        // ================================

        let corStatus = "amarelo";

        let textoStatus = "MÉDIA";


        if (ocorrencia.gravidade === "Alta") {

            corStatus = "vermelho";

            textoStatus = "ALTA";

        }

        else if (ocorrencia.gravidade === "Baixa") {

            corStatus = "verde";

            textoStatus = "BAIXA";

        }


        // ================================
        // CRIAR CARD
        // ================================

        card.innerHTML = `

            <div class="status-ocorrencia ${corStatus}">
            </div>


            <div class="informacoes-ocorrencia">

                <div class="linha-superior">

                    <strong>
                        ${ocorrencia.voo}
                    </strong>

                    <span class="status texto-${corStatus}">
                        ${textoStatus}
                    </span>

                </div>


                <h4>
                    ${ocorrencia.tipo}
                </h4>


                <p>
                    ${ocorrencia.descricao}
                </p>


                <div class="detalhes">

                    <span>
                        ✈ ${ocorrencia.aeronave}
                    </span>

                    <span>
                        🔧 ${ocorrencia.setor}
                    </span>

                    <span>
                        ● ${ocorrencia.status || "Em andamento"}
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
                    class="botao-ver"
                    type="button"
                >
                    Ver detalhes
                </button>

            </div>

        `;


        listaOcorrencias.appendChild(card);


        // ================================
        // BOTÃO ENCERRAR
        // ================================

        const botaoEncerrar =
            card.querySelector(".botao-encerrar");


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


                // PEGAR OCORRÊNCIAS ATUALIZADAS

                let ocorrenciasAtualizadas =
                    JSON.parse(
                        localStorage.getItem("ocorrencias")
                    ) || [];


                // ALTERAR STATUS

                ocorrenciasAtualizadas =
                    ocorrenciasAtualizadas.map(
                        function(item) {

                            if (item.id === ocorrencia.id) {

                                item.status =
                                    "Encerrada";

                            }

                            return item;

                        }
                    );


                // SALVAR NOVAMENTE

                localStorage.setItem(
                    "ocorrencias",
                    JSON.stringify(
                        ocorrenciasAtualizadas
                    )
                );


                // REMOVER CARD DA TELA

                card.remove();


                // ATUALIZAR CONTADOR

                const quantidadeAtual =
                    document.querySelectorAll(
                        ".ocorrencia"
                    ).length;


                contador.textContent =
                    quantidadeAtual;


                // MOSTRAR MENSAGEM SE NÃO HOUVER MAIS

                if (quantidadeAtual === 0) {

                    semOcorrencias.style.display =
                        "block";

                }


                alert(
                    "Ocorrência encerrada com sucesso!"
                );

            }
        );


        // ================================
        // BOTÃO VER DETALHES
        // ================================

        const botaoVer =
            card.querySelector(".botao-ver");


        botaoVer.addEventListener(
            "click",
            function() {

                alert(

                    "DETALHES DA OCORRÊNCIA\n\n" +

                    "Voo: " +
                    ocorrencia.voo +

                    "\nAeronave: " +
                    ocorrencia.aeronave +

                    "\nTipo: " +
                    ocorrencia.tipo +

                    "\nGravidade: " +
                    ocorrencia.gravidade +

                    "\nDescrição: " +
                    ocorrencia.descricao +

                    "\nSetor responsável: " +
                    ocorrencia.setor +

                    "\nStatus: " +
                    (ocorrencia.status || "Em andamento")

                );

            }
        );

    });

}

