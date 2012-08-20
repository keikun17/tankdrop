module ApplicationHelper

  def display_price(product)
    if product.price.to_i > 0
      price = "#{product.price.to_i}"
      price += " #{product.currency.upcase}" if product.currency
    else
      price = "Bid"
    end
    return price
  end
  
  def display_thumbnail(product)
    if product.from_fb_feed?
      image_path = image_tag('/assets/tipid_d3.jpg')
    else
      image_path = image_tag(product.product_image.url(:squared))
    end
      link_to(image_path, product, :title => product.title)
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
