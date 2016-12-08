class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :current_user

  def require_current_user!
    redirect_to new_session_url if current_user.nil?
  end

  def require_owner
    redirect_to new_session_url unless
      current_user.cats.exists?(id: params[:id])
  end

  def login_user!(user)
    @current_user = user
    session[:session_token] = user.session_token
  end

  def logout!
    current_user.reset_session_token! if current_user
    session[:session_token] = nil
  end

  def current_user
    return nil if session[:session_token].nil?
    @current_user ||= User.find_by(session_token: session[:session_token])
  end
end
