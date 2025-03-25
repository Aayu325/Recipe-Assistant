'use client';

import React, { useState, useEffect } from 'react';
import { FaTimes, FaKey, FaCheck, FaSpinner } from 'react-icons/fa';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

// This component is now unused since we're using a hardcoded API key
export default function ApiKeyModal({ isOpen, onClose, onSave }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // This component is now hidden - we're using a hardcoded API key
  return null;
} 