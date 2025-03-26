import { Text, View, StyleSheet } from 'react-native';

export default function AboutPage(){
    return (
        <View style={styles.container}>
            <Text>This application was made by Pavel Mularchick as a pet multiplatform project.</Text>
            <p></p>
            <Text>Made using EXPO framework and React Native.</Text>
            <p></p>
            <Text>Enjoy :)</Text>
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});