require_relative 'db_connection'
require 'active_support/inflector'
# NB: the attr_accessor we wrote in phase 0 is NOT used in the rest
# of this project. It was only a warm up.

class SQLObject
  def self.columns
    return @columns if @columns
    col_strings =
      DBConnection.execute2(<<-SQL).first
        SELECT
          *
        FROM
          #{self.table_name}
      SQL
    @columns = col_strings.map(&:to_sym)
  end

  def self.finalize!
    self.columns.each do |col|
      define_method(col.to_s) do
        self.attributes[col]
      end

      define_method("#{col}=") do |val|
        self.attributes[col] = val
      end
    end
  end

  def self.table_name=(table_name)
    @table_name = table_name
  end

  def self.table_name
    @table_name ||= self.to_s.tableize
  end

  def self.all
    table = self.table_name
    results =
      DBConnection.execute(<<-SQL)
        SELECT
          #{table}.*
        FROM
          #{table}
      SQL
    parse_all(results)
  end

  def self.parse_all(results)
    results.map { |result| self.new(result) }
  end

  def self.find(id)
    table = self.table_name
    result =
      DBConnection.execute(<<-SQL)
        SELECT
          #{table}.*
        FROM
          #{table}
        WHERE
          id = #{id}
      SQL
    return nil if result.first.nil?
    self.new(result.first)
  end

  def initialize(params = {})
    params.each do |col, val|
      col = col.to_sym
      raise "unknown attribute '#{col}'" unless self.class.columns.include?(col)
      self.send("#{col}=".to_sym, val)
    end
  end

  def attributes
    @attributes ||= {}
  end

  def attribute_values
    self.attributes.values
  end

  def insert
    col_names = self.class.columns.drop(1).join(", ")
    question_marks = ["?"] * (self.class.columns.size - 1)
    question_marks = question_marks.join(", ")

    DBConnection.execute(<<-SQL, *self.attribute_values)
      INSERT INTO
        #{self.class.table_name} (#{col_names})
      VALUES
        (#{question_marks})
    SQL
    self.id = DBConnection.last_insert_row_id
  end

  def update
    column_names = self.class.columns.map { |attr| "#{attr} = ?" }.join(", ")
    DBConnection.execute(<<-SQL, *self.attribute_values, self.id)
      UPDATE
        #{self.class.table_name}
      SET
        #{column_names}
      WHERE
        #{self.class.table_name}.id = ?
    SQL
  end

  def save
    if self.id.nil?
      self.insert
    else
      self.update
    end
  end
end
