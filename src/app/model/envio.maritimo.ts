import { Envio } from './envio';

export interface EnvioMaritimo extends Envio {
  puertoEntrega: string;
  numeroFlota: string;
}
