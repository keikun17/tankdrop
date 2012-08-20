require 'rubygems'
require 'rufus/scheduler'

namespace :scheduler do
  desc "Runs Rufus scheduler to schedule jobs"
  task :work => :environment do
    scheduler = Rufus::Scheduler.start_new

    scheduler.every '1h' do 
      Feed.sync!
    end

  end
end

