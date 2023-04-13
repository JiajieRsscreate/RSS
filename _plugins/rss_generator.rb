require 'rss'

module Jekyll
  class RssGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      # create a new RSS feed
      rss = RSS::Maker.make("2.0") do |maker|
        maker.channel.author = site.config["author_name"]
        maker.channel.about = site.config["url"]
        maker.channel.title = site.config["title"]
        maker.channel.link = site.config["url"]
        maker.channel.description = site.config["description"]

        site.posts.each do |post|
          maker.items.new_item do |item|
            item.link = post.url
            item.title = post.title
            item.description = post.content
            item.date = post.date
          end
        end
      end

      # write the RSS feed to a file
      File.open("rss.xml", "w") do |file|
        file.write(rss.to_xml)
      end
    end
  end
end
