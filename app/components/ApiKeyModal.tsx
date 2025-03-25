import React from 'react';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

// This component is now unused since we're using a hardcoded API key
export default function ApiKeyModal({ isOpen, onClose, onSave }: ApiKeyModalProps) {
  // Component is disabled since we're using a hardcoded API key
  return null;
} 