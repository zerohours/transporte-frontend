import { Envio } from './envio';

export interface EnvioTerrestre extends Envio {
  bodegaEntrega: string;
  numeroPlaca: string
}
