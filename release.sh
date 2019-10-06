#!/usr/bin/env sh

set -e
echo "Enter release version:"
read VERSION
VERSION=${VERSION//[vV]/""}
read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
  ENFORCE_PUSH=""
  read -p "Are you want to use enforce git push? This operation will destroy the commit timelines fatally (y/n)" -n 1 -r
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    ENFORCE_PUSH=" -f"
  fi
  echo "Releasing $VERSION ..."

  # commit
  if [ $(git tag -l "v$VERSION") ]
  then
    git tag -d "v$VERSION"
  fi
  git add .
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push$ENFORCE_PUSH origin master

  # publish
  npm publish --access=public
fi
