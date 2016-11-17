class Array

  def deep_dup
    return self.dup unless self.any? { |el| el.is_a?(Array) }
    result = []
    self.each do |el|
      el.is_a?(Array) ? result << el.deep_dup : result << el
    end
    result
  end

end
