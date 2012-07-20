module ApplicationHelper
  def display_price(product)
    if product.price
      price = "#{product_price} Gold"
    else
      price = "Bid"
    end
    return price
  end

  def display_title(product)
    unless product.title.blank?
      title = product.title
    else
      title = "Product ##{product.id}"
    end
    return title
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
    else
      html = "<i class='icon-user' /></i>"
    end
    html = html + " " + comment.display_user
    return raw(html)
  end

end
