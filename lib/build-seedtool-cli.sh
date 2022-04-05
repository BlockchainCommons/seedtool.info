#!/bin/bash

set -eu
set -o pipefail

SEEDTOOL_ROOT="$(cd "$(dirname "$BASH_SOURCE")/seedtool-cli"; pwd)"
SYSROOT="${SEEDTOOL_ROOT}/sysroot"
LIB="${SYSROOT}/lib"
INCLUDE="${SYSROOT}/include"

export CFLAGS="-O3 -I${INCLUDE}"
export CXXFLAGS="-O3 -I${INCLUDE}"
export LDFLAGS="-L${LIB}"

NUM_PROCESSES="$(( $(grep processor /proc/cpuinfo | wc -l) - 1 ))"

# Terminal colors
RED=`tput setaf 1`
GREEN=`tput setaf 2`
BLUE=`tput setaf 4`
RESET=`tput sgr0`

cd "$SEEDTOOL_ROOT"

# First, clean absolutely everything
(
    cd ../..
    git submodule update --recursive
    git submodule foreach --recursive git restore .
    git submodule foreach --recursive git clean -fdx
)

echo "${BLUE}== bc-crypto-base ==${RESET}"

pushd deps/bc-crypto-base
git am "${SEEDTOOL_ROOT}/../../patches/bc-crypto-base-fix-compiler-flags-for-seedpage.patch"
emconfigure ./configure --prefix ${SYSROOT}
emmake make -j${NUM_PROCESSES}
node test/test
emmake make install
popd

echo "${BLUE}== bc-shamir ==${RESET}"

pushd deps/bc-shamir
git am "${SEEDTOOL_ROOT}/../../patches/bc-shamir-fix-compiler-flags-for-seedpage.patch"
emconfigure ./configure --prefix ${SYSROOT}
emmake make -j${NUM_PROCESSES}
node test/test
emmake make install
popd

echo "${BLUE}== bc-sskr ==${RESET}"

pushd deps/bc-sskr
git am "${SEEDTOOL_ROOT}/../../patches/bc-sskr-fix-compiler-flags-for-seedpage.patch"
emconfigure ./configure --prefix ${SYSROOT}
emmake make -j${NUM_PROCESSES}
node test/test
emmake make install
popd

echo "${BLUE}== bc-bip39 ==${RESET}"

pushd deps/bc-bip39
git am "${SEEDTOOL_ROOT}/../../patches/bc-bip39-fix-compiler-flags-for-seedpage.patch"
emconfigure ./configure --prefix ${SYSROOT}
emmake make -j${NUM_PROCESSES}
node test/test
emmake make install
popd

echo "${BLUE}== bc-ur ==${RESET}"

pushd deps/bc-ur
git am "${SEEDTOOL_ROOT}/../../patches/bc-ur-fix-compiler-flags-for-seedpage.patch"
CFLAGS="$CFLAGS -fexceptions" CXXFLAGS="$CXXFLAGS -fexceptions" LDFLAGS="$LDFLAGS -fexceptions" emconfigure ./configure --prefix ${SYSROOT}
CFLAGS="$CFLAGS -fexceptions" CXXFLAGS="$CXXFLAGS -fexceptions" LDFLAGS="$LDFLAGS -fexceptions" emmake make -j${NUM_PROCESSES}
node test/test
emmake make install
popd

echo "${BLUE}== argp-standalone ==${RESET}"

pushd deps/argp-standalone/argp-standalone
patch -N <../patch-argp-fmtstream.h
emconfigure ./configure --prefix ${SYSROOT}
emmake make install -j${NUM_PROCESSES}
cp libargp.a ${SYSROOT}/lib/
cp argp.h ${SYSROOT}/include/
popd

echo "${BLUE}== seedtool ==${RESET}"

git am "${SEEDTOOL_ROOT}/../../patches/seedtool-cli-fix-compiler-flags-according-to-seedpage-s-needs.patch"
git am "${SEEDTOOL_ROOT}/../../patches/seedtool-cli-Adjust-unit-tests-for-WebAssembly.patch"
emconfigure ./configure
emmake make check -j${NUM_PROCESSES}
echo "${GREEN}*** Seedtool built.${RESET}"
