def bsearch (array, target)

  array.sort!
# return nil unless array.include?(target)

  middle = array.size / 2
  return middle if array[middle] == target

  if target < array[middle]
    return bsearch(array[0...middle], target)
  else
    return middle + 1 + bsearch(array[middle + 1..-1], target)
  end

  nil

end
