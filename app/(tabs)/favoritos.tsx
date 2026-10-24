import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductListPLG from '../../components/ProductList';
import EstadoVazioPLG from '../../components/EstadoVazio';
import { produtosPLG } from '../../data/produtosPLG';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG } from '../../constants/temaPLG';

export default function FavoritosPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { favoritosPLG } = useLojaPLG();
  const listaPLG = produtosPLG.filter((pPLG) => favoritosPLG.includes(pPLG.idPLG));

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insetsPLG.top + 16, paddingHorizontal: 20, paddingBottom: 18 }}>
        <Text style={estilosPLG.tituloPLG}>Favoritos</Text>
        <Text style={estilosPLG.subtituloPLG}>{listaPLG.length} {listaPLG.length === 1 ? 'peça salva' : 'peças salvas'}</Text>
      </View>
      <ProductListPLG
        produtosPLG={listaPLG}
        aoAbrirPLG={(idPLG) => roteadorPLG.push({ pathname: '/produto/[id]', params: { id: idPLG } })}
        vazioPLG={<EstadoVazioPLG iconePLG="heart-outline" tituloPLG="Nenhum favorito ainda" textoPLG="Toque no coração de uma peça para guardá-la aqui." botaoPLG="Explorar peças" aoPressionarPLG={() => roteadorPLG.push('/inicio')} />}
      />
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  tituloPLG: { fontSize: 30, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
});
