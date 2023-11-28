export type CartItem = {
    id: string; 
    imageUrl: string;
    title: string; 
    type: number; 
    size: number; 
    price: number;
    count?: number; 
  };
  
 export type CartState = {
    totalPrice: number;
    items: CartItem[];
    totalQty: number;
  };