import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useState } from 'react';
import { Linking } from 'react-native';

export default function App() {
  const [data, setData] = useState('');
  
  const fetchData = () => {
    axios.get('https://www.boredapi.com/api/activity')
  .then(response => {
    setData(response.data);
  })
  .catch(error => {
    console.error("Error fetching data: ", error);
  }
  );
  }

  return (
    <View style={styles.container}>
      { data != false ? <>
      <Text style={styles.activity_text}>You should:</Text>
      <Text style={styles.standard_text}>{data.activity}</Text>
      <Text style={styles.standard_text}>On a scale from 1-10 the cost is a {data.price*10}</Text>
      { data.participants > 1 ?
        <Text style={styles.standard_text}>You are probably going to need {data.participants} people.</Text>:
        <Text style={styles.standard_text}>This is a solo activity</Text>
      }
      <Text style={styles.activity_text}>Your probability for doing this {(1-data.accessibility)*100}%</Text>
      { data.link != '' ?
      <Text style={styles.link} onPress={() => Linking.openURL(data.link)}>This might be helpful!</Text>:
      <Text></Text>}
      </>: <Text style={styles.opening_text}>Find Your Destiny</Text>}
       <LinearGradient
        // Button Linear Gradient
        colors={['red', 'blue']}
        style={styles.button}>
        <Text style={styles.text} onPress={fetchData}>What should I do?</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
  },
  gradient: {
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     borderRadius: 15,
     padding: 15,
  },
  text: {
     color: '#fff',
     fontSize: 20,
  },
  button: {
    borderRadius: 4,
    padding: 10,
    alignSelf: 'flex-mid',
    position: 'absolute',
    bottom: 25
  },
  activity_text: {
    color: 'black',
    alignContent: 'center',
    textAlign: 'center',
    fontSize: 17,
    padding: 20,
    backgroundColor: '#d9fafc',
    borderRadius: 15,
    
  },
  opening_text: {
    borderColor: 'gray',
    fontSize: 30,
    color: 'gray',
    padding: 15,
    borderWidth: 4,
    borderRadius: 10,
  },
  standard_text: {
    fontSize: 20,
    alignContent: 'center',
    textAlign: 'center',
    //paddingTop: 10,
    margin: 20
  }, 
  link: {
    color: 'blue',
    borderColor: 'blue',
    borderWidth: 1,
    marginTop: 20,
    borderRadius: 4,
    paddingHorizontal: 3,
    backgroundColor: '#e2d4fc'
  },
 });
 