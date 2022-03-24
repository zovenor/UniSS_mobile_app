import {Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import Colors from '../config/colors';

export default function Loading(){
    return (
        <SafeAreaView style={styles.main}>
            <Image style={styles.image} source={require('../icons/food_cart.png')} />
            <Text style={styles.text}>Loading...</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 125,
        height: 125,
        borderRadius: 35,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        position: 'absolute',
        bottom: 50,
        fontSize: 20,
        color: Colors.defaultFontColor,
    }
});
