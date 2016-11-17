require 'set'

class WordChainer
  attr_reader :dictionary, :current_words, :word

  def initialize
    @dictionary = File.readlines("dictionary.txt").map(&:chomp).to_set
  end

  def adjacent_words(word)
    new_dictionary = []
    word.length.times do |i|
      current_reg = word.dup
      current_reg[i] = "."
      new_dictionary += @dictionary.select { |entry| entry.match("^#{current_reg}$") }
      current_reg = ""
    end
    new_dictionary
  end

  def run(start, target)
    @current_words = [start]
    @all_seen_words = [start]
    @current_word = start

    #WTF LOOPS
    until @current_words.empty?
      @current_words.each do |cw|
        @new_current_words = []
        adjacent_words(@current_word).each do |word|
          @new_current_words << word unless @all_seen_words.include?(word)
        end
      end
    end




  end

end


if $PROGRAM_NAME == __FILE__
  wc = WordChainer.new
  #puts wc.dictionary
end
