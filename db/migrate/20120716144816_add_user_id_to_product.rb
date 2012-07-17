class AddUserIdToProduct < ActiveRecord::Migration
  def change
    add_column :products, :user_id, :integer
    add_column :products, :seller_contact, :string
  end
end
