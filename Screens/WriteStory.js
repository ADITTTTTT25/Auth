import React from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity,Alert,ToastAndroid, KeyboardAvoidingView } from "react-native";
import { Header} from "react-native-elements";
import {TextInput} from "react-native-gesture-handler";
import db from "../Config"
export default class WriteStory extends React.Component{
    constructor(){
        super();
        this.state={
            text:'',
            text2:'',
            text3:'',
        }
    }

    submitStory=async()=>{
        db.collection("stories").add({
            "title":this.state.text,
            "author":this.state.text2,
            "story":this.state.text3
        })
        Alert.alert("Story Submited!");
        this.setState({
            text:'',
            text2:'',
            text3:''
        })
    }
    render(){
        return(
          <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.container} >
            <Header
          backgroundColor={'#FFC0CB'}
          centerComponent={{
            text: 'Story Hub',
            style: { color: 'black', fontSize: 40 },
          }}
            />

                 <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            var formattedText = text.toLowerCase()
            this.setState({ text: formattedText });
          }}
          placeholder="Title Of Story"
          value={this.state.text}
        /> 

<TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({ text2: text });
          }}
          placeholder="Author Of Story"
          value={this.state.text2}
        />
  
<TextInput
           style={styles.inputBox2}
          onChangeText={(text) => {
            this.setState({ text3: text });                            
          }}
          placeholder="Write Your Story"      
          multiline={true}
          value={this.state.text3}
        />
        <TouchableOpacity onPress={ this.submitStory}style={styles.submitButton}><Text style={styles.submitButtonText}>Submit!</Text></TouchableOpacity>
        </View>
       
        </KeyboardAvoidingView>

           
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,      
    },
    inputBox: {
        width: '80%',
        alignSelf: 'center',
        height: 40,
        textAlign: 'center',
        borderWidth: 4,
        marginTop:10,
        fontSize:20
        
      },
      inputBox2: {
        width: '80%',
        alignSelf: 'center',
        height: 400,
        textAlign: 'center',
        borderWidth: 4,
        marginTop:10,
        fontSize:20
        
      },
      submitButton:{
        backgroundColor:"#FFC0CB",
        width:200,
        height:50,
        justifyContent:"center",
        alignSelf:"center",
        marginTop:20,
        borderWidth:2
      },
      submitButtonText:{
        fontSize:20,
        textAlign:"center",
        fontWeight:'bold',
        color:"black",
        padding:10,
      },
  });