export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdDate: string;
  lastModifiedDate?: string;
}
export interface StockItem {
  id: string;
  name: string;
  status: string;
  category: string;
  quantity: number;
  price: number;
  consumedQuantity: number;
}

export interface Order {
  id: string;
  name: string;
  supplierName: string;
  status: string;
  date: string;
  quantity: number;
  stockItemName: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactDetails: string;
}

export interface Notification{
   message: string;
   category:string;
   name: string;
   quantity: string;
}
