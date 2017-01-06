json.extract! @party, :name, :location
json.guests @party.guests do |guest|
  json.partial! 'api/guests/guest', guest: guest
  json.gifts guest.gifts do |gift|
      json.title gift.title
      json.description gift.description
  end
end
