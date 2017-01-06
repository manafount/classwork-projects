class UsersController < ApplicationController
  before_action :require_current_user!, except: [:create, :new]

  def new
  end

  def create
    user = User.new(user_params)
    if user.save!
      login_user!(user)
      redirect_to bands_url
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user)
          .permit(:email, :password, :password_digest, :session_token)
  end
end
