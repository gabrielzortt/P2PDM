# Numismática PLG – Loja de Moedas e Cédulas Antigas

App mobile feito com React Native + Expo Router (Stack + Tabs), TSX e StyleSheet, seguindo o protótipo do Figma da P2 de PDM 1 com o tema **Loja de Moedas e Cédulas Antigas**.

🌐 **Versão web:** https://gabrielzortt.github.io/P2PDM/

[![Deploy](https://github.com/gabrielzortt/P2PDM/actions/workflows/deploy.yml/badge.svg)](https://github.com/gabrielzortt/P2PDM/actions/workflows/deploy.yml)

## Executar
```bash
npm install
npx expo start
```

**Login cadastrado no código:** `colecionador@moedas.com` / `123456`

## Telas (conforme o Figma)
1. **Boas-vindas** (`app/index.tsx`) – botão *Get Started*
2. **Login** (`app/login.tsx`) – validação local: campos vazios, e-mail incorreto e senha incorreta
3. **Home** (`app/(tabs)/home.tsx`) – localização, busca, filtros, grade de produtos e botão `+`
4. **Detalhes** (`app/produto/[id].tsx`) – imagem, avaliação, descrição (*Read More*), conservação (MBC / S / FC), preço e *Buy Now*
5. **Tabs** – Home, Favoritos, Carrinho e Notificações

## Estrutura
- `components/` – `ProductCard`, `ProductList`, `CategoriaChips`
- `data/produtosPLG.ts` – servidor local simulado (mock)
- `context/LojaPLG.tsx` – estado global (carrinho e favoritos)
- `constants/temaPLG.ts` – cores e fontes (Sora)

Todas as variáveis, funções e estados levam o sufixo **PLG** (Paulo, Luiz, Gabriel).
