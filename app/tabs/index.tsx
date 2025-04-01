import { Text, View, StyleSheet, Button, TextInput, Pressable, ScrollView } from "react-native";
import { Link } from 'expo-router';
import React, { useState } from 'react';
import * as SQLite from 'expo-sqlite';

interface MyTask {
  id: number;
  name: string;
  done: boolean;
}

export default function Index() {
  const db = SQLite.openDatabaseAsync('taskdb');

  const [key1, onChangeKey] = useState('thekey');
  const [value1, onChangeValue] = useState('thevalue');

  const [tasks, setTasks] = useState<MyTask[]>([]);

  const [newTask, setNewTask] = useState('');
  
  const updateArray = () => {
    if (newTask.length==0) {
      alert('You forgot to enter the task');
    }
    else {
      setTasks([...tasks, { id: Math.random()*1000000000, name: newTask, done: false}]);
      setNewTask('');
    }
  };

  const popit = () => {
    setTasks([]);
    setNewTask('');
  };

  const deletethis = (index: number) => {
    const bih=tasks.filter(item => item.id!=index);
    setTasks(bih);
  };
  
  const reversethis = (index: number, texting: string, isitdone: boolean) => {
    const bih=tasks.filter(item => item.id!=index);
    setTasks([...bih, { id: index, name: texting, done: !isitdone}]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <div>
          {tasks.map(obj=>(
            <div key={obj.id}>
              <View style={styles.inline}>
                <p>{obj.done==true? <Text style={{textDecorationLine: 'line-through', fontSize: 19}}>{obj.name}</Text>: <Text style={{fontSize: 19}}>{obj.name}</Text>}</p>
                <Pressable style={styles.smallbuttons_alt} onPress={()=> {
                  reversethis(obj.id, obj.name, obj.done);
                }}>{obj.done==true? <Text>Mark as undone</Text>: <Text>Mark as done</Text>}</Pressable>
                <Pressable style={styles.smallbuttons} onPress={()=> {
                  deletethis(obj.id);
                }}>Delete</Pressable>
              </View>
            </div>
          ))}
        </div>
      </ScrollView>
      <View style={styles.inline}>
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <Pressable style={styles.buttons} onPress={updateArray}>
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
});