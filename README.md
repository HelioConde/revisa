# Revisa

Produto de educação do **Ideias IA Lab** para transformar apontamentos do próprio usuário em uma sessão curta de revisão ativa.

## Estado atual

MVP funcional iniciado em 07/10/2026.

O fluxo principal já permite:

- informar matéria/tema e objetivo;
- colar apontamentos;
- gerar pontos-chave localmente;
- gerar flashcards clicáveis;
- gerar mini-quiz;
- copiar a sessão;
- salvar e reabrir revisões no histórico local;
- limpar o histórico;
- usar PT-BR ou inglês, com PT-BR como padrão;
- usar desktop e mobile;
- navegar por Sobre, Privacidade e Termos;
- manter um espaço de publicidade preparado sem interromper a revisão.

## Privacidade do MVP

O processamento é local no navegador. **Nenhum apontamento é enviado a um provedor externo de IA nesta versão.**

Revisões salvas usam localStorage no dispositivo.

## Monetização

O layout está preparado para anúncios, seguindo a regra do portfólio. Anúncios reais só devem ser ativados depois de deploy, conteúdo suficiente, consentimento e validação de política.

## QA

Execute:

npm run check

O QA verifica sintaxe JavaScript e invariantes essenciais da página.

## Deploy

O workflow **Deploy GitHub Pages** está preparado para publicar a raiz do repositório.

Caso GitHub Pages ainda não esteja habilitado no repositório:

1. Settings → Pages
2. Build and deployment
3. Source → GitHub Actions

## Gate antes de expandir

- [x] proposta de valor clara;
- [x] fluxo principal local;
- [x] estados vazio/erro/sucesso básicos;
- [x] histórico local;
- [x] PT-BR/EN;
- [x] mobile;
- [x] páginas institucionais;
- [x] QA estático;
- [x] publicidade preparada;
- [ ] validação visual publicada;
- [ ] teste com usuários reais;
- [ ] GitHub Pages confirmado.
- [x] Browser E2E automatizado;

> O Browser E2E cobre geração da revisão, salvamento no histórico, bloqueio de conteúdo curto e troca PT-BR/EN. O restante do gate é validação publicada/humana.

## V2 — somente após validar o MVP

- revisão espaçada com agenda;
- geração de perguntas com provedor real, backend-only;
- importação de PDF/documentos;
- conta e sincronização entre dispositivos;
- desempenho por assunto;
- decks compartilháveis;
- integração opcional com calendário.

## Infraestrutura

O MVP não precisa de banco. Se sincronização/conta entrar na V2, usar a infraestrutura geral definida para os produtos não-gamer do portfólio.

Planejamento geral:

https://github.com/HelioConde/ideias-ia-lab
