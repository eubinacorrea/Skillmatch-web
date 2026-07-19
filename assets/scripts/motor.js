export class Vaga {
  constructor(id, empresa, cargo, requisitos) {
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
  }
  calcularCompatibilidade(habilidadesCandidato) {
    const habilidadesPadronizadas = habilidadesCandidato.map((h) =>
      h.toLowerCase().trim(),
    );

    const encontradas = this.requisitos.filter((req) =>
      habilidadesPadronizadas.includes(req.toLowerCase().trim()),
    );
    const faltantes = this.requisitos.filter(
      (req) => !habilidadesPadronizadas.includes(req.toLowerCase().trim()),
    );

    const percentual = Math.round(
      (encontradas.length / this.requisitos.length) * 100,
    );

    let classificacao = "";
    if (percentual >= 75) {
      classificacao = "Alta";
    } else if (percentual >= 45) {
      classificacao = "Media";
    } else {
      classificacao = "Baixa";
    }

    return {
      vagaOriginal: this,
      percentual,
      classificacao,
      encontradas,
      faltantes,
    };
  }
  mostrarDetalhes() {
    return `${this.cargo} — ${this.empresa}`;
  }
}

export class VagaFrontEnd extends Vaga {
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {
    super(id, empresa, cargo, requisitos);
    this.salario = salario;
    this.modalidade = modalidade;
  }

  mostrarDetalhes() {
    return `${this.cargo} — ${this.empresa} — R$ ${this.salario} (${this.modalidade})`;
  }
}
export function encontrarMelhorVaga(resultados) {
  if (!resultados || resultados.length === 0) {
    return null;
  }

  const maiorPercentual = resultados.reduce(
    (max, r) => (r.percentual > max ? r.percentual : max),
    0,
  );

  // Mostra quando há empate entre vagas com 100% de compatibilidade
  const melhores = resultados.filter((r) => r.percentual === maiorPercentual);
  const empatados = melhores.length > 1;

  let recomendacaoEstudo = "";

  if (maiorPercentual === 100) {
    // Quando atinge 100%
    recomendacaoEstudo = empatados
      ? `Parabéns! Você atingiu 100% de compatibilidade em ${melhores.length} vagas.<br>Como estão empatadas, vale considerar outros critérios (salário, modalidade de trabalho) para escolher — e já pode focar em preparar portfólio e entrevista.`
      : "Você tem o perfil exato para esta vaga! O foco agora é preparar o portfólio e a entrevista.";
      
  } else if (maiorPercentual < 45) {
    // NOVA REGRA: Quando a compatibilidade máxima for "Baixa" (menor que 45%)
    recomendacaoEstudo = `Não desanime! Toda jornada na programação tem um começo. <br>Para deixar o seu perfil mais competitivo para essas vagas, a nossa recomendação é focar em fortalecer a sua base estudando: ${melhores[0].faltantes.join(", ")}. <br>Mantenha o ritmo de estudos e logo o seu match vai aumentar!`;
    
  } else if (melhores[0].faltantes.length > 0) {
    // Quando a compatibilidade é "Média" ou "Alta" (entre 45% e 99%)
    recomendacaoEstudo = `Para alcançar o match perfeito ${empatados ? "nessas vagas" : "nesta vaga"}, recomendamos focar seus estudos em: ${melhores[0].faltantes.join(", ")}.`;
    
  } else {
    recomendacaoEstudo =
      "Continue praticando suas habilidades atuais para manter seu perfil altamente competitivo!";
  }

  return {
    empatados,
    percentual: maiorPercentual,
    recomendacao: recomendacaoEstudo,
    vagas: melhores.map((r) => ({
      vagaId: r.vagaOriginal.id,
      empresa: r.vagaOriginal.empresa,
      cargo: r.vagaOriginal.cargo,
      percentual: r.percentual,
    })),
  };
}
