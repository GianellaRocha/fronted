import { Injectable } from '@angular/core';
import { axiosService}  from './axiosClient';
import { config } from '../config/env';
import { EditRestaurantInput, EditRestaurantOutput } from 'app/pages/edit-restaurant/edit-restaurant.dto';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor() { }

    async getData(): Promise<
        Array<{ name: string; description: string; image: string }>
    > {
        return (await axiosService.get(config.urls.getFood)).data;
    }

    async getRestaurants(page: number): Promise<
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
        const datos = (await axiosService.get(config.urls.getRestaurants, {
            params: { page }
        })).data;
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
                long: item.address.location.lng,
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
            .data;
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

    async updateRestaurant(restaurant: EditRestaurantInput): Promise<void> {
        const data: EditRestaurantOutput = {
            name: restaurant.name,
            address: {
                street: restaurant.street,
                number: restaurant.number!.toString(),
                cityId: restaurant.cityId,
                location: {
                    lat: restaurant.lat,
                    lng: restaurant.long
                }
            },
            imageUrl: restaurant.imageUrl
        }
        console.log(`${config.urls.editRestaurantById}/${restaurant.id}`);
        await axiosService.put(
            `${config.urls.editRestaurantById(restaurant.id!)}`,
            data,
        );
    }

    async patchRestaurant(restaurant: EditRestaurantInput): Promise<void> {
        const data: Partial<EditRestaurantOutput> = {
            name: restaurant.name,
            address: {
                street: restaurant.street,
                number: restaurant.number!.toString(),
                cityId: restaurant.cityId,
                location: {
                    lat: restaurant.lat,
                    lng: restaurant.long
                }
            },
            imageUrl: restaurant.imageUrl
        };
        await axiosService.patch(
            `${config.urls.editRestaurantById(restaurant.id!)}`,
            data,
        );
    }

    async createRestaurant(formulario: any): Promise<void> {
        const nuevoRestaurante: EditRestaurantOutput = {
            name: formulario.get('name').value,
            address: {
                street: formulario.get('street').value,
                number: formulario.get('number').value,
                cityId: formulario.get('cityId').value,
                location: {
                    lat: formulario.get('lat').value,
                    lng: formulario.get('long').value
                }
            },
            imageUrl: formulario.get('imageUrl').value
        }
        await axiosService.post(config.urls.createRestaurant, nuevoRestaurante);
    }

    async deleteRestaurant(id: number): Promise<void> {
        await axiosService.delete(`${config.urls.getRestaurantById(id)}`);
    }

    async refreshToken(): Promise<void> {
        const response = await axiosService.get('http://localhost:3000/refresh-token');

        // Accedés a los tokens
        const { accessToken, refreshToken } = response.data;

        if (accessToken) {
            localStorage.setItem('access_token', accessToken);
        }

        if (refreshToken) {
            localStorage.setItem('refresh_token', refreshToken);
        }

    }
}