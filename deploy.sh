
cd ~/blog/
git reset --hard
git pull origin hexo  
npm i
hexo clean
hexo g
envId = 'blog-9g34xf9h8347e952'
cloudbase hosting:delete / -e envId
cloudbase hosting:deploy public -e envId