// Since this component is disabled, we don't need any imports

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (apiKey: string) => void;
}

// This component is now unused since we're using a hardcoded API key
export default function ApiKeyModal(_props: ApiKeyModalProps) {
  // Component is disabled since we're using a hardcoded API key
  return null;
} 