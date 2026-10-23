# Numismática PLG – Loja de Moedas e Cédulas Antigas

App React Native + Expo Router (Stack + Tabs), TSX e StyleSheet.

## Executar
```bash
npm install
npx expo install --fix
npx expo start
```

Login de teste: `colecionador@moedas.com` / `123456`

## Estrutura
- `app/index.tsx` – Login (validação local)
- `app/(tabs)/` – Home, Carrinho e Perfil (Tabs)
- `app/produto/[id].tsx` – Detalhes (Stack, parâmetro `id`)
- `components/` – ProductCard e ProductList
- `data/produtosPLG.ts` – servidor local simulado (mock)
- `context/CarrinhoPLG.tsx` – estado global do carrinho
