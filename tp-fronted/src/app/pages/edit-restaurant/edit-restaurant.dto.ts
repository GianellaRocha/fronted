export class EditRestaurantInput {
    id?: number;
    name?: string;
    street?: string;
    number?: number;
    cityId?: number;
    lat?: number;
    long?: number;
    imageUrl?: string;
}
export class EditRestaurantOutput {
    name?: string;
    address?: {
        street?: string;
        number?: string;
        cityId?: number;
        location?: {
            lat?: number;
            lng?: number;
        };
    };
    imageUrl?: string;
}