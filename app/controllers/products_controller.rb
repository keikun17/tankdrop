class ProductsController < ApplicationController

  respond_to :html

  def new
    @product = Product.new
    respond_with @product
  end

  def index

  end

  def create
    @product = Product.new(params[:product])
    @product.save
    respond_with @product
  end

  def show
    @product = Product.find params[:id]
  end

end
