# Numismática PLG – Loja de Moedas e Cédulas Antigas

App mobile feito com React Native + Expo Router (Stack + Tabs), TSX e StyleSheet, para a P2 de Programação para Dispositivos Móveis 1.

🌐 **Versão web:** https://gabrielzortt.github.io/P2PDM/

[![Deploy](https://github.com/gabrielzortt/P2PDM/actions/workflows/deploy.yml/badge.svg)](https://github.com/gabrielzortt/P2PDM/actions/workflows/deploy.yml)

## Executar
```bash
npm install
npx expo start
```

**Conta de teste (já cadastrada no código):** `colecionador@moedas.com` / `123456`
Também é possível **criar uma conta nova** na tela de cadastro (os dados ficam salvos no aparelho).

## Telas
| Rota | Tela |
|---|---|
| `app/index.tsx` | Boas-vindas em carrossel (deslizável, com indicador de página) |
| `app/login.tsx` | Login (campos vazios, e-mail incorreto e senha incorreta) |
| `app/cadastro.tsx` | Criar conta (validação de nome, e-mail, senha e confirmação) |
| `app/(tabs)/inicio.tsx` | Início: busca, promoção, atalhos, destaques, épocas e mais procurados |
| `app/(tabs)/explorar.tsx` | Catálogo com busca, filtros e ordenação |
| `app/(tabs)/favoritos.tsx` | Peças favoritas |
| `app/(tabs)/carrinho.tsx` | Carrinho com quantidade, cupom (`COLECAO10`), frete e total |
| `app/(tabs)/perfil.tsx` | Perfil e menu da conta |
| `app/produto/[id].tsx` | Detalhes: galeria, ficha técnica, conservação, quantidade e relacionadas |
| `app/checkout.tsx` | Endereço, pagamento e resumo |
| `app/pedido-confirmado.tsx` / `app/pedidos.tsx` | Confirmação e histórico de pedidos |
| `app/notificacoes.tsx`, `app/editar-perfil.tsx`, `app/sobre.tsx` | Telas de apoio |

## Como adicionar as imagens
Onde aparece **(imagem aqui)** há um espaço reservado. Para colocar uma foto:
1. Salve a imagem em `assets/images/`.
2. Em `data/produtosPLG.ts`, preencha o campo `imagensPLG` do produto, por exemplo:
   `imagensPLG: [require('../assets/images/moeda-2000-reis.jpg')]`
3. Para os espaços fora dos produtos (carrossel, login, banner, loja), passe `fontePLG={require('...')}` ao componente `ImagemPLG` daquela tela.

## Estrutura
- `components/` – `ImagemPLG`, `BotaoPLG`, `CampoPLG`, `ProductCard`, `ProductCardHorizontal`, `ProductList`, `CategoriaChips`, `CabecalhoPLG`, `SeletorQuantidade`, `EstadoVazio`, `ConfirmarModal`
- `data/produtosPLG.ts` – servidor local simulado (mock)
- `context/LojaPLG.tsx` – estado global: usuários, carrinho, favoritos, cupom e pedidos
- `constants/temaPLG.ts` – cores, fontes (Sora e Playfair Display) e sombras

Todas as variáveis, funções e estados levam o sufixo **PLG** (Paulo, Luiz, Gabriel).
