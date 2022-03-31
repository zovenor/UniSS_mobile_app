import {Text, SafeAreaView, Image, StyleSheet} from 'react-native';
import Colors from '../config/colors';

export default function LoadingApp(){
    return (
        <SafeAreaView style={styles.main}>
            <Image style={styles.image} source={require('../icons/ShopIcon.png')} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 35,
        tintColor: Colors.defaultBackgroundColor,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.appColor,
    }
});
