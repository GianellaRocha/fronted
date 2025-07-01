import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'app-edit-restaurant',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './edit-restaurant.html',
    styleUrls: ['./edit-restaurant.css']
})
export class EditComponent implements OnInit {
    restaurant: any;
    originalRestaurant: any;

    constructor(private route: ActivatedRoute, private router: Router, private apiService: ApiService) { }

    ngOnInit() {
        const restaurantId = this.route.snapshot.paramMap.get('id');
        this.initialization(restaurantId);
    }

    async initialization(restaurantId: string | null): Promise<void> {
        if (!restaurantId) {
            alert('No se proporcionó un ID de restaurante válido.');
            return;
        }
        try {
            const fetched = await this.apiService.getRestaurantById(+restaurantId);
            console.log('Restaurante obtenido:', fetched);
            this.restaurant = { ...fetched };
            this.originalRestaurant = { ...fetched };
        } catch (error) {
            alert('Error al obtener el restaurante:');
        }
    }

    onSave() {
        const modifiedKeys = Object.keys(this.restaurant).filter(
            key => (key !== 'id') && (this.restaurant[key] !== this.originalRestaurant[key])
        );

        if (modifiedKeys.length === 0) {
            alert('No se cambió ningún dato.');
        } else if (modifiedKeys.length === (Object.keys(this.restaurant).length) - 1) {
            this.apiService.updateRestaurant(this.restaurant).then(() => {
                alert('Restaurante actualizado correctamente.');
            }).catch(error => {
                console.error('Error al actualizar el restaurante:', error);
                alert('Error al actualizar el restaurante.');
            });
        } else {
            this.apiService.patchRestaurant(this.restaurant).then(() => {
                alert('Restaurante actualizado correctamente con PATCH.');
            }).catch(error => {
                console.error('Error al actualizar el restaurante con PATCH:', error);
                alert('Error al actualizar el restaurante con PATCH.');
            });
        }

        this.router.navigate(['/restaurant']);
    }
}
