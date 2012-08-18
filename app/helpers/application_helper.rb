module ApplicationHelper

  def display_price(product)
    if product.price.to_i > 0
      price = "#{product.price}"
    else
      price = "Bid"
    end
    return price
  end

  def display_title(product, options = {})
    unless product.title.blank?
      title = product.title
    else
      title = "Product ##{product.id}"
    end
    return truncate(title, length: options[:truncate].to_i, omission: "...")
  end

  def display_bid(comment)
    if comment.bid_amount
      return content_tag :span, class: "badge badge-warning" do
        "Bidding " + comment.bid_amount.to_s
      end
    end
  end

  def display_commenter(comment)
    html = ""
    if comment.user
      html = "<i class='icon-facebook-sign'></i>"
      html = html + " " + link_to(comment.display_user, comment.user.facebook_url)
    else
      html = "<i class='icon-user' /></i>"
      html = html + " " + comment.display_user
    end
    return raw(html)
  end

end
