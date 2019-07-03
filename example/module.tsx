// in your own application this would be: `import Speech from 'react-native-speak';`
import { GoogleProvider } from '@react-native-speak/google';
import Speech from '../src';

export const speech = new Speech([
  new GoogleProvider('AIzaSyDpa_MrHpW1kR31Q2fly90rJ8lRzJ5Tcw8')
]);
