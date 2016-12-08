# == Schema Information
#
# Table name: albums
#
#  id         :integer          not null, primary key
#  name       :string
#  genre      :string
#  band_id    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Album < ApplicationRecord
  validates :name, :band_id, presence: true

  has_many :tracks
  belongs_to :band
end
