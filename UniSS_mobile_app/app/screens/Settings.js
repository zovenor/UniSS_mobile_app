import {Text, SafeAreaView, StyleSheet} from 'react-native';
import Colors from "../config/colors";

export default function Settings() {
    return (
        <SafeAreaView style={styles.body}>
            <Text style={styles.text}>Settings</Text>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: Colors.defaultFontColor,
        fontSize: 20,
    }
})
