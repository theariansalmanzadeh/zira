import { CityData } from '../../types/cities';
import { azarbijan_sharqiCities } from './azarbijan_sharqi';
import { azarbijan_gharbiCities } from './azarbijan_gharbi';
import { ardbilCities } from './ardbil';
import { esfhanCities } from './esfhan';
import { albrzCities } from './albrz';
import { ilamCities } from './ilam';
import { bushahrCities } from './bushahr';
import { tehranCities } from './tehran';
import { chaharmhal_obakhtyariCities } from './chaharmhal_obakhtyari';
import { khorasane_jonobiCities } from './khorasane_jonobi';
import { khorasane_razaviCities } from './khorasane_razavi';
import { khorasane_shomaliCities } from './khorasane_shomali';
import { khzstanCities } from './khzstan';
import { znjanCities } from './znjan';
import { smnanCities } from './smnan';
import { sistan_oblchstanCities } from './sistan_oblchstan';
import { farsCities } from './fars';
import { qzynCities } from './qzyn';
import { qmCities } from './qm';
import { kurdstanCities } from './kurdstan';
import { kermanCities } from './kerman';
import { kermanshahCities } from './kermanshah';
import { kegilvieh_obuyrahmdCities } from './kegilvieh_obuyrahmd';
import { glstanCities } from './glstan';
import { gilanCities } from './gilan';
import { lrstanCities } from './lrstan';
import { mazndranCities } from './mazndran';
import { mrkziCities } from './mrkzi';
import { hrmzganCities } from './hrmzgan';
import { hmdanCities } from './hmdan';
import { yzdCities } from './yzd';

export {
  azarbijan_sharqiCities,
  azarbijan_gharbiCities,
  ardbilCities,
  esfhanCities,
  albrzCities,
  ilamCities,
  bushahrCities,
  tehranCities,
  chaharmhal_obakhtyariCities,
  khorasane_jonobiCities,
  khorasane_razaviCities,
  khorasane_shomaliCities,
  khzstanCities,
  znjanCities,
  smnanCities,
  sistan_oblchstanCities,
  farsCities,
  qzynCities,
  qmCities,
  kurdstanCities,
  kermanCities,
  kermanshahCities,
  kegilvieh_obuyrahmdCities,
  glstanCities,
  gilanCities,
  lrstanCities,
  mazndranCities,
  mrkziCities,
  hrmzganCities,
  hmdanCities,
  yzdCities,
};

export const CITIES_BY_PROVINCE_ID: Record<number, CityData[]> = {
  1: azarbijan_sharqiCities,
  2: azarbijan_gharbiCities,
  3: ardbilCities,
  4: esfhanCities,
  5: albrzCities,
  6: ilamCities,
  7: bushahrCities,
  8: tehranCities,
  16: chaharmhal_obakhtyariCities,
  17: khorasane_jonobiCities,
  18: khorasane_razaviCities,
  19: khorasane_shomaliCities,
  20: khzstanCities,
  21: znjanCities,
  22: smnanCities,
  23: sistan_oblchstanCities,
  24: farsCities,
  25: qzynCities,
  26: qmCities,
  27: kurdstanCities,
  28: kermanCities,
  29: kermanshahCities,
  30: kegilvieh_obuyrahmdCities,
  31: glstanCities,
  32: gilanCities,
  33: lrstanCities,
  34: mazndranCities,
  35: mrkziCities,
  36: hrmzganCities,
  37: hmdanCities,
  38: yzdCities,
};
