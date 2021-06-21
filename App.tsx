import React, {Component, useEffect, useState} from 'react';
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Button,
  TextInput,Image
} from 'react-native';
// Import the RtcEngine class and view rendering components into your project.
import RtcEngine, {
  RtcLocalView,
  RtcRemoteView,
  VideoRenderMode,
} from 'react-native-agora';
// Import the UI styles.
import styles from './components/Style';
import Uikit from 'agora-rn-uikit';
import axios from 'react-native-axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

// const requestCameraAndAudioPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.requestMultiple([
//       PermissionsAndroid.PERMISSIONS.CAMERA,
//       PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//     ]);
//     if (
//       granted['android.permission.RECORD_AUDIO'] ===
//         PermissionsAndroid.RESULTS.GRANTED &&
//       granted['android.permission.CAMERA'] ===
//         PermissionsAndroid.RESULTS.GRANTED
//     ) {
//       console.log('You can use the cameras & mic');
//     } else {
//       console.log('Permission denied');
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

// // Define a Props interface.
// interface Props {
// }

// // Define a State interface.
// interface State {
//     appId: string,
//     channelName: string,
//     token: string,
//     joinSucceed: boolean,
//     peerIds: number[],
// }

// // Create an App component, which extends the properties of the Pros and State interfaces.
// export default class App extends Component<Props, State> {
//     _engine?: RtcEngine
//     // Add a constructor，and initialize this.state. You need:
//     // Replace yourAppId with the App ID of your Agora project.
//     // Replace yourChannel with the channel name that you want to join.
//     // Replace yourToken with the token that you generated using the App ID and channel name above.
//     constructor(props) {
//         super(props)
//         this.state = {
//             appId: 'b822be57174c4a049c766d20c01b065e',
//             channelName: 'ajm',
//             token: '006b822be57174c4a049c766d20c01b065eIAB/PZTojfo6JagxhynD0+nBzcvD4fVbogLBtzmjeE9H483mRRoAAAAAEACX33iMVGTMYAEAAQCNZMxg',
//             joinSucceed: false,
//             peerIds: [],
//         }
//         if (Platform.OS === 'android') {
//             requestCameraAndAudioPermission().then(() => {
//                 console.log('requested!')
//             })
//         }
//     }
//     // Other code. See step 5 to step 10.
//    // Mount the App component into the DOM.
// componentDidMount() {
//   this.init()
// }
// // Pass in your App ID through this.state, create and initialize an RtcEngine object.
// init = async () => {
//   const {appId} = this.state
//   this._engine = await RtcEngine.create(appId)
//   // Enable the video module.
//   await this._engine.enableVideo()

//   // Listen for the UserJoined callback.
//   // This callback occurs when the remote user successfully joins the channel.
//   this._engine.addListener('UserJoined', (uid, elapsed) => {
//       console.log('UserJoined', uid, elapsed)
//       const {peerIds} = this.state
//       if (peerIds.indexOf(uid) === -1) {
//           this.setState({
//               peerIds: [...peerIds, uid]
//           })
//       }
//   })

//   // Listen for the UserOffline callback.
//   // This callback occurs when the remote user leaves the channel or drops offline.
//   this._engine.addListener('UserOffline', (uid, reason) => {
//       console.log('UserOffline', uid, reason)
//       const {peerIds} = this.state
//       this.setState({
//           // Remove peer ID from state array
//           peerIds: peerIds.filter(id => id !== uid)
//       })
//   })

//   // Listen for the JoinChannelSuccess callback.
//   // This callback occurs when the local user successfully joins the channel.
//   this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
//       console.log('JoinChannelSuccess', channel, uid, elapsed)
//       this.setState({
//           joinSucceed: true
//       })
//   })
// }

// // Pass in your token and channel name through this.state.token and this.state.channelName.
// // Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
// // the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.

