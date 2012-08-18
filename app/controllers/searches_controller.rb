class SearchesController < ApplicationController
  respond_to :html

  def search
    @products = Product.where("price <= ?", params[:search])
    @products = @products.where(currency: params[:currency].downcase)
    @products = @products.paginate(per_page: 16, page: params[:page])
    @products = @products.order("price desc")
    respond_with(@products)
  end
end
