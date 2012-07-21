class ProductsController < ApplicationController

  respond_to :html, :json

  def new
    @product = Product.new

    respond_with @product
  end

  def index
    if params[:search]
      @products = Product.where("price <= ?", params[:search])
      @products = @products.paginate(per_page: 16, page: params[:page])
      @products = @products.order("price desc")
    else
      @products = Product.paginate(per_page: 16, page: params[:page]).sort_by_bump 
    end
    respond_with(@products) do |format|
      format.html
      #[TODO] Refactor this method # split the concern for 
      # 1. access on main page by a user (show all / normal cruddy stuff)
      # 2. access by json from the product/upload page
      format.json do 
        if current_user
          render :json => current_user.products.collect{|product| product.to_jquery_upload }.to_json
        else
          render :json => [].to_json
        end
      end
    end
  end

  def retrieve_products
    @products = Product.all

    render :json => @products.collect{|product| product.to_jquery_upload }.to_json
  end

  def upload
    
  end

  
  def create
    @product = Product.new(params[:product])

    if current_user
      @product.user = current_user
    end

    if @product.save
      respond_to do |format|
        format.html {  
          render :json => [@product.to_jquery_upload].to_json, 
          :content_type => 'text/html',
          :layout => false
        }
        format.json {  
          render :json => [@product.to_jquery_upload].to_json			
        }
      end
    else
      render :json => [{:error => "unable to create image"}], :status => 304
    end
  end

  def comment
    @product = Product.find(params[:id])

    @comment = @product.comments.new(params[:comment])
    @comment.user = current_user if current_user

    if @comment.save
      redirect_to product_path(@product)
    else
      render 'comment'
    end
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy

    render :json => true
  end

  def show
    @product = Product.find(params[:id])

    if current_user
      @comment = Comment.new(user: current_user)
    else
      @comment = Comment.new
    end
  end

end
