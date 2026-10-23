import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ProductList from '../../components/ProductList';
import { produtosPLG } from '../../data/produtosPLG';
import { corPLG } from '../../constants/temaPLG';

export default function HomePLG() {
  const roteadorPLG = useRouter();

  const abrirDetalhesPLG = (idPLG: string) => {
    roteadorPLG.push({ pathname: '/produto/[id]', params: { id: idPLG } });
  };

  const cabecalhoPLG = (
    <View style={estilosPLG.bannerPLG}>
      <Text style={estilosPLG.bannerTituloPLG}>Peças que contam história</Text>
      <Text style={estilosPLG.bannerTextoPLG}>Explore nossa coleção de moedas e cédulas antigas.</Text>
    </View>
  );

  return (
    <View style={estilosPLG.telaPLG}>
      <ProductList produtosPLG={produtosPLG} aoVerDetalhesPLG={abrirDetalhesPLG} cabecalhoPLG={cabecalhoPLG} />
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  bannerPLG: { backgroundColor: corPLG.primariaPLG, borderRadius: 16, padding: 18, margin: 6, marginBottom: 10 },
  bannerTituloPLG: { color: corPLG.douradoClaroPLG, fontSize: 20, fontWeight: '800' },
  bannerTextoPLG: { color: corPLG.brancoPLG, fontSize: 13, marginTop: 4 },
});
