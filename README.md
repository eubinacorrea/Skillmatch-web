# SkillMatch Web

Aplicação web que compara o perfil de um candidato de front-end com um catálogo de vagas e mostra o quanto ele é compatível com cada uma, além de dar uma dica do que estudar para melhorar esse match.

🔗 **Acesse a aplicação:** https://eubinacorrea.github.io/Skillmatch-web/

## Sobre o projeto

Esse projeto é a evolução do mini-projeto SkillMatch que fiz na Semana 06, que era só um script rodando no console. Agora ele virou uma aplicação de verdade, com tela, formulário e tudo mais.

A ideia é simples: o usuário preenche o próprio perfil (nome, área, experiência e habilidades), e o sistema mostra quais vagas combinam mais com ele, separando as habilidades que ele já tem das que ainda faltam, e dando uma recomendação de estudo.

## Estrutura de pastas

```txt
skillmatch-web/
  index.html
  README.md
  assets/
    styles/
      index.style.css
    scripts/
      main.js      -> ponto de entrada
      motor.js     -> classes e cálculo de compatibilidade
      ui.js        -> formulário, eventos e renderização dos cards
      dados.js     -> fetch das vagas e localStorage
    dados/
      vagas.json
    img/
      logo.svg
```

## Como executar

Esse projeto usa módulos ES e fetch, então **não funciona** abrindo o `index.html` direto no navegador. Precisa rodar com um servidor local:

1. Clone o repositório
   ```bash
   git clone https://github.com/eubinacorrea/Skillmatch-web.git
   ```
2. Abra a pasta no VS Code
3. Clique com o botão direito em `index.html` e escolha **Open with Live Server**

Ou, se preferir, é só acessar direto pelo link do GitHub Pages lá em cima, sem precisar instalar nada.

## O que a aplicação faz

- Formulário de perfil com validação (nome, área, experiência e habilidades)
- Adição de habilidades pelo Enter ou por um botão, com opção de remover cada uma (passa o mouse e aparece um "x")
- Cálculo de compatibilidade com todas as vagas do catálogo
- Destaque da vaga (ou vagas, em caso de empate) com maior compatibilidade
- Recomendação de estudo baseada no que está faltando
- O perfil fica salvo no navegador (localStorage), então ao recarregar a página ele já aparece preenchido e a análise roda de novo sozinha
- As vagas são carregadas de um arquivo JSON com fetch, e o sistema trata os três estados: carregando, vazio (sem vagas) e erro (falha ao buscar)

## Tecnologias usadas

- HTML5 semântico
- CSS3 (Flexbox e responsividade mobile-first)
- JavaScript puro, com POO (classes `Vaga` e `VagaFrontEnd`, com herança)
- Módulos ES (`import`/`export`), sem framework e sem build
- Fetch API e localStorage
- Git e GitHub para versionamento
- Trello para organizar as tarefas

Não usei nenhum framework (React, Vue etc.), TypeScript, bundler ou back-end — é tudo HTML, CSS e JS como vimos até aqui no curso.

## O que eu melhoraria

- Usar o tempo de experiência como critério de desempate entre vagas com o mesmo percentual
- Adicionar um filtro de vagas por modalidade ou salário

## Sobre o uso de IA

Usei IA (Gemini) como apoio em várias etapas do desenvolvimento, seguindo o que o edital permite — desde tirar dúvidas sobre conceitos, revisar trechos de código, até ajudar a resolver bugs e pensar em melhorias de acessibilidade e organização do projeto.

Mesmo usando esse apoio, todo o código foi revisado, testado e entendido por mim antes de ser incorporado ao projeto.


## Links

- Quadro no Trello:[Ver quadro no Trello](https://trello.com/b/obQgDvhm/skillmatch-web)
- Vídeo de demonstração: [(https://drive.google.com/drive/folders/1mXHH6tkBCLoIlW1wM9Dqcohjg95fjw8M?usp=sharing)]


## Autora

Projeto avaliativo individual — Sabrina Babiss Correa