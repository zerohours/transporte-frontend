import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvioMaritimo } from '../model/envio.maritimo';
import { Router, RouterLink } from '@angular/router';
import { EnvioMaritimoService } from '../service/envio.maritimo.service';

@Component({
  selector: 'app-maritimo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './maritimo.component.html',
  styleUrls: ['./maritimo.component.css']
})
export class MaritimoComponent implements OnInit {

  title = 'Listado de envios maritimos';

  loading = true;

  envios: EnvioMaritimo[] = [];

  constructor(
    private router: Router,
    private maritimoService: EnvioMaritimoService
  ) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.loading = true;
    this.maritimoService.getAll()
      .subscribe({
        next: value => this.envios = value,
        error: err => console.log(err),
        complete: () => this.loading = false
      });
  }

  editar(envio: EnvioMaritimo) {
    this.maritimoService.changeExchange(envio);
    this.router.navigate(['/maritimo/update']);
  }

  eliminar(envio: EnvioMaritimo) {
    // Procesar datos aquí
    this.maritimoService.delete(envio.id)
      .subscribe({
        next: value => this.getAll()
      })
  }
}
