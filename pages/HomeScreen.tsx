import { View, Text, SafeAreaView, Button } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc';
import AdDisplay from '../components/AdDisplay';
import CallDetectorManager, { Event } from 'react-native-call-detection';


const HomeScreen = () => {
  const [showAd, setShowAd] = useState<boolean>(false);
   // to keep callDetector reference
   let callDetector: CallDetectorManager | undefined = undefined;

   const [callStates, setCallStates] = useState<string[]>([]);
   const [isStart, setIsStart] = useState<boolean>(false);

  const handleShowAd = () => {
    setShowAd(true);
  };
  const handleCloseAd = () => {
    setShowAd(false);
  };
 

  return (
    <SafeAreaView style={tw`flex-1 bg-primary`}>
    <View style={tw`flex-1 justify-center items-center`}>
      <Button title="Show Ad" onPress={handleShowAd} />
      {showAd && (
        <AdDisplay
          adMedia="https://videos.pexels.com/video-files/7722624/7722624-uhd_1440_2560_25fps.mp4"
          adLink="https://videos.pexels.com/video-files/7722624/7722624-uhd_1440_2560_25fps.mp4"
          onClose={handleCloseAd}
        />
      )}
    </View>
    </SafeAreaView>
  )
}

export default HomeScreen