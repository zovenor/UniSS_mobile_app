import {useEffect, useState} from "react";
import {getUserInfo} from "../functions/getUserInfo";
import {
    Dimensions,
    ImageBackground,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import Colors from "../config/colors";
import Loading from "../components/loading";

const deviceWidth = Dimensions.get('window').width;

export default function Home(props) {

    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({});
    const axios = require('axios').default;

    const onRefresh = () => {
        getUserInfo(setLoaded, setUser, props.route.params.setIsAuth);
    }

    useEffect(() => {
        getUserInfo(setLoaded, setUser, props.route.params.setIsAuth);
    }, []);

    if (loaded) {
        return (
            <ScrollView refreshControl={
                <RefreshControl onRefresh={onRefresh}/>}>
                <SafeAreaView style={styles.body}>
                    <ImageBackground imageStyle={{
                        borderRadius: 50,
                    }} resizeMode={'cover'} source={require('../images/backgroundForUser.jpg')}
                                     style={styles.welcomeView}>
                        <Text style={styles.welcomeText}>Welcome, {user.first_name}</Text>
                    </ImageBackground>
                    <View style={styles.shortcutsView}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Settings')
                        }} style={styles.buttonView}>
                            <Ionicons name="cog" color={Colors.defaultBackgroundColor} size={40}/>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </ScrollView>
        )
    } else {
        return <Loading/>;
    }


}

const styles = StyleSheet.create({
    body: {
        display: "flex",
        alignItems: 'center',
        flex: 1,
    },
    welcomeText: {
        fontSize: 40,
        color: Colors.defaultFontColor,
        margin: 20,
    },
    welcomeView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: (deviceWidth / 2) - 20,
        margin: 20,
        width: (deviceWidth) - 20,
    },
    shortcutsView: {
        backgroundColor: Colors.appColor,
        width: (deviceWidth) - 20,
        height: (deviceWidth / 2) - 20,
        borderRadius: 50,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
