#!/bin/bash -ex
cd ui
polymer build
aws s3 sync --delete ./build/default/ $UI_S3URL
