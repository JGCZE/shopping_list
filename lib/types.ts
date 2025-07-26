type TItem = {
  id: string;
  name: string;
  amount: number;
};

export type TShopList = {
  id: number;
  name: string;
  link: string;
  items: Array<TItem>;
};

export type TShoppingList = {
  shoppingList: Array<TShopList>;
};
