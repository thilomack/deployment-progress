#!/bin/bash -ex
out="tmp.txt"
aws lambda invoke --function-name deployment-progress-test-build-success --log-type Tail --payload '{ "service": "aService", "text": "v1.3", "url": "http://jenkins/path/to/build", "stage": "test", "buildNumber": 3 }' $out
aws lambda invoke --function-name deployment-progress-test-build-success --log-type Tail --payload  '{ "service": "aService", "text": "v1.3", "url": "http://jenkins/path/to/build", "stage": "preprod", "buildNumber": 3 }' $out
aws lambda invoke --function-name deployment-progress-test-build-success --log-type Tail --payload '{ "service": "aService", "text": "v1.1", "url": "http://jenkins/path/to/build", "stage": "prod", "buildNumber": 1 }' $out
aws lambda invoke --function-name deployment-progress-test-build-success --log-type Tail --payload '{ "service": "bService", "text": "0.1.0r205", "url": "http://jenkins/path/to/build", "stage": "test", "buildNumber": 205 }'  $out
aws lambda invoke --function-name deployment-progress-test-build-success --log-type Tail --payload '{ "service": "bService", "text": "0.1.0r205", "url": "http://jenkins/path/to/build", "stage": "preprod", "buildNumber": 205 }' $out
aws lambda invoke --function-name deployment-progress-test-build-success --log-type Tail --payload '{ "service": "bService", "text": "0.1.0r205", "url": "http://jenkins/path/to/build", "stage": "prod", "buildNumber": 205 }' $out
cat $out
rm $out
