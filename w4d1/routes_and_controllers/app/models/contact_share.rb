# == Schema Information
#
# Table name: contact_shares
#
#  id         :integer          not null, primary key
#  contact_id :integer
#  user_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ContactShare < ApplicationRecord
  validates :user_id, :contact_id, presence: true
  validates :user_id, uniqueness: { scope: :contact_id }

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User,
  dependent: :destroy

  belongs_to :contact,
  primary_key: :id,
  foreign_key: :contact_id,
  class_name: :Contact

end
