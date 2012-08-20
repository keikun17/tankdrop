class Feed < Ohm::Model

  ACCESS_TOKEN = 'AAACEdEose0cBAKetDVYjqKSXFUCcjDuBJ5LHYkT4zatsA7uVZBGYPLbqq9aWG8WRLUu58a0gUUMUgy5t3geL2TBpPzjwvEScX7ZBlBNg2RI4jRA76T'
  attribute :id
  attribute :post_id
  attribute :from_name
  attribute :from_id
  attribute :to
  attribute :message
  attribute :picture
  attribute :link
  attribute :icon
  attribute :actions
  attribute :type
  attribute :object_id
  attribute :created_time
  attribute :updated_time
  attribute :comments
  attribute :likes
  attribute :message_tags
  attribute :name
  attribute :caption
  attribute :description

  index :id
  unique :id
  index :type

  def initialize(options = {})
    if fresh_args?(options)
      options = extract_poster(options)
      options = remove_unwanted_keys(options)
    end
    super
  end

  def fresh_args?(options)
    !options.has_key?(:id)
  end

  def extract_poster(options)
   options[:from_name] = options['from']['name']
   options[:from_id] = options['from']['id']
   options.delete('from')
   options
  end

  def remove_unwanted_keys(options)
    options.delete('comments')
    options.delete('actions')
    options
  end

  def self.sync!(options = {})
    feeds = fetch_all_within
    feeds.each do |feed_args|
      feed = Feed.new feed_args.to_hash
      feed.save
    end
    insert_feeds_to_products
  end

  def self.fetch_all_within(options = {})
    options[:since] ||= 1.days.ago.to_s
    client = FBGraph::Client.new(token: ACCESS_TOKEN)
    results = client.selection.group('420341911349426').feed.since(options[:since]).info!
    data = results.data.data.map{|result| result.to_hash}
    return data
  end

  def self.insert_feeds_to_products
    Feed.find(type: 'photo').to_a.each do |feed|
      feed.insert_product_record
    end
  end

  def insert_product_record
    if product.nil?
      Product.create(
        title: self.message,
        seller_contact: "#{self.from_name} @ http://www.facebook.com/#{self.from_id}",
        fb_post_id:  self.id
      )
    end
  end

  def product
    product = Product.find_by_fb_post_id(self.id)
  end
end
