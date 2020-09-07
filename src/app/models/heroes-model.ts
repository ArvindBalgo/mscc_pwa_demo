export interface HeroModel {
  appearance: AppearanceModel;
  biography: BiographyModel;
  connections: ConnectionsModel;
  id: number;
  image: {
    url: string;
  };
  name: string;
  powerstats: PowerStatsModel;
  work: WorkModel;
}

export interface AppearanceModel {
  'eye-color': string;
  gender: string;
  'hair-color': string;
  height: Array<string>;
  race: string;
  weight: Array<string>;
}

export interface BiographyModel {
  aliases: Array<string>;
  alignment: string;
  'alter-egos': string;
  'first-appearance': string;
  'full-name': string;
  'place-of-birth': string;
  publisher: 'string';
}

export interface ConnectionsModel {
  'group-affiliation': string;
  relatives: string;
}

export interface PowerStatsModel {
  combat: string;
  durability: string;
  strength: string;
  intelligence: string;
  power: string;
  speed: string;
}

export interface WorkModel {
  base: string;
  occupation: string;
}

export interface ApiModel {
  response: string;
  results: Array<HeroModel>;
  'results-for': string;
}
