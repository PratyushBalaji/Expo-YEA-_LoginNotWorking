import React from 'react';
import { Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import db from '../config'
import { ScrollView } from 'react-native-gesture-handler';



export default class UpdateScreen extends React.Component {
    constructor(props){
      super(props)
      this.state = {
        typedFood:'',
        update:''
      }
    }

    fetchMoreTransactions = async ()=>{
      var text = this.state.update.toUpperCase()
      var enteredText = text.split("")

      
      if (enteredText[0].toUpperCase() ==='B'){
      const query = await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc
        })
      })
    }
      else if(enteredText[0].toUpperCase() === 'S'){
        const query = await db.collection("transactions").where('bookId','==',text).startAfter(this.state.lastVisibleTransaction).limit(10).get()
        query.docs.map((doc)=>{
          this.setState({
            allTransactions: [...this.state.allTransactions, doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
  }

    updateTransactions= async(text) =>{
      var enteredText = text.split("")
      var text = text.toUpperCase()
  
      
      if (enteredText[0].toUpperCase() ==='B'){
        const transaction =  await db.collection("transactions").where('bookId','==',text).get()
        transaction.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
      else if(enteredText[0].toUpperCase() === 'S'){
        const transaction = await db.collection('transactions').where('studentId','==',text).get()
        transaction.docs.map((doc)=>{
          this.setState({
            allTransactions:[...this.state.allTransactions,doc.data()],
            lastVisibleTransaction: doc
          })
        })
      }
    }

    componentDidMount = async ()=>{
      const query = await db.collection("transactions").limit(10).get()
      query.docs.map((doc)=>{
        this.setState({
          allTransactions: [],
          lastVisibleTransaction: doc
        })
      })
    }
    render() {
      return (
        <View style={styles.container}>
          <View style={styles.updateBar}>
        <TextInput 
          style ={styles.bar}
          placeholder = "Add Foods..."
          onChangeText={(text)=>{this.setState({update:text})}}/>
          <TouchableOpacity
            style = {styles.updateButton}
            onPress={()=>{
              db.collection("foods").doc(update).set(data);
              // Update is where the user can add their own foods into the db which weren't there before.
              // Here, the state var 'update' is used to represent the search bar of the user of the food 
              // they wish to update. 
              // Things to do : 
              //    - Set it all to camel case or all lowercase so that the system isn't case 
              //      sensitive.
              //    - Make sure the suer can't update previous foods. This is possible by altering 
              //      the search bar mid update as this all updates in real time 
              //    - Make sure the user can edit the variables / fields under it (i.e. Egg_Veg, etc)
              //      so that it is clear which diets the newly set food is against
              //    - Convert the code from the previous 'Transactions' code as I can reuse most of 
              //      it but certain variables are not in the Scaneat db, rather they're in the wily db
            }}
          >
            <Text>Update</Text>
          </TouchableOpacity>
          </View>
        <FlatList
          data={this.state.allTransactions}
          renderItem={({item})=>(
            <View style={{borderBottomWidth: 2}}>
              <Text>{"Book Id: " + item.bookId}</Text>
              <Text>{"Student id: " + item.studentId}</Text>
              <Text>{"Transaction Type: " + item.transactionType}</Text>
              <Text>{"Date: " + item.date.toDate()}</Text>
            </View>
          )}
          keyExtractor= {(item, index)=> index.toString()}
          onEndReached ={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        /> 
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20
    },
    updateBar:{
      flexDirection:'row',
      height:40,
      width:'auto',
      borderWidth:0.5,
      alignItems:'center',
      backgroundColor:'grey',
  
    },
    bar:{
      borderWidth:2,
      height:30,
      width:300,
      paddingLeft:10,
    },
    updateButton:{
      borderWidth:1,
      height:30,
      width:50,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'green'
    }
  })