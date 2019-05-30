// in your own application this would be: `import Speech from 'react-native-speech';`
import Speech, { GoogleProvider, PollyProvider } from '../src';

export const speech = new Speech([
  new GoogleProvider('AIzaSyC5f8uwyf1frmbIeLz0s5UfaHwDwGBBmgw'),
  new PollyProvider({
    signatureVersion: 'v4',
    region: 'us-east-1',
    accessKeyId: 'AKIAJIB47SDUAFNNGQWA',
    secretAccessKey: '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'
  })
]);
