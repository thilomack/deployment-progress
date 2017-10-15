# Deployment Progress

Simple deployment status app using Lambda and DynamoDB

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
S3BUCKET=<name of deployment bucket> ./deploy-api.sh
```

### List state

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/state
```

### Update state

```bash
aws lambda invoke --function-name deployment-progress-test-build-success --log-type Tail --payload '{ "service": "aService", "stage": "test", "buildNumber": 123, "url": "http://jenkins/path/to/build", "text": "v123" }' output.json
```

or call the lambda from your jenkins job with [invokeLambda](https://github.com/jenkinsci/pipeline-aws-plugin#invokelambda)
