
// PEGAR OS ELEMENTOS DO HTML


const listaHistorico =
    document.getElementById("listaHistorico");

const semHistorico =
    document.getElementById("semHistorico");



// PEGAR OCORRÊNCIAS SALVAS


const ocorrencias =
    JSON.parse(localStorage.getItem("ocorrencias")) || [];



// FILTRAR OCORRÊNCIAS ENCERRADAS


const ocorrenciasEncerradas =
    ocorrencias.filter(function(ocorrencia) {

        return ocorrencia.status === "Encerrada";

    });



// VERIFICAR SE EXISTEM OCORRÊNCIAS


if (ocorrenciasEncerradas.length > 0) {

    semHistorico.style.display = "none";

}



// CRIAR OS CARDS


ocorrenciasEncerradas.forEach(function(ocorrencia) {


    
    // CRIAR CARD
    

    const card =
        document.createElement("div");

    card.classList.add("card-historico");


    
    // CONTEÚDO DO CARD
    

    card.innerHTML = `

        <div class="status-historico">
        </div>


        <div class="informacoes-historico">

            <div class="linha-superior-historico">

                <strong>
                    ${ocorrencia.voo}
                </strong>

                <span class="status-encerrada">
                    ENCERRADA
                </span>

            </div>


            <h4>
                ${ocorrencia.tipo}
            </h4>


            <p>
                ${ocorrencia.descricao}
            </p>


            <div class="detalhes-historico">

                <span>
                    ✈ ${ocorrencia.aeronave}
                </span>

                <span>
                    ⚠ ${ocorrencia.gravidade}
                </span>

                <span>
                    🔧 ${ocorrencia.setor}
                </span>

            </div>

        </div>


        <button
            class="botao-detalhes"
            type="button"
        >
            Ver detalhes
        </button>

    `;


    
    // ADICIONAR CARD À LISTA
    

    listaHistorico.appendChild(card);


    
    // BOTÃO VER DETALHES
    

    const botaoDetalhes =
        card.querySelector(".botao-detalhes");


    botaoDetalhes.addEventListener(
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

                "\nStatus: Encerrada"

            );

        }
    );

});