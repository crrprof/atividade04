const Components = {
  ProjectCard: (p) => `
    <article class="card" role="article" aria-labelledby="p-${p.id}-title">
      <h3 id="p-${p.id}-title">${p.nome}</h3>
      <p><span class="badge">${p.categoria}</span></p>
      <p class="muted">Cidade: <strong>${p.cidade}</strong></p>
      <p class="muted">Vagas: <strong>${p.vagas}</strong></p>
      <a class="btn" href="#/cadastro?projeto=${p.id}">Quero participar</a>
    </article>
  `,
};

const Templates = {
  home: () => `
    <section class="grid">
      <div class="col-12">
        <div class="card">
          <h1>Educação, Arte e Inclusão Social</h1>
          <p>Exemplo de SPA modular com templates em JavaScript.</p>
          <a class="btn primary" href="#/projetos">Ver Projetos</a>
        </div>
      </div>
    </section>
  `,

  projetos: ({ projetos }) => `
    <section class="grid">
      <div class="col-12"><h2>Projetos</h2><p>Escolha um projeto e inscreva-se.</p></div>
      ${projetos.map(p => `<div class="col-6">${Components.ProjectCard(p)}</div>`).join('')}
    </section>
  `,

  cadastro: ({ projetoSelecionado }) => `
    <section class="grid">
      <div class="col-12"><h2>Cadastro</h2><p>Preencha seus dados para participar.</p></div>
      <div class="col-12">
        <div class="card">
          ${projetoSelecionado ? `<p class="muted">Inscrição no projeto: <strong>${projetoSelecionado.nome}</strong></p>` : ""}
          <!-- Versão mínima de formulário (sem máscaras para manter a modularidade simples) -->
          <form id="form-cadastro" novalidate>
            <label>Nome <input name="nome" required minlength="3" placeholder="Maria da Silva"></label>
            <label>E-mail <input type="email" name="email" required placeholder="voce@exemplo.com"></label>
            <button class="btn primary" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </section>
  `,

  notFound: () => `
    <div class="card"><h2>404</h2><p>Página não encontrada.</p><a class="btn" href="#/home">Voltar</a></div>
  `
};
