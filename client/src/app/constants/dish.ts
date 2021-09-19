export class Dish {
  constructor(
    public id: string,
    public name: string,
    public img: string,
    public top: boolean,
    public price: string,
    public weight: string,
    public available: boolean,
    public dascription: string,
  ) {}
}