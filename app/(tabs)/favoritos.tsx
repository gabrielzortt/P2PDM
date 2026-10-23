import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductList from '../../components/ProductList';
import { produtosPLG } from '../../data/produtosPLG';
import { useLojaPLG } from '../../context/LojaPLG';
import { corPLG, fontePLG } from '../../constants/temaPLG';

export default function FavoritosPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { favoritosPLG, adicionarPLG } = useLojaPLG();
  const listaPLG = produtosPLG.filter((p) => favoritosPLG.includes(p.idPLG));

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <Text style={[estilosPLG.tituloPLG, { paddingTop: insetsPLG.top + 16 }]}>Favoritos</Text>
      <ProductList
        produtosPLG={listaPLG}
        aoAbrirPLG={(id) => roteadorPLG.push({ pathname: '/produto/[id]', params: { id } })}
        aoAdicionarPLG={(p) => adicionarPLG(p)}
        vazioPLG={<Text style={estilosPLG.vazioPLG}>Toque no coração de uma peça para favoritá-la.</Text>}
      />
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  tituloPLG: { fontSize: 22, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG, paddingHorizontal: 20, paddingBottom: 18 },
  vazioPLG: { textAlign: 'center', marginTop: 60, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, paddingHorizontal: 30 },
});
