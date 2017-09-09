# Deployment Progress

Simple deployment status app using Lambda and DynamoDB

## Setup

```bash
npm install
```

## Deploy

In order to deploy the endpoint simply run

```bash
serverless deploy
```

## Usage

You can update or list deployment status with the following commands:

### List state

```bash
curl https://XXXXXXX.execute-api.us-east-1.amazonaws.com/dev/state
```

### Update state

```bash
serverless invoke -f build-success -d '{ "service": "aService", "stage": "test", "buildNumber": 123, "url": "http://jenkins/path/to/build", "text": "v123" }'
```

or execute the lambda from your jenkins job with aws-cli
