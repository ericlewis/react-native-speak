/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Alert,
  AppRegistry,
  Button,
  KeyboardAvoidingView,
  Picker,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

// in your own application this would be: `import Speech from 'react-native-speech';`
import Speech, { GoogleProvider, PollyProvider, Voice } from '../src';
const speech = new Speech([
  new GoogleProvider('AIzaSyC5f8uwyf1frmbIeLz0s5UfaHwDwGBBmgw'),
  new PollyProvider({
    signatureVersion: 'v4',
    region: 'us-east-1',
    accessKeyId: 'AKIAJIB47SDUAFNNGQWA',
    secretAccessKey: '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'
  })
]);

interface Props {}
const App: React.FunctionComponent<Props> = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(
    undefined
  );
  const [isSpeaking, setSpeaking] = useState(false);

  const [selectedProvider, setSelectedProvider] = useState(
    speech.getCurrentProvider()
  );

  function speak() {
    if (value) {
      speech.speak(value, { voiceId: selectedVoice });
    }
  }

  useEffect(() => {
    const speechLoadingListener = speech.events.addListener(
      speech.constants.events.SPEECH_LOADING_EVENT,
      () => {
        setSpeaking(true);
      }
    );

    const speechStartListener = speech.events.addListener(
      speech.constants.events.SPEECH_START_EVENT,
      () => {
        setSpeaking(true);
      }
    );

    const speechEndListener = speech.events.addListener(
      speech.constants.events.SPEECH_END_EVENT,
      () => {
        setSpeaking(false);
      }
    );

    const speechErrorListener = speech.events.addListener(
      speech.constants.events.SPEECH_ERROR_EVENT,
      error => {
        Alert.alert(error.message);
        setSpeaking(false);
      }
    );

    return () => {
      speechLoadingListener.remove();
      speechStartListener.remove();
      speechEndListener.remove();
      speechErrorListener.remove();
    };
  });

  useEffect(() => {
    async function setup() {
      speech.setCurrentProvider(selectedProvider);
      const res = await speech.getVoices();
      setVoices(res);
      setSelectedVoice(res[0].id);
    }

    setup();
  }, [selectedProvider]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={styles.input}>
          <TextInput
            placeholder="Type something to say..."
            onChangeText={setValue}
            value={value}
            onSubmitEditing={speak}
          />
        </View>
        <Button
          title={isSpeaking ? 'Speaking...' : 'Say it!'}
          disabled={!value || value.length <= 0 || isSpeaking}
          onPress={speak}
        />
        <Picker
          onValueChange={provider => {
            setSelectedProvider(provider);
          }}
          selectedValue={selectedProvider}
        >
          {speech.getProviders().map(provider => {
            return (
              <Picker.Item key={provider} label={provider} value={provider} />
            );
          })}
        </Picker>
        <Picker
          onValueChange={voice => {
            setSelectedVoice(voice);
          }}
          selectedValue={selectedVoice}
        >
          {voices.map(voice => {
            const { id, name } = voice;
            return <Picker.Item key={id} label={name} value={voice.id} />;
          })}
        </Picker>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  input: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('example', () => App);
