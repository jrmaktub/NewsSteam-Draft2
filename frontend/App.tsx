import React from "react";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";


import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import CryptoAuth from "./Components/CryptoAuth";
import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
import Assets from "./Components/Assets/Assets";
import Transfer from "./Components/Transfer/Transfer";
import Profile from "./Components/Profile/Profile";
// import Header from "./Components/Header";
import NFTAssets from "./Components/NFT/NFTAssets";
import { View, Text, Button, StyleSheet, FlatList, Image, StatusBar } from 'react-native'

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCreditCard,
  faCoins,
  faUser,
  faPaperPlane,
  faRocket,
} from "@fortawesome/free-solid-svg-icons";

import Moralis from "moralis/types";

import FavoritesContextProvider from './store/context/favorites-context'

import HomeScreen from './screens/HomeScreen'
import AddArticleScreen from './screens/AddArticleScreen'
import ArticleDetailsScreen  from  './screens/ArticleDetailsScreen'

import { SafeAreaView } from "react-native-safe-area-context";
import ArticlesContextProvider from './store/context/articles-context'


LogBox.ignoreAllLogs();

// const Activecolor =
function Home(): JSX.Element {
  return (
    <Tab.Navigator
      shifting={false}
      activeColor="#315399"
      // inactiveColor="#3e2465"
      barStyle={{ backgroundColor: "black" }}>

      <Tab.Screen
        name="Articles"
        options={{
          tabBarLabel: "Articles",
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesomeIcon icon={faCoins} color={color} size={20} />;
          },
        }}
        component={HomeScreen}
      />

      <Tab.Screen
        name="Create"
        options={{
          tabBarLabel: "Create",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faCreditCard} color={color} size={20} />
          ),
        }}
        component={AddArticleScreen}
      />

      <Tab.Screen
        name="ArticleDetailsScreen"
        options={{
          tabBarLabel: "ArticleDetailsScreen",
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesomeIcon icon={faRocket} color={color} size={20} />;
          },
        }}
        component={ArticleDetailsScreen}
      />

      <Tab.Screen
        name="Transfer"
        options={{
          tabBarLabel: "Transfer",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faPaperPlane} color={color} size={20} />
          ),
        }}
        component={Transfer}
      />

      <Tab.Screen
        name="Profile"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color }) => (
            <FontAwesomeIcon icon={faUser} color={color} size={20} />
          ),
        }}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

  switch (routeName) {
    case "Articles":
      return "Articles";
    case "Create":
      return "Create";
    case "Transactions":
      return "Transactions";
    case "Profile":
      return "Profile";
    case "ArticleDetailsScreen":
      return "ArticleDetailsScreen"
  }
}

function App(): JSX.Element {
  const connector = useWalletConnect();
  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
  } = useMoralis();

  return (
    //maybe remove this? Ask ETH mentor.
    <SafeAreaView style={styles.container}>
    {/* <ArticlesContextProvider> */}
    {/* <FavoritesContextProvider> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Auth">
          {/* Auth Navigator: Include Login and Signup */}
          <Stack.Screen
            name="Auth"
            component={CryptoAuth}
            options={{ headerShown: false }}
          />
          {/* Navigation Drawer as a landing page */}
          <Stack.Screen
            name="DrawerNavigationRoutes"
            component={Home}
            //  Hiding header for Navigation Drawer
             options={{ headerTitle: (props) => <Header /> }}
           options={({ route }) => ({
            headerTitle: getHeaderTitle(route),
           })}
          />
        {/* <Stack.Screen name="ArticleDetailsScreen" component={ArticleDetailsScreen}/> */}
        <Stack.Screen name="AddArticleScreen" component={AddArticleScreen}/>

        </Stack.Navigator>
      </NavigationContainer>
    {/* </FavoritesContextProvider>
    </ArticlesContextProvider> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    
    flex: 1
  }
})
//moralis-admin-cli watch-cloud-folder --moralisApiKey ug59Tc1C1ASUDLZ --moralisApiSecret 5l6Dobz1BWQ2AeP --moralisSubdomain pivnwf6cjq7d.usemoralis.com --autoSave 1 --moralisCloudfolder /Users/jorgeramirez/Downloads/NewsStream/moralis-cloud-functions
export default App;
