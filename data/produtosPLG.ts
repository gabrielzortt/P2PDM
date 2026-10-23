import { ImageSourcePropType } from 'react-native';

export type CategoriaPLG = 'Moedas' | 'Cédulas';
export type EraPLG = 'Réis' | 'Cruzeiro' | 'Cruzado';
export type GrauPLG = 'MBC' | 'S' | 'FC';

export interface ProdutoPLG {
  idPLG: string;
  nomePLG: string;
  subtituloPLG: string;
  categoriaPLG: CategoriaPLG;
  eraPLG: EraPLG;
  precoPLG: number;
  notaPLG: number;
  avaliacoesPLG: number;
  descricaoPLG: string;
  imagemCardPLG: ImageSourcePropType;
  imagemDetalhePLG: ImageSourcePropType;
}

export const filtrosPLG: string[] = ['Moedas', 'Cédulas', 'Réis', 'Cruzeiro', 'Cruzado'];

export const grausPLG: GrauPLG[] = ['MBC', 'S', 'FC'];

export const fatorGrauPLG: Record<GrauPLG, number> = { MBC: 0.7, S: 1, FC: 1.4 };

export const produtosPLG: ProdutoPLG[] = [
  {
    idPLG: '1',
    nomePLG: '2000 Réis',
    subtituloPLG: 'Moeda de prata',
    categoriaPLG: 'Moedas',
    eraPLG: 'Réis',
    precoPLG: 289.9,
    notaPLG: 4.8,
    avaliacoesPLG: 1240,
    descricaoPLG:
      'Moeda de prata de 2000 réis cunhada em 1936, da era Vargas. Peça com relevo bem preservado e pátina natural, ideal para colecionadores de numismática brasileira. Acompanha certificado de autenticidade e embalagem protetora.',
    imagemCardPLG: require('../assets/images/p1.jpg'),
    imagemDetalhePLG: require('../assets/images/d1.jpg'),
  },
  {
    idPLG: '2',
    nomePLG: '1 Cruzado',
    subtituloPLG: 'Cédula de 1987',
    categoriaPLG: 'Cédulas',
    eraPLG: 'Cruzado',
    precoPLG: 45.0,
    notaPLG: 4.9,
    avaliacoesPLG: 2330,
    descricaoPLG:
      'Cédula de 1 Cruzado emitida durante o Plano Cruzado, em estado Flor de Estampa. Um marco da história econômica brasileira, com papel firme, cores vivas e sem dobras. Perfeita para completar a sua coleção.',
    imagemCardPLG: require('../assets/images/p2.jpg'),
    imagemDetalhePLG: require('../assets/images/d2.jpg'),
  },
  {
    idPLG: '3',
    nomePLG: '1 Cruzeiro',
    subtituloPLG: 'Moeda de 1942',
    categoriaPLG: 'Moedas',
    eraPLG: 'Cruzeiro',
    precoPLG: 79.9,
    notaPLG: 4.5,
    avaliacoesPLG: 860,
    descricaoPLG:
      'Primeira moeda de 1 Cruzeiro, lançada na reforma monetária de 1942. Possui bom estado de conservação, com leves marcas de circulação que atestam sua história. Item muito procurado por quem inicia a coleção.',
    imagemCardPLG: require('../assets/images/p3.jpg'),
    imagemDetalhePLG: require('../assets/images/d3.jpg'),
  },
  {
    idPLG: '4',
    nomePLG: '500 Cruzeiros',
    subtituloPLG: 'Cédula de 1990',
    categoriaPLG: 'Cédulas',
    eraPLG: 'Cruzeiro',
    precoPLG: 62.5,
    notaPLG: 4.0,
    avaliacoesPLG: 412,
    descricaoPLG:
      'Cédula de 500 Cruzeiros do período do Plano Collor, com papel firme e cores vivas. Excelente opção para completar coleções de cédulas da década de 1990, com ótima relação entre preço e conservação.',
    imagemCardPLG: require('../assets/images/p4.jpg'),
    imagemDetalhePLG: require('../assets/images/d4.jpg'),
  },
  {
    idPLG: '5',
    nomePLG: '400 Réis',
    subtituloPLG: 'Moeda de 1901',
    categoriaPLG: 'Moedas',
    eraPLG: 'Réis',
    precoPLG: 349.0,
    notaPLG: 4.7,
    avaliacoesPLG: 318,
    descricaoPLG:
      'Raridade da República Velha, cunhada em 1901 com baixa tiragem. Peça com ótima nitidez nos detalhes e patina uniforme, muito valorizada entre colecionadores de moedas do período imperial e republicano.',
    imagemCardPLG: require('../assets/images/p5.jpg'),
    imagemDetalhePLG: require('../assets/images/d5.jpg'),
  },
  {
    idPLG: '6',
    nomePLG: '10 Mil Réis',
    subtituloPLG: 'Cédula de 1925',
    categoriaPLG: 'Cédulas',
    eraPLG: 'Réis',
    precoPLG: 520.0,
    notaPLG: 4.6,
    avaliacoesPLG: 205,
    descricaoPLG:
      'Cédula histórica do tempo do Mil-Réis, com gravuras detalhadas e papel original. Item de destaque para colecionadores avançados, em ótimo estado e com assinatura legível das autoridades da época.',
    imagemCardPLG: require('../assets/images/p6.jpg'),
    imagemDetalhePLG: require('../assets/images/d6.jpg'),
  },
];

export const buscarProdutoPorIdPLG = (idPLG: string): ProdutoPLG | undefined =>
  produtosPLG.find((itemPLG) => itemPLG.idPLG === idPLG);

export const filtrarPorChipPLG = (produtoPLG: ProdutoPLG, chipPLG: string): boolean =>
  produtoPLG.categoriaPLG === chipPLG || produtoPLG.eraPLG === chipPLG;

export const formatarPrecoPLG = (valorPLG: number): string =>
  `R$ ${valorPLG.toFixed(2).replace('.', ',')}`;

export const formatarAvaliacoesPLG = (valorPLG: number): string =>
  valorPLG.toLocaleString('pt-BR');
