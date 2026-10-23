import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ImagemPLG from './ImagemPLG';
import { ProdutoPLG, formatarPrecoPLG } from '../data/produtosPLG';
import { corPLG, fontePLG, sombraPLG } from '../constants/temaPLG';

interface CardHorizontalPropsPLG {
  produtoPLG: ProdutoPLG;
  aoAbrirPLG: (idPLG: string) => void;
}

export default function ProductCardHorizontal({ produtoPLG, aoAbrirPLG }: CardHorizontalPropsPLG) {
  return (
    <Pressable
      style={({ pressed }) => [estilosPLG.cartaoPLG, pressed && { transform: [{ scale: 0.98 }] }]}
      onPress={() => aoAbrirPLG(produtoPLG.idPLG)}
    >
      <ImagemPLG
        fontePLG={produtoPLG.imagensPLG?.[0]}
        legendaPLG={`${produtoPLG.nomePLG} – ${produtoPLG.subtituloPLG}`}
        estiloPLG={estilosPLG.imagemPLG}
      />
      <View style={estilosPLG.raridadePLG}>
        <Text style={estilosPLG.raridadeTextoPLG}>{produtoPLG.raridadePLG}</Text>
      </View>
      <View style={estilosPLG.infoPLG}>
        <View style={{ flex: 1 }}>
          <Text style={estilosPLG.nomePLG} numberOfLines={1}>{produtoPLG.nomePLG}</Text>
          <Text style={estilosPLG.subtituloPLG} numberOfLines={1}>{produtoPLG.subtituloPLG}</Text>
        </View>
        <View style={estilosPLG.notaPLG}>
          <Ionicons name="star" size={12} color={corPLG.estrelaPLG} />
          <Text style={estilosPLG.notaTextoPLG}>{produtoPLG.notaPLG.toFixed(1)}</Text>
        </View>
      </View>
      <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(produtoPLG.precoPLG)}</Text>
    </Pressable>
  );
}

const estilosPLG = StyleSheet.create({
  cartaoPLG: { width: 210, backgroundColor: corPLG.brancoPLG, borderRadius: 24, padding: 10, ...sombraPLG.suavePLG },
  imagemPLG: { width: '100%', height: 170, borderRadius: 18 },
  raridadePLG: { position: 'absolute', top: 18, left: 18, backgroundColor: 'rgba(34,20,14,0.78)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  raridadeTextoPLG: { color: corPLG.ouroClaroPLG, fontSize: 10, fontFamily: fontePLG.semiPLG, letterSpacing: 0.4 },
  infoPLG: { flexDirection: 'row', alignItems: 'center', marginTop: 12, marginHorizontal: 6, gap: 8 },
  nomePLG: { fontSize: 18, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
  notaPLG: { flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: corPLG.cremePLG, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  notaTextoPLG: { fontSize: 12, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  precoPLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG, marginTop: 10, marginHorizontal: 6, marginBottom: 4 },
});
