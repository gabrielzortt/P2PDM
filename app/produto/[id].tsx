import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { buscarProdutoPorIdPLG, formatarPrecoPLG } from '../../data/produtosPLG';
import { useCarrinhoPLG } from '../../context/CarrinhoPLG';
import { corPLG } from '../../constants/temaPLG';

export default function DetalhesPLG() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const roteadorPLG = useRouter();
  const { adicionarPLG } = useCarrinhoPLG();
  const produtoPLG = buscarProdutoPorIdPLG(id ?? '');

  if (!produtoPLG) {
    return (
      <View style={estilosPLG.naoEncontradoPLG}>
        <Text style={estilosPLG.nomePLG}>Produto não encontrado.</Text>
      </View>
    );
  }

  const comprarAgoraPLG = () => {
    Alert.alert('Compra iniciada', `Você escolheu: ${produtoPLG.nomePLG}`);
  };

  const adicionarAoCarrinhoPLG = () => {
    adicionarPLG(produtoPLG);
    Alert.alert('Adicionado', 'Produto adicionado ao carrinho.', [
      { text: 'Continuar', style: 'cancel' },
      { text: 'Ver carrinho', onPress: () => roteadorPLG.replace('/carrinho') },
    ]);
  };

  return (
    <ScrollView style={estilosPLG.telaPLG} contentContainerStyle={{ paddingBottom: 32 }}>
      <Image source={produtoPLG.imagemPLG} style={estilosPLG.imagemPLG} resizeMode="cover" />
      <View style={estilosPLG.corpoPLG}>
        <Text style={estilosPLG.categoriaPLG}>{produtoPLG.categoriaPLG.toUpperCase()}</Text>
        <Text style={estilosPLG.nomePLG}>{produtoPLG.nomePLG}</Text>
        <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(produtoPLG.precoPLG)}</Text>
        <Text style={estilosPLG.descricaoRotuloPLG}>Descrição</Text>
        <Text style={estilosPLG.descricaoPLG}>{produtoPLG.descricaoPLG}</Text>

        <TouchableOpacity style={estilosPLG.botaoPrimarioPLG} onPress={comprarAgoraPLG} activeOpacity={0.85}>
          <Text style={estilosPLG.botaoPrimarioTextoPLG}>Buy Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={estilosPLG.botaoSecundarioPLG} onPress={adicionarAoCarrinhoPLG} activeOpacity={0.85}>
          <Text style={estilosPLG.botaoSecundarioTextoPLG}>Adicionar ao carrinho</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  naoEncontradoPLG: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  imagemPLG: { width: '100%', aspectRatio: 1 },
  corpoPLG: { padding: 20, marginTop: -20, backgroundColor: corPLG.fundoPLG, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  categoriaPLG: { fontSize: 12, fontWeight: '800', color: corPLG.douradoPLG, letterSpacing: 1 },
  nomePLG: { fontSize: 24, fontWeight: '800', color: corPLG.textoPLG, marginTop: 4 },
  precoPLG: { fontSize: 26, fontWeight: '800', color: corPLG.primariaPLG, marginTop: 8 },
  descricaoRotuloPLG: { fontSize: 15, fontWeight: '700', color: corPLG.textoPLG, marginTop: 20 },
  descricaoPLG: { fontSize: 15, lineHeight: 22, color: corPLG.textoSuavePLG, marginTop: 6 },
  botaoPrimarioPLG: { backgroundColor: corPLG.primariaPLG, borderRadius: 14, paddingVertical: 16, alignItems: 'center', marginTop: 28 },
  botaoPrimarioTextoPLG: { color: corPLG.brancoPLG, fontSize: 16, fontWeight: '800' },
  botaoSecundarioPLG: { borderWidth: 1.5, borderColor: corPLG.primariaPLG, borderRadius: 14, paddingVertical: 14, alignItems: 'center', marginTop: 12 },
  botaoSecundarioTextoPLG: { color: corPLG.primariaPLG, fontSize: 15, fontWeight: '700' },
});
