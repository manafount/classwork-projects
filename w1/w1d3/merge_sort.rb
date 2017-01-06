def merge_sort(array)
  return array if array.length <= 1
  middle = array.size / 2
  first_half = array[0...middle]
  second_half = array[middle..-1]

  merge(merge_sort(first_half), merge_sort(second_half))
end

def merge(first_half, second_half)
  result = []
  until first_half.empty? || second_half.empty?
    if first_half.first < second_half.first
      result << first_half.shift
    else
      result << second_half.shift
    end
  end

  first_half.empty? ? result += second_half : result += first_half

  result
end
