import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../service/cliente.service';
import { Cliente } from '../model/cliente';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cliente-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  title = 'Listado de clientes';

  loading = true;

  cliente!: Cliente;

  form = new FormGroup({
    id: new FormControl(),
    nombre: new FormControl(),
  });

  constructor(
    private router: Router,
    private clienteService: ClienteService
  ) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.form.valid) {
      this.clienteService.save(this.form.getRawValue())
        .subscribe({
          next: () => this.router.navigate(['/cliente'])
        });
    }
  }

}
