
import { StyleSheet, Text, View } from 'react-native';
import ChatBot from './src';
export default function App() {
  return (
    <View  style={styles.container}>
      <ChatBot />
      
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
