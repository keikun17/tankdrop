class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user

  before_filter :set_current_user

  private

  def set_current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def current_user
    @current_user
  end

end
