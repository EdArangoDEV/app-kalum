import { Injectable } from '@angular/core';
import { environment } from 'src/app/environments/environments';
import { HttpClient } from '@angular/common/http';

const BASE_URL = `${environment.BASE_URL_KALUM_MANAGEMENT}/v1`;

@Injectable({
  providedIn: 'root',
})
export class CarreraTecnicaService {
  // carreras: CarreraTecnica[] = [
  // {carreraId: '1', nombre: 'Desarrollo con DOTNET Core'},
  // {carreraId: '2', nombre: 'Desarrollo con Java EE'},
  // {carreraId: '3', nombre: 'Desarrollo con Java EE I'},
  // {carreraId: '4', nombre: 'Desarrollo con Java EE II'},
  // {carreraId: '5', nombre: 'Desarrollo con Java EE III'},
  // {carreraId: '6', nombre: 'Desarrollo con Java EE IV'},
  // {carreraId: '7', nombre: 'Desarrollo con Java EE V'},
  // {carreraId: '8', nombre: 'Desarrollo con Java EE VI'},
  // ]

  constructor(private http: HttpClient) {}

  getCarreras() {
    // return this.carreras;
    return this.http.get(`${BASE_URL}/carreras-tecnicas`);
  }

  addCarreraTecnica(body: any) {
    return this.http.post(`${BASE_URL}/carreras-tecnicas`, body);
  }

  updateCarreraTecnica(body: any) {
    return this.http.put(`${BASE_URL}/carreras-tecnicas/${body.carreraId}`, {
      nombre: body.nombre,
    });
    // return this.http.put(`${BASE_URL}/carreras-tecnicas/${body.carreraId}`, body);
  }

  deleteCarreraTecnica(carreraId: any){
    return this.http.delete(`${BASE_URL}/carreras-tecnicas/${carreraId}`); 
  }
}
