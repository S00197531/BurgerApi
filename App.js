import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { Avatar, Button, Card, Title, Paragraph, Provider as PaperProvider } from 'react-native-paper';

import ActionSheet, { SheetManager } from 'react-native-actions-sheet';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [Ingredients, setIngredients] = useState();

  

  const apiURL = "https://my-burger-api.herokuapp.com/burgers";


  useEffect(() => {
    fetch(apiURL)
    .then((response) => response.json())
    .then((json) => setData(json))
    .catch((error) => alert(error))
    .finally(setLoading.bind(undefined, false));
    })

  return (
    
    <PaperProvider>
      <View style={styles.container}></View>
      <FlatList 
          keyExtractor={(item) => item.name}
          data = {data} 
          renderItem={({item}) => (
              <Card>
              <Card.Content>
              <Title style={styles.burgerName}>{item.name}</Title>
              <Paragraph style={styles.restaurantName}>{item.restaurant}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: 'https://media.istockphoto.com/photos/cheeseburger-with-tomato-and-lettuce-on-wooden-board-picture-id1309352410?k=20&m=1309352410&s=612x612&w=0&h=BZOn2siM0Y21WW6FDMLYY3dChb0SkuhDSJ20N2jZe-A=' }} />
              <Card.Actions>
              <View style={styles.container}>
            <TouchableOpacity  style={{ margin:10, padding:10, backgroundColor:'blue', width:130, height:50}}
              onPress={() => {
                setIngredients(item.ingredients)
                SheetManager.show('helloworld_sheet');
              }}>
              <Text style={{color:'white'}}>View Ingredients</Text>
            </TouchableOpacity>
          </View>
          <ActionSheet id="helloworld_sheet" gestureEnabled={true} >
            <View style={{ height: 200, padding:20 }}>
            <Text>{Ingredients}</Text>
            </View>
          </ActionSheet>
              </Card.Actions>
            </Card>
            )}/>
      </PaperProvider>


      
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
    fontSize: 20,
    fontWeight: "200"
  },
  description: {
    marginBottom:18,
    fontWeight: "200",
    color: "green",
  }

});
