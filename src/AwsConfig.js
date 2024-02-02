import { AwsRum } from 'aws-rum-web';


  const config = {
    sessionSampleRate: 1,
    guestRoleArn: "",
    identityPoolId: "",
    endpoint: "https://dataplane.rum.eu-west-1.amazonaws.com",
    telemetries: ["performance","errors","http"],
    allowCookies: true,
    enableXRay: false
  };

  const APPLICATION_ID = '';
  const APPLICATION_VERSION = '1.0.0';
  const APPLICATION_REGION = 'eu-west-1';

  const awsRum = new AwsRum(
    APPLICATION_ID,
    APPLICATION_VERSION,
    APPLICATION_REGION,
    config
  );
export default awsRum