// aj = {
//     appId: 'b822be57174c4a049c766d20c01b065e',
//     channel: 'ajm',
//     token: '006b822be57174c4a049c766d20c01b065eIAB/PZTojfo6JagxhynD0+nBzcvD4fVbogLBtzmjeE9H483mRRoAAAAAEACX33iMVGTMYAEAAQCNZMxg',
//     joinSucceed: false,
//     peerIds: [],
// }

// startCall = () =>{
//     <Uikit rtcProps={this.aj} />
// }

// // startCall = async () => {
// //   await this._engine?.joinChannel(this.state.token, this.state.channelName, null, 0)
// // }

// render() {
//   return  (
//       <View style={styles.max}>
//           <View style={styles.max}>
//               <View style={styles.buttonHolder}>
//                   <TouchableOpacity
//                       onPress={this.startCall}
//                       style={styles.button}>
//                       <Text style={styles.buttonText}> Start Call </Text>
//                   </TouchableOpacity>
//                   <TouchableOpacity
//                       onPress={this.endCall}
//                       style={styles.button}>
//                       <Text style={styles.buttonText}> End Call </Text>
//                   </TouchableOpacity>
//               </View>
//               {this._renderVideos()}
//           </View>
//       </View>
//   )
// }
// // Set the rendering mode of the video view as Hidden,
// // which uniformly scales the video until it fills the visible boundaries.
// _renderVideos = () => {
//   const {joinSucceed} = this.state
//   return joinSucceed ? (
//       <View style={styles.fullView}>
//           <RtcLocalView.SurfaceView
//               style={styles.max}
//               channelId={this.state.channelName}
//               renderMode={VideoRenderMode.Hidden}/>
//           {this._renderRemoteVideos()}
//       </View>
//   ) : null
// }
// // Set the rendering mode of the video view as Hidden,
// // which uniformly scales the video until it fills the visible boundaries.
// _renderRemoteVideos = () => {
//   const {peerIds} = this.state
//   return (
//       <ScrollView
//           style={styles.remoteContainer}
//           contentContainerStyle={{paddingHorizontal: 2.5}}
//           horizontal={true}>
//           {peerIds.map((value, index, array) => {
//               return (
//                   <RtcRemoteView.SurfaceView
//                       style={styles.remote}
//                       uid={value}
//                       channelId={this.state.channelName}
//                       renderMode={VideoRenderMode.Hidden}
//                       zOrderMediaOverlay={true}/>
//               )
//           })}
//       </ScrollView>
//   )
// }
// endCall = async () => {
//         await this._engine?.leaveChannel()
//         this.setState({peerIds: [], joinSucceed: false})
//     }
// }

// ================================================================================
// ================================================================================
// ================================================================================
// =========================== Video CAll ui Agora UI kit =========================
// ================================================================================
// ================================================================================
// ================================================================================

