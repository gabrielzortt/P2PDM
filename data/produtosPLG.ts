import { ImageSourcePropType } from 'react-native';

export type CategoriaPLG = 'Moedas' | 'Cédulas';
export type EraPLG = 'Réis' | 'Cruzeiro' | 'Cruzado' | 'Real';
export type GrauPLG = 'MBC' | 'S' | 'FC';
export type OrdemPLG = 'relevancia' | 'menor' | 'maior' | 'nota';

export interface ProdutoPLG {
  idPLG: string;
  nomePLG: string;
  subtituloPLG: string;
  categoriaPLG: CategoriaPLG;
  eraPLG: EraPLG;
  anoPLG: string;
  materialPLG: string;
  medidaPLG: string;
  raridadePLG: 'Comum' | 'Rara' | 'Muito rara';
  precoPLG: number;
  notaPLG: number;
  avaliacoesPLG: number;
  novoPLG: boolean;
  descricaoPLG: string;
  imagensPLG?: ImageSourcePropType[];
}

export const filtrosPLG: string[] = ['Todos', 'Moedas', 'Cédulas', 'Réis', 'Cruzeiro', 'Cruzado', 'Real'];

export const grausPLG: GrauPLG[] = ['MBC', 'S', 'FC'];

export const nomeGrauPLG: Record<GrauPLG, string> = {
  MBC: 'Muito bem conservada',
  S: 'Soberba',
  FC: 'Flor de cunho',
};

export const fatorGrauPLG: Record<GrauPLG, number> = { MBC: 0.7, S: 1, FC: 1.4 };

export const ordensPLG: { chavePLG: OrdemPLG; rotuloPLG: string }[] = [
  { chavePLG: 'relevancia', rotuloPLG: 'Relevância' },
  { chavePLG: 'menor', rotuloPLG: 'Menor preço' },
  { chavePLG: 'maior', rotuloPLG: 'Maior preço' },
  { chavePLG: 'nota', rotuloPLG: 'Melhor avaliação' },
];

