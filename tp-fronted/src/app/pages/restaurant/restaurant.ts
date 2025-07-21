import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { config } from 'app/config/env';
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
  ) { }

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
  actualPage: number = 1;

  ngOnInit(): void {
    this.initialization();
  }

  async initialization(): Promise<void> {
    this.globalStatusService.setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    const data = await this.apiService.getRestaurants(this.actualPage);
    if (data.length === 0) {
      alert('No hay restaurantes para mostrar.');
      this.globalStatusService.setLoading(false);
      this.actualPage --;
      return;
    }
    this.restaurants = data;
    this.globalStatusService.setLoading(false);
  }

  isLoading(): boolean {
    return this.globalStatusService.isLoading();
  }

  selectRow(rowId: number) {
    this.selectedRow = rowId;
  }

  onNew() {
    this.router.navigate(['/restaurant/new']);
  }

  onEdit() {
    if (this.selectedRow === null) {
      alert('Seleccioná un restaurante primero.');
      return;
    }
    const selectedRestaurant = this.restaurants[this.selectedRow];
    this.router.navigate(['/restaurant/edit', selectedRestaurant.id]);
  }

  onDelete() {
    if (this.selectedRow === null) {
      alert('Seleccioná un restaurante primero.');
      return;
    }
    const selectedRestaurant = this.restaurants[this.selectedRow];
    if (confirm(`¿Estás seguro de que querés eliminar el restaurante ${selectedRestaurant.name} (ID: ${selectedRestaurant.id})?`)) {
      this.apiService.deleteRestaurant(selectedRestaurant.id).then(() => {
        alert('Restaurante eliminado correctamente.');
        this.restaurants.splice(this.selectedRow!, 1);
        this.selectedRow = null;
      })
    }
  }

  onView() {
    if (this.selectedRow === null) {
      alert('Seleccioná un restaurante primero.');
      return;
    }
    alert('Acá iría la vista del restaurante con sus menús y platos.');
  }

  onNext() {
    this.actualPage++;
    this.selectedRow = null;
    this.initialization();
  }

  onPrevious() {
    this.actualPage--;
    this.selectedRow = null;
    this.initialization();
  }
}
