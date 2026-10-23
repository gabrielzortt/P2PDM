import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLojaPLG } from '../../context/LojaPLG';
import { fatorGrauPLG, formatarPrecoPLG } from '../../data/produtosPLG';
import { corPLG, fontePLG } from '../../constants/temaPLG';

export default function CarrinhoPLG() {
  const insetsPLG = useSafeAreaInsets();
  const { itensPLG, removerPLG, limparPLG, totalPLG } = useLojaPLG();

  const finalizarPLG = () => {
    Alert.alert('Pedido recebido', 'Obrigado pela compra! (simulação)');
    limparPLG();
  };

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <Text style={[estilosPLG.tituloPLG, { paddingTop: insetsPLG.top + 16 }]}>Carrinho</Text>
      <FlatList
        data={itensPLG}
        keyExtractor={(i) => `${i.produtoPLG.idPLG}-${i.grauPLG}`}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        ListEmptyComponent={<Text style={estilosPLG.vazioPLG}>Seu carrinho está vazio.</Text>}
        renderItem={({ item }) => (
          <View style={estilosPLG.itemPLG}>
            <Image source={item.produtoPLG.imagemCardPLG} style={estilosPLG.miniaturaPLG} />
            <View style={{ flex: 1 }}>
              <Text style={estilosPLG.nomePLG}>{item.produtoPLG.nomePLG}</Text>
              <Text style={estilosPLG.subtituloPLG}>
                {item.produtoPLG.subtituloPLG} · {item.grauPLG} · {item.quantidadePLG}x
              </Text>
              <Text style={estilosPLG.precoPLG}>
                {formatarPrecoPLG(item.produtoPLG.precoPLG * fatorGrauPLG[item.grauPLG] * item.quantidadePLG)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerPLG(item.produtoPLG.idPLG, item.grauPLG)} accessibilityLabel="Remover item">
              <Ionicons name="trash-outline" size={22} color={corPLG.inativoPLG} />
            </TouchableOpacity>
          </View>
        )}
      />
      {itensPLG.length > 0 && (
        <View style={estilosPLG.rodapePLG}>
          <View>
            <Text style={estilosPLG.rotuloPLG}>Total</Text>
            <Text style={estilosPLG.totalPLG}>{formatarPrecoPLG(totalPLG)}</Text>
          </View>
          <TouchableOpacity style={estilosPLG.botaoPLG} activeOpacity={0.85} onPress={finalizarPLG}>
            <Text style={estilosPLG.botaoTextoPLG}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  tituloPLG: { fontSize: 22, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG, paddingHorizontal: 20, paddingBottom: 18 },
  vazioPLG: { textAlign: 'center', marginTop: 60, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  itemPLG: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: corPLG.brancoPLG, borderRadius: 16, padding: 10, marginBottom: 12 },
  miniaturaPLG: { width: 64, height: 64, borderRadius: 12 },
  nomePLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
  precoPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.precoPLG, marginTop: 4 },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 20, padding: 20, backgroundColor: corPLG.brancoPLG },
  rotuloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  totalPLG: { fontSize: 20, fontFamily: fontePLG.semiPLG, color: corPLG.laranjaPLG },
  botaoPLG: { flex: 1, height: 54, borderRadius: 27, backgroundColor: corPLG.laranjaPLG, alignItems: 'center', justifyContent: 'center' },
  botaoTextoPLG: { fontSize: 16, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
});
