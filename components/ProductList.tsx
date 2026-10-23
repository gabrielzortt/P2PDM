import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductCard from './ProductCard';
import { ProdutoPLG } from '../data/produtosPLG';

interface ProductListPropsPLG {
  produtosPLG: ProdutoPLG[];
  aoVerDetalhesPLG: (idPLG: string) => void;
  cabecalhoPLG?: React.ReactElement;
}

export default function ProductList({ produtosPLG, aoVerDetalhesPLG, cabecalhoPLG }: ProductListPropsPLG) {
  return (
    <FlatList
      data={produtosPLG}
      keyExtractor={(itemPLG) => itemPLG.idPLG}
      numColumns={2}
      ListHeaderComponent={cabecalhoPLG}
      contentContainerStyle={estilosPLG.listaPLG}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }) => <ProductCard produtoPLG={item} aoVerDetalhesPLG={aoVerDetalhesPLG} />}
    />
  );
}

const estilosPLG = StyleSheet.create({
  listaPLG: { padding: 10, paddingBottom: 30 },
});
