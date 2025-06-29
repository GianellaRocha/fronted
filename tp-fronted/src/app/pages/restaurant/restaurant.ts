import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { GlobalStatusService } from 'app/services/global-status.service';

@Component({
  selector: 'app-restaurant',
  imports: [CommonModule],
  templateUrl: './restaurant.html',
  styleUrl: './restaurant.css',
})
export class Restaurant {
  constructor(
    private router: Router,
    private readonly apiService: ApiService,
    private readonly globalStatusService: GlobalStatusService
  ) {}
  restaurantss = [
    {
      id: 1,
      name: 'The One Burger',
      street: 'Santa fe',
      number: 761,
      cityId: 1,
      lat: -32.4,
      long: -63.2,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTSh_8U_HIqU7xLFArpcpTbdW149aHLIoUOg&s',
    },
    {
      id: 2,
      name: 'Eddie Burgers',
      street: '9 de julio',
      number: 255,
      cityId: 1,
      lat: -32.4,
      long: -63.2,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqciDxGRPpyJo21sRBFax0jsBx5vcV3rPVRA&s',
    },
    {
      id: 3,
      name: 'Holly Burgers',
      street: 'Saenz Peña',
      number: 63,
      cityId: 1,
      lat: -32.4,
      long: -63.2,
      imageUrl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKmnO_3xEqKXuX7jEGzeIoRa7TkAQL8khFNg&s',
    },
    // otros restaurantes...
  ];
  restaurants: Array<{
    id: number;
    name: string;
    street: string;
    number: number;
    cityId: number;
    lat: number;
    long: number;
    imageUrl: string;
  }> = [];

  selectedRow: number | null = null;

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    const data = await this.apiService.getRestaurants();
    this.restaurants = data;
    this.globalStatusService.setLoading(false);
  }

  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }

  onNew() {
    this.router.navigate(['/restaurant/new']);
  }

  onEdit() {
    // if (this.selectedRow === null) {
    //   alert('Seleccioná un restaurante primero.');
    //   return;
    // }
    // const selectedRestaurant = this.restaurants[this.selectedRow];
    // this.router.navigate(['/restaurants/edit/:id', selectedRestaurant.id]);
  }

  onDelete() {
    if (this.selectedRow) {
      // lógica para eliminar
    }
  }

  onView() {
    if (this.selectedRow) {
      // lógica para ver
    }
  }

  onNext() {
    this.router.navigate(['/menu']);
  }
}