const requestCameraAndAudioPermission = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
    ]);
    if (
      granted['android.permission.RECORD_AUDIO'] ===
        PermissionsAndroid.RESULTS.GRANTED &&
      granted['android.permission.CAMERA'] ===
        PermissionsAndroid.RESULTS.GRANTED
    ) {
      console.log('You can use the cameras & mic');
    } else {
      console.log('Permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

function Video({route, navigation}) {
  const {head, kk} = route.params;
  console.log(head + 'hdgdsfghhh');
  console.log(kk + '  zzzzzzzzzzzzzzzzzzzzz');

  const [videocall, setvideocall] = useState(true);
  let callback = {
    EndCall: () => setvideocall(false),
  };
  if (Platform.OS === 'android') {
    requestCameraAndAudioPermission().then(() => {
      console.log('requested!');
    });
  }
  console.log('yyyyyyyyyyyyyyyyyyyyyyyyy       ' + kk);
  let rtc = {
    appId: 'b822be57174c4a049c766d20c01b065e',
    channel: head,
    token: kk,

    // '006b822be57174c4a049c766d20c01b065eIAB/PZTojfo6JagxhynD0+nBzcvD4fVbogLBtzmjeE9H483mRRoAAAAAEACX33iMVGTMYAEAAQCNZMxg',
    // joinSucceed: false,
  };

  return videocall ? (
    <Uikit rtcProps={rtc} callbacks={callback} />
  ) : (
    <View
      style={{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      }}>
      <Text>Call End</Text>
    </View>
  );

  //   return (<Uikit rtcProps={rtc} />)
}

// // let callback = {
// //     onEndcall : () => set
// // }

// // const Call =  async () =>{

// //    await  true  ?    <Uikit rtcProps={rtc} /> :<></>
// // }

// ================================================================================
// ================================================================================
// ================================================================================
// ============================= AUDIO CALLING ====================================
// ================================================================================
// ================================================================================
// ================================================================================

// const requestCameraAndAudioPermission = async () =>{
//   try {
//       const granted = await PermissionsAndroid.requestMultiple([
//           PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//       ])
//       if (
//           granted['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED
//       ) {
//           console.log('You can use the mic')
//       } else {
//           console.log('Permission denied')
//       }
//   } catch (err) {
//       console.warn(err)
//   }
// }

// Define a Props interface.
interface Props {}

// Define a State interface.
interface State {
  appId: string;
  token: string;
  channelName: string;
  joinSucceed: boolean;
  openMicrophone: boolean;
  enableSpeakerphone: boolean;
  peerIds: number[];
  i:Boolean;
}

// Create an App component, which extends the properties of the Pros and State interfaces.
class Audio extends Component<Props, State> {
  _engine?: RtcEngine;
  // Add a constructor，and initialize this.state. You need:
  // Replace yourAppId with the App ID of your Agora project.
  // Replace yourChannel with the channel name that you want to join.
  // Replace yourToken with the token that you generated using the App ID and channel name above.
  constructor(props) {
    super(props);
    this.state = {
      appId: 'b822be57174c4a049c766d20c01b065e',
      token:'',
      channelName:'',
      openMicrophone: true,
      enableSpeakerphone: true,
      joinSucceed: false,
      peerIds: [],
      i : true
    };
    if (Platform.OS === 'android') {
      // Request required permissions from Android
      requestCameraAndAudioPermission().then(() => {
        console.log('requested!');
      });
    }
  }
  // Other code. See step 5 to step 9.
  // Mount the App component into the DOM.


  componentDidMount() {
   
    // this._Call()
    AsyncStorage.getItem('channel').then(fff => {
      console.log('Async storage user id     ' + fff);
      this.setState({channelName: fff});
    });
    AsyncStorage.getItem('token')
      .then(fll => {
        console.log('Async storage user id     ' + fll);
        this.setState({token: fll});
      }) 
    
    // this._joinChannel()
    // this._joinChannel()
      
    this.init()
    

   
  }
  
  // _Call();



//   componentDidUpdate() {
//     // this._Call()
   
   
    
   
//   }

//   componentWillUnmount() { 
//     // this.setState({i:true})
// }


  // Pass in your App ID through this.state, create and initialize an RtcEngine object.
  init = async () => {

    

     


        
    

    const {appId} = this.state;
    this._engine = await RtcEngine.create(appId);
    // Enable the audio module.
    await this._engine.enableAudio();

    // Listen for the UserJoined callback.
    // This callback occurs when the remote user successfully joins the channel.
    this._engine.addListener(
      'UserJoined',
      (uid, elapsed) => {
        console.log('UserJoined', uid, elapsed);
        const {peerIds} = this.state;
        if (peerIds.indexOf(uid) === -1) {
          this.setState({
            peerIds: [...peerIds, uid],
          });
        }
      },
      2000,
    );

    // Listen for the UserOffline callback.
    // This callback occurs when the remote user leaves the channel or drops offline.
    this._engine.addListener('UserOffline', (uid, reason) => {
      console.log('UserOffline', uid, reason);
      const {peerIds} = this.state;
      this.setState({
        // Remove peer ID from state array
        peerIds: peerIds.filter(id => id !== uid),
      });
    });

    // Listen for the JoinChannelSuccess callback.
    // This callback occurs when the local user successfully joins the channel.
    this._engine.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      console.log('JoinChannelSuccess', channel, uid, elapsed);
      this.setState({
        joinSucceed: true,
      });
    });

      
        
    
    



  };
  // Pass in your token and channel name through this.state.token and this.state.channelName.
  // Set the ID of the local user, which is an integer and should be unique. If you set uid as 0,
  // the SDK assigns a user ID for the local user and returns it in the JoinChannelSuccess callback.



  _joinChannel = async () => {
     
    // this._Call()

    if ( this.state.i === true ) { 
      console.log(' join channel  ')
   
      await this._engine?.joinChannel(
        this.state.token,
        this.state.channelName,
        null,
        0,
      );

      this.setState({i:false})

    }  
    else {
      console.log(' ==============  call cut  ========')
      
    }
   
  };
 



  // Turn the microphone on or off.
  _switchMicrophone = () => {
    const {openMicrophone} = this.state;
    this._engine
      ?.enableLocalAudio(!openMicrophone)
      .then(() => {
        this.setState({openMicrophone: !openMicrophone});
      })
      .catch(err => {
        console.warn('enableLocalAudio', err);
      });
  };

  // Switch the audio playback device.
  _switchSpeakerphone = () => {
    const {enableSpeakerphone} = this.state;
    this._engine
      ?.setEnableSpeakerphone(!enableSpeakerphone)
      .then(() => {
        this.setState({enableSpeakerphone: !enableSpeakerphone});
      })
      .catch(err => {
        console.warn('setEnableSpeakerphone', err);
      });
  };

  _Call = ()=> {
    AsyncStorage.getItem('channel').then(fff => {
      console.log('Async storage user id     ' + fff);
      this.setState({channelName: fff});
    });
    AsyncStorage.getItem('token')
      .then(fll => {
        console.log('Async storage user id     ' + fll);
        this.setState({token: fll});
      }) 
      // .then(this.init());
  };
 

  render() {
    // console.log(this.props.navigation.state.params.head)
    // setTimeout(() => {

      AsyncStorage.getItem('channel').then(fff => {
        if (channelName === fff){
         console.log(channelName + "   is  "+ fff)
        //  this.init()
         this._joinChannel()
        }
        else {
          console.log('Async storage user id     ' + fff);
        this.setState({channelName: fff});

        }
      });
      AsyncStorage.getItem('token')
        .then(fll => {
          if (this.state.token  === fll ){

            console.log(this.state.token +"    is   "+ fll)
            // this._joinChannel()

          }
          else{
            console.log('Async storage user id     ' + fll);
            this.setState({token: fll});

          }
        }) 

      // this._Call()

      // this._joinChannel
    // });
    
     
    const {navigation} = this.props;

    const {channelName, joinSucceed, openMicrophone, enableSpeakerphone} =
      this.state;
    return (
      // <View style={styles.container}>
      //   <View style={styles.top}>
      //     <TextInput
      //       style={styles.input}
      //       // onChangeText={text => this.setState({channelName: text})}
      //       placeholder={'Channel Name'}
      //       value={channelName}
      //     />
      //     <Button
      //       onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
      //       title={`${joinSucceed ? 'Leave' : 'Join'} channel`}
      //     />
      //     <Text></Text>
      //   </View>
      //   <View style={styles.float}>
      //     <Button
      //       onPress={this._switchMicrophone}
      //       title={`Microphone ${openMicrophone ? 'on' : 'off'}`}
      //     />
      //     <Button
      //       onPress={this._switchSpeakerphone}
      //       title={enableSpeakerphone ? 'Speakerphone' : 'Earpiece'}
      //     />
      //   </View>
      // </View>






      <View style ={{height:'100%',width:'100%'}}>
      <View  style={{width:'100%',height:130,backgroundColor:'#128C7E'}}>
        <Text style ={{alignSelf:'center',top:10,color:'#fff',}}>End-to-end encrypted</Text>
        <Text style ={{alignSelf:'center',top:80,color:'#fff',}}>Calling</Text>

      </View>
      <View>
        <Image source={require('./u.jpg')} style={{left:0,top:0,right:0,bottom:0,height:510,width:'100%'}} />
      </View>
      <View style={{width:'100%',height:'100%',backgroundColor:'#128C7E',justifyContent:'space-between',flexDirection:'row',flex:1}}>
     <TouchableOpacity  onPress={this._switchSpeakerphone} style={{alignSelf:'center',top:3,left:20}} >

     {enableSpeakerphone ? <Ionicons name='volume-mute' size={30} color='#fff'  /> : <Ionicons name='volume-high' size={30} color='#fff'  />}
     {/* <Ionicons name='volume-high' size={30} color='#fff'  /> */}
     </TouchableOpacity>
     
    
      
      
      
        <TouchableOpacity
        onPress={joinSucceed ? this._leaveChannel : this._joinChannel}
        style={{height:60,width:60,borderRadius:50,backgroundColor:'#EF4E28',top:6}}>

        <Ionicons name='call' size={30} color='#fff' style={{alignSelf:'center',top:13}} />
        </TouchableOpacity>
       
      <TouchableOpacity 
       onPress={this._switchMicrophone}
      style={{alignSelf:'center',top:3,right:20}}
      >

      {openMicrophone ?  <Ionicons name='mic-off' size={30} color='#fff' /> :  <Ionicons name='mic' size={30} color='#fff'  />}
      {/* <Ionicons name='mic-off' size={30} color='#fff'  /> */}
      </TouchableOpacity>



       

      </View>

    </View>





    );
  }
  _leaveChannel = async () => {
    await this._engine?.leaveChannel();
    this.setState({peerIds: [], joinSucceed: false});
    // this.navigation.Navigator('Home')
  };
}

