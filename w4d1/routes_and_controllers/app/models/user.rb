# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  username   :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord
  validates :username, presence: true, uniqueness: true

  has_many :contacts

  has_many :contact_shares

  has_many :shared_contacts,
  through: :contact_shares,
  source: :contact_id
end
