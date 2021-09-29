export interface Info {
  id: string,
  wifi: string,
  phone: string,
  address: string,
}

export interface Dish {
 id: string,
 name: string,
 img: string,
 top: boolean,
 price: string,
 weight: string,
 available: boolean,
description: string,
categoryId: string,
}

export interface DishPost {
 id: string,
 name: string,
 img: string,
 top: boolean,
 price: string,
 weight: string,
 available: boolean,
 description: string,
}



