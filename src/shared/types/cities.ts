export interface CityData {
  id: number;
  name: string;
  slug?: string;
  type?: 'city' | 'county';
  coordinates?: [number, number]; // [lng, lat]
  provinceId: number;
}

export interface ProvinceData {
  id: number;
  name: string;
  slug?: string;
  coordinates?: [number, number]; // [lng, lat]
  cities?: CityData[];
}
