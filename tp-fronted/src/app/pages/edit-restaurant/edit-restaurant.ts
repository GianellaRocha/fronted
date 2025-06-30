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
      this.restaurant = { ...fetched };
      this.originalRestaurant = { ...fetched }; // Guardamos el original para comparación
    } catch (error) {
      alert('Error al obtener el restaurante:');
    }
  }

  onSave() {
    const modifiedKeys = Object.keys(this.restaurant).filter(
      key => this.restaurant[key] !== this.originalRestaurant[key]
    );

    if (modifiedKeys.length === 0) {
      alert('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.restaurant).length) {
      alert('Se cambiaron todos los campos. → Usar PUT');
      // Aquí podrías llamar a un método para hacer PUT
    } else {
      alert('Se cambiaron algunos campos. → Usar PATCH');
      // Aquí podrías llamar a un método para hacer PATCH
    }

    this.router.navigate(['/restaurant']);
  }
}
