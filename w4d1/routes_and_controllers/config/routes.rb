Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # resource :users
  # get 'users/new' => 'users#new', :as => 'user'
  # get 'users/edit' => 'users#edit'
  # get 'users/' => 'users#index', :as => 'users'
  # get 'users/' => 'users#show'
  # put 'users/' => 'users#update'
  # patch 'users/' => 'users#update'
  # delete 'users/' => 'users#destroy'
  # post 'users/' => 'users#create'
  resources :users, :only => [:create, :destroy, :index, :show, :update] do
      resources :contacts, :only => [:index]
  end

  resource :contact_shares
end
