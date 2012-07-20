class Comment < ActiveRecord::Base

  attr_accessible :title, :comment, :visitor_name, :user, :bid_amount

  include ActsAsCommentable::Comment

  belongs_to :commentable, polymorphic: true, touch: true

  scope :with_bid, lambda{ where("bid_amount is not null").order("bid_amount desc")}
  default_scope -> { order('created_at ASC') }

  # NOTE: install the acts_as_votable plugin if you
  # want user to vote on the quality of comments.
  #acts_as_voteable

  # NOTE: Comments belong to a user
  belongs_to :user

  def display_user
    if user
      user.name
    else
      visitor_name
    end
  end

  def seller?
    user and commentable.user and user.id == commentable.user.id
  end
end
