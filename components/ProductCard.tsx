import React from 'react';
import { View, Text, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImagemPLG from './ImagemPLG';
import { ProdutoPLG, formatarPrecoPLG } from '../data/produtosPLG';
import { useLojaPLG } from '../context/LojaPLG';
import { corPLG, fontePLG, sombraPLG } from '../constants/temaPLG';

interface ProductCardPropsPLG {
  produtoPLG: ProdutoPLG;
  aoAbrirPLG: (idPLG: string) => void;
}

export default function ProductCard({ produtoPLG, aoAbrirPLG }: ProductCardPropsPLG) {
  const { favoritosPLG, alternarFavoritoPLG, adicionarPLG, mostrarToastPLG } = useLojaPLG();
  const favoritoPLG = favoritosPLG.includes(produtoPLG.idPLG);

  return (
    <Pressable style={({ pressed }) => [estilosPLG.cartaoPLG, pressed && { transform: [{ scale: 0.98 }] }]} onPress={() => aoAbrirPLG(produtoPLG.idPLG)}>
      <View>
        <ImagemPLG fontePLG={produtoPLG.imagensPLG?.[0]} legendaPLG={`${produtoPLG.nomePLG} – ${produtoPLG.subtituloPLG}`} estiloPLG={estilosPLG.imagemPLG} compactoPLG />
        <View style={estilosPLG.notaPLG}>
          <Ionicons name="star" size={11} color={corPLG.estrelaPLG} />
          <Text style={estilosPLG.notaTextoPLG}>{produtoPLG.notaPLG.toFixed(1)}</Text>
        </View>
        <TouchableOpacity style={estilosPLG.coracaoPLG} onPress={() => alternarFavoritoPLG(produtoPLG.idPLG)} accessibilityLabel="Favoritar">
          <Ionicons name={favoritoPLG ? 'heart' : 'heart-outline'} size={16} color={favoritoPLG ? corPLG.erroPLG : corPLG.textoPLG} />
        </TouchableOpacity>
      </View>
      <Text style={estilosPLG.nomePLG} numberOfLines={1}>{produtoPLG.nomePLG}</Text>
      <Text style={estilosPLG.subtituloPLG} numberOfLines={1}>{produtoPLG.subtituloPLG}</Text>
      <View style={estilosPLG.rodapePLG}>
        <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(produtoPLG.precoPLG)}</Text>
        <TouchableOpacity
          style={estilosPLG.botaoPLG}
          activeOpacity={0.85}
          onPress={() => {
            adicionarPLG(produtoPLG);
            mostrarToastPLG(`${produtoPLG.nomePLG} adicionado ao carrinho`);
          }}
          accessibilityLabel={`Adicionar ${produtoPLG.nomePLG} ao carrinho`}
        >
          <Ionicons name="add" size={20} color={corPLG.brancoPLG} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const estilosPLG = StyleSheet.create({
  cartaoPLG: { flex: 1, backgroundColor: corPLG.brancoPLG, borderRadius: 20, padding: 8, paddingBottom: 14, ...sombraPLG.suavePLG },
  imagemPLG: { width: '100%', aspectRatio: 1.08, borderRadius: 16 },
  notaPLG: {
    position: 'absolute', top: 0, left: 0, flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 9, paddingVertical: 5, borderTopLeftRadius: 16, borderBottomRightRadius: 16,
  },
  notaTextoPLG: { color: corPLG.brancoPLG, fontSize: 11, fontFamily: fontePLG.semiPLG },
  coracaoPLG: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.93)', alignItems: 'center', justifyContent: 'center' },
  nomePLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG, marginTop: 12, marginHorizontal: 6 },
  subtituloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2, marginHorizontal: 6 },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 12, marginHorizontal: 6 },
  precoPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.precoPLG },
  botaoPLG: { width: 34, height: 34, borderRadius: 11, backgroundColor: corPLG.cobrePLG, alignItems: 'center', justifyContent: 'center', shadowColor: corPLG.cobrePLG, shadowOpacity: 0.35, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
});
