import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const restaurantId = this.route.snapshot.paramMap.get('id');

    // ⚠️ Simulación: en un proyecto real, obtendrías los datos desde un servicio
    const fetched = {
      id: restaurantId,
      name: 'Pizza Place',
      street: 'Main St',
      number: 123,
      cityId: 5,
      lat: -34.6,
      long: -58.4,
      imageUrl: 'assets/images/pizza.jpg'
    };

    this.restaurant = { ...fetched };
    this.originalRestaurant = { ...fetched }; // para comparar luego
  }

  onSave() {
    const modifiedKeys = Object.keys(this.restaurant).filter(
      key => this.restaurant[key] !== this.originalRestaurant[key]
    );

    if (modifiedKeys.length === 0) {
      console.log('No se cambió ningún dato.');
    } else if (modifiedKeys.length === Object.keys(this.restaurant).length) {
      console.log('Se cambiaron todos los campos. → Usar PUT');
    } else {
      console.log('Se cambiaron algunos campos. → Usar PATCH');
    }

    this.router.navigate(['/restaurants']);
  }
}
