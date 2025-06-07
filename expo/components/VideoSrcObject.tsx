import React, { forwardRef, useRef, useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export interface VideoSrcObjectProps {
  videoTrack?: any; // React Native 中没有 MediaStreamTrack，使用 any 作为占位
  style?: ViewStyle;
  facing?: CameraType;
  isActive?: boolean;
  onCameraReady?: () => void;
  onMountError?: (error: any) => void;
}

export const VideoSrcObject = forwardRef<CameraView, VideoSrcObjectProps>(
  ({ 
    videoTrack, 
    style, 
    facing = 'front', 
    isActive = true,
    onCameraReady,
    onMountError,
    ...rest 
  }, ref) => {
    const internalRef = useRef<CameraView | null>(null);
    const [permission, requestPermission] = useCameraPermissions();

    useEffect(() => {
      // 在 React Native 中，videoTrack 的处理方式不同
      // 这里主要是为了保持 API 兼容性
      if (videoTrack && internalRef.current) {
        // 可以在这里处理视频轨道相关的逻辑
        console.log('Video track updated:', videoTrack);
      }
    }, [videoTrack]);

    const handleCameraReady = () => {
      onCameraReady?.();
    };

    const handleMountError = (error: any) => {
      console.error('Camera mount error:', error);
      onMountError?.(error);
    };

    // 检查权限
    if (!permission) {
      return (
        <View style={[styles.container, styles.loading, style]} {...rest}>
          {/* 权限加载中 */}
        </View>
      );
    }

    if (!permission.granted) {
      return (
        <View style={[styles.container, styles.noPermission, style]} {...rest}>
          {/* 无权限状态 */}
        </View>
      );
    }

    if (!isActive) {
      return (
        <View 
          style={[styles.container, styles.inactive, style]}
          {...rest}
        />
      );
    }

    return (
      <CameraView
        style={[styles.container, style]}
        facing={facing}
        onCameraReady={handleCameraReady}
        onMountError={handleMountError}
        ref={(camera) => {
          internalRef.current = camera;
          if (ref) {
            if (typeof ref === 'function') {
              ref(camera);
            } else {
              ref.current = camera;
            }
          }
        }}
        {...rest}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f3f46', // 对应 bg-zinc-700
    flex: 1,
  },
  inactive: {
    backgroundColor: '#27272a', // 更深的灰色表示非活跃状态
  },
  loading: {
    backgroundColor: '#1f2937', // 加载状态
  },
  noPermission: {
    backgroundColor: '#ef4444', // 红色表示无权限
  },
});

VideoSrcObject.displayName = 'VideoSrcObject';