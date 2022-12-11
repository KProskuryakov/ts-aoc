#!/usr/bin/env sh


# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'www.saunter.dev' > CNAME

git init
git checkout -b main || git checkout main
git add -A
git commit -m 'deploy'

git push -f git@github.com:KProskuryakov/saunter-dev.git main

cd -