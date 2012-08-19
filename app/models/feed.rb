class Feed < Ohm::Model

  attribute :post_id
  index :post_id
  
  def initialize(options = {})
    @post_id ||= options[:id]
    options.delete(:id)
    super
  end


  def self.sync!(options = {})
    feeds = fetch_all_within
    feeds.each do |feed_args|
      feed = Feed.new feed_args
      feed.save
    end
  end

  def self.fetch_all_within(options = {})
    options[:since] ||= 1.days.ago.to_s
    client = FBGraph::Client.new(:token => 'AAACEdEose0cBAEYRjVnFWbNQOkrz1Qv8IeTmur1mkaMncpzE6vtaAZBKxDjMXEAcVqhvWAFpaipyDYyAv4oMjGHYPHqDtRqYIm8EjHdZBZCbWGIcSuh') 
    results = client.selection.group('420341911349426').feed.since(options[:since]).info!
    data = results.data.data.each{|result| result.to_hash}
    return results
  end
end
