def range(start, finish)
  return [] if finish < start
  return [start] if finish == start
  [start] + range(start + 1, finish)
end

def sum_array(arr = [])
  arr.size < 2 ? arr[0] : arr[0] + sum_array(arr[1..-1])
end

def sum_array_it(arr)
  arr.inject(:+)
end

def exp1(b, n)
  n == 0 ? 1 : b * exp1(b, n - 1)
end

def exp2(b, n)
  return 1 if n == 0
  if n == 1
    return b
  elsif n.even?
    exp2(b, n / 2) * exp2(b, n / 2)
  else
    b * (exp2(b, (n - 1) / 2) * exp2(b, (n - 1) / 2))
  end
end
