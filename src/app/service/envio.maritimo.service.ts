import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, BehaviorSubject } from 'rxjs';
import { EnvioMaritimo } from '../model/envio.maritimo';

@Injectable({
  providedIn: 'root'
})
export class EnvioMaritimoService {

  protected basePath: string = 'http://localhost:8080';

  exchangeSource = new BehaviorSubject<EnvioMaritimo>({} as EnvioMaritimo);
  currentExchange = this.exchangeSource.asObservable();

  constructor(private http: HttpClient) { }

  getAll(): Observable<EnvioMaritimo[]> {
    return this.http.get<EnvioMaritimo[]>(`${this.basePath}/api/maritimo/list`)
      .pipe(
        retry(0)
      )
  }

  save(cliente: any): Observable<EnvioMaritimo> {
    return this.http.post<EnvioMaritimo>(`${this.basePath}/api/maritimo`, cliente)
      .pipe(
        retry(0)
      )
  }

  update(id: number, cliente: any): Observable<EnvioMaritimo> {
    return this.http.put<EnvioMaritimo>(`${this.basePath}/api/maritimo/${id}`, cliente)
      .pipe(
        retry(0)
      )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.basePath}/api/maritimo/${id}`)
      .pipe(
        retry(0)
      )
  }

  changeExchange(message: EnvioMaritimo) {
    this.exchangeSource.next(message);
  }
}
