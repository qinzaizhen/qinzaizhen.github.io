echo "Start deployment"
cd ~/blog/blog
echo "pulling source code..."
git reset --hard
git pull origin hexo  
npm i
hexo clean
hexo g
hexo d
echo "Finished."