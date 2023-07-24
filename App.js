import React, {useState} from 'react';

import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Touchable, Keyboard } from 'react-native';

import Task from './components/tasks'

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);


  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task])
    setTask(null);
  }

  const completeTask = (index) =>{
    let itemsCopy = [...taskItems]
    itemsCopy.splice(index,1);
    setTaskItems(itemsCopy);
  }

  return (
    <View style={styles.container}>
      {/* Todays task */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTittle}>List of Gifts</Text>

        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key= {index} onPress={()=>completeTask(index)}>
                  <Task  text={item}/> 
                </TouchableOpacity>
              )
            })
          }

        </View>
      </View>

      {/* write a task tool */}

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? "padding": "height"} 
      style={styles.writeTaskWrapper}>
        <TextInput style={styles.input} placeholder={'Write a gift'} value={task} onChangeText={text => setTask(text)}/>
        <TouchableOpacity onPress={() => handleAddTask()} >
          <View style={styles.addWrapper}>
            <Text styles={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      

      </KeyboardAvoidingView>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  taskWrapper:{
    paddingTop:80,
    paddingHorizontal:20,

  },
  sectionTittle:{
    fontSize: 24,
    fontWeight: 'bold',
  },
  items:{
    marginTop:30,
  },
  writeTaskWrapper:{
    position:'absolute',
    alignItems: 'center',
    bottom:60,
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 40,
  },
  input:{
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper:{
    width:60,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,

  },
  addText:{
    fontSize: 100,
  },
});
