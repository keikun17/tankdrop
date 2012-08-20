class AddFbPostIdToProducts < ActiveRecord::Migration
  def change
    add_column :products, :fb_post_id, :bigint
  end
end
