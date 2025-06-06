import { BlurTint } from "expo-blur";
import { ColorValue } from "react-native";

// Klein Blue + Black gradient theme
export default {
  // 主色调 - 克莱因蓝渐变系列
  primary: '#002FA7', // Klein Blue
  primaryLight: '#1E3A8A', // Lighter Klein Blue
  primaryDark: '#001B5E', // Darker Klein Blue

  // 渐变色组合
  gradients: {
    primary: ['#002FA7', '#001B5E'] as ColorValue[], // Klein Blue gradient
    secondary: ['#1E3A8A', '#000000'] as ColorValue[], // Blue to black
    background: ['#0F0F23', '#000000'] as ColorValue[], // Dark blue to black
    card: ['rgba(0, 47, 167, 0.15)', 'rgba(0, 0, 0, 0.3)'] as ColorValue[], // Translucent gradient
    glass: ['rgba(0, 47, 167, 0.1)', 'rgba(30, 58, 138, 0.05)'] as ColorValue[], // Glass effect gradient
  },

  // 辅助色
  secondary: '#4F46E5', // Complementary purple
  accent: '#06B6D4', // Cyan accent

  // 背景色系
  background: '#0A0A0F', // Deep dark background
  backgroundSecondary: '#1A1A2E', // Secondary dark background

  // 卡片和表面
  card: 'rgba(0, 47, 167, 0.08)', // Translucent Klein Blue
  cardBorder: 'rgba(0, 47, 167, 0.2)', // Klein Blue border
  surface: 'rgba(30, 58, 138, 0.1)', // Surface with blue tint

  // 文字颜色
  text: '#FFFFFF', // White text
  lightText: 'rgba(255, 255, 255, 0.87)', // Lighter white text
  textSecondary: 'rgba(255, 255, 255, 0.7)', // Semi-transparent white
  textMuted: 'rgba(255, 255, 255, 0.5)', // Muted white

  // 状态色（保持可读性）
  success: '#10B981', // Green
  danger: '#EF4444', // Red
  warning: '#F59E0B', // Orange

  // Glass效果
  overlay: 'rgba(0, 0, 0, 0.6)', // Dark overlay
  glassBorder: 'rgba(0, 47, 167, 0.3)', // Klein Blue glass border
  glassBackground: 'rgba(0, 47, 167, 0.05)', // Subtle Klein Blue background

  // Blur配置
  blurTint: 'dark' as BlurTint,
};