import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BotaoPLG from '../components/BotaoPLG';
import { useLojaPLG } from '../context/LojaPLG';
import { formatarPrecoPLG } from '../data/produtosPLG';
import { corPLG, fontePLG, gradientePLG } from '../constants/temaPLG';

export default function PedidoConfirmadoPLG() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const roteadorPLG = useRouter();
  const insetsPLG = useSafeAreaInsets();
  const { pedidosPLG } = useLojaPLG();
  const escalaPLG = useRef(new Animated.Value(0)).current;
  const opacidadePLG = useRef(new Animated.Value(0)).current;
  const pedidoPLG = pedidosPLG.find((p) => p.idPLG === id);

  useEffect(() => {
    Animated.sequence([
      Animated.spring(escalaPLG, { toValue: 1, friction: 5, tension: 80, useNativeDriver: true }),
      Animated.timing(opacidadePLG, { toValue: 1, duration: 350, useNativeDriver: true }),
    ]).start();
  }, [escalaPLG, opacidadePLG]);

  return (
    <LinearGradient colors={gradientePLG.escuroVertPLG} style={[estilosPLG.telaPLG, { paddingTop: insetsPLG.top + 40, paddingBottom: Math.max(insetsPLG.bottom, 20) + 12 }]}>
      <StatusBar style="light" />
      <View style={estilosPLG.centroPLG}>
        <Animated.View style={[estilosPLG.seloPLG, { transform: [{ scale: escalaPLG }] }]}>
          <Ionicons name="checkmark" size={64} color={corPLG.espressoPLG} />
        </Animated.View>
        <Animated.View style={{ opacity: opacidadePLG, alignItems: 'center' }}>
          <Text style={estilosPLG.tituloPLG}>Pedido realizado!</Text>
          <Text style={estilosPLG.textoPLG}>Obrigado pela compra. Você receberá as atualizações do envio por aqui.</Text>

          <View style={estilosPLG.cartaoPLG}>
            <View style={estilosPLG.linhaPLG}>
              <Text style={estilosPLG.rotuloPLG}>Pedido</Text>
              <Text style={estilosPLG.valorPLG}>#{id}</Text>
            </View>
            {pedidoPLG && (
              <>
                <View style={estilosPLG.linhaPLG}>
                  <Text style={estilosPLG.rotuloPLG}>Pagamento</Text>
                  <Text style={estilosPLG.valorPLG}>{pedidoPLG.pagamentoPLG}</Text>
                </View>
                <View style={estilosPLG.linhaPLG}>
                  <Text style={estilosPLG.rotuloPLG}>Total</Text>
                  <Text style={[estilosPLG.valorPLG, { color: corPLG.ouroClaroPLG }]}>{formatarPrecoPLG(pedidoPLG.totalPLG)}</Text>
                </View>
                <View style={estilosPLG.linhaPLG}>
                  <Text style={estilosPLG.rotuloPLG}>Entrega</Text>
                  <Text style={[estilosPLG.valorPLG, { flex: 1, textAlign: 'right' }]} numberOfLines={2}>{pedidoPLG.enderecoPLG}</Text>
                </View>
              </>
            )}
          </View>
        </Animated.View>
      </View>
      <View style={{ gap: 12 }}>
        <BotaoPLG tituloPLG="Ver meus pedidos" iconePLG="receipt-outline" aoPressionarPLG={() => roteadorPLG.replace('/pedidos')} />
        <BotaoPLG tituloPLG="Voltar ao início" variantePLG="secundario" aoPressionarPLG={() => roteadorPLG.replace('/inicio')} />
      </View>
    </LinearGradient>
  );
}

const estilosPLG = StyleSheet.create({
  telaPLG: { flex: 1, paddingHorizontal: 24, justifyContent: 'space-between' },
  centroPLG: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 28 },
  seloPLG: { width: 124, height: 124, borderRadius: 62, backgroundColor: corPLG.ouroPLG, alignItems: 'center', justifyContent: 'center', borderWidth: 8, borderColor: 'rgba(235,210,143,0.3)' },
  tituloPLG: { fontSize: 32, fontFamily: fontePLG.tituloPLG, color: corPLG.brancoPLG, textAlign: 'center' },
  textoPLG: { fontSize: 14, lineHeight: 21, fontFamily: fontePLG.regularPLG, color: '#DCCFC6', textAlign: 'center', marginTop: 8, maxWidth: 300 },
  cartaoPLG: { alignSelf: 'stretch', marginTop: 26, backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 22, padding: 18, gap: 12, minWidth: 300 },
  linhaPLG: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  rotuloPLG: { fontSize: 13, fontFamily: fontePLG.regularPLG, color: '#CDBFB5' },
  valorPLG: { fontSize: 14, fontFamily: fontePLG.semiPLG, color: corPLG.brancoPLG },
});
