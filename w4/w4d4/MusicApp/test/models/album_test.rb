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

require 'test_helper'

class AlbumTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
