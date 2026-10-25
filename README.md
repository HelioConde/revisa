<div align="center">
  <h1>📚 Revisa</h1>
  <p><strong>Transforme suas próprias anotações em uma sessão rápida de revisão ativa.</strong></p>
  <p><img alt="Status" src="https://img.shields.io/badge/status-MVP%20local-64748b"> <img alt="Privacidade" src="https://img.shields.io/badge/processamento-no%20navegador-2563eb"></p>
  <p><a href="https://helioconde.github.io/revisa/"><strong>Abrir versão web</strong></a> · <a href="#uso-r%C3%A1pido"><strong>Uso rápido</strong></a> · <a href="#rodar-localmente"><strong>Desenvolvimento</strong></a></p>
</div>

## A proposta

O **Revisa** é uma ferramenta de estudo para transformar apontamentos fornecidos pelo próprio usuário em **pontos-chave, flashcards e mini-quiz**. A proposta é estimular recuperação ativa da memória com sessões pequenas, sem exigir conta ou um serviço de IA remoto.

## Uso rápido

1. Informe a matéria, o tema e seu objetivo.
2. Cole os apontamentos que deseja revisar.
3. Gere uma sessão com resumo, cartões e perguntas.
4. Teste a si mesmo, reveja os cartões e salve a sessão.
5. Reabra revisões anteriores no histórico do navegador.

| Recurso | Como funciona |
| --- | --- |
| Pontos-chave | Organização automática do conteúdo inserido |
| Flashcards | Cartões de perguntas e respostas |
| Mini-quiz | Perguntas de revisão baseadas nas anotações |
| Histórico | Dados locais do navegador |
| Idiomas | Português e inglês |
| Dispositivos | Interface adaptada para desktop e celular |

## Privacidade e limites

**O MVP processa o material localmente no navegador.** Não há envio das anotações para um modelo remoto de IA nesta versão. Os dados ficam no `localStorage` e **podem ser apagados** ao limpar o site ou mudar de navegador.

A ferramenta não valida automaticamente a veracidade do conteúdo informado, nem substitui livros, professores ou fontes confiáveis.

## Rodar localmente

```bash
git clone https://github.com/HelioConde/revisa.git
cd revisa
python -m http.server 8000
```

Acesse `http://localhost:8000`. Para verificar a estrutura:

```bash
npm install
npm run check
npm run test:e2e
```

O `test:e2e` depende dos navegadores Playwright instalados; esta revisão de documentação não executa os testes.

## Estado do projeto

**MVP implementado, em validação de uso.** O foco antes de expandir é comprovar que a revisão ajuda estudantes reais, revisar acessibilidade e melhorar a qualidade dos cartões e testes gerados.

Este produto integra o [Ideias IA Lab](https://github.com/HelioConde/ideias-ia-lab).

Desenvolvido por [Hélio Conde](https://github.com/HelioConde).
