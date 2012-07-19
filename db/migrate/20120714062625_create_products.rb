class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :title
      t.string :name
      t.string :product_image
      t.integer :price
      t.string :item_type
      t.timestamps
    end
  end
end
