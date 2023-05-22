import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../model/cliente';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  protected basePath: string = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.basePath}/api/cliente/list`)
      .pipe(
        retry(0)
      )
  }

  save(cliente: any): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.basePath}/api/cliente`, cliente)
      .pipe(
        retry(0)
      )
  }
}
