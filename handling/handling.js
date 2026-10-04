
// ELEMENTOS DA TELA


const botaoNovaOcorrencia =
    document.getElementById("novaOcorrencia");

const formularioOcorrencia =
    document.getElementById("formularioOcorrencia");

const formOcorrencia =
    document.getElementById("formOcorrencia");

const botaoCancelar =
    document.getElementById("cancelarOcorrencia");

const listaOcorrencias =
    document.getElementById("listaOcorrencias");

const semOcorrencias =
    document.getElementById("semOcorrencias");

const contadorOcorrencias =
    document.getElementById("contadorOcorrencias");



// ABRIR FORMULÁRIO


botaoNovaOcorrencia.addEventListener(
    "click",
    function() {

        formularioOcorrencia.style.display = "block";

        botaoNovaOcorrencia.style.display = "none";

        formularioOcorrencia.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }
);



// CANCELAR


botaoCancelar.addEventListener(
    "click",
    function() {

        formOcorrencia.reset();

        formularioOcorrencia.style.display = "none";

        botaoNovaOcorrencia.style.display = "block";

    }
);



// PEGAR OCORRÊNCIAS SALVAS


let ocorrencias =
    JSON.parse(
        localStorage.getItem("ocorrencias")
    ) || [];



// MOSTRAR OCORRÊNCIAS


function mostrarOcorrencias() {

    // Limpar cards antigos

    const cards =
        listaOcorrencias.querySelectorAll(".ocorrencia");

    cards.forEach(function(card) {

        card.remove();

    });


    
    // FILTRAR HANDLING
    

    const ocorrenciasHandling =
        ocorrencias.filter(function(ocorrencia) {

            return ocorrencia.areas &&
                   ocorrencia.areas.includes("Handling") &&
                   ocorrencia.status !== "Encerrada";

        });


    console.log(
        "Ocorrências ativas para Handling:",
        ocorrenciasHandling
    );


    
    // ATUALIZAR CONTADOR
    

    contadorOcorrencias.textContent =
        ocorrenciasHandling.length;


    
    // NENHUMA OCORRÊNCIA
    

    if (ocorrenciasHandling.length === 0) {

        semOcorrencias.style.display = "block";

        return;

    }


    
    // ESCONDER MENSAGEM
    

    semOcorrencias.style.display = "none";


    
    // CRIAR CARDS
    

    ocorrenciasHandling.forEach(
        function(ocorrencia) {


            const card =
                document.createElement("div");

            card.classList.add("ocorrencia");


            
            // GRAVIDADE
            

            let corStatus = "amarelo";

            let textoStatus = "MÉDIA";


            if (
                ocorrencia.gravidade === "Alta"
            ) {

                corStatus = "vermelho";

                textoStatus = "ALTA";

            }

            else if (
                ocorrencia.gravidade === "Baixa"
            ) {

                corStatus = "verde";

                textoStatus = "BAIXA";

            }


            
            // CARD
            

            card.innerHTML = `

                <div
                    class="status-ocorrencia ${corStatus}"
                >
                </div>


                <div class="informacoes-ocorrencia">

                    <div class="linha-superior">

                        <strong>
                            ${ocorrencia.voo}
                        </strong>

                        <span
                            class="status texto-${corStatus}"
                        >
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
                            🔧 ${ocorrencia.setor || "Handling"}
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


                <button
                    class="botao-excluir"
                    type="button"
                >
                    Excluir
                </button>

            `;


            
            // BOTÃO VER DETALHES
            

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
                        (ocorrencia.setor || "Handling") +

                        "\nStatus: " +
                        (ocorrencia.status || "Em andamento")
                    );

                }
            );


            
            // BOTÃO EXCLUIR
            

            const botaoExcluir =
                card.querySelector(".botao-excluir");


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


                    // Procurar a ocorrência pelo ID

                    const indice =
                        ocorrencias.findIndex(
                            function(item) {

                                return item.id === ocorrencia.id;

                            }
                        );


                    if (indice !== -1) {

                        ocorrencias.splice(indice, 1);

                    }


                    // Salvar novamente

                    localStorage.setItem(
                        "ocorrencias",
                        JSON.stringify(ocorrencias)
                    );


                    // Atualizar tela

                    mostrarOcorrencias();

                }
            );


            
            // COLOCAR CARD NA TELA
            

            listaOcorrencias.appendChild(card);

        }
    );

}



// REGISTRAR NOVA OCORRÊNCIA


formOcorrencia.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        
        // PEGAR VALORES
        

        const voo =
            document.getElementById("voo").value.trim();

        const aeronave =
            document.getElementById("aeronave").value.trim();

        const tipo =
            document.getElementById("tipo").value;

        const gravidade =
            document.getElementById("gravidade").value;

        const descricao =
            document.getElementById("descricao").value.trim();


        
        // PEGAR ÁREAS
        

        const caixasAreas =
            document.querySelectorAll(
                'input[name="areas"]:checked'
            );


        const areas = [];


        caixasAreas.forEach(
            function(caixa) {

                areas.push(caixa.value);

            }
        );


        
        // VERIFICAR ÁREAS
        

        if (areas.length === 0) {

            alert(
                "Selecione pelo menos uma área que deverá receber a ocorrência."
            );

            return;

        }


        
        // CRIAR OCORRÊNCIA
        

        const novaOcorrencia = {

            id: Date.now(),

            voo: voo,

            aeronave: aeronave,

            tipo: tipo,

            gravidade: gravidade,

            descricao: descricao,

            setor: "Handling",

            areas: areas,

            status: "Em andamento"

        };


        
        // ADICIONAR NA LISTA
        

        ocorrencias.push(novaOcorrencia);


        
        // SALVAR LOCALSTORAGE
        

        localStorage.setItem(
            "ocorrencias",
            JSON.stringify(ocorrencias)
        );


        
        // LIMPAR FORMULÁRIO
        

        formOcorrencia.reset();


        
        // ESCONDER FORMULÁRIO
        

        formularioOcorrencia.style.display = "none";

        botaoNovaOcorrencia.style.display = "block";


        
        // ATUALIZAR LISTA
        

        mostrarOcorrencias();


        
        // AVISO
        

        alert(
            "Ocorrência registrada com sucesso!"
        );

    }
);



// CARREGAR AO ABRIR A PÁGINA


mostrarOcorrencias();