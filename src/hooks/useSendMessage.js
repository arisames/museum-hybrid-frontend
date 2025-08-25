import { useState } from 'react';
import { toast } from 'sonner';
import useStore from '../context/store';
import apiService from '../services/apiService';

const useSendMessage = () => {
  const { token, addMessage, setLoading } = useStore();
  const [sending, setSending] = useState(false);

  const sendMessage = async (messageData) => {
    setSending(true);
    setLoading(true);
    
    try {
      const newMessage = await apiService.post('/messages', messageData, token);
      addMessage(newMessage);
      toast.success('Message sent successfully!');
      return newMessage;
    } catch (err) {
      const errorMessage = err.data?.message || err.message || 'Failed to send message. Please try again.';
      toast.error(errorMessage);
      throw err;
    } finally {
      setSending(false);
      setLoading(false);
    }
  };

  return { sendMessage, sending };
};

export default useSendMessage;

