class Product < ActiveRecord::Base
  attr_accessible :name,
    :product_image,
    :product_image_cache,
    :price

  mount_uploader :product_image, ProductImageUploader 
end
