import { View, Text ,StyleSheet,Dimensions,StatusBar} from 'react-native'
import React, { useEffect } from 'react'
import { Video } from 'expo-av';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native'; 





export default function StreamingPage  ({route})  {
  
const isfocus = useIsFocused();


const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;


const selected = route.params.item;
console.log(selected.url)


useEffect(()=> {

if(isfocus) {
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
}
else{
  ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

}
StatusBar.setHidden(true);

return () => {
  ScreenOrientation.unlockAsync();
 
};

},[isfocus])
  return (
    <View style={{flex: 1,  backgroundColor: "black",}}>
      
      <View style={{ justifyContent: "center", alignSelf: 'center', backgroundColor: "black",}}>
      <Video
        // source={require('./path_to_your_local_video.mp4')} // Local video file
        // OR
        source={{ uri: selected.url }}
        
        useNativeControls // Remote video URL
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        isLooping
        style={{
          height:300,
          width: 400,
          
        }}
        // fullscreen={{
        //   enterFullscreen: () => {
           
        //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        //   },
        //   exitFullscreen: () => {
           
        //     ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        //   },
          
        // }}
      />
      </View>
    </View>
  )
}

