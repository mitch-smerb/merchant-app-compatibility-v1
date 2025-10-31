/**
 * Design System - Colors
 * Centralized color constants for the Merchant App
 */

export const colors = {
  // Brand Colors
  brand: {
    primary: '#334bc1',
    primaryLight: '#f0fcfd',
  },

  // Background Colors
  background: {
    default: '#f1f1f1', // color-sidebar from admin-app
    card: '#ffffff',
    blue: '#f0fcfd', // legacy blue background
  },

  // Text Colors
  text: {
    primary: '#1a1a1a',
    secondary: '#666666',
    muted: '#999999',
  },

  // Status/Semantic Colors
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Component Colors
  border: '#e5e7eb',
  divider: '#e5e7eb',
} as const;

export type Colors = typeof colors;
