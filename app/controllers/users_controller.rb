class UsersController < ApplicationController

  respond_to :html

  def store
    @user = User.find params[:id]
    @products = @user.products
    respond_with @products
  end

end
