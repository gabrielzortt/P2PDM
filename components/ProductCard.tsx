import React from 'react';
import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProdutoPLG, formatarPrecoPLG } from '../data/produtosPLG';
import { corPLG, fontePLG } from '../constants/temaPLG';

interface ProductCardPropsPLG {
  produtoPLG: ProdutoPLG;
  aoAbrirPLG: (idPLG: string) => void;
  aoAdicionarPLG: (produtoPLG: ProdutoPLG) => void;
}

export default function ProductCard({ produtoPLG, aoAbrirPLG, aoAdicionarPLG }: ProductCardPropsPLG) {
  return (
    <Pressable style={estilosPLG.cartaoPLG} onPress={() => aoAbrirPLG(produtoPLG.idPLG)}>
      <View>
        <Image source={produtoPLG.imagemCardPLG} style={estilosPLG.imagemPLG} resizeMode="cover" />
        <View style={estilosPLG.notaPLG}>
          <Ionicons name="star" size={11} color={corPLG.estrelaPLG} />
          <Text style={estilosPLG.notaTextoPLG}>{produtoPLG.notaPLG.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={estilosPLG.nomePLG} numberOfLines={1}>{produtoPLG.nomePLG}</Text>
      <Text style={estilosPLG.subtituloPLG} numberOfLines={1}>{produtoPLG.subtituloPLG}</Text>
      <View style={estilosPLG.rodapePLG}>
        <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(produtoPLG.precoPLG)}</Text>
        <TouchableOpacity
          style={estilosPLG.botaoPLG}
          activeOpacity={0.85}
          onPress={() => aoAdicionarPLG(produtoPLG)}
          accessibilityLabel={`Adicionar ${produtoPLG.nomePLG} ao carrinho`}
        >
          <Ionicons name="add" size={20} color={corPLG.brancoPLG} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const estilosPLG = StyleSheet.create({
  cartaoPLG: {
    flex: 1,
    backgroundColor: corPLG.brancoPLG,
    borderRadius: 18,
    padding: 8,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  imagemPLG: { width: '100%', aspectRatio: 1.1, borderRadius: 14 },
  notaPLG: {
    position: 'absolute',
    top: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,0,0,0.38)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  notaTextoPLG: { color: corPLG.brancoPLG, fontSize: 11, fontFamily: fontePLG.semiPLG },
  nomePLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG, marginTop: 10, marginHorizontal: 4 },
  subtituloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2, marginHorizontal: 4 },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 4 },
  precoPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.precoPLG },
  botaoPLG: { width: 32, height: 32, borderRadius: 10, backgroundColor: corPLG.cobrePLG, alignItems: 'center', justifyContent: 'center' },
});
