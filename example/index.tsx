/**
 * @format
 */

import React, { useState } from 'react';
import {
  AppRegistry,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import Speech from '../';

interface Props {}
const App: React.FunctionComponent<Props> = () => {
  const [value, setValue] = useState(null);
  const speech = new Speech();
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
            onPress={() => {
              speech.speak(value);
            }}
          />
        </View>
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
    flex: 1,
    alignItems: 'center'
  }
});

AppRegistry.registerComponent('example', () => App);
