import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';

const BASE_URL = `${environment.BASE_URL_KALUM_MANAGEMENT}/v1`;

@Injectable({
  providedIn: 'root',
})
export class JornadaService {
  constructor(private http: HttpClient) {}

  getJornadas() {
    return this.http.get(`${BASE_URL}/jornadas`);
  }

  getJornada(jornadaId: any) {
    return this.http.get(`${BASE_URL}/jornadas/${jornadaId}`);
  }

  addJornada(body: any) {
    return this.http.post(`${BASE_URL}/jornadas`, body);
  }

  updateJornada(body: any) {
    return this.http.put(`${BASE_URL}/jornadas/${body.jornadaId}`, {
      prefijo: body.prefijo,
      descripcion: body.descripcion,
    });
  }

  deleteJornada(jornadaId: any){
    return this.http.delete(`${BASE_URL}/jornadas/${jornadaId}`);
  }
}
