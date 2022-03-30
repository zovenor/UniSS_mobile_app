import {Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import Colors from '../config/colors';

export default function LoadingApp(){
    return (
        <SafeAreaView style={styles.main}>
            <Image style={styles.image} source={require('../icons/UniSS_icon2.png')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 35,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.appColor,
    }
});
