def subsets(array)
  return [array] if array.empty?
  prev_subsets = subsets(array[0..-2])
  result = prev_subsets.dup

  prev_subsets.each do |subset|
    result << subset.dup.push(array.last)
  end

  result



end
