# Correção de layout v4.1

## Problema visto no print
O formulário de pesquisa fica no final da seção `hero` e usa margem negativa para criar um efeito de sobreposição. A seção `hero` estava com `overflow: hidden`, então a parte do formulário que ultrapassava o limite da seção era recortada pelo navegador.

## Correções
- `hero` agora permite que o painel de busca fique visível fora do limite da seção.
- Mantido o bloqueio horizontal global pelo `body`, evitando barra de rolagem lateral.
- Criado ajuste especial para notebooks/desktops com pouca altura útil (`max-height: 720px`).
- O hero fica mais compacto nessas telas: título, espaçamentos, radar e busca ocupam menos altura.
- A busca continua responsiva nos breakpoints de tablet e celular.
