import { ResMsg } from "./response";

export interface NewCategory {
     name: string,
     available: boolean
}

export interface Category extends NewCategory {
  id: string
}

export interface RespCategory extends ResMsg{
 category : Category, 
}