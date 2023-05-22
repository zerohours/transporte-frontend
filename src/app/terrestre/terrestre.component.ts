import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvioTerrestre } from '../model/envio.terrestre';
import { EnvioTerrestreService } from '../service/envio.terrestre.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-terrestre',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './terrestre.component.html',
  styleUrls: ['./terrestre.component.css']
})
export class TerrestreComponent implements OnInit {

  title = 'Listado de envios terrestres';

  loading = true;

  envios: EnvioTerrestre[] = [];

  constructor(
    private router: Router,
    private terrestreService: EnvioTerrestreService
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.terrestreService.getAll()
      .subscribe({
        next: value => this.envios = value,
        error: err => console.log(err),
        complete: () => this.loading = false
      });
  }

  editar(envio: EnvioTerrestre) {
    this.terrestreService.changeExchange(envio);
    this.router.navigate(['/terrestre/update']);
  }

  eliminar(envio: EnvioTerrestre) {
    // Procesar datos aquí
    this.terrestreService.delete(envio.id)
      .subscribe({
        next: value => this.getAll()
      })
  }
}
