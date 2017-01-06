class ContactSharesController < ApplicationController

  def create
    cs = ContactShare.new(contact_share_params)
    
    if cs.save
      render json: cs
    else
      render json: cs.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    cs = ContactShare.find(params[:id])

    if cs.destroy
      render json: cs
    else
      render json: cs.errors.full_messages, status: :unprocessable_entity
    end
  end

  private
  def contact_share_params
    params.require(:contact_share).permit(:user_id, :contact_id)
  end
end
