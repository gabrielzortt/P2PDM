import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import CabecalhoPLG from '../components/CabecalhoPLG';
import EstadoVazio from '../components/EstadoVazio';
import { useLojaPLG } from '../context/LojaPLG';
import { formatarPrecoPLG } from '../data/produtosPLG';
import { corPLG, fontePLG, sombraPLG } from '../constants/temaPLG';

export default function PedidosPLG() {
  const roteadorPLG = useRouter();
  const { pedidosPLG } = useLojaPLG();

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <CabecalhoPLG tituloPLG="Meus pedidos" />
      <FlatList
        data={pedidosPLG}
        keyExtractor={(p) => p.idPLG}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EstadoVazio iconePLG="receipt-outline" tituloPLG="Nenhum pedido ainda" textoPLG="Quando você finalizar uma compra, ela aparecerá aqui." botaoPLG="Explorar peças" aoPressionarPLG={() => roteadorPLG.replace('/inicio')} />}
        renderItem={({ item }) => (
          <View style={estilosPLG.cartaoPLG}>
            <View style={estilosPLG.topoPLG}>
              <View>
                <Text style={estilosPLG.numeroPLG}>Pedido #{item.idPLG}</Text>
                <Text style={estilosPLG.dataPLG}>{item.dataPLG} · {item.pagamentoPLG}</Text>
              </View>
              <View style={estilosPLG.statusPLG}>
                <Ionicons name="time-outline" size={13} color={corPLG.ouroEscuroPLG} />
                <Text style={estilosPLG.statusTextoPLG}>{item.statusPLG}</Text>
              </View>
            </View>
            {item.itensPLG.map((i) => (
              <Text key={`${i.produtoPLG.idPLG}-${i.grauPLG}`} style={estilosPLG.itemPLG}>
                {i.quantidadePLG}x {i.produtoPLG.nomePLG} ({i.grauPLG})
              </Text>
            ))}
            <View style={estilosPLG.rodapePLG}>
              <Text style={estilosPLG.totalRotuloPLG}>Total</Text>
              <Text style={estilosPLG.totalPLG}>{formatarPrecoPLG(item.totalPLG)}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  cartaoPLG: { backgroundColor: corPLG.brancoPLG, borderRadius: 22, padding: 16, gap: 8, marginBottom: 14, ...sombraPLG.suavePLG },
  topoPLG: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 },
  numeroPLG: { fontSize: 18, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  dataPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
  statusPLG: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: corPLG.cremePLG, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
  statusTextoPLG: { fontSize: 11, fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG },
  itemPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: '#5C4D45' },
  rodapePLG: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: corPLG.bordaPLG, paddingTop: 12, marginTop: 6 },
  totalRotuloPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  totalPLG: { fontSize: 18, fontFamily: fontePLG.tituloPLG, color: corPLG.ouroEscuroPLG },
});
