import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GrauPLG, ProdutoPLG, fatorGrauPLG } from '../data/produtosPLG';

export interface ItemCarrinhoPLG {
  produtoPLG: ProdutoPLG;
  grauPLG: GrauPLG;
  quantidadePLG: number;
}

interface LojaContextoPLG {
  itensPLG: ItemCarrinhoPLG[];
  favoritosPLG: string[];
  adicionarPLG: (produtoPLG: ProdutoPLG, grauPLG?: GrauPLG) => void;
  removerPLG: (idPLG: string, grauPLG: GrauPLG) => void;
  limparPLG: () => void;
  alternarFavoritoPLG: (idPLG: string) => void;
  totalPLG: number;
}

const ContextoPLG = createContext<LojaContextoPLG | null>(null);

export function LojaProviderPLG({ children }: { children: ReactNode }) {
  const [itensPLG, setItensPLG] = useState<ItemCarrinhoPLG[]>([]);
  const [favoritosPLG, setFavoritosPLG] = useState<string[]>([]);

  const adicionarPLG = (produtoPLG: ProdutoPLG, grauPLG: GrauPLG = 'S') => {
    setItensPLG((anteriorPLG) => {
      const existePLG = anteriorPLG.some(
        (i) => i.produtoPLG.idPLG === produtoPLG.idPLG && i.grauPLG === grauPLG
      );
      if (existePLG) {
        return anteriorPLG.map((i) =>
          i.produtoPLG.idPLG === produtoPLG.idPLG && i.grauPLG === grauPLG
            ? { ...i, quantidadePLG: i.quantidadePLG + 1 }
            : i
        );
      }
      return [...anteriorPLG, { produtoPLG, grauPLG, quantidadePLG: 1 }];
    });
  };

  const removerPLG = (idPLG: string, grauPLG: GrauPLG) =>
    setItensPLG((anteriorPLG) =>
      anteriorPLG.filter((i) => !(i.produtoPLG.idPLG === idPLG && i.grauPLG === grauPLG))
    );

  const limparPLG = () => setItensPLG([]);

  const alternarFavoritoPLG = (idPLG: string) =>
    setFavoritosPLG((anteriorPLG) =>
      anteriorPLG.includes(idPLG) ? anteriorPLG.filter((f) => f !== idPLG) : [...anteriorPLG, idPLG]
    );

  const totalPLG = itensPLG.reduce(
    (somaPLG, i) => somaPLG + i.produtoPLG.precoPLG * fatorGrauPLG[i.grauPLG] * i.quantidadePLG,
    0
  );

  return (
    <ContextoPLG.Provider
      value={{ itensPLG, favoritosPLG, adicionarPLG, removerPLG, limparPLG, alternarFavoritoPLG, totalPLG }}
    >
      {children}
    </ContextoPLG.Provider>
  );
}

export function useLojaPLG(): LojaContextoPLG {
  const contextoPLG = useContext(ContextoPLG);
  if (!contextoPLG) throw new Error('useLojaPLG deve ser usado dentro de LojaProviderPLG');
  return contextoPLG;
}
