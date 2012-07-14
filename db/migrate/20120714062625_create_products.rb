class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :product_image
      t.string :price
      t.timestamps
    end
  end
end
