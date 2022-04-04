import {Text, SafeAreaView, StyleSheet, TouchableOpacity, Linking, Dimensions, View} from 'react-native';
import Colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useState} from "react";
import {getUserInfo} from "../functions/getUserInfo";
import Loading from "../components/loading";
import {logout} from "../functions/logout";

const deviceWidth = Dimensions.get('window').width;

export default function Settings(props) {

    const [loaded, setLoaded] = useState(false);
    const [user, setUser] = useState({});
    const axios = require('axios').default;

    useEffect(() => {
        getUserInfo(setLoaded, setUser, props.route.params.setIsAuth);
    }, []);

    if (loaded) {
        return (
            <SafeAreaView style={styles.body}>
                <View style={styles.parOfSettings}>
                    <Text style={styles.parOfSettingsText}>Personal</Text>
                </View>

                <View style={styles.infoView}>
                    <View style={styles.infoBlock}>
                        <Text style={styles.namedInfo}>Username: </Text>
                        <Text style={styles.textInfo}>{user.username}</Text>
                    </View>
                    <View style={styles.infoBlock}>
                        <Text style={styles.namedInfo}>Name: </Text>
                        <Text style={styles.textInfo}>{user.first_name}</Text>
                    </View>
                    <View>
                        <View style={styles.infoBlock}>
                            <Text style={styles.namedInfo}>Surname: </Text>
                            <Text style={styles.textInfo}>{user.last_name}</Text>
                        </View>
                    </View>
                    <View>
                       <View style={styles.infoBlock}>
                           <Text style={styles.namedInfo}>Email: </Text>
                           <Text style={styles.textInfo}>{user.email}</Text>
                       </View>
                    </View>
                </View>

                <View style={styles.parOfSettings}>
                    <Text style={styles.parOfSettingsText}>About</Text>
                </View>

                <View style={styles.infoView}>
                    <View style={styles.infoBlock}>
                        <Text style={styles.textInfo}>Application created by </Text><Text onPress={()=>{Linking.openURL('https://github.com/zovenor')}} style={styles.namedInfo}>Alexandr Romanenya</Text>
                    </View>
                </View>

                <TouchableOpacity onPress={()=>{
                    logout(props.route.params.setIsAuth);
                }} style={styles.buttonLogoutView}>
                    <Text style={styles.buttonLogoutText}>Logout</Text>
                </TouchableOpacity>
            </SafeAreaView>
        )
    } else {
        return (
            <Loading/>
        )
    }

}
const styles = StyleSheet.create({
    body: {
        flex: 1,
        alignItems: 'center',
    },
    parOfSettings: {
        width: '90%',
        alignItems: 'center',
        borderBottomWidth: 1,
        paddingBottom: 10,
        marginBottom: 10,
        marginTop: 10,
        borderColor: Colors.defaultFontColor,
    },
    parOfSettingsText: {
        color: Colors.defaultFontColor,
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonLogoutView: {
        padding: 15,
        width: (deviceWidth / 2) - 60,
        borderRadius: 50,
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: Colors.red,
        margin: 10,
    },
    buttonLogoutText: {
        fontSize: 15,
        textAlign: 'center',
        color: Colors.red,
    },
    textInfo: {
        fontSize: 20,
        color: Colors.defaultFontColor,
    },
    infoView: {
        width: '90%',
    },
    infoBlock: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    },
    namedInfo: {
        fontWeight: 'bold',
        fontSize: 20,
        color: Colors.defaultFontColor,
    }
})
