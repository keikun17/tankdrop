class StoresController < ApplicationController

  respond_to :html

  def show
    @user = User.find params[:id]
    @products = @user.products.paginate(per_page: 16, page: params[:page]).sort_by_bump
    respond_with @products
  end

end

