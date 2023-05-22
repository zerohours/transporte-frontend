import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvioTerrestre } from '../model/envio.terrestre';
import { Cliente } from '../model/cliente';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { EnvioTerrestreService } from '../service/envio.terrestre.service';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-terrestre-update',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './terrestre-update.component.html',
  styleUrls: ['./terrestre-update.component.css']
})
export class TerrestreUpdateComponent implements OnInit {

  title = 'Editar envio terrestre';

  loading = true;

  terrestre!: EnvioTerrestre;

  clientes: Cliente[] = [];

  form = new FormGroup({
    id: new FormControl(),
    cliente: new FormGroup({
      id: new FormControl(),
    }),
    tipoProducto: new FormControl(),
    cantidadProducto: new FormControl(),
    fechaRegistro: new FormControl(),
    fechaEntrega: new FormControl(),
    precioEnvio: new FormControl(),
    numeroGuia: new FormControl(),
    precioOriginal: new FormControl(),
    bodegaEntrega: new FormControl(),
    numeroPlaca: new FormControl(),
  });

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private terrestreService: EnvioTerrestreService
  ) {
  }

  ngOnInit(): void {
    this.getAll();
    this.terrestreService.currentExchange.subscribe(exchange => (this.terrestre = exchange));
    this.form.patchValue(this.terrestre);
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

  onSubmit(): void {
    // Procesar datos aquí
    this.terrestreService.update(this.terrestre.id, this.form.getRawValue())
      .subscribe(data => {
        this.router.navigate(['/terrestre']);
      });
  }

}
