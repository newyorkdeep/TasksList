import {View, StyleSheet} from 'react-native';
import {Link, Stack} from 'expo-router';

export default function NotFoundScreen() {
    return(
        <>
            <Stack.Screen options={{title: 'Oops, something went wrong! Can not find the adress.'}}/>
            <View style={styles.container}>
                <Link href="/tabs" style={styles.forlink}>Go back to main page</Link>
            </View>
        </>
    );
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    forlink: {
        fontSize: 20,
    }
})