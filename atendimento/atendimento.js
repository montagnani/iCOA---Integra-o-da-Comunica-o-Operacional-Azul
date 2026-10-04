const listaOcorrencias =
    document.getElementById("listaOcorrencias");

const semOcorrencias =
    document.getElementById("semOcorrencias");

const ocorrencias =
    JSON.parse(localStorage.getItem("ocorrencias")) || [];


// ================================
// PEGAR OCORRÊNCIAS DO ATENDIMENTO
// ================================

const ocorrenciasAtendimento =
    ocorrencias.filter(function(ocorrencia) {

        return ocorrencia.areas.includes("Atendimento") &&
               ocorrencia.status !== "Encerrada";

    });


// ================================
// VERIFICAR SE EXISTEM OCORRÊNCIAS
// ================================

if (ocorrenciasAtendimento.length > 0) {

    semOcorrencias.style.display = "none";


    ocorrenciasAtendimento.forEach(function(ocorrencia) {

        const card =
            document.createElement("div");

        card.classList.add("ocorrencia");


        // ================================
        // GRAVIDADE
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


            <button
                class="botao-ver"
                type="button"
            >
                Ver detalhes
            </button>

        `;


        listaOcorrencias.appendChild(card);


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