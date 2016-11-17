def fibonacci(n)
  return [0] if n == 1

  prev_fib = fibonacci(n-1)
  prev_fib << (prev_fib[-1] + (prev_fib[-2] || 1))

end
