import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LogEntry {
  id: string;
  country: string;
  date: string;
  text: string;
  emoji: string;
}

const ExplorerLogScreen = () => {
  const navigation = useNavigation();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [country, setCountry] = useState('');
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('😊');

  const emojis = ['😊', '🌟', '🌍', '📚', '🎯', '💡'];

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const savedLogs = await AsyncStorage.getItem('logs');
      if (savedLogs) {
        setLogs(JSON.parse(savedLogs));
      }
    } catch (error) {
      console.error('Error loading logs:', error);
    }
  };

  const saveLogs = async (newLogs: LogEntry[]) => {
    try {
      await AsyncStorage.setItem('logs', JSON.stringify(newLogs));
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  };

  const handleSave = () => {
    if (country && text) {
      const newLog: LogEntry = {
        id: Date.now().toString(),
        country,
        date: new Date().toLocaleDateString(),
        text,
        emoji: selectedEmoji,
      };

      const newLogs = [...logs, newLog];
      setLogs(newLogs);
      saveLogs(newLogs);

      setCountry('');
      setText('');
      setSelectedEmoji('😊');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Kaşif Günlüğü</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ülke Adı"
          value={country}
          onChangeText={setCountry}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Günlük Girişi"
          value={text}
          onChangeText={setText}
          multiline
          numberOfLines={4}
        />

        <View style={styles.emojiContainer}>
          {emojis.map((emoji) => (
            <TouchableOpacity
              key={emoji}
              style={[
                styles.emojiButton,
                selectedEmoji === emoji && styles.selectedEmoji,
              ]}
              onPress={() => setSelectedEmoji(emoji)}
            >
              <Text style={styles.emojiText}>{emoji}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>Kaydet</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logsContainer}>
        {logs.map((log) => (
          <View key={log.id} style={styles.logEntry}>
            <View style={styles.logHeader}>
              <Text style={styles.logCountry}>{log.country}</Text>
              <Text style={styles.logDate}>{log.date}</Text>
            </View>
            <Text style={styles.logText}>{log.text}</Text>
            <Text style={styles.logEmoji}>{log.emoji}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  emojiContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  emojiButton: {
    padding: 10,
    borderRadius: 15,
  },
  selectedEmoji: {
    backgroundColor: '#e8f0fe',
  },
  emojiText: {
    fontSize: 24,
  },
  saveButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  logsContainer: {
    gap: 15,
  },
  logEntry: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  logCountry: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  logDate: {
    fontSize: 14,
    color: '#666',
  },
  logText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  logEmoji: {
    fontSize: 24,
    textAlign: 'right',
  },
});

export default ExplorerLogScreen; 