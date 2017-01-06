class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.string :name
      t.string :genre
      t.integer :band_id
      t.timestamps
    end
  end
end
