require 'bundler/capistrano'
require 'rvm/capistrano'

set :application, "tankdrop"
set :repository,  "git@github.com:keikun17/tankdrop.git"
set :scm, 'git'

# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

#role :web, "your web-server here"                          # Your HTTP server, Apache/etc
#role :app, "your app-server here"                          # This may be the same as your `Web` server
#role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

set :rails_env, "production"
default_run_options[:pty] = true

task :production do
  set :branch, 'master'
  set :user, 'deploy'
  set :ssh_options, {:forward_agent => true}
  role :web, "106.187.50.117"
  role :app, "106.187.50.117"
  role :db, "106.187.50.117", :primary => true
end

set :deploy_to, "/home/deploy/apps/#{application}"
set :deploy_via, :checkout

namespace :symlink do
  task :db, :except => {:norelease => true} do
    run "ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml" 
  end
  task :uploads, :except => {:norelease => true} do
    run "ln -nfs #{shared_path}/uploads #{release_path}/public/uploads" 
  end
end

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
 namespace :deploy do
   task :start do ; end
   task :stop do ; end
   task :restart, :roles => :app, :except => { :no_release => true } do
     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
   end
 end
#

after "deploy:finalize_update", "symlink:db"
after "deploy:finalize_update", "symlink:uploads"

