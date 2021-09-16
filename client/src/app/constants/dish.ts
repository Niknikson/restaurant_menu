export class Dish {
  constructor(
    public id: number,
    public name: string,
    public img: string,
    public top: boolean,
    public price: string,
    public weight: string,
    public available: boolean,
    public dascription: string,
  ) {}
}