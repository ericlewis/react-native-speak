// in your own application this would be: `import Speech from 'react-native-speak';`
import Speech, { GoogleProvider, PollyProvider } from '../src';

export const speech = new Speech([
  new GoogleProvider('AIzaSyDpa_MrHpW1kR31Q2fly90rJ8lRzJ5Tcw8'),
  new PollyProvider({
    signatureVersion: 'v4',
    region: 'us-east-1',
    accessKeyId: 'AKIAJIB47SDUAFNNGQWA',
    secretAccessKey: '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'
  })
]);
