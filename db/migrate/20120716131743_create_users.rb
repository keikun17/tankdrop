class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :provider
      t.string :uid
      t.string :name
      t.string :oath_token
      t.datetime :oath_expires_at
      t.string :battletag_d3
      t.string :facebook_url
      t.string :image
      t.timestamps
    end
  end
end
