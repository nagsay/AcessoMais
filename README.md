# Acesso+

Acesso+ é uma plataforma de descoberta de oportunidades voltada para estudantes e jovens profissionais. O projeto centraliza vagas, cursos, bolsas, estágios, eventos e editais em uma interface moderna, intuitiva e responsiva.

A ideia principal é reduzir a dispersão de informações e facilitar a busca por oportunidades relevantes em um único lugar.

## Visão geral

O portal oferece:

- busca por título, organização, categoria e habilidades;
- filtros por localização, modalidade, gratuidade e oportunidades salvas;
- ordenação por relevância, novidade e prazo;
- cards com informações principais de cada oportunidade;
- modal com detalhes completos, requisitos e público-alvo;
- seção de destaques para oportunidades em evidência;
- layout responsivo para desktop, tablet e celular;
- foco em acessibilidade e experiência do usuário.

## Funcionalidades principais

- Busca inteligente com texto livre;
- Filtros rápidos e refinados;
- Persistência de favoritos no navegador;
- Visualização de oportunidades por categoria;
- Destaques em cards exclusivos;
- Estrutura preparada para integração com banco de dados e APIs futuras;
- Interface moderna com componentes reutilizáveis e visual consistente.

## Tecnologias utilizadas

- React 19
- TypeScript
- Next.js / Vinext
- Vite
- Tailwind CSS 4
- shadcn/ui
- Lucide React
- Cloudflare Workers
- Drizzle ORM

## Estrutura do projeto

```text
app/
  layout.tsx
  page.tsx
  globals.css

components/
  ui/

data/
  opportunities.ts

db/
  index.ts
  schema.ts

lib/
  utils.ts

types/
  opportunity.ts

worker/
  index.ts
```

## Pré-requisitos

- Node.js 22.13 ou superior
- npm

## Como executar localmente

1. Clone o repositório:

```bash
git clone https://github.com/nagsay/AcessoMais.git
cd AcessoMais
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

```text
http://localhost:3000
```

## Scripts disponíveis

```bash
npm run dev
npm run build
npm run test
npm run lint
npm run db:generate
```

## Dados do protótipo

As oportunidades exibidas nesta versão são demonstrativas e ficam em:

```text
data/opportunities.ts
```

Essa estrutura permite evoluir para uma integração com API real, banco de dados ou CMS sem mexer na base visual do projeto.

## Acessibilidade

O projeto considera boas práticas de acessibilidade, como:

- HTML semântico;
- rótulos claros em campos de busca;
- estados visuais para filtros ativos;
- suporte a reduções de movimento (`prefers-reduced-motion`);
- interface pensada para navegação simples e intuitiva.

## Roadmap sugerido

- painel administrativo para cadastro e edição de oportunidades;
- autenticação de usuários;
- banco de dados real para armazenar oportunidades e favoritos;
- links oficiais de inscrição;
- paginação e carregamento dinâmico;
- notificações de novos eventos e prazos;
- perfis personalizados e recomendações.

## Observação

Este é um projeto acadêmico e demonstrativo, desenvolvido para apresentar uma solução funcional de agregação de oportunidades em uma interface moderna e escalável.

---

Acesso+ • Conectando oportunidades ao futuro.
