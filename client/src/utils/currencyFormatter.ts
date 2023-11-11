export const currenyFormatter = (price: number): string => {
   const currency = Intl.NumberFormat("en-US", {
      currency: "PHP",
      style: "currency",
   });
   return currency.format(price);
};
