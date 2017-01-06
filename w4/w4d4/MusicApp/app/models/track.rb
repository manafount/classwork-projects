# == Schema Information
#
# Table name: tracks
#
#  id         :integer          not null, primary key
#  name       :string
#  album_id   :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  bonus      :boolean          default("false")
#  ord        :integer
#  lyrics     :string
#

class Track < ApplicationRecord
  validates :name, :album_id, :ord, presence: true
  belongs_to :album
end
