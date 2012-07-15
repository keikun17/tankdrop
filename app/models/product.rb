class Product < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  mount_uploader :product_image, ProductImageUploader 

  attr_accessible :name,
    :product_image,
    :product_image_cache,
    :price,
    :path,
    :item_type

  def to_jquery_upload
    {
      "name" => read_attribute(:product_image),
      "price" => price,
      "size" => product_image.size,
      "url" =>  product_image.url,
      "item_type" => item_type,
      "thumbnail_url" => product_image.thumb.url,
      "delete_url" => product_path(:id => id),
      "delete_type" => "DELETE"
    }
  end
end
