import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const apiURL = "https://my-burger-api.herokuapp.com/burgers";


  useEffect(() => {
    fetch(apiURL)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => alert(error))
    .finally(setLoading.bind(undefined, false));
    })

  return (
      <ScrollView style={styles.container}>
      {isLoading ? ( <Text>Loading....</Text>) : (
        data.map((post) =>(
          <View>
            <Text style={styles.burgerName}>{post.name}</Text>
            <Text style={styles.restaurantName}>{post.restaurant}</Text>
            <Text style={styles.description}>{post.description}</Text>
          </View>
          
        ))
      )}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
  },
  burgerName: {
    fontSize: 32,
    fontWeight: "bold",
  },
  restaurantName: {
    fontSize: 26,
    fontWeight: "200"
  },
  description: {
    marginBottom:18,
    fontWeight: "200",
    color: "green",
  }

});
