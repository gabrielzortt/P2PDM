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
    <Pressable
      style={({ pressed }) => [estilosPLG.cartaoPLG, pressed && { transform: [{ scale: 0.98 }] }]}
      onPress={() => aoAbrirPLG(produtoPLG.idPLG)}
    >
      <View>
        <ImagemPLG
          fontePLG={produtoPLG.imagensPLG?.[0]}
          legendaPLG={`${produtoPLG.nomePLG} – ${produtoPLG.subtituloPLG}`}
          estiloPLG={estilosPLG.imagemPLG}
          compactoPLG
        />
        <View style={estilosPLG.notaPLG}>
          <Ionicons name="star" size={11} color={corPLG.estrelaPLG} />
          <Text style={estilosPLG.notaTextoPLG}>{produtoPLG.notaPLG.toFixed(1)}</Text>
        </View>
        {produtoPLG.novoPLG ? (
          <View style={estilosPLG.novoPLG}>
            <Text style={estilosPLG.novoTextoPLG}>NOVO</Text>
          </View>
        ) : null}
        <TouchableOpacity
          style={estilosPLG.coracaoPLG}
          onPress={() => alternarFavoritoPLG(produtoPLG.idPLG)}
          accessibilityLabel="Favoritar"
        >
          <Ionicons name={favoritoPLG ? 'heart' : 'heart-outline'} size={17} color={favoritoPLG ? corPLG.erroPLG : corPLG.textoPLG} />
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
          <Ionicons name="add" size={20} color={corPLG.espressoPLG} />
        </TouchableOpacity>
      </View>
    </Pressable>
  );
}

const estilosPLG = StyleSheet.create({
  cartaoPLG: { flex: 1, backgroundColor: corPLG.brancoPLG, borderRadius: 22, padding: 8, paddingBottom: 14, ...sombraPLG.suavePLG },
  imagemPLG: { width: '100%', aspectRatio: 1.05, borderRadius: 16 },
  notaPLG: {
    position: 'absolute', bottom: 8, left: 8, flexDirection: 'row', alignItems: 'center', gap: 3,
    backgroundColor: 'rgba(34,20,14,0.72)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10,
  },
  notaTextoPLG: { color: corPLG.brancoPLG, fontSize: 11, fontFamily: fontePLG.semiPLG },
  novoPLG: { position: 'absolute', top: 8, left: 8, backgroundColor: corPLG.ouroPLG, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  novoTextoPLG: { fontSize: 9, fontFamily: fontePLG.semiPLG, color: corPLG.espressoPLG, letterSpacing: 0.6 },
  coracaoPLG: { position: 'absolute', top: 8, right: 8, width: 30, height: 30, borderRadius: 15, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center' },
  nomePLG: { fontSize: 16, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG, marginTop: 12, marginHorizontal: 6 },
  subtituloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2, marginHorizontal: 6 },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, marginHorizontal: 6 },
  precoPLG: { fontSize: 14, fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG },
  botaoPLG: { width: 34, height: 34, borderRadius: 11, backgroundColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center' },
});
