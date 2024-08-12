import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Video from "react-native-video";

interface AdDisplayProps {
  adMedia: string;
  adLink: string;
  onClose: () => void;
}

const AdDisplay: React.FC<AdDisplayProps> = ({ adMedia, adLink, onClose }) => {
  const [showCloseButton, setShowCloseButton] = useState<boolean>(false);
  const progress = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const videoRef = useRef<typeof Video>(null);

  const isVideo = /\.(mp4|mov|avi|wmv)$/i.test(adMedia);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(progress, {
        toValue: 1,
        duration: 15000,
        useNativeDriver: false,
        easing: Easing.linear,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      setShowCloseButton(true);
    }, 15000);

    return () => clearTimeout(timer);
  }, [progress, fadeAnim]);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const renderMedia = () => {
    if (isVideo) {
      return (
        <Video
          ref={videoRef}
          source={{ uri: adMedia }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          repeat
          controls={false}
          paused={false}
        />
      );
    } else {
      return (
        <Image
          source={{ uri: adMedia }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      );
    }
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        justifyContent: "center",
        alignItems: "center",
        opacity: fadeAnim,
      }}
    >
      {renderMedia()}
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 6,
          backgroundColor: "#4a4a4a",
        }}
      >
        <Animated.View
          style={{
            width: progressWidth,
            height: "100%",
            backgroundColor: "#FF9C01",
            borderRadius: 3,
          }}
        />
      </View>
      {showCloseButton && (
        <TouchableOpacity
          style={{
            position: "absolute",
            width: 28,
            height: 28,
            top: 16,
            right: 16,
            backgroundColor: "white",
            borderRadius: 14,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onClose}
        >
          <Text style={{ color: "black", fontSize: 17, fontWeight: "900" }}>
            ×
          </Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 32,
          backgroundColor: "#FF9C01",
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 24,
          shadowColor: "#FF9C01",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 6,
        }}
        onPress={() => Linking.openURL(adLink)}
      >
        <Text style={{ color: "black", fontSize: 16, fontWeight: "600" }}>
          Learn More
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default AdDisplay;
