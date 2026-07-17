export async function buscarVagas() {
  try {
    const resposta = await fetch("./assets/dados/vagas.json");

    if (!resposta.ok) {
      throw new Error("Erro de rede: Não foi possível carregar as vagas.");
    }

    const vagasCarregadas = await resposta.json();

    if (!vagasCarregadas || vagasCarregadas.length === 0) {
      throw new Error("O catálogo de vagas está vazio neste momento.");
    }

    return vagasCarregadas;
  } catch (erro) {
    console.error("Falha ao buscar vagas:", erro.message);
    throw erro;
  }
}

export function guardarPerfil(perfil) {
  localStorage.setItem("skillmatch_perfil", JSON.stringify(perfil));
}

export function carregarPerfil() {
  const perfilGuardado = localStorage.getItem("skillmatch_perfil");

  if (perfilGuardado === null) {
    return null;
  }

  return JSON.parse(perfilGuardado);
}
