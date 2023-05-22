import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, retry, BehaviorSubject } from 'rxjs';
import { EnvioTerrestre } from '../model/envio.terrestre';

@Injectable({
  providedIn: 'root'
})
export class EnvioTerrestreService {

  protected basePath: string = 'http://localhost:8080';

  exchangeSource = new BehaviorSubject<EnvioTerrestre>({} as EnvioTerrestre);
  currentExchange = this.exchangeSource.asObservable();

  constructor(private http: HttpClient) { }

  getAll(): Observable<EnvioTerrestre[]> {
    return this.http.get<EnvioTerrestre[]>(`${this.basePath}/api/terrestre/list`)
      .pipe(
        retry(0)
      )
  }

  save(cliente: any): Observable<EnvioTerrestre> {
    return this.http.post<EnvioTerrestre>(`${this.basePath}/api/terrestre`, cliente)
      .pipe(
        retry(0)
      )
  }

  update(id: number, cliente: any): Observable<EnvioTerrestre> {
    return this.http.put<EnvioTerrestre>(`${this.basePath}/api/terrestre/${id}`, cliente)
      .pipe(
        retry(0)
      )
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.basePath}/api/terrestre/${id}`)
      .pipe(
        retry(0)
      )
  }

  changeExchange(message: EnvioTerrestre) {
    this.exchangeSource.next(message);
  }
}
