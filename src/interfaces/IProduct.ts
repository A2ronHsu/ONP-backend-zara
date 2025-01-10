export default interface IProduct {
  id: string;
  product_category_id: string;
  home: boolean;
  larger_home_image_url: string | null;
  small_home_image_url: string | null;
}
