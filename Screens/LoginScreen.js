import React from "react";
import { Alert,StyleSheet,Image, Text, View, FlatList, TextInput, TouchableOpacity, ToastAndroid, KeyboardAvoidingView } from "react-native";
import * as firebase from "firebase";
export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
        }
    }
    loginCheck=async(email,password)=>{
        if(email&&password){
            console.log("Login Executed")
            try{
                const response = await firebase.auth().signInWithEmailAndPassword(email,password);
                if(response){
                    console.log("Navigation Executed")
                    
                    this.props.navigation.navigate('ReadStory')
                }
            }
            catch(error){
                switch(error.code){
                    case 'auth/user-not-found': Alert.alert("User Does Not Exist")
                    console.log("doesn't exist") 
                    break;
                    case 'auth/invalid-email': Alert.alert("Incorrect Email or Password")
                    console.log('invaild')
                    break;
                }
            }
        }
        else{
            Alert.alert("Enter Email and Password")
        }
    }
    render(){
        return(
            <KeyboardAvoidingView style={{alignItems:"center",marginTop:20}}>
                <View>
                 <Text style={{fontSize:20,textAlign:"center"}}>Please Login To Continue To StoryHub</Text>
                </View>
                <View> 
                <TextInput
                placeholder="ABC@example.com"
                keyboardType="email-address"
                style={styles.loginBox}
                onChangeText={(text)=>{
                    this.setState({
                        email:text
                    })
                }}
                value={this.state.email}/>
                <TextInput
                style={styles.loginBox}
                placeholder="Enter Password"
                secureTextEntry={true}
                onChangeText={(text)=>{
                    this.setState({
                        password:text
                    })
                }}
                />
                
                </View>
                <View>
                    <TouchableOpacity style={styles.buttonView} onPress={()=>{
                        this.loginCheck(this.state.email,this.state.password)
                    }}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        )
    }
}


const styles = StyleSheet.create({
    loginBox:{
        width:300,
        height:40,
        borderWidth:1.5,
        fontSize:20,
        margin:10,
        paddingLeft:10
    },
    buttonView:{
        height:30,
        width:90,
        borderWidth:1,
        marginTop:20,
        paddingTop:5,
        borderRadius:7
    },
    buttonText:{
        textAlign:"center",
    }
})