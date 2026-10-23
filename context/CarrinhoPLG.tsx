import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProdutoPLG } from '../data/produtosPLG';

interface ItemCarrinhoPLG {
  produtoPLG: ProdutoPLG;
  quantidadePLG: number;
}

interface CarrinhoContextoPLG {
  itensPLG: ItemCarrinhoPLG[];
  adicionarPLG: (produtoPLG: ProdutoPLG) => void;
  removerPLG: (idPLG: string) => void;
  limparPLG: () => void;
  totalPLG: number;
}

const ContextoPLG = createContext<CarrinhoContextoPLG | null>(null);

export function CarrinhoProviderPLG({ children }: { children: ReactNode }) {
  const [itensPLG, setItensPLG] = useState<ItemCarrinhoPLG[]>([]);

  const adicionarPLG = (produtoPLG: ProdutoPLG) => {
    setItensPLG((anteriorPLG) => {
      const existentePLG = anteriorPLG.find((i) => i.produtoPLG.idPLG === produtoPLG.idPLG);
      if (existentePLG) {
        return anteriorPLG.map((i) =>
          i.produtoPLG.idPLG === produtoPLG.idPLG ? { ...i, quantidadePLG: i.quantidadePLG + 1 } : i
        );
      }
      return [...anteriorPLG, { produtoPLG, quantidadePLG: 1 }];
    });
  };

  const removerPLG = (idPLG: string) =>
    setItensPLG((anteriorPLG) => anteriorPLG.filter((i) => i.produtoPLG.idPLG !== idPLG));

  const limparPLG = () => setItensPLG([]);

  const totalPLG = itensPLG.reduce((somaPLG, i) => somaPLG + i.produtoPLG.precoPLG * i.quantidadePLG, 0);

  return (
    <ContextoPLG.Provider value={{ itensPLG, adicionarPLG, removerPLG, limparPLG, totalPLG }}>
      {children}
    </ContextoPLG.Provider>
  );
}

export function useCarrinhoPLG(): CarrinhoContextoPLG {
  const contextoPLG = useContext(ContextoPLG);
  if (!contextoPLG) throw new Error('useCarrinhoPLG deve ser usado dentro de CarrinhoProviderPLG');
  return contextoPLG;
}
