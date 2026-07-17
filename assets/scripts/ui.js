import { buscarVagas, guardarPerfil, carregarPerfil } from "./dados.js";
import { VagaFrontEnd, encontrarMelhorVaga } from "./motor.js";

const formPerfil = document.getElementById("form-perfil");
const inputHabilidade = document.getElementById("habilidade-input");
const containerHabilidades = document.getElementById("container-habilidades");
const containerVagas = document.getElementById("container-vagas");

let listaHabilidades = [];

const btnAddHabilidade = document.getElementById("btn-add-habilidade");

function adicionarHabilidadeDoInput() {
  const valores = inputHabilidade.value.split(/[\s,]+/); // finaliza a habilidade ao digitar vírgula ou espaço

  valores.forEach((habilidade) => {
    const habLimpa = habilidade.trim().toLowerCase();
    if (habLimpa && !listaHabilidades.includes(habLimpa)) {
      listaHabilidades.push(habLimpa);
      atualizarChipsHabilidades();
    }
  });

  inputHabilidade.value = ""; // Limpa o campo para a próxima habilidade
  inputHabilidade.focus(); // Mantém o campo de digitação ativo ppara adição de habilidades
}

inputHabilidade.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter" || evento.key === ",") {
    evento.preventDefault();
    adicionarHabilidadeDoInput();
  }
});

btnAddHabilidade.addEventListener("click", adicionarHabilidadeDoInput);

function atualizarChipsHabilidades() {
  containerHabilidades.innerHTML = ""; // Limpa a área

  listaHabilidades.forEach((hab) => {
    const chip = document.createElement("span");
    chip.className = "chip-habilidade";

    const texto = document.createElement("span");
    texto.textContent = hab;
    chip.appendChild(texto);

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.className = "btn-remover-habilidade";
    btnRemover.textContent = "×";
    btnRemover.setAttribute("aria-label", `Remover habilidade ${hab}`);

    btnRemover.addEventListener("click", () => {
      listaHabilidades = listaHabilidades.filter((h) => h !== hab);
      atualizarChipsHabilidades();
    });

    chip.appendChild(btnRemover);
    containerHabilidades.appendChild(chip);
  });
}

async function analisarCompatibilidade() {
  containerVagas.innerHTML =
    '<p class="estado-carregamento">Procurando as melhores vagas...</p>';

  try {
    const dadosVagas = await buscarVagas();
    const vagas = dadosVagas.map(
      (v) =>
        new VagaFrontEnd(
          v.id,
          v.empresa,
          v.cargo,
          v.requisitos,
          v.salario,
          v.modalidade,
        ),
    );
    const resultados = vagas.map((vaga) =>
      vaga.calcularCompatibilidade(listaHabilidades),
    );

    if (resultados.length > 0) {
      const melhorVaga = encontrarMelhorVaga(resultados);
      renderizarResultados(resultados, melhorVaga);
    } else {
      containerVagas.innerHTML =
        "<p>Nenhuma vaga encontrada para os critérios selecionados.</p>";
    }
  } catch (erro) {
    containerVagas.innerHTML = `<p class="estado-erro">Erro: ${erro.message}</p>`;
  }
}

formPerfil.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.getElementById("nome").value;
  const area = document.getElementById("area").value;
  const experiencia = document.getElementById("experiencia").value;

  if (listaHabilidades.length === 0) {
    alert("Por favor, adicione pelo menos uma habilidade!");
    return;
  }

  const perfilCandidato = {
    nome,
    area,
    experiencia,
    habilidades: listaHabilidades,
  };
  guardarPerfil(perfilCandidato);

  analisarCompatibilidade();
});

function renderizarResultados(resultados, melhor) {
  containerVagas.innerHTML = "";

  if (!resultados || resultados.length === 0) {
    containerVagas.innerHTML =
      "<p>Não foram encontradas vagas compatíveis.</p>";
    return;
  }

  // Melhor vaga + recomendação de estudo  -----
  if (melhor) {
    const destaque = document.createElement("div");
    destaque.className = "vaga-destaque";

    const tituloDestaque = melhor.empatados
      ? `🏆 ${melhor.vagas.length} Vagas Empatadas em ${melhor.percentual}%`
      : `🏆 Melhor Match: ${melhor.vagas[0].cargo}`;

    const listaVagas = melhor.vagas
      .map((v) => `<li>${v.cargo} — ${v.empresa}</li>`)
      .join("");

    destaque.innerHTML = `
            <h3>${tituloDestaque}</h3>
            <ul class="lista-melhores-vagas">${listaVagas}</ul>
            <p class="recomendacao-estudo">💡 <strong>Dica de Estudo:</strong> ${melhor.recomendacao}</p>
        `;
    containerVagas.appendChild(destaque);
  }

  //  Cards por vaga -----
  const grade = document.createElement("div");
  grade.className = "grade-vagas";

  resultados.forEach((resultado) => {
    const vaga = resultado.vagaOriginal;

    const card = document.createElement("div");
    card.className = "vaga-card";
    card.innerHTML = `
            <h4>${vaga.mostrarDetalhes()}</h4>
            <p class="classificacao classificacao-${resultado.classificacao.toLowerCase()}">
                ${resultado.classificacao} — ${resultado.percentual}%
            </p>
            <p class="habilidades-encontradas">
                ✅ Encontradas: ${resultado.encontradas.length > 0 ? resultado.encontradas.join(", ") : "nenhuma"}
            </p>
            <p class="habilidades-faltantes">
                ⚠️ Faltantes: ${resultado.faltantes.length > 0 ? resultado.faltantes.join(", ") : "nenhuma"}
            </p>
        `;
    grade.appendChild(card);
  });

  containerVagas.appendChild(grade);
}

// Quando página atualizar, volta para o perfil salvo -----
export function iniciarApp() {
  const perfilSalvo = carregarPerfil();

  if (perfilSalvo !== null) {
    document.getElementById("nome").value = perfilSalvo.nome;
    document.getElementById("area").value = perfilSalvo.area;
    document.getElementById("experiencia").value = perfilSalvo.experiencia;

    listaHabilidades = perfilSalvo.habilidades;
    atualizarChipsHabilidades();

    analisarCompatibilidade();
  }
}
