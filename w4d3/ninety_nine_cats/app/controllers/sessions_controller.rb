class SessionsController < ApplicationController
  before_action :require_current_user!, except: [:create, :new]

  def new
  end

  def create
    user = User.find_by_credentials(
      session_params[:username],
      session_params[:password])

    if user
      login_user!(user)
      redirect_to cats_url
    else
      render :new
    end
  end

  def destroy
    logout!
    redirect_to new_session_url
  end

  private

  def session_params
    params
      .require(:user)
      .permit(:username, :password, :password_digest, :session_token)
  end
end
