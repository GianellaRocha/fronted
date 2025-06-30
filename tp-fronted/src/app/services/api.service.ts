import { Injectable } from '@angular/core';
import axiosService from '../api/axiosClient'; // ✅ Importa tu cliente Axios con token
import { config } from '../config/env';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  async getData(): Promise<
    Array<{ name: string; description: string; image: string }>
  > {
    return (await axiosService.get(config.urls.getFood)).data; // ✅ usamos axiosService
  }

  async getRestaurants(): Promise<
    Array<{
      id: number;
      name: string;
      street: string;
      number: number;
      cityId: number;
      lat: number;
      long: number;
      imageUrl: string;
    }>
  > {
    const datos = (await axiosService.get(config.urls.getRestaurants)).data; // usamos axiosService
    const respuesta = datos.map(
      (item: {
        id: any;
        name: any;
        address: {
          street: any;
          number: any;
          cityId: any;
          location: { lat: any; lng: any };
        };
        imageUrl: any;
      }) => ({
        id: item.id,
        name: item.name,
        street: item.address.street,
        number: item.address.number,
        cityId: item.address.cityId,
        lat: item.address.location.lat,
        long: item.address.location.lng, // Ojo: cambiaste de `long` a `lng` (corregido)
        imageUrl: item.imageUrl,
      })
    );
    return respuesta;
  }

  async getRestaurantById(id: number): Promise<{
    id: number;
    name: string;
    street: string;
    number: number;
    cityId: number;
    lat: number;
    long: number;
    imageUrl: string;
  }> {
    const datos = (await axiosService.get(`${config.urls.getRestaurants}/${id}`))
      .data; // usamos axiosService
    return {
      id: datos.id,
      name: datos.name,
      street: datos.address.street,
      number: datos.address.number,
      cityId: datos.address.cityId,
      lat: datos.address.location.lat,
      long: datos.address.location.lng,
      imageUrl: datos.imageUrl,
    };
  }
}
