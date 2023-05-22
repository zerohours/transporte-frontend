import { Cliente } from './cliente';

export interface Envio {
  id: number;
  cliente: Cliente;
  tipoProducto: string;
  cantidadProducto: number;
  fechaRegistro: Date;
  fechaEntrega: Date
  precioEnvio: number;
  numeroGuia: string
  precioOriginal: number;
}
