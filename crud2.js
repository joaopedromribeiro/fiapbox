document.querySelector("#salvar").addEventListener("click", cadastrar);
const rangeInput = document.getElementById("avaliar");
const outputElement = document.getElementById("output");
let tarefa = [];

rangeInput.addEventListener("input", function() {
    const value = rangeInput.value;
    outputElement.textContent = `${value} Estrelas`;
});

window.addEventListener("load", () => {
    tarefa = JSON.parse(localStorage.getItem("tarefa")) || [];
    tarefa.forEach(t => {
        document.querySelector("#tarefa").innerHTML += gerarcard(t);
    });
});

document.querySelector("#busca").addEventListener("keyup", () => {
    let busca = document.querySelector("#busca").value;
    let tarefaFiltradas = tarefa.filter((tarefa) => {
        return tarefa.titulo.toLowerCase().includes(busca.toLowerCase());
    });
    filtrar(tarefaFiltradas);
});

function cadastrar() {
    let titulo = document.querySelector("#titulo").value;
    let avaliar = document.querySelector("#avaliar").value;
    let descricao = document.querySelector("#descricao").value;
    let categoria = document.querySelector("#categoria").value;
    const modal = bootstrap.Modal.getInstance(document.querySelector("#exampleModal"));

    const tarefaObj = {
        id: Date.now(),
        titulo,
        descricao,
        avaliar,
        categoria,
    };

    if (tarefaObj.titulo.length == 0) {
        document.querySelector("#titulo").classList.add("is-invalid");
        document.querySelector("#avaliar").classList.add("is-invalid");
        return;
    }

    tarefa.push(tarefaObj);
    localStorage.setItem("tarefa", JSON.stringify(tarefa));

    document.querySelector("#tarefa").innerHTML += gerarcard(tarefaObj);

    modal.hide();
}

function apagar(botao) {
    const card = botao.parentNode.parentNode.parentNode;
    const cardId = card.dataset.id;
    card.remove();
    tarefa = tarefa.filter(t => t.id !== Number(cardId));
    localStorage.setItem("tarefa", JSON.stringify(tarefa));
}

function gerarcard(tarefa) {
    return `<div class="col-12 col-md-6 col-lg-3" data-id="${tarefa.id}">
        <div class="card">
            <div class="card-header">
                ${tarefa.titulo}
            </div>
            <div class="card-body">
                <p class="card-text">${tarefa.descricao}</p>
                <p class="card-text">${tarefa.avaliar} Estrela(s)</p>
                <p>
                    <span class="badge text-bg-secondary">${tarefa.categoria}</span>
                </p>
                <a href="#" class="btn btn-primary"><i class="bi bi-check-lg">Concluido</i></a>
                <a href="#" onClick="apagar(this)" class="btn btn-danger"><i class="bi bi-trash"></i>Excluir</a>
            </div>
        </div>
    </div>`;
}
