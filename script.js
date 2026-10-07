
let oficinas = [
    {
        nome: "Introdução à Robótica",
        preco: 30,
        horario: "08:00",
        qtd_vagas: "20",
        imagem: "assets/img/robotica.jpeg"
    },
    {
        nome: "Criação de Jogos com JavaScript",
        preco: 45,
        horario: "09:00",
        qtd_vagas: "15",
        imagem: "assets/img/JS.jpeg"
    },
    {
        nome: "Primeiros Passos com Arduíno",
        preco: 40,
        horario: "10:00",
        qtd_vagas: "18",
        imagem: "assets/img/Arduino.jpeg"
    },
    {
        nome: "Design de Interfaces no Figma",
        preco: 25,
        horario: "13:00",
        qtd_vagas: "25",
        imagem: "assets/img/figma.jpeg"
    },
    {
        nome: "Segurança na Internet",
        preco: 20,
        horario: "14:00",
        qtd_vagas: "30",
        imagem: "assets/img/segurançaInternet.jpeg"
    },
    {
        nome: "Introdução à Inteligência Artificial",
        preco: 50,
        horario: "15:00",
        qtd_vagas: "20",
        imagem: "assets/img/IA.jpeg"
    },
    {
        nome: "Desenvolvimento de Aplicativos",
        preco: 55,
        horario: "16:00",
        qtd_vagas: "15",
        imagem: "assets/img/dev_app.jpeg"
    },
    {
        nome: "Criação de Sites Responsivos",
        preco: 35,
        horario: "17:00",
        qtd_vagas: "25",
        imagem: "assets/img/sites.jpeg"
    }
];

function mudarTema() {
    document.body.classList.toggle("escuro");
}

function abrirMenu() {
    document.getElementById("menu").classList.toggle("aberto");
}

let inscricoes =
    JSON.parse(localStorage.getItem("Cursos")) || [];

let areaOficinas =
    document.querySelector("#oficinas");

if (areaOficinas) {

    let campoBusca =
        document.querySelector("#buscar");

    let campoOrdenar =
        document.querySelector("#ordenar");

    let contador =
        document.querySelector("#contador");

    function mostrarOficinas(lista) {

        areaOficinas.innerHTML = "";

        if (lista.length === 0) {

            areaOficinas.innerHTML =
                "<p>Nenhuma oficina encontrada.</p>";

            return;
        }

        lista.forEach(function(oficina) {

            let jaInscrito =
                inscricoes.find(function(curso) {
                    return curso.nome === oficina.nome;
                });

            areaOficinas.innerHTML += `
                <div class="card">

                    <img src="${oficina.imagem}" alt="${oficina.nome}">

                    <h2>${oficina.nome}</h2>

                    <p class="preco">
                        R$ ${oficina.preco.toFixed(2)}
                    </p>

                    <p>
                        Horário: ${oficina.horario}
                    </p>

                    <p>
                        Vagas: ${oficina.qtd_vagas}
                    </p>

                    <button
                        onclick="inscrever('${oficina.nome}')"
                        ${jaInscrito ? "disabled" : ""}
                    >
                        ${jaInscrito ? "Inscrito" : "Inscrever-se"}
                    </button>

                </div>
            `;
        });
    }

    function atualizarOficinas() {

        let texto =
            campoBusca.value.toLowerCase();

        let lista =
            oficinas.filter(function(oficina) {

                return oficina.nome
                    .toLowerCase()
                    .includes(texto);
            });

        if (campoOrdenar.value === "menor") {

            lista.sort(function(a, b) {
                return a.preco - b.preco;
            });
        }

        if (campoOrdenar.value === "maior") {

            lista.sort(function(a, b) {
                return b.preco - a.preco;
            });
        }

        mostrarOficinas(lista);
    }

    function atualizarContador() {
        contador.innerText =
            "Minhas inscrições (" +
            inscricoes.length +
            ")";
    }

    campoBusca.addEventListener("input", function() {
        atualizarOficinas();
    });

    campoOrdenar.addEventListener("change", function() {
        atualizarOficinas();
    });

    mostrarOficinas(oficinas);

    atualizarContador();

    let imagensSlider =
        document.querySelector(".img-slider");

    let botaoProximo =
        document.querySelector("#proximo");

    let botaoAnterior =
        document.querySelector("#anterior");

    if (imagensSlider && botaoProximo && botaoAnterior) {

        let posicao = 0;

        let totalImagens = 6;

        botaoProximo.addEventListener("click", function() {

            if (posicao > -(totalImagens - 1) * 600) {

                posicao = posicao - 600;

                imagensSlider.style.transform =
                    `translateX(${posicao}px)`;
            }

        });

        botaoAnterior.addEventListener("click", function() {

            if (posicao < 0) {

                posicao = posicao + 600;

                imagensSlider.style.transform =
                    `translateX(${posicao}px)`;
            }

        });
    }
}

