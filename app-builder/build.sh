#!/bin/bash

# 设置 npm 仓库
# nrm add registry $NPM_REGISTRY
# nrm use registry

# npm 依赖下载
# npm i

# 执行构建
npm install

npm run build

npm run build:app
