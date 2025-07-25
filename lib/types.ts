export type ShopList = {
  id: number;
  name: string;
  link: string;
};

export type TShoppingList = {
  shoppingList: Array<ShopList>;
};
