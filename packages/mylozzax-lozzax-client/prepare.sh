#!/usr/bin/env bash

set -e # Exit on any error

# Dependencies

## These should be audited!
mylozzax_core_cpp_url='https://github.com/mylozzax/mylozzax-core-cpp'
mylozzax_core_cpp_hash='69408962a900c64483311c42768fa876381d3d57'
lozzax_core_custom_url='https://github.com/mylozzax/lozzax-core-custom'
lozzax_core_custom_hash='c601fdc3a7aa0c449a3e2c99df230f503fb67e3c'

if [ "$(basename "$(pwd)")" != "mylozzax-core-js" ]; then
  echo "Should be ran from the repo dir!"
  exit 1
fi

function clonerepo { # source, target, commit
  rm -rf "$2"
  oldpwd="$(pwd)"

  git clone "${1}" "${2}" || exit 1
  cd "$2"
  git reset --hard "$3" || exit 1
  if [ "$(git rev-parse HEAD)" != "$3" ]; then
    echo "Wrong HEAD!"
    exit 1
  fi

  cd "$oldpwd"
}

# Clone dependencies

echo "Cloning dependencies..."
rm -rf 'src/submodules' && mkdir -p 'src/submodules'
clonerepo "${mylozzax_core_cpp_url}" 'src/submodules/mylozzax-core-cpp' #"${mylozzax_core_cpp_hash}"
clonerepo "${lozzax_core_custom_url}" 'src/submodules/lozzax-core-custom' #"${lozzax_core_custom_hash}"

# Prepare for build

echo "Clearing the build dir..."
rm -rf build && mkdir build

# Finished

echo "All done! We are prepared for the build now."