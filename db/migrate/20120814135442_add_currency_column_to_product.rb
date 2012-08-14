class AddCurrencyColumnToProduct < ActiveRecord::Migration
  def up 
    change_table :products do |t|
      t.string :currency
    end
    Product.update_all(["currency = ?", 'gold'])
  end

  def down
    remove_column :products, :currency
  end
end
