class User < ActiveRecord::Base
  attr_accessible :battletag_d3, :name, :oath_expires_at, :oath_token, :provider, :uid, :facebook_url, 
    :image

  has_many :products

  def self.from_omniauth(auth)
    where(auth.slice(:provider, :uid)).first_or_initialize.tap do |user|
      user.provider = auth.provider
      user.uid = auth.uid
      user.name = auth.info.name
      user.image = auth.info.image
      user.facebook_url = auth.info.urls.Facebook
      user.oath_token = auth.credentials.token
      user.oath_expires_at = Time.at(auth.credentials.expires_at)
      user.save!
    end
  end
end
