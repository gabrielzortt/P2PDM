import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ProdutoPLG, formatarPrecoPLG } from '../data/produtosPLG';
import { corPLG } from '../constants/temaPLG';

interface ProductCardPropsPLG {
  produtoPLG: ProdutoPLG;
  aoVerDetalhesPLG: (idPLG: string) => void;
}

export default function ProductCard({ produtoPLG, aoVerDetalhesPLG }: ProductCardPropsPLG) {
  return (
    <View style={estilosPLG.cartaoPLG}>
      <Image source={produtoPLG.imagemPLG} style={estilosPLG.imagemPLG} resizeMode="cover" />
      <View style={estilosPLG.etiquetaPLG}>
        <Text style={estilosPLG.etiquetaTextoPLG}>{produtoPLG.categoriaPLG}</Text>
      </View>
      <View style={estilosPLG.infoPLG}>
        <Text style={estilosPLG.nomePLG} numberOfLines={2}>{produtoPLG.nomePLG}</Text>
        <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(produtoPLG.precoPLG)}</Text>
        <TouchableOpacity
          style={estilosPLG.botaoPLG}
          activeOpacity={0.85}
          onPress={() => aoVerDetalhesPLG(produtoPLG.idPLG)}
        >
          <Text style={estilosPLG.botaoTextoPLG}>Detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  cartaoPLG: {
    flex: 1,
    margin: 6,
    backgroundColor: corPLG.brancoPLG,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: corPLG.bordaPLG,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  imagemPLG: { width: '100%', aspectRatio: 1 },
  etiquetaPLG: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: corPLG.primariaPLG,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  etiquetaTextoPLG: { color: corPLG.douradoClaroPLG, fontSize: 11, fontWeight: '700' },
  infoPLG: { padding: 12 },
  nomePLG: { fontSize: 14, fontWeight: '700', color: corPLG.textoPLG, minHeight: 38 },
  precoPLG: { fontSize: 16, fontWeight: '800', color: corPLG.douradoPLG, marginVertical: 6 },
  botaoPLG: {
    backgroundColor: corPLG.primariaPLG,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTextoPLG: { color: corPLG.brancoPLG, fontWeight: '700', fontSize: 13 },
});
