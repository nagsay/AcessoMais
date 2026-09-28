# Acesso+

O **Acesso+** é um hub de oportunidades criado para reunir, organizar e facilitar a descoberta de cursos, vagas, estágios, bolsas, eventos e editais.

A proposta do projeto é reduzir a dispersão de informações e oferecer uma experiência simples, responsiva e acessível para estudantes e jovens profissionais.

## Principais recursos

- busca por título, instituição, categoria e habilidades;
- filtro real por localização;
- filtros rápidos para oportunidades gratuitas, online/remotas e salvas;
- ordenação por relevância, novidades e prazo;
- favoritos persistidos com `localStorage`;
- cards com habilidades, modalidade, prazo e organização;
- modal com requisitos, público-alvo e detalhes da oportunidade;
- radar de oportunidades em destaque;
- seções de benefícios, público-alvo, funcionamento e FAQ;
- layout responsivo para desktop, tablet e celular;
- animações sutis com suporte a `prefers-reduced-motion`;
- componentes de interface baseados em shadcn;
- estrutura preparada para futura integração com Cloudflare D1 e Drizzle ORM.

## Tecnologias

- React 19
- TypeScript
- Next.js / Vinext
- Vite
- Tailwind CSS 4
- shadcn/ui
- Lucide React
- Cloudflare Workers
- Drizzle ORM

## Estrutura principal

```text
app/
  layout.tsx
  page.tsx
  globals.css

data/
  opportunities.ts

types/
  opportunity.ts

components/ui/
  componentes reutilizáveis da interface

db/
  estrutura preparada para banco de dados

worker/
  entrada do Cloudflare Worker
```

## Como executar

Requisitos:

- Node.js 22.13 ou superior
- npm

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

## Dados do protótipo

As oportunidades exibidas nesta versão são demonstrativas e ficam em:

```text
data/opportunities.ts
```

Isso permite substituir os dados locais por uma API ou banco de dados futuramente sem misturar o conteúdo com a estrutura visual principal.

## Persistência dos favoritos

Os favoritos são salvos no navegador por meio de `localStorage`. Em uma versão futura com autenticação, esse recurso pode ser migrado para o banco de dados e associado à conta de cada usuário.

## Acessibilidade e movimento

O projeto utiliza HTML semântico, rótulos acessíveis, estados `aria-pressed` em filtros e tratamento de redução de movimento. Usuários que configuram `prefers-reduced-motion` no sistema recebem uma interface praticamente sem animações.

## Próximas evoluções sugeridas

- painel administrativo para cadastro de oportunidades;
- autenticação;
- banco de dados para oportunidades e favoritos;
- links oficiais de inscrição;
- paginação ou carregamento pela API;
- notificações de novos prazos;
- perfis e recomendações personalizadas.

---

Projeto acadêmico. Conteúdo demonstrativo.
