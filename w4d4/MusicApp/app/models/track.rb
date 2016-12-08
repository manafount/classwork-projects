# == Schema Information
#
# Table name: tracks
#
#  id         :integer          not null, primary key
#  name       :string
#  album_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  bonus      :boolean
#

class Track < ApplicationRecord
  validates :name, :album_id, presence: true
  belongs_to :album
end
