import { ImageSourcePropType } from 'react-native';

export interface ProdutoPLG {
  idPLG: string;
  nomePLG: string;
  precoPLG: number;
  descricaoPLG: string;
  categoriaPLG: 'Moeda' | 'Cédula';
  imagemPLG: ImageSourcePropType;
}

export const produtosPLG: ProdutoPLG[] = [
  {
    idPLG: '1',
    nomePLG: 'Moeda 2000 Réis – 1936',
    precoPLG: 289.9,
    descricaoPLG:
      'Moeda de prata da era Vargas, cunhada em 1936. Peça com relevo bem preservado e pátina natural, ideal para colecionadores de numismática brasileira.',
    categoriaPLG: 'Moeda',
    imagemPLG: require('../assets/images/moeda1.png'),
  },
  {
    idPLG: '2',
    nomePLG: 'Cédula 1 Cruzado – 1987',
    precoPLG: 45.0,
    descricaoPLG:
      'Cédula emitida durante o Plano Cruzado, em estado de conservação Flor de Estampa. Um marco da história econômica brasileira.',
    categoriaPLG: 'Cédula',
    imagemPLG: require('../assets/images/cedula1.png'),
  },
  {
    idPLG: '3',
    nomePLG: 'Moeda 1 Cruzeiro – 1942',
    precoPLG: 79.9,
    descricaoPLG:
      'Primeira moeda do Cruzeiro, lançada na reforma monetária de 1942. Bom estado, com leves marcas de circulação.',
    categoriaPLG: 'Moeda',
    imagemPLG: require('../assets/images/moeda2.png'),
  },
  {
    idPLG: '4',
    nomePLG: 'Cédula 500 Cruzeiros – 1990',
    precoPLG: 62.5,
    descricaoPLG:
      'Cédula do período do Plano Collor, com papel firme e cores vivas. Excelente para completar coleções de cédulas da década de 1990.',
    categoriaPLG: 'Cédula',
    imagemPLG: require('../assets/images/cedula2.png'),
  },
  {
    idPLG: '5',
    nomePLG: 'Moeda 400 Réis – 1901',
    precoPLG: 349.0,
    descricaoPLG:
      'Raridade da República Velha, cunhada em 1901. Peça com ótima nitidez nos detalhes e baixa tiragem.',
    categoriaPLG: 'Moeda',
    imagemPLG: require('../assets/images/moeda3.png'),
  },
  {
    idPLG: '6',
    nomePLG: 'Cédula 10 Mil Réis – 1925',
    precoPLG: 520.0,
    descricaoPLG:
      'Cédula histórica do tempo do Mil-Réis, com gravuras detalhadas e papel original. Item de destaque para colecionadores avançados.',
    categoriaPLG: 'Cédula',
    imagemPLG: require('../assets/images/cedula3.png'),
  },
];

export const buscarProdutoPorIdPLG = (idPLG: string): ProdutoPLG | undefined =>
  produtosPLG.find((itemPLG) => itemPLG.idPLG === idPLG);

export const formatarPrecoPLG = (valorPLG: number): string =>
  `R$ ${valorPLG.toFixed(2).replace('.', ',')}`;
