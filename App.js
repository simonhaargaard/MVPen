import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Page1, Page2, Settings, LogInd, CreateAccount, Splash} from "./Components/Screens";
import {createDrawerNavigator} from "@react-navigation/drawer";

import {AuthContext} from "./Components/Context";
import firebase from "firebase";

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
    <AuthStack.Navigator>
        <AuthStack.Screen name = "CreateAccount" component={CreateAccount} options={{title: 'Create account'}}/>
        <AuthStack.Screen name = "Login" component={LogInd} options={{title: 'Login'}}/>
    </AuthStack.Navigator>
)

const Drawer = createDrawerNavigator();
const DrawerScreen = () =>(
    <Drawer.Navigator initialRouteName={"Home"}>
        <Drawer.Screen name="Home" component={HomePage}/>
        <Drawer.Screen name="Add items" component={Settings}/>
    </Drawer.Navigator>
)

const RootStack = createStackNavigator();
const RootStackScreen = ({userToken}) => (
    <RootStack.Navigator headerMode="none">
        {userToken ? (
            <RootStack.Screen name ="App" component={DrawerScreen} options={{
                animationEnabled: false
            }}/>
        ) : (
            <RootStack.Screen name ="Auth" component={AuthStackScreen} options={{
                animationEnabled: false
            }}/>
            )}
    </RootStack.Navigator>
)

const HomePage = () =>(
    <AuthStack.Navigator>
        <AuthStack.Screen name = "Page1" component={Page1} options={{title: 'Page 1'}}/>
        <AuthStack.Screen name = "Page2" component={Page2} options={{title: 'Page 2'}}/>
    </AuthStack.Navigator>
);

export default () => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [userToken, setUserToken] = React.useState(null);

    const firebaseConfig = {
        apiKey: "AIzaSyDlkn8nWSBIj5zqsRErq3H4FScN9VhF8z4",
        authDomain: "simse-15b26.firebaseapp.com",
        databaseURL: "https://simse-15b26.firebaseio.com",
        projectId: "simse-15b26",
        storageBucket: "simse-15b26.appspot.com",
        messagingSenderId: "398091414512",
        appId: "1:398091414512:web:23b0e678279219b66dcb35",
        measurementId: "G-3Z2W58BFCT"
    };
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    const authContext = React.useMemo(() => {
        return {
            signIn: async (email, password) => {
                try {
                    setIsLoading(true);
                    const result = await firebase.auth().signInWithEmailAndPassword(email, password);
                    console.log(result)
                    setIsLoading(false);
                    setUserToken(result.user.getIdTokenResult())
                } catch (e) {
                    alert(e);
                    setIsLoading(false);
                }
            },
            signUp: async (email, password) => {
                try{
                    setIsLoading(true);
                    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
                    console.log(result);
                    setIsLoading(false);
                    setUserToken(result.user.getIdTokenResult())
                }catch (e) {
                    alert(e);
                    setIsLoading(false);
                }
            },
            logud: async () => {
                try {
                    setIsLoading(true);
                    setIsLoading(false);
                    setUserToken('');
                }catch (e) {
                    alert(e);
                    setIsLoading(false);
                }
            },
            handleSave: (navn, pris) => {
                try {
                    const reference = firebase
                        .database()
                        .ref('/Item/')
                        .push({ navn: navn, pris: pris});
                    alert("Saved");
                } catch (error) {
                    alert(error);
                }
            },
        }
    }, [])

    React.useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }, [])

    if (isLoading) {
        return <Splash/>
    }
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                <RootStackScreen userToken={userToken}/>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