function inscrever(nome) {

    let curso =
        oficinas.find(function(oficina) {
            return oficina.nome === nome;
        });

    if (!curso) {
        return;
    }

    let jaExiste =
        inscricoes.find(function(item) {
            return item.nome === nome;
        });

    if (jaExiste) {
        return;
    }

    inscricoes.push(curso);

    localStorage.setItem(
        "Cursos",
        JSON.stringify(inscricoes)
    );

    let contador =
        document.querySelector("#contador");

    if (contador) {

        contador.innerText =
            "Minhas inscrições (" +
            inscricoes.length +
            ")";
    }

    let areaOficinas =
        document.querySelector("#oficinas");

    if (areaOficinas) {
        location.reload();
    }
}

let areaInscricoes =
    document.querySelector(".Cursos");

if (areaInscricoes) {

    let totalInscricoes =
        document.querySelector("#total");

    let quantidadeCursos =
        document.querySelector("#quantidadeCursos");

    function mostrarInscricoes() {

        areaInscricoes.innerHTML = "";

        let total = 0;

        if (inscricoes.length === 0) {

            areaInscricoes.innerHTML =
                "<p>Nenhum curso inscrito.</p>";

            totalInscricoes.innerText =
                "Total: R$ 0.00";

            quantidadeCursos.innerText =
                "0";

            return;
        }

        inscricoes.forEach(function(curso, indice) {

    areaInscricoes.innerHTML += `
        <div class="item-carrinho">

            <h3>
                ${curso.nome}
            </h3>

            <p>
                Horario: ${curso.horario}
            </p>

            <p>
                Valor: R$ ${curso.preco.toFixed(2)}
            </p>

            <button onclick="abrirModal(${indice})">
                Remover
            </button>

        </div>
    `;

    total = total + curso.preco;
});

        quantidadeCursos.innerText =
            inscricoes.length;

        totalInscricoes.innerText =
            "Total: R$ " + total.toFixed(2);
    }

    mostrarInscricoes();
}

let formulario = document.querySelector("#formulario")
if (formulario) {
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        let nome = document.querySelector("#nome").value;
        let email = document.querySelector("#email").value;
        let idade = document.querySelector("#idade").value;
        let cidade = document.querySelector("#cidade").value;

            if (nome.trim().length < 3) {
                alert("Digite um nome válido.");
                return;
            }
            if (!email.includes("@")) {
                alert("Digite um e-mail válido.");
                return;
            }

        document.querySelector("#perfilNome").innerText = nome;
        document.querySelector("#perfilEmail").innerText = email;
        document.querySelector("#perfilIdade").innerText = idade;
        document.querySelector("#perfilCidade").innerText = cidade;
    });
}

let campoNome = document.querySelector("#nome");
let campoEmail = document.querySelector("#email");
if (campoNome && campoEmail) {
    campoNome.addEventListener("input", function() {
        if (campoNome.value.trim().length < 3) {
            document.querySelector("#mensagemNome").innerText = "Digite seu nome completo";
            campoNome.style.border = "2px solid red";
        } else {
            document.querySelector("#mensagemNome").innerText = "Nome válido";
            campoNome.style.border = "2px solid green";
        }
    });

    campoEmail.addEventListener("input", function() {
        if (!campoEmail.value.includes("@")) {
            document.querySelector("#mensagemEmail").innerText = "Digite um e-mail válido";
            campoEmail.style.border = "2px solid red";
        } else {
            document.querySelector("#mensagemEmail").innerText = "E-mail válido";
            campoEmail.style.border = "2px solid green";
        }
    });
}

function mostrarSenha() {
    let senha = document.getElementById("senha");

    if (senha.type === "password") {
        senha.type = "text";
    } else {
        senha.type = "password";
    }
}

function salvarAlteracao() {
    let aviso = document.getElementById("aviso");
   
    aviso.style.display = "block";

    setTimeout(function() {

        aviso.style.display = "none";
        
    }, 1000);
}

function trocarImagem(imagem) {
    document.getElementById("imagemPrincipal").src = imagem;
}

let oficinaParaRemover = null;

function abrirModal(indice) {

    oficinaParaRemover = indice;

    document.getElementById("modalRemover").style.display = "flex";
}
function fecharModal() {

    oficinaParaRemover = null;

    document.getElementById("modalRemover").style.display = "none";
}
function confirmarRemocao() {

    if (oficinaParaRemover === null) {
        return;
    }

    inscricoes.splice(oficinaParaRemover, 1);

    localStorage.setItem(
        "Cursos",
        JSON.stringify(inscricoes)
    );

    fecharModal();

    mostrarInscricoes();
}

