import React, { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GrauPLG, ProdutoPLG, fatorGrauPLG } from '../data/produtosPLG';
import { corPLG, fontePLG } from '../constants/temaPLG';

export interface UsuarioPLG {
  nomePLG: string;
  emailPLG: string;
  senhaPLG: string;
  telefonePLG: string;
}

export interface ItemCarrinhoPLG {
  produtoPLG: ProdutoPLG;
  grauPLG: GrauPLG;
  quantidadePLG: number;
}

export interface PedidoPLG {
  idPLG: string;
  dataPLG: string;
  itensPLG: ItemCarrinhoPLG[];
  totalPLG: number;
  pagamentoPLG: string;
  enderecoPLG: string;
  statusPLG: string;
}

interface LojaContextoPLG {
  prontoPLG: boolean;
  usuarioPLG: UsuarioPLG | null;
  entrarPLG: (emailPLG: string, senhaPLG: string) => string | null;
  cadastrarPLG: (nomePLG: string, emailPLG: string, senhaPLG: string) => string | null;
  sairPLG: () => void;
  atualizarPerfilPLG: (nomePLG: string, telefonePLG: string) => void;
  itensPLG: ItemCarrinhoPLG[];
  quantidadeTotalPLG: number;
  adicionarPLG: (produtoPLG: ProdutoPLG, grauPLG?: GrauPLG, quantidadePLG?: number) => void;
  alterarQuantidadePLG: (idPLG: string, grauPLG: GrauPLG, deltaPLG: number) => void;
  removerPLG: (idPLG: string, grauPLG: GrauPLG) => void;
  favoritosPLG: string[];
  alternarFavoritoPLG: (idPLG: string) => void;
  cupomPLG: string | null;
  aplicarCupomPLG: (codigoPLG: string) => boolean;
  subtotalPLG: number;
  descontoPLG: number;
  fretePLG: number;
  totalPLG: number;
  pedidosPLG: PedidoPLG[];
  finalizarPedidoPLG: (pagamentoPLG: string, enderecoPLG: string) => string;
  mostrarToastPLG: (mensagemPLG: string) => void;
}

const usuarioPadraoPLG: UsuarioPLG = {
  nomePLG: 'Colecionador',
  emailPLG: 'colecionador@moedas.com',
  senhaPLG: '123456',
  telefonePLG: '',
};

const chaveUsuariosPLG = '@numismatica_plg:usuarios';
const chaveSessaoPLG = '@numismatica_plg:sessao';
const cupomValidoPLG = 'COLECAO10';

const ContextoPLG = createContext<LojaContextoPLG | null>(null);

