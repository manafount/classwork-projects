def permutations(array)
  return [array] if array.size <= 1
  prev_perm = permutations(array[0..-2])
  result = []
  last_el = array[-1]
  prev_perm.each do |sub_array|
    array.size.times do |i|
      result << sub_array.dup.insert(i, last_el)
    end
  end
  result
end
