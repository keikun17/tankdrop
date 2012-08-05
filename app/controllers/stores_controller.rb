class StoresController < ApplicationController

  respond_to :html

  def show
    @user = User.find params[:id]
    @products = @user.products
    respond_with @products
  end

end

