import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  title = 'Listado de clientes';

  loading = true;

  clientes: Cliente[] = [];

  constructor(
    private clienteService: ClienteService
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

}