// ======================================================
// ===================== App ============================
// ======================================================

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="video" component={Video} />
        <Stack.Screen name="Audio" component={Audio} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function Home({navigation}) {
  const [token, settoken] = useState();
  const [ch, setch] = useState();
  console.log(ch);

  const Chtext = () => {
    setTimeout(async () => {
      await axios
        .post(
          'https://agoralogajm.herokuapp.com/fetch_rtc_token',
          {
            // uid: '974509v9852',
            channelName: ch,
            // role: "host"
          },
          {
            headers: {
              'Content-Type': 'application/json; charset=UTF-8',
            },
          },
        )
        .then(function (response) {
          console.log(response);
          const token = response.data.token;
          // const ch = response.data.channelName;
          // console.log(ch)
          console.log('ajm agsdkhgf       ' + token);
          // console.log('pk         '+channelName)
          // resolve(token);
          settoken(token);
        })
        .catch(function (error) {
          // console.log('shgahjghajrjhjhgjhgjfjhjkghgjfhjgjh')
          console.log(error);
        });
    }, 1000);
  };

  const Press = () => {
    setTimeout(() => {
      console.log('hhhhhh  dgfafsg       ' + token);
      navigation.navigate('video', {head: ch, kk: token});
    }, 2000);
  };

  const AudioPress = () => {
    setTimeout(() => {
      console.log('hhhhhh  dgfafsg       ' + token);
      navigation.navigate('Audio');
      AsyncStorage.setItem('channel', ch);
      AsyncStorage.setItem('token', token)
      // try {
      //   AsyncStorage.setItem('channel', ch);
      //   AsyncStorage.setItem('token', token);

      //   //  console.log(AsyncStorage.getItem('token'))
      //   // AsyncStorage.getItem('channel').then((fff)=>{
      //   // console.log('Async storage user id     '+fff)
      //   // })
      //   // AsyncStorage.getItem('token').then((fll)=>{
      //   //   console.log('Async storage user id     '+fll)
      //   //   })
      // } catch (e) {
      //   console.log(e);
      //   // saving error
      // }
    }, 2000);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View>
        <TextInput
          placeholder="enter channel name"
          onChangeText={e => setch(e)}
        />
        <Button title="get token" onPress={Chtext} />
        <Button title="video call" onPress={Press} />
        <Button title="Voice call" onPress={AudioPress} />
      </View>
    </View>





    
  );
}
