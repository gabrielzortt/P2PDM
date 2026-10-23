import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCarrinhoPLG } from '../../context/CarrinhoPLG';
import { formatarPrecoPLG } from '../../data/produtosPLG';
import { corPLG } from '../../constants/temaPLG';

export default function CarrinhoPLG() {
  const { itensPLG, removerPLG, limparPLG, totalPLG } = useCarrinhoPLG();

  const finalizarCompraPLG = () => {
    Alert.alert('Pedido recebido', 'Obrigado pela compra! (simulação)');
    limparPLG();
  };

  if (itensPLG.length === 0) {
    return (
      <View style={estilosPLG.vazioPLG}>
        <Text style={estilosPLG.vazioTituloPLG}>Seu carrinho está vazio</Text>
        <Text style={estilosPLG.vazioTextoPLG}>Adicione moedas e cédulas na aba Home.</Text>
      </View>
    );
  }

  return (
    <View style={estilosPLG.telaPLG}>
      <FlatList
        data={itensPLG}
        keyExtractor={(i) => i.produtoPLG.idPLG}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={estilosPLG.itemPLG}>
            <Image source={item.produtoPLG.imagemPLG} style={estilosPLG.miniaturaPLG} />
            <View style={{ flex: 1 }}>
              <Text style={estilosPLG.nomePLG} numberOfLines={2}>{item.produtoPLG.nomePLG}</Text>
              <Text style={estilosPLG.precoPLG}>
                {item.quantidadePLG}x {formatarPrecoPLG(item.produtoPLG.precoPLG)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerPLG(item.produtoPLG.idPLG)}>
              <Text style={estilosPLG.removerPLG}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={estilosPLG.rodapePLG}>
        <View style={estilosPLG.totalLinhaPLG}>
          <Text style={estilosPLG.totalRotuloPLG}>Total</Text>
          <Text style={estilosPLG.totalValorPLG}>{formatarPrecoPLG(totalPLG)}</Text>
        </View>
        <TouchableOpacity style={estilosPLG.botaoPLG} onPress={finalizarCompraPLG} activeOpacity={0.85}>
          <Text style={estilosPLG.botaoTextoPLG}>Finalizar compra</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  vazioPLG: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: corPLG.fundoPLG, padding: 24 },
  vazioTituloPLG: { fontSize: 20, fontWeight: '800', color: corPLG.primariaPLG },
  vazioTextoPLG: { fontSize: 14, color: corPLG.textoSuavePLG, marginTop: 6, textAlign: 'center' },
  itemPLG: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: corPLG.brancoPLG, borderRadius: 14,
    padding: 10, marginBottom: 10, borderWidth: 1, borderColor: corPLG.bordaPLG, gap: 12,
  },
  miniaturaPLG: { width: 64, height: 64, borderRadius: 10 },
  nomePLG: { fontSize: 14, fontWeight: '700', color: corPLG.textoPLG },
  precoPLG: { fontSize: 13, color: corPLG.douradoPLG, fontWeight: '700', marginTop: 4 },
  removerPLG: { color: corPLG.erroPLG, fontWeight: '700', fontSize: 12 },
  rodapePLG: { backgroundColor: corPLG.brancoPLG, padding: 16, borderTopWidth: 1, borderTopColor: corPLG.bordaPLG },
  totalLinhaPLG: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  totalRotuloPLG: { fontSize: 16, color: corPLG.textoSuavePLG, fontWeight: '600' },
  totalValorPLG: { fontSize: 20, color: corPLG.primariaPLG, fontWeight: '800' },
  botaoPLG: { backgroundColor: corPLG.primariaPLG, borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  botaoTextoPLG: { color: corPLG.brancoPLG, fontWeight: '700', fontSize: 15 },
});
