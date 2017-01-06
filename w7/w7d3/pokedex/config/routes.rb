Rails.application.routes.draw do
  namespace :api do
  get 'items/show'
  end

  get 'items/show'

  root to: 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    resources :pokemon, except: [:edit, :new] do
      resources :items, only: [:show]
    end
  end
end
