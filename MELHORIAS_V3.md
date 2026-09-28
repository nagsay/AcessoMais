# Melhorias da versão profissional do Acesso+

## Interface

- Hero reformulado com dois CTAs e um Radar Acesso+.
- Barra de busca mais completa.
- Filtro real de localização.
- Indicadores resumidos da plataforma.
- Cards mais informativos e com hierarquia visual melhor.
- Seção de benefícios.
- Seção de público-alvo.
- FAQ.
- CTA final e footer mais completos.

## Funcionalidades

- Busca inclui habilidades relacionadas à oportunidade.
- Contadores por categoria.
- Filtros rápidos: gratuitas, online/remoto e favoritas.
- Botão para limpar os filtros ativos.
- Ordenação por relevância, recentes e prazo.
- Exibição inicial de seis cards, com opção de ver todos.
- Favoritos persistidos no localStorage.
- Modal ampliado com público-alvo, requisitos e habilidades.
- Acesso aos favoritos também no menu e em botão flutuante no mobile.

## Responsividade

Foram definidos comportamentos específicos para:

- desktop amplo;
- notebook/tablet;
- tablet compacto;
- celular;
- celulares muito estreitos.

Os filtros horizontais usam rolagem no celular para não quebrar o layout.

## Animações

- entrada suave do hero;
- desenho animado do destaque amarelo do título;
- movimento lento dos orbes decorativos;
- entrada progressiva da barra de busca;
- reveal por IntersectionObserver ao rolar a página;
- cards com entrada escalonada;
- microinterações de hover;
- animação de favorito;
- abertura suave do menu mobile;
- animação do modal e overlay;
- FAQ com abertura discreta.

Todas as animações são reduzidas automaticamente quando o navegador informa `prefers-reduced-motion: reduce`.

## Organização do código

Os dados demonstrativos saíram do arquivo principal e foram separados em:

- `data/opportunities.ts`
- `types/opportunity.ts`

Isso deixa `app/page.tsx` focado na experiência da página e facilita futura integração com API ou banco de dados.
