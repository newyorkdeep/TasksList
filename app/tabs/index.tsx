import { Text, View, StyleSheet, Button, TextInput, Pressable, ScrollView } from "react-native";
import { Link } from 'expo-router';
import React, { useState } from 'react';

interface MyTask {
  id: number;
  name: string;
  done: boolean;
}

export default function Index() {
  const [tasks, setTasks] = useState<MyTask[]>([]);

  const [newTask, setNewTask] = useState('');
  
  const updateArray = () => {
    setTasks([...tasks, { id: Math.random()*1000000000, name: newTask, done: false}]);
    setNewTask('');
  };

  const popit = () => {
    setTasks([]);
  };

  const deletethis = (index: number) => {
    const bih=tasks.filter(item => item.id!=index);
    setTasks(bih);
  };
  
  const reversethis = (index: number, texting: string, isitdone: boolean) => {
    const bih=tasks.filter(item => item.id!=index);
    setTasks([...bih, { id: Math.random()*1000000000, name: texting, done: !isitdone}]);
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={newTask}
        onChangeText={setNewTask}
      />
      <Pressable style={styles.buttons} onPress={updateArray}>
        <Text>Add task</Text>
      </Pressable>
      <ScrollView>
        <div>
          {tasks.map(obj=>(
            <div key={obj.id}>
              <p>TASK: {obj.name}</p>
              <p>STATUS: {obj.done==true? <Text>Done</Text>: <Text>Not done</Text>}</p>
              <p>
                <Pressable style={styles.smallbuttons} onPress={()=> {
                  deletethis(obj.id);
                  }}>Delete</Pressable>
                <Pressable style={styles.smallbuttons} onPress={()=> {
                  reversethis(obj.id, obj.name, obj.done);
                }}>Mark as done</Pressable>
              </p>
              </div>
          ))}
        </div>
      </ScrollView>
      <Pressable onPress={popit} style={styles.buttons}>Delete all</Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttons: {
    borderRadius: 5,
    padding: 5,
    borderWidth: 1,
  },
  input: {
    margin: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  smallbuttons: {
    borderRadius: 20,
    padding: 3,
    margin: 14,
    borderWidth: 1,
    borderColor: "red",
  }
})
