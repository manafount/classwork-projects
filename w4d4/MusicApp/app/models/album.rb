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
#  live       :boolean          default("false")
#

class Album < ApplicationRecord
  validates :name, :band_id, :genre, presence: true

  has_many :tracks, dependent: :destroy
  belongs_to :band
end
