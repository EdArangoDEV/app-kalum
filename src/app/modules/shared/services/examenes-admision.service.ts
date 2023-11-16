import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';

const BASE_URL = `${environment.BASE_URL_KALUM_MANAGEMENT}/v1`;

@Injectable({
  providedIn: 'root',
})
export class ExamenesAdmisionService {
  constructor(private http: HttpClient) {}

  getExamenes() {
    return this.http.get(`${BASE_URL}/examanes-admision`);
  }

  addExamenAdmision(body: any) {
    return this.http.post(`${BASE_URL}/examanes-admision`, body);
  }

  updateExamenAdmision(body: any) {
    return this.http.put(`${BASE_URL}/examanes-admision/${body.examenId}`, {
      fecha: body.fecha,
    });
  }

  deleteExamenAdmision(examenId: any) {
    return this.http.delete(`${BASE_URL}/examanes-admision/${examenId}`);
  }
}
