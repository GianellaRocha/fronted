export const config = {
  BaseUrl: 'http://localhost:3001',
  AuthUrl: 'http://localhost:3000',
  urls: {
    getFood: 'https://run.mocky.io/v3/0a5a1d85-ee02-455e-b53e-e3887acfbfaf',
    getRestaurants: '/restaurant',
    editRestaurantById: (id: number) => `/restaurant/edit/${id}`,
    getRestaurantById: (id: number) => `/restaurant/${id}`,
    createRestaurant: '/restaurant',
    deleteRestaurant: (id: number) => `/restaurant/${id}`,
    refreshToken: '/refresh-token',
    login: '/login',
    register: '/register',
  },
};
//configurar las urls