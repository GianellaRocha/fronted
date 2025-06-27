import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-restaurant-new',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './new-restaurant.html',
    styleUrls: ['./new-restaurant.css']
})
export class NewComponent {
    restaurant = {
        name: '',
        street: '',
        number: null,
        cityId: null,
        lat: null,
        long: null,
        imageUrl: ''
    };

    constructor(private router: Router) { }

    onSave() {
        this.router.navigate(['/restaurant']);
    }
}
