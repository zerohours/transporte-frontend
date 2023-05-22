import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Cliente } from '../model/cliente';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../service/cliente.service';
import { EnvioTerrestreService } from '../service/envio.terrestre.service';
import { EnvioTerrestre } from '../model/envio.terrestre';

@Component({
  selector: 'app-terrestre-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './terrestre-create.component.html',
  styleUrls: ['./terrestre-create.component.css']
})
export class TerrestreCreateComponent implements OnInit {

  title = 'Agregar envio terrestre';

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
    fechaRegistro: new FormControl(new Date()),
    fechaEntrega: new FormControl(new Date()),
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
      this.terrestreService.save(this.form.getRawValue())
        .subscribe({
          next: () => this.router.navigate(['/terrestre'])
        });
    }
  }

}
