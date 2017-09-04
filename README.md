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
serverless invoke -f update -d '{ "service": "aService", "stage": "dev", "buildNumber": 123, "text": "yay it works!" }'
```

or execute the lambda from your jenkins job with aws-cli
