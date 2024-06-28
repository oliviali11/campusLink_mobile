import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const handleSendMessage = async () => {
    try {
      const res = await axios.post('http://127.0.0.1:5000/chat', { message });
      setResponse(JSON.stringify(res.data));
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chatbot</Text>
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message here"
      />
      <Button title="Send" onPress={handleSendMessage} />
      <View style={styles.responseContainer}>
        <Text style={styles.responseTitle}>Response:</Text>
        <Text style={styles.responseText}>{response || 'No response yet.'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
  responseContainer: {
    marginTop: 20,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  responseText: {
    fontSize: 16,
  },
});

export default Chatbot;