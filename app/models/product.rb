class Product < ActiveRecord::Base
  include Rails.application.routes.url_helpers

  mount_uploader :product_image, ProductImageUploader 
  acts_as_commentable

  belongs_to :user
  validates :user_id, presence: true, if: "seller_contact.blank?"
  validates :seller_contact, presence: true, if: "user_id.blank?"
  scope :sort_by_bump, order: "updated_at desc"

  attr_accessible :name,
    :product_image,
    :product_image_cache,
    :price,
    :path,
    :item_type,
    :seller_contact,
    :title


  def to_jquery_upload
    {
      name: read_attribute(:product_image),
      price: price,
      size: product_image.size,
      url:  product_path(self),
      item_type: item_type,
      thumbnail_url: product_image.thumb.url,
      delete_url: product_path(id: id),
      delete_type: "DELETE",
      seller_contact: seller_contact,
      title: title
    }
  end

  def display_seller
    if self.user.present?
      self.user.name
    else
      self.seller_contact
    end

  end

  def progress
    bid_progress = "5"
    top_bid = comments.with_bid.first

    if top_bid
      if top_bid.bid_amount > self.price
        bid_progress = "100%"
      else
        bid_progress = top_bid.bid_amount*100 / self.price
        if bid_progress < 5
          bid_progress = "5"
        else
          bid_progress = bid_progress.to_i.to_s
        end
      end
    end

    return bid_progress
  end

end
