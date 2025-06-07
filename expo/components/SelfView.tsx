import React, { forwardRef } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { CameraView } from 'expo-camera';
import { VideoSrcObject, VideoSrcObjectProps } from './VideoSrcObject';

export interface SelfViewProps extends Omit<VideoSrcObjectProps, 'facing'> {
  style?: ViewStyle;
}

export const SelfView = forwardRef<CameraView, SelfViewProps>(
  ({ style, ...rest }, ref) => {
    return (
      <VideoSrcObject
        style={[styles.selfView, style]}
        facing="front" // 前置摄像头，相当于 web 版本的镜像效果
        {...rest}
        ref={ref}
      />
    );
  }
);

const styles = StyleSheet.create({
  selfView: {
    backgroundColor: '#3f3f46', // 相当于 web 版本的 bg-zinc-700
    // React Native 中通过 scaleX: -1 实现镜像效果
    // 但由于使用前置摄像头，通常已经是镜像的，所以这里不需要额外处理
  },
});

SelfView.displayName = 'SelfView';