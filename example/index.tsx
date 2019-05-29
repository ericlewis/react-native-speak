/**
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  AppRegistry,
  Button,
  KeyboardAvoidingView,
  Picker,
  StyleSheet,
  TextInput,
  View
} from 'react-native';

// in your own application this would be: `import Speech from 'react-native-speech';`
import Speech, { Voice } from '../src';
const speech = new Speech();

interface Props {}
const App: React.FunctionComponent<Props> = () => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string | undefined>(
    undefined
  );
  const [selectedProvider, setSelectedProvider] = useState(
    speech.getCurrentProvider()
  );

  function speak() {
    if (value) {
      speech.speak(value, { voiceId: selectedVoice });
    }
  }

  useEffect(() => {
    async function setup() {
      const res = await speech.getVoices();
      setVoices(res);
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
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Say it!"
            disabled={!value || value.length <= 0}
            onPress={speak}
          />
        </View>
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
