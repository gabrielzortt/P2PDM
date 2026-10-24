import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CabecalhoPLG from '../components/CabecalhoPLG';
import CampoPLG from '../components/CampoPLG';
import BotaoPLG from '../components/BotaoPLG';
import EstadoVazioPLG from '../components/EstadoVazio';
import { useLojaPLG } from '../context/LojaPLG';
import { fatorGrauPLG, formatarPrecoPLG } from '../data/produtosPLG';
import { corPLG, fontePLG, sombraPLG, IconePLG } from '../constants/temaPLG';

type PagamentoPLG = 'Pix' | 'Cartão de crédito' | 'Boleto';

const pagamentosPLG: { nomePLG: PagamentoPLG; iconePLG: IconePLG; detalhePLG: string }[] = [
  { nomePLG: 'Pix', iconePLG: 'qr-code-outline', detalhePLG: 'Aprovação imediata' },
  { nomePLG: 'Cartão de crédito', iconePLG: 'card-outline', detalhePLG: 'Em até 3x sem juros' },
  { nomePLG: 'Boleto', iconePLG: 'barcode-outline', detalhePLG: 'Vence em 2 dias úteis' },
];

export default function CheckoutPLG() {
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { itensPLG, subtotalPLG, descontoPLG, fretePLG, totalPLG, finalizarPedidoPLG, usuarioPLG } = useLojaPLG();
  const [cepPLG, setCepPLG] = useState<string>('');
  const [ruaPLG, setRuaPLG] = useState<string>('');
  const [numeroPLG, setNumeroPLG] = useState<string>('');
  const [bairroPLG, setBairroPLG] = useState<string>('');
  const [cidadePLG, setCidadePLG] = useState<string>('Manaus - AM');
  const [pagamentoPLG, setPagamentoPLG] = useState<PagamentoPLG>('Pix');
  const [errosPLG, setErrosPLG] = useState<Record<string, string>>({});

  if (itensPLG.length === 0) {
    return (
      <View style={estilosPLG.telaPLG}>
        <StatusBar style="dark" />
        <CabecalhoPLG tituloPLG="Finalizar compra" />
        <EstadoVazioPLG iconePLG="bag-outline" tituloPLG="Carrinho vazio" textoPLG="Adicione peças ao carrinho para finalizar a compra." botaoPLG="Explorar peças" aoPressionarPLG={() => roteadorPLG.replace('/inicio')} />
      </View>
    );
  }

  const confirmarPLG = () => {
    const novosPLG: Record<string, string> = {};
    if (ruaPLG.trim() === '') novosPLG.ruaPLG = 'Informe a rua.';
    if (numeroPLG.trim() === '') novosPLG.numeroPLG = 'Informe o número.';
    if (bairroPLG.trim() === '') novosPLG.bairroPLG = 'Informe o bairro.';
    if (cepPLG.replace(/\D/g, '').length !== 8) novosPLG.cepPLG = 'CEP com 8 dígitos.';
    setErrosPLG(novosPLG);
    if (Object.keys(novosPLG).length > 0) return;
    const enderecoPLG = `${ruaPLG.trim()}, ${numeroPLG.trim()} - ${bairroPLG.trim()}, ${cidadePLG.trim()}`;
    const idPLG = finalizarPedidoPLG(pagamentoPLG, enderecoPLG);
    roteadorPLG.replace({ pathname: '/pedido-confirmado', params: { id: idPLG } });
  };

  return (
    <KeyboardAvoidingView style={estilosPLG.telaPLG} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <CabecalhoPLG tituloPLG="Finalizar compra" />
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 24, gap: 18 }}>
        <View style={estilosPLG.cartaoPLG}>
          <View style={estilosPLG.secaoTopoPLG}>
            <View style={estilosPLG.numeroPLG}><Text style={estilosPLG.numeroTextoPLG}>1</Text></View>
            <Text style={estilosPLG.secaoTituloPLG}>Endereço de entrega</Text>
          </View>
          <Text style={estilosPLG.paraPLG}>Para: {usuarioPLG?.nomePLG}</Text>
          <View style={{ gap: 12 }}>
            <CampoPLG iconePLG="location-outline" placeholderPLG="CEP" valorPLG={cepPLG} aoMudarPLG={setCepPLG} tecladoPLG="number-pad" erroPLG={errosPLG.cepPLG} />
            <CampoPLG iconePLG="home-outline" placeholderPLG="Rua / Avenida" valorPLG={ruaPLG} aoMudarPLG={setRuaPLG} erroPLG={errosPLG.ruaPLG} />
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <CampoPLG placeholderPLG="Número" valorPLG={numeroPLG} aoMudarPLG={setNumeroPLG} tecladoPLG="number-pad" erroPLG={errosPLG.numeroPLG} />
              </View>
              <View style={{ flex: 2 }}>
                <CampoPLG placeholderPLG="Bairro" valorPLG={bairroPLG} aoMudarPLG={setBairroPLG} erroPLG={errosPLG.bairroPLG} />
              </View>
            </View>
            <CampoPLG iconePLG="business-outline" placeholderPLG="Cidade" valorPLG={cidadePLG} aoMudarPLG={setCidadePLG} />
          </View>
        </View>

        <View style={estilosPLG.cartaoPLG}>
          <View style={estilosPLG.secaoTopoPLG}>
            <View style={estilosPLG.numeroPLG}><Text style={estilosPLG.numeroTextoPLG}>2</Text></View>
            <Text style={estilosPLG.secaoTituloPLG}>Forma de pagamento</Text>
          </View>
          <View style={{ gap: 10 }}>
            {pagamentosPLG.map((pPLG) => {
              const ativoPLG = pPLG.nomePLG === pagamentoPLG;
              return (
                <TouchableOpacity key={pPLG.nomePLG} activeOpacity={0.85} style={[estilosPLG.pagamentoPLG, ativoPLG && estilosPLG.pagamentoAtivoPLG]} onPress={() => setPagamentoPLG(pPLG.nomePLG)}>
                  <View style={estilosPLG.pagamentoIconePLG}>
                    <Ionicons name={pPLG.iconePLG} size={22} color={corPLG.ouroEscuroPLG} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={estilosPLG.pagamentoNomePLG}>{pPLG.nomePLG}</Text>
                    <Text style={estilosPLG.pagamentoDetalhePLG}>{pPLG.detalhePLG}</Text>
                  </View>
                  <Ionicons name={ativoPLG ? 'radio-button-on' : 'radio-button-off'} size={22} color={ativoPLG ? corPLG.ouroPLG : '#C9BDB4'} />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={estilosPLG.cartaoPLG}>
          <View style={estilosPLG.secaoTopoPLG}>
            <View style={estilosPLG.numeroPLG}><Text style={estilosPLG.numeroTextoPLG}>3</Text></View>
            <Text style={estilosPLG.secaoTituloPLG}>Resumo do pedido</Text>
          </View>
          {itensPLG.map((iPLG) => (
            <View key={`${iPLG.produtoPLG.idPLG}-${iPLG.grauPLG}`} style={estilosPLG.linhaPLG}>
              <Text style={estilosPLG.linhaTextoPLG} numberOfLines={1}>{iPLG.quantidadePLG}x {iPLG.produtoPLG.nomePLG} ({iPLG.grauPLG})</Text>
              <Text style={estilosPLG.linhaValorPLG}>{formatarPrecoPLG(iPLG.produtoPLG.precoPLG * fatorGrauPLG[iPLG.grauPLG] * iPLG.quantidadePLG)}</Text>
            </View>
          ))}
          <View style={estilosPLG.divisorPLG} />
          <View style={estilosPLG.linhaPLG}><Text style={estilosPLG.resumoRotuloPLG}>Subtotal</Text><Text style={estilosPLG.linhaValorPLG}>{formatarPrecoPLG(subtotalPLG)}</Text></View>
          {descontoPLG > 0 && <View style={estilosPLG.linhaPLG}><Text style={estilosPLG.resumoRotuloPLG}>Desconto</Text><Text style={[estilosPLG.linhaValorPLG, { color: corPLG.sucessoPLG }]}>- {formatarPrecoPLG(descontoPLG)}</Text></View>}
          <View style={estilosPLG.linhaPLG}><Text style={estilosPLG.resumoRotuloPLG}>Frete</Text><Text style={estilosPLG.linhaValorPLG}>{fretePLG === 0 ? 'Grátis' : formatarPrecoPLG(fretePLG)}</Text></View>
        </View>
      </ScrollView>

      <View style={[estilosPLG.rodapePLG, { paddingBottom: Math.max(insetsPLG.bottom, 14) }]}>
        <View>
          <Text style={estilosPLG.totalRotuloPLG}>Total</Text>
          <Text style={estilosPLG.totalPLG}>{formatarPrecoPLG(totalPLG)}</Text>
        </View>
        <BotaoPLG tituloPLG="Confirmar pedido" iconePLG="checkmark-circle-outline" aoPressionarPLG={confirmarPLG} estiloPLG={{ flex: 1 }} />
      </View>
    </KeyboardAvoidingView>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, backgroundColor: corPLG.fundoPLG },
  cartaoPLG: { backgroundColor: corPLG.brancoPLG, borderRadius: 24, padding: 18, gap: 14, ...sombraPLG.suavePLG },
  secaoTopoPLG: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  numeroPLG: { width: 28, height: 28, borderRadius: 10, backgroundColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center' },
  numeroTextoPLG: { fontSize: 13, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
  secaoTituloPLG: { fontSize: 18, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
  paraPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: -4 },
  pagamentoPLG: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 16, borderWidth: 1.5, borderColor: corPLG.bordaPLG },
  pagamentoAtivoPLG: { borderColor: corPLG.ouroPLG, backgroundColor: corPLG.cremePLG },
  pagamentoIconePLG: { width: 42, height: 42, borderRadius: 13, backgroundColor: corPLG.brancoPLG, alignItems: 'center', justifyContent: 'center' },
  pagamentoNomePLG: { fontSize: 15, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  pagamentoDetalhePLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG, marginTop: 1 },
  linhaPLG: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  linhaTextoPLG: { flex: 1, fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.textoPLG },
  linhaValorPLG: { fontSize: 14, fontFamily: fontePLG.semiPLG, color: corPLG.textoPLG },
  resumoRotuloPLG: { fontSize: 14, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  divisorPLG: { height: 1, backgroundColor: corPLG.bordaPLG },
  rodapePLG: { flexDirection: 'row', alignItems: 'center', gap: 18, paddingHorizontal: 20, paddingTop: 14, backgroundColor: corPLG.brancoPLG, ...sombraPLG.fortePLG },
  totalRotuloPLG: { fontSize: 12, fontFamily: fontePLG.regularPLG, color: corPLG.suavePLG },
  totalPLG: { fontSize: 22, fontFamily: fontePLG.tituloPLG, color: corPLG.textoPLG },
});
