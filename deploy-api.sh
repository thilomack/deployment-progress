#!/bin/bash -e
STAGE=${STAGE:-test}
aws cloudformation package \
  --template-file sam-template.yml \
  --s3-bucket $S3BUCKET \
  --s3-prefix deploy/deployment-progress \
  --output-template-file tmp.yml
aws cloudformation deploy \
  --template-file tmp.yml \
  --stack-name deployment-progress-${STAGE} \
  --parameter-overrides Stage=${STAGE} \
  --capabilities CAPABILITY_IAM
