import React from "react";
import { StyleSheet, Text, View, Image,TouchableOpacity,ScrollView, FlatList, TextInput} from "react-native";
import {SearchBar,Header} from 'react-native-elements'
import db from "../Config"
export default class ReadStory extends React.Component{
    constructor(props){
        super(props)
       this.state={
            search:'',
            docId:[],
            lastVisibleStory: null,
            search:''
        }
    }
    componentDidMount=async()=>{
        const query = await db.collection("stories").limit(10).get()
        query.docs.map((doc)=>{
            this.setState({
                docId:[...this.state.docId,doc.data()],
                lastVisibleStory:doc
            })
        })
    }
  
    searchTransactions=async(text)=>{
        var text = text.toUpperCase();
            const query = await  db.collection("stories").where("title","==",text).get()
           query.docs.map((doc)=>{
                this.setState({
                   docId:[...this.state.docId,doc.data()],
                    lastVisibleStory:doc,
                })
            })
    }

    render(){

                return (
                             <View style ={styles.container}>
                                  <Header
                            backgroundColor={'#FFC0CB'}
                            centerComponent={{
                            text: 'Story Hub',
                            style: { color: 'black', fontSize: 40 },
                             }}
                          /> 
                    <TextInput style={styles.bar}
                    placeholder="Search Stories"
                    onChangeText={(text)=>{
                        this.setState({
                            search:text,
                        })
                    }}
                    value={this.state.search}
                    />
                    <TouchableOpacity style={styles.searchButton} 
                    onPress={()=>{
                        this.searchTransactions(this.state.search)
                    }}>
                        <Text>Search</Text>
                        </TouchableOpacity>
                          
                       
                         <ScrollView> 
                        <FlatList
                    data ={ this.state.docId }
                   renderItem ={({item})=>(
                       <View style = {styles.searchResult}>
                            <Text style={{color:"white",fontWeight:"bold",fontSize:20}}>{"Title: " + item.title}</Text>
                            <Text style={{color:"white",fontSize:20}}>{"Author: " + item.author}</Text>

                       </View>
                   )}               
                   keyExtractor = {(item, index)=>{index.toString()}}
                   onEndReached = {()=>{this.fetchMoreStories()}}
                   onEndReachedThreshold = {0.7}
            />
            </ScrollView>
            </View>
                );

              }
              fetchMoreStories=async()=>{

            var text = this.state.search.toUpperCase();
            const story = await db.collection("stories").where("title","==",text).startAfter(this.state.lastVisibleStory).limit(10).get()
           story.docs.map((doc)=>{
                this.setState({
                    docId:[...this.state.docId,doc.data()],
                    lastVisibleStory:doc,
                })
            })
            }
    }

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    searchBar:{
        flexDirection:"row",
        height:"auto",
        width:"auto",
        borderWidth:0.5,
        alignItems:"center",
        backgroundColor:"grey",
    },
    bar:{
        borderWidth:2,
        height:30,
        width:1000,
        paddingLeft:10
    },
    searchButton:{
        borderWidth:2,
        borderTopWidth:4,
        height:30,
        width:200,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"pink",
        marginLeft:1000,
        marginTop:-30
    },
    searchResult:{
        borderBottomWidth:2,
        borderTopWidth:2,
        backgroundColor:"grey"
    }
  });