export const produtosPLG: ProdutoPLG[] = [
  {
    idPLG: '1', nomePLG: '2000 Réis', subtituloPLG: 'Moeda de prata · 1936', categoriaPLG: 'Moedas', eraPLG: 'Réis',
    anoPLG: '1936', materialPLG: 'Prata', medidaPLG: '27 mm', raridadePLG: 'Rara',
    precoPLG: 289.9, notaPLG: 4.8, avaliacoesPLG: 1240, novoPLG: false,
    descricaoPLG: 'Moeda de prata de 2000 réis cunhada em 1936. Peça com relevo bem preservado e pátina natural, ideal para colecionadores de numismática brasileira. Acompanha certificado de autenticidade e embalagem protetora.',
  },
  {
    idPLG: '2', nomePLG: '1 Cruzado', subtituloPLG: 'Cédula · 1987', categoriaPLG: 'Cédulas', eraPLG: 'Cruzado',
    anoPLG: '1987', materialPLG: 'Papel', medidaPLG: '140 × 65 mm', raridadePLG: 'Comum',
    precoPLG: 45, notaPLG: 4.9, avaliacoesPLG: 2330, novoPLG: true,
    descricaoPLG: 'Cédula de 1 Cruzado emitida durante o Plano Cruzado, em estado Flor de Estampa. Um marco da história econômica brasileira, com papel firme, cores vivas e sem dobras. Perfeita para completar a sua coleção.',
  },
  {
    idPLG: '3', nomePLG: '1 Cruzeiro', subtituloPLG: 'Moeda · 1942', categoriaPLG: 'Moedas', eraPLG: 'Cruzeiro',
    anoPLG: '1942', materialPLG: 'Bronze-alumínio', medidaPLG: '23 mm', raridadePLG: 'Comum',
    precoPLG: 79.9, notaPLG: 4.5, avaliacoesPLG: 860, novoPLG: false,
    descricaoPLG: 'Moeda de 1 Cruzeiro lançada na reforma monetária de 1942. Possui bom estado de conservação, com leves marcas de circulação que atestam sua história. Item muito procurado por quem inicia a coleção.',
  },
  {
    idPLG: '4', nomePLG: '500 Cruzeiros', subtituloPLG: 'Cédula · 1990', categoriaPLG: 'Cédulas', eraPLG: 'Cruzeiro',
    anoPLG: '1990', materialPLG: 'Papel', medidaPLG: '140 × 65 mm', raridadePLG: 'Comum',
    precoPLG: 62.5, notaPLG: 4.0, avaliacoesPLG: 412, novoPLG: false,
    descricaoPLG: 'Cédula de 500 Cruzeiros do período do Plano Collor, com papel firme e cores vivas. Excelente opção para completar coleções de cédulas da década de 1990, com ótima relação entre preço e conservação.',
  },
  {
    idPLG: '5', nomePLG: '400 Réis', subtituloPLG: 'Moeda · 1901', categoriaPLG: 'Moedas', eraPLG: 'Réis',
    anoPLG: '1901', materialPLG: 'Níquel', medidaPLG: '30 mm', raridadePLG: 'Muito rara',
    precoPLG: 349, notaPLG: 4.7, avaliacoesPLG: 318, novoPLG: true,
    descricaoPLG: 'Raridade da República Velha, cunhada em 1901 com baixa tiragem. Peça com ótima nitidez nos detalhes e pátina uniforme, muito valorizada entre colecionadores de moedas do período imperial e republicano.',
  },
  {
    idPLG: '6', nomePLG: '10 Mil Réis', subtituloPLG: 'Cédula · 1925', categoriaPLG: 'Cédulas', eraPLG: 'Réis',
    anoPLG: '1925', materialPLG: 'Papel', medidaPLG: '175 × 85 mm', raridadePLG: 'Muito rara',
    precoPLG: 520, notaPLG: 4.6, avaliacoesPLG: 205, novoPLG: false,
    descricaoPLG: 'Cédula histórica do tempo do Mil-Réis, com gravuras detalhadas e papel original. Item de destaque para colecionadores avançados, em ótimo estado e com assinaturas legíveis das autoridades da época.',
  },
  {
    idPLG: '7', nomePLG: '1 Real', subtituloPLG: 'Moeda · 1994', categoriaPLG: 'Moedas', eraPLG: 'Real',
    anoPLG: '1994', materialPLG: 'Aço inoxidável', medidaPLG: '26 mm', raridadePLG: 'Comum',
    precoPLG: 24.9, notaPLG: 4.3, avaliacoesPLG: 975, novoPLG: true,
    descricaoPLG: 'Moeda de 1 Real da primeira série do Plano Real. Ótima peça de entrada para quem está começando a colecionar, com cunhagem nítida e brilho original preservado.',
  },
  {
    idPLG: '8', nomePLG: '100 Cruzados Novos', subtituloPLG: 'Cédula · 1989', categoriaPLG: 'Cédulas', eraPLG: 'Cruzado',
    anoPLG: '1989', materialPLG: 'Papel', medidaPLG: '140 × 65 mm', raridadePLG: 'Rara',
    precoPLG: 38, notaPLG: 4.4, avaliacoesPLG: 540, novoPLG: false,
    descricaoPLG: 'Cédula de 100 Cruzados Novos, emitida no fim da década de 1980. Traz o desenho característico do período e mantém a textura original do papel, sem rasgos ou manchas.',
  },
];

export const buscarProdutoPorIdPLG = (idPLG: string): ProdutoPLG | undefined =>
  produtosPLG.find((itemPLG) => itemPLG.idPLG === idPLG);

export const filtrarPorChipPLG = (produtoPLG: ProdutoPLG, chipPLG: string): boolean =>
  chipPLG === 'Todos' || produtoPLG.categoriaPLG === chipPLG || produtoPLG.eraPLG === chipPLG;

export const ordenarPLG = (listaPLG: ProdutoPLG[], ordemPLG: OrdemPLG): ProdutoPLG[] => {
  const copiaPLG = [...listaPLG];
  if (ordemPLG === 'menor') return copiaPLG.sort((aPLG, bPLG) => aPLG.precoPLG - bPLG.precoPLG);
  if (ordemPLG === 'maior') return copiaPLG.sort((aPLG, bPLG) => bPLG.precoPLG - aPLG.precoPLG);
  if (ordemPLG === 'nota') return copiaPLG.sort((aPLG, bPLG) => bPLG.notaPLG - aPLG.notaPLG);
  return copiaPLG;
};

export const formatarPrecoPLG = (valorPLG: number): string =>
  `R$ ${valorPLG.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;

export const formatarAvaliacoesPLG = (valorPLG: number): string =>
  valorPLG.toLocaleString('pt-BR');
