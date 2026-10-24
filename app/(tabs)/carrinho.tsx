import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImagemPLG from '../../components/ImagemPLG';
import SeletorQuantidadePLG from '../../components/SeletorQuantidade';
import BotaoPLG from '../../components/BotaoPLG';
import EstadoVazioPLG from '../../components/EstadoVazio';
import { useLojaPLG } from '../../context/LojaPLG';
import { fatorGrauPLG, formatarPrecoPLG } from '../../data/produtosPLG';
import { corPLG, fontePLG, sombraPLG } from '../../constants/temaPLG';

export default function CarrinhoPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { itensPLG, alterarQuantidadePLG, removerPLG, subtotalPLG, descontoPLG, fretePLG, totalPLG, cupomPLG, aplicarCupomPLG, mostrarToastPLG } = useLojaPLG();
  const [codigoPLG, setCodigoPLG] = useState<string>('');

  const aplicarPLG = () => {
    if (aplicarCupomPLG(codigoPLG)) {
      mostrarToastPLG('Cupom aplicado: 10% de desconto');
      setCodigoPLG('');
    } else {
      mostrarToastPLG('Cupom inválido');
    }
  };

  const resumoPLG = (
    <View style={estilosPLG.resumoPLG}>
      <View style={estilosPLG.cupomPLG}>
        <Ionicons name="pricetag-outline" size={20} color={corPLG.ouroEscuroPLG} />
        <TextInput
          style={estilosPLG.cupomEntradaPLG}
          placeholder={cupomPLG ? `${cupomPLG} aplicado` : 'Cupom de desconto'}
          placeholderTextColor="#A99C93"
          value={codigoPLG}
          onChangeText={setCodigoPLG}
          autoCapitalize="characters"
          editable={!cupomPLG}
        />
        {!cupomPLG && (
          <TouchableOpacity style={estilosPLG.cupomBotaoPLG} onPress={aplicarPLG}>
            <Text style={estilosPLG.cupomBotaoTextoPLG}>Aplicar</Text>
          </TouchableOpacity>
        )}
        {cupomPLG && <Ionicons name="checkmark-circle" size={22} color={corPLG.sucessoPLG} />}
      </View>
      <View style={estilosPLG.linhaResumoPLG}>
        <Text style={estilosPLG.resumoRotuloPLG}>Subtotal</Text>
        <Text style={estilosPLG.resumoValorPLG}>{formatarPrecoPLG(subtotalPLG)}</Text>
      </View>
      {descontoPLG > 0 && (
        <View style={estilosPLG.linhaResumoPLG}>
          <Text style={estilosPLG.resumoRotuloPLG}>Desconto</Text>
          <Text style={[estilosPLG.resumoValorPLG, { color: corPLG.sucessoPLG }]}>- {formatarPrecoPLG(descontoPLG)}</Text>
        </View>
      )}
      <View style={estilosPLG.linhaResumoPLG}>
        <Text style={estilosPLG.resumoRotuloPLG}>Frete</Text>
        <Text style={estilosPLG.resumoValorPLG}>{fretePLG === 0 ? 'Grátis' : formatarPrecoPLG(fretePLG)}</Text>
      </View>
      {fretePLG > 0 && <Text style={estilosPLG.dicaFretePLG}>Frete grátis em compras acima de R$ 300,00</Text>}
    </View>
  );

  return (
    <View style={estilosPLG.telaPLG}>
      <StatusBar style="dark" />
      <View style={{ paddingTop: insetsPLG.top + 16, paddingHorizontal: 20, paddingBottom: 14 }}>
        <Text style={estilosPLG.tituloPLG}>Carrinho</Text>
        <Text style={estilosPLG.subtituloPLG}>{itensPLG.length} {itensPLG.length === 1 ? 'item' : 'itens'}</Text>
      </View>
      <FlatList
        data={itensPLG}
        keyExtractor={(iPLG) => `${iPLG.produtoPLG.idPLG}-${iPLG.grauPLG}`}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EstadoVazioPLG iconePLG="bag-outline" tituloPLG="Seu carrinho está vazio" textoPLG="Que tal conhecer as peças mais procuradas da loja?" botaoPLG="Explorar peças" aoPressionarPLG={() => roteadorPLG.push('/inicio')} />}
        ListFooterComponent={itensPLG.length > 0 ? resumoPLG : null}
        renderItem={({ item: itemPLG }) => (
          <View style={estilosPLG.itemPLG}>
            <ImagemPLG fontePLG={itemPLG.produtoPLG.imagensPLG?.[0]} compactoPLG estiloPLG={estilosPLG.miniaturaPLG} />
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={estilosPLG.nomePLG} numberOfLines={1}>{itemPLG.produtoPLG.nomePLG}</Text>
              <Text style={estilosPLG.detalhePLG}>{itemPLG.produtoPLG.subtituloPLG} · {itemPLG.grauPLG}</Text>
              <Text style={estilosPLG.precoPLG}>{formatarPrecoPLG(itemPLG.produtoPLG.precoPLG * fatorGrauPLG[itemPLG.grauPLG] * itemPLG.quantidadePLG)}</Text>
              <View style={estilosPLG.acoesPLG}>
                <SeletorQuantidadePLG
                  valorPLG={itemPLG.quantidadePLG}
                  aoDiminuirPLG={() => alterarQuantidadePLG(itemPLG.produtoPLG.idPLG, itemPLG.grauPLG, -1)}
                  aoAumentarPLG={() => alterarQuantidadePLG(itemPLG.produtoPLG.idPLG, itemPLG.grauPLG, 1)}
                />
                <TouchableOpacity onPress={() => removerPLG(itemPLG.produtoPLG.idPLG, itemPLG.grauPLG)} accessibilityLabel="Remover item" style={estilosPLG.lixoPLG}>
                  <Ionicons name="trash-outline" size={20} color={corPLG.erroPLG} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      {itensPLG.length > 0 && (
        <View style={estilosPLG.rodapePLG}>
          <View>
            <Text style={estilosPLG.totalRotuloPLG}>Total</Text>
            <Text style={estilosPLG.totalPLG}>{formatarPrecoPLG(totalPLG)}</Text>
          </View>
          <BotaoPLG tituloPLG="Finalizar compra" iconePLG="arrow-forward" aoPressionarPLG={() => roteadorPLG.push('/checkout')} estiloPLG={{ flex: 1 }} />
        </View>
      )}
    </View>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  tituloPLG: { fontSize: 30, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  subtituloPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 2 },
  itemPLG: { flexDirection: 'row', gap: 14, backgroundColor: corPLG.brancoPLG, borderRadius: 22, padding: 12, marginBottom: 14, ...sombraPLG.suavePLG },
  miniaturaPLG: { width: 92, height: 120, borderRadius: 16 },
  nomePLG: { fontSize: 18, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  detalhePLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  precoPLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.ouroEscuroPLG },
  acoesPLG: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 4 },
  lixoPLG: { width: 38, height: 38, borderRadius: 12, backgroundColor: '#FCEDEA', alignItems: 'center', justifyContent: 'center' },
  resumoPLG: { backgroundColor: corPLG.brancoPLG, borderRadius: 22, padding: 16, gap: 12, marginTop: 4, ...sombraPLG.suavePLG },
  cupomPLG: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: corPLG.cremePLG, borderRadius: 14, paddingLeft: 14, paddingRight: 6, height: 50, borderWidth: 1, borderColor: corPLG.bordaPLG },
  cupomEntradaPLG: { flex: 1, height: '100%', fontSize: 14, fontFamily: fontePLG.mediaPLG, color: corPLG.textoPLG },
  cupomBotaoPLG: { backgroundColor: corPLG.marromPLG, paddingHorizontal: 16, paddingVertical: 9, borderRadius: 10 },
  cupomBotaoTextoPLG: { fontSize: 13, fontFamily: fontePLG.semiPLG, color: corPLG.ouroClaroPLG },
  linhaResumoPLG: { flexDirection: 'row', justifyContent: 'space-between' },
  resumoRotuloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  resumoValorPLG: { fontSize: 14, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  dicaFretePLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.ouroEscuroPLG },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 20, paddingVertical: 14, backgroundColor: corPLG.brancoPLG, ...sombraPLG.fortePLG },
  totalRotuloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  totalPLG: { fontSize: 22, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
});
