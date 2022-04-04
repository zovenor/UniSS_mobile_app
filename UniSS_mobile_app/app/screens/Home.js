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

                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Settings')
                        }} style={styles.button}>
                            <Ionicons name="cog" color={Colors.defaultBackgroundColor} size={40}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Search')
                        }} style={styles.button}
                        >
                            <Ionicons name="search" color={Colors.defaultBackgroundColor} size={40}/>
                        </TouchableOpacity>

                    </View><View style={styles.buttonView} width={deviceWidth-20}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Scanner')
                        }} style={styles.button}
                        >
                            <Ionicons name="scan" color={Colors.defaultBackgroundColor} size={40}/>
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
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'stretch',
        justifyContent: 'space-evenly',
        flex: 1,
    },
    welcomeText: {
        fontSize: 40,
        color: Colors.defaultFontColor,
    },
    welcomeView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: (deviceWidth / 2) - 20,
        width: (deviceWidth) - 20,
        marginBottom: 10,
        marginTop: 10,
    },
    buttonView: {
        backgroundColor: Colors.appColor,
        width: (deviceWidth / 2) - 15,
        height: (deviceWidth / 2) - 15,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
