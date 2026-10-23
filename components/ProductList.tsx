import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ProductCard from './ProductCard';
import { ProdutoPLG } from '../data/produtosPLG';

interface ProductListPropsPLG {
  produtosPLG: ProdutoPLG[];
  aoAbrirPLG: (idPLG: string) => void;
  aoAdicionarPLG: (produtoPLG: ProdutoPLG) => void;
  cabecalhoPLG?: React.ReactElement;
  vazioPLG?: React.ReactElement;
}

export default function ProductList({ produtosPLG, aoAbrirPLG, aoAdicionarPLG, cabecalhoPLG, vazioPLG }: ProductListPropsPLG) {
  return (
    <FlatList
      data={produtosPLG}
      keyExtractor={(itemPLG) => itemPLG.idPLG}
      numColumns={2}
      columnWrapperStyle={estilosPLG.colunasPLG}
      ListHeaderComponent={cabecalhoPLG}
      ListEmptyComponent={vazioPLG}
      contentContainerStyle={estilosPLG.listaPLG}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <View style={estilosPLG.celulaPLG}>
          <ProductCard produtoPLG={item} aoAbrirPLG={aoAbrirPLG} aoAdicionarPLG={aoAdicionarPLG} />
        </View>
      )}
    />
  );
}

const estilosPLG = StyleSheet.create({
  listaPLG: { paddingHorizontal: 20, paddingBottom: 24 },
  colunasPLG: { gap: 16, marginBottom: 16 },
  celulaPLG: { flex: 1 },
});
