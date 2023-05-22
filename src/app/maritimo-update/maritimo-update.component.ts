import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvioMaritimo } from '../model/envio.maritimo';
import { Cliente } from '../model/cliente';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { EnvioMaritimoService } from '../service/envio.maritimo.service';

@Component({
  selector: 'app-maritimo-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './maritimo-update.component.html',
  styleUrls: ['./maritimo-update.component.css']
})
export class MaritimoUpdateComponent implements OnInit {

  title = 'Editar envio maritimo';

  loading = true;

  maritimo!: EnvioMaritimo;

  clientes: Cliente[] = [];

  form = new FormGroup({
    id: new FormControl(),
    cliente: new FormGroup({
      id: new FormControl(),
    }),
    tipoProducto: new FormControl(),
    cantidadProducto: new FormControl(),
    fechaRegistro: new FormControl(new Date()),
    fechaEntrega: new FormControl(new Date()),
    precioEnvio: new FormControl(),
    numeroGuia: new FormControl(),
    numeroFlota: new FormControl(),
    precioOriginal: new FormControl(),
    puertoEntrega: new FormControl(),
  });

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private maritimoService: EnvioMaritimoService
  ) {
  }
  ngOnInit(): void {
    this.getAll();
    this.maritimoService.currentExchange.subscribe(exchange => (this.maritimo = exchange));
    this.form.patchValue(this.maritimo);
  }

  getAll() {
    this.loading = true;
    this.clienteService.getAll()
      .subscribe({
        next: value => this.clientes = value,
        error: err => console.log(err),
        complete: () => this.loading = false
      });
  }

  onSubmit() {
    // Procesar datos aquí
    if (this.form.valid) {
      this.maritimoService.update(this.maritimo.id, this.form.getRawValue())
        .subscribe({
          next: () => this.router.navigate(['/maritimo'])
        });
    }
  }

}
