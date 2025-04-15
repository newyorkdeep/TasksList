import { Text, View, StyleSheet, Button, TextInput, Pressable, ScrollView} from "react-native";
import { Link } from 'expo-router';
import React, { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

interface MyTask {
  id: number;
  name: string;
  done: boolean;
}

export default function Index() {
  const [tasks, setTasks] = useState<MyTask[]>([]);
  
  const [newTask, setNewTask] = useState('');
  
  const asyncadd = async () => {
    try {
      if (newTask.length==0) {
        alert('You forgot to enter the task!');
      } else {
        const a=[...tasks,{ id: Math.random()*1000000000, name: newTask, done: false}];
        setTasks([...tasks, { id: Math.random()*1000000000, name: newTask, done: false}]);
        await AsyncStorage.setItem('thekey', JSON.stringify(a));
        setNewTask('');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const asyncdelete = async (index: number) => {
    try {
      const bih=tasks.filter(item => item.id!=index);
      setTasks(bih);
      await AsyncStorage.setItem('thekey', JSON.stringify(bih));
    } catch(error) {
      console.error(error);
    }
  };

  const asyncmark = async (index: number) => {
    try {
      const bih=tasks.map(item => {
        if (item.id==index) {
          item.done=! item.done;
        }
        return item
      });
      setTasks(bih);
      await AsyncStorage.setItem('thekey', JSON.stringify(bih));
    } catch(error) {
      console.error(error);
    }
  };

  useEffect(() => { 
    const fetchtsting = async () => {
      try {
        const storedinventory = await AsyncStorage.getItem('thekey');
        if (storedinventory !== null) {
          setTasks(JSON.parse(storedinventory));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchtsting();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <div>
          {tasks.map(obj=>(
            <div key={obj.id}>
              <View style={styles.inline}>
                <p>{obj.done==true? <Text style={{textDecorationLine: 'line-through', fontSize: 19}}>{obj.name}</Text>: <Text style={{fontSize: 19}}>{obj.name}</Text>}</p>
                <Pressable style={styles.smallbuttons_alt} onPress={()=> {asyncmark(obj.id);}}>{obj.done==true? <Text>Undone</Text>:<Text>Done</Text>}</Pressable>
                <Pressable style={styles.smallbuttons} onPress={()=> {asyncdelete(obj.id);}}>Delete</Pressable>
              </View>
            </div>
          ))}
        </div>
      </ScrollView>
      <View style={styles.inline}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            onSubmitEditing={asyncadd}
            value={newTask}
            onChangeText={setNewTask}
          />
          <Pressable style={styles.buttons} onPress={asyncadd}>
            <Text>Add task</Text>
          </Pressable>
      </View>
    </View>
  );
}

//styles:

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    borderRadius: 25,
    padding: 5,
    borderWidth: 1,
    justifyContent: "center",
    margin: 10,
  },
  input: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 25,
  },
  smallbuttons: {
    borderRadius: 20,
    padding: 3,
    margin: 14,
    borderWidth: 1,
    borderColor: "red",
  },
  smallbuttons_alt:{
    borderRadius: 20,
    padding: 3,
    margin: 14,
    borderWidth: 1,
    borderColor: "black",
  },
  inline: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "stretch"
  },
  nukebutton: {
    
  }
})
