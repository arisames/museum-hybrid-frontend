import { useEffect } from 'react';
import { toast } from 'sonner';
import useStore from '../context/store';
import apiService from '../services/apiService';

const useMessages = () => {
  const { messages, setMessages, activeTab, token, setLoading, setError } = useStore();

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.get(`/messages?type=${activeTab}`, token);
        setMessages(data);
      } catch (err) {
        const errorMessage = err.data?.message || err.message || 'Failed to fetch messages';
        setError(errorMessage);
        toast.error(errorMessage);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [activeTab, token, setMessages, setLoading, setError]);

  return { messages };
};

export default useMessages;