export function LojaProviderPLG({ children }: { children: ReactNode }) {
  const [prontoPLG, setProntoPLG] = useState<boolean>(false);
  const [usuariosPLG, setUsuariosPLG] = useState<UsuarioPLG[]>([usuarioPadraoPLG]);
  const [sessaoPLG, setSessaoPLG] = useState<string | null>(null);
  const [itensPLG, setItensPLG] = useState<ItemCarrinhoPLG[]>([]);
  const [favoritosPLG, setFavoritosPLG] = useState<string[]>([]);
  const [cupomPLG, setCupomPLG] = useState<string | null>(null);
  const [pedidosPLG, setPedidosPLG] = useState<PedidoPLG[]>([]);
  const [toastPLG, setToastPLG] = useState<string>('');
  const opacidadePLG = useRef(new Animated.Value(0)).current;
  const temporizadorPLG = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const salvosPLG = await AsyncStorage.getItem(chaveUsuariosPLG);
        const sessaoSalvaPLG = await AsyncStorage.getItem(chaveSessaoPLG);
        if (salvosPLG) {
          const listaPLG: UsuarioPLG[] = JSON.parse(salvosPLG);
          setUsuariosPLG([usuarioPadraoPLG, ...listaPLG.filter((u) => u.emailPLG !== usuarioPadraoPLG.emailPLG)]);
        }
        if (sessaoSalvaPLG) setSessaoPLG(sessaoSalvaPLG);
      } catch {
        setUsuariosPLG([usuarioPadraoPLG]);
      }
      setProntoPLG(true);
    })();
  }, []);

  const salvarUsuariosPLG = (listaPLG: UsuarioPLG[]) => {
    setUsuariosPLG(listaPLG);
    AsyncStorage.setItem(chaveUsuariosPLG, JSON.stringify(listaPLG)).catch(() => undefined);
  };

  const usuarioPLG = usuariosPLG.find((u) => u.emailPLG === sessaoPLG) ?? null;

  const mostrarToastPLG = (mensagemPLG: string) => {
    setToastPLG(mensagemPLG);
    if (temporizadorPLG.current) clearTimeout(temporizadorPLG.current);
    Animated.timing(opacidadePLG, { toValue: 1, duration: 180, useNativeDriver: true }).start();
    temporizadorPLG.current = setTimeout(() => {
      Animated.timing(opacidadePLG, { toValue: 0, duration: 260, useNativeDriver: true }).start();
    }, 2200);
  };

  const entrarPLG = (emailPLG: string, senhaPLG: string): string | null => {
    const emailLimpoPLG = emailPLG.trim().toLowerCase();
    if (emailLimpoPLG === '' || senhaPLG === '') return 'Preencha o e-mail e a senha para entrar.';
    const encontradoPLG = usuariosPLG.find((u) => u.emailPLG === emailLimpoPLG);
    if (!encontradoPLG) return 'E-mail incorreto. Confira ou crie uma conta.';
    if (encontradoPLG.senhaPLG !== senhaPLG) return 'Senha incorreta. Tente novamente.';
    setSessaoPLG(encontradoPLG.emailPLG);
    AsyncStorage.setItem(chaveSessaoPLG, encontradoPLG.emailPLG).catch(() => undefined);
    return null;
  };

  const cadastrarPLG = (nomePLG: string, emailPLG: string, senhaPLG: string): string | null => {
    const emailLimpoPLG = emailPLG.trim().toLowerCase();
    if (usuariosPLG.some((u) => u.emailPLG === emailLimpoPLG)) return 'Este e-mail já está cadastrado.';
    const novoPLG: UsuarioPLG = { nomePLG: nomePLG.trim(), emailPLG: emailLimpoPLG, senhaPLG, telefonePLG: '' };
    salvarUsuariosPLG([...usuariosPLG, novoPLG]);
    setSessaoPLG(novoPLG.emailPLG);
    AsyncStorage.setItem(chaveSessaoPLG, novoPLG.emailPLG).catch(() => undefined);
    return null;
  };

  const sairPLG = () => {
    setSessaoPLG(null);
    setItensPLG([]);
    setCupomPLG(null);
    AsyncStorage.removeItem(chaveSessaoPLG).catch(() => undefined);
  };

  const atualizarPerfilPLG = (nomePLG: string, telefonePLG: string) => {
    salvarUsuariosPLG(
      usuariosPLG.map((u) => (u.emailPLG === sessaoPLG ? { ...u, nomePLG: nomePLG.trim(), telefonePLG } : u))
    );
  };

  const adicionarPLG = (produtoPLG: ProdutoPLG, grauPLG: GrauPLG = 'S', quantidadePLG: number = 1) => {
    setItensPLG((anteriorPLG) => {
      const existePLG = anteriorPLG.some((i) => i.produtoPLG.idPLG === produtoPLG.idPLG && i.grauPLG === grauPLG);
      if (existePLG) {
        return anteriorPLG.map((i) =>
          i.produtoPLG.idPLG === produtoPLG.idPLG && i.grauPLG === grauPLG
            ? { ...i, quantidadePLG: i.quantidadePLG + quantidadePLG }
            : i
        );
      }
      return [...anteriorPLG, { produtoPLG, grauPLG, quantidadePLG }];
    });
  };

  const alterarQuantidadePLG = (idPLG: string, grauPLG: GrauPLG, deltaPLG: number) => {
    setItensPLG((anteriorPLG) =>
      anteriorPLG
        .map((i) =>
          i.produtoPLG.idPLG === idPLG && i.grauPLG === grauPLG
            ? { ...i, quantidadePLG: i.quantidadePLG + deltaPLG }
            : i
        )
        .filter((i) => i.quantidadePLG > 0)
    );
  };

  const removerPLG = (idPLG: string, grauPLG: GrauPLG) =>
    setItensPLG((anteriorPLG) => anteriorPLG.filter((i) => !(i.produtoPLG.idPLG === idPLG && i.grauPLG === grauPLG)));

  const alternarFavoritoPLG = (idPLG: string) =>
    setFavoritosPLG((anteriorPLG) =>
      anteriorPLG.includes(idPLG) ? anteriorPLG.filter((f) => f !== idPLG) : [...anteriorPLG, idPLG]
    );

  const aplicarCupomPLG = (codigoPLG: string): boolean => {
    if (codigoPLG.trim().toUpperCase() === cupomValidoPLG) {
      setCupomPLG(cupomValidoPLG);
      return true;
    }
    return false;
  };

  const quantidadeTotalPLG = itensPLG.reduce((somaPLG, i) => somaPLG + i.quantidadePLG, 0);
  const subtotalPLG = itensPLG.reduce(
    (somaPLG, i) => somaPLG + i.produtoPLG.precoPLG * fatorGrauPLG[i.grauPLG] * i.quantidadePLG,
    0
  );
  const descontoPLG = cupomPLG ? subtotalPLG * 0.1 : 0;
  const fretePLG = itensPLG.length === 0 || subtotalPLG >= 300 ? 0 : 19.9;
  const totalPLG = subtotalPLG - descontoPLG + fretePLG;

  const finalizarPedidoPLG = (pagamentoPLG: string, enderecoPLG: string): string => {
    const idPLG = String(Date.now()).slice(-6);
    const novoPLG: PedidoPLG = {
      idPLG,
      dataPLG: new Date().toLocaleDateString('pt-BR'),
      itensPLG,
      totalPLG,
      pagamentoPLG,
      enderecoPLG,
      statusPLG: 'Em preparação',
    };
    setPedidosPLG((anteriorPLG) => [novoPLG, ...anteriorPLG]);
    setItensPLG([]);
    setCupomPLG(null);
    return idPLG;
  };

  return (
    <ContextoPLG.Provider
      value={{
        prontoPLG, usuarioPLG, entrarPLG, cadastrarPLG, sairPLG, atualizarPerfilPLG,
        itensPLG, quantidadeTotalPLG, adicionarPLG, alterarQuantidadePLG, removerPLG,
        favoritosPLG, alternarFavoritoPLG, cupomPLG, aplicarCupomPLG,
        subtotalPLG, descontoPLG, fretePLG, totalPLG, pedidosPLG, finalizarPedidoPLG, mostrarToastPLG,
      }}
    >
      {children}
      <Animated.View pointerEvents="none" style={[estilosPLG.toastPLG, { opacity: opacidadePLG }]}>
        <Text style={estilosPLG.toastTextoPLG}>{toastPLG}</Text>
      </Animated.View>
    </ContextoPLG.Provider>
  );
}

export function useLojaPLG(): LojaContextoPLG {
  const contextoPLG = useContext(ContextoPLG);
  if (!contextoPLG) throw new Error('useLojaPLG deve ser usado dentro de LojaProviderPLG');
  return contextoPLG;
}

const estilosPLG = StyleSheet.create({
  toastPLG: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 96,
    alignItems: 'center',
  },
  toastTextoPLG: {
    backgroundColor: corPLG.espressoPLG,
    color: corPLG.brancoPLG,
    fontFamily: fontePLG.mediaPLG,
    fontSize: 13,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    overflow: 'hidden',
    textAlign: 'center',
  },
});
