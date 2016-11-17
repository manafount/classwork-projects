require 'byebug'

def greedy_make_change(amount, coins = [25, 10, 5, 1])
  return [] if amount.zero? || coins.nil?
  results = []
  (amount / coins[0]).times { results << coins[0] }
  results + greedy_make_change(amount % coins[0], coins[1..-1])
end

def make_better_change(amount, coins = [25, 10, 5, 1])
  # debugger
  return [] if amount <= 0
  best_solution = nil
  coins.each do |coin|
    next if coin > amount
    solution = []
    new_amount = amount - coin
    solution << coin if amount >= coin
    new_coins = coins.select { |c| c <= coin }
    change_for_remainder = make_better_change(new_amount, new_coins)
    next if change_for_remainder.nil?
    solution += change_for_remainder
    best_solution = solution if best_solution.nil? || solution.length < best_solution.length
  end

  best_solution
end
