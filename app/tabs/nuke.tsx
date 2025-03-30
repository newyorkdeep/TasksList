import { Text, View, StyleSheet, Pressable } from 'react-native';
import Index from '.';

export default function nukepage () {
    
    return(
        <View style={{alignSelf: "center", flex: 1, justifyContent: "center"}}>
            <Text>Are you sure you want to delete all the tasks you have? <p></p>This can not be undone!</Text>
            <p/>
            <a href="/tabs">No, Go back</a>
            <p/>
            <Pressable onPress={ () => {
                alert('shalom!');
            }}>Yes, delete all</Pressable>
        </View>
    );
}