class Product < ActiveRecord::Base
  include Rails.application.routes.url_helpers
  mount_uploader :product_image, ProductImageUploader 

  belongs_to :user
  validates :user_id, presence: true, if: "seller_identifier.blank?"
  validates :seller_identifier, presence: true, if: "user_id.blank?"

  attr_accessible :name,
    :product_image,
    :product_image_cache,
    :price,
    :path,
    :item_type,
    :seller_identifier


  def to_jquery_upload
    {
      name: read_attribute(:product_image),
      price: price,
      size: product_image.size,
      url:  product_image.url,
      item_type: item_type,
      thumbnail_url: product_image.thumb.url,
      delete_url: product_path(id: id),
      delete_type: "DELETE",
      seller_identifier: seller_identifier
    }
  end

  def display_seller
    if self.user.present?
      self.user.battletag_d3
    else
      self.seller_identifier
    end

  end

end
