import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Restaurant } from '../restaurant/restaurant';
import { EditRestaurantOutput } from '../edit-restaurant/edit-restaurant.dto';
import { ApiService } from 'app/services/api.service';


@Component({
    standalone: true,
    selector: 'app-new-restaurant',
    templateUrl: './new-restaurant.html',
    styleUrls: ['./new-restaurant.css'],
    imports: [CommonModule, ReactiveFormsModule] // <-- IMPORTANTE
})
export class NewComponent {
    formulario: FormGroup;
    restaurant: any;
    error: string | null = null;

    constructor(private fb: FormBuilder, private apiService: ApiService, private router: Router) {
        this.formulario = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(6)]],
            street: ['', Validators.required, Validators.minLength(6)],
            number: [null, [Validators.required, Validators.min(1)], Validators.max(3)],
            cityId: [null, Validators.required, Validators.min(1)],
            lat: [null, [Validators.required, Validators.min(-90), Validators.max(90)]],
            long: [null, [Validators.required, Validators.min(-180), Validators.max(180)]],
            imageUrl: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|gif)(\?.*)?$/i)]]
        });
    }

    onSave() {
        if (this.formulario.invalid) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        } else if (this.formulario.valid) {
            this.apiService.createRestaurant(this.formulario).then(() => {
                alert('Restaurante creado correctamente.');
            }).catch (error => {
                console.error('Error al crear el restaurante:', error);
                alert('Error al crear el restaurante. Por favor, inténtalo de nuevo más tarde.');
            });

            this.router.navigate(['/restaurant']);
        }
    }
}