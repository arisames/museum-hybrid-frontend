import React, { useEffect } from 'react';
import { toast } from 'sonner';
import useStore from '../context/store';
import apiService from '../services/apiService';
import useMessages from '../hooks/useMessages';
import CustomAlertDialog from './AlertDialog';
import './PrivateMessageInbox.css';

const PrivateMessageInbox = () => {
  const {
    setMessages,
    deleteMessage,
    activeTab,
    setActiveTab,
    token,
    loading,
    setLoading,
    error,
    setError,
  } = useStore();

  const { messages } = useMessages();

  const [selectedMessage, setSelectedMessage] = React.useState(null);

  const handleMessageClick = async (messageId) => {
    setError(null);
    try {
      const message = await apiService.get(`/messages/${messageId}`, token);
      setSelectedMessage(message);
      
      if (activeTab === 'inbox' && !message.read) {
        await apiService.put(`/messages/${messageId}/read`, { read: true }, token);
        setMessages(prevMessages => 
          prevMessages.map(msg => 
            msg._id === messageId ? { ...msg, read: true } : msg
          )
        );
      }
    } catch (err) {
      const errorMessage = err.data?.message || err.message || 'Failed to fetch message details';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    setError(null);
    try {
      await apiService.delete(`/messages/${messageId}`, token);
      deleteMessage(messageId);
      setSelectedMessage(null);
      toast.success('Message deleted successfully!');
    } catch (err) {
      const errorMessage = err.data?.message || err.message || 'Failed to delete message';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="private-message-inbox">
      <div className="inbox-header">
        <h2>Private Messages</h2>
        <div className="tab-buttons">
          <button 
            className={activeTab === 'inbox' ? 'active' : ''}
            onClick={() => setActiveTab('inbox')}
          >
            Inbox
          </button>
          <button 
            className={activeTab === 'sent' ? 'active' : ''}
            onClick={() => setActiveTab('sent')}
          >
            Sent
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="inbox-content">
        <div className="message-list">
          {messages.length === 0 ? (
            <div className="no-messages">No messages found</div>
          ) : (
            messages.map((message) => (
              <div 
                key={message._id} 
                className={`message-item ${!message.read && activeTab === 'inbox' ? 'unread' : ''}`}
                onClick={() => handleMessageClick(message._id)}
              >
                <div className="message-header">
                  <span className="sender">
                    {activeTab === 'inbox' 
                      ? `${message.sender?.username || 'Unknown'} (${message.sender?.email || 'No Email'})`
                      : `${message.receiver?.username || 'Unknown'} (${message.receiver?.email || 'No Email'})`
                    }
                  </span>
                  <span className="date">{formatDate(message.sentAt)}</span>
                </div>
                <div className="message-subject">{message.subject}</div>
                <div className="message-preview message-preview-ellipsis">
                  {message.content}
                </div>
              </div>
            ))
          )}
        </div>

        {selectedMessage && (
          <div className="message-detail">
            <div className="message-detail-header">
              <h3>{selectedMessage.subject}</h3>
              <button 
                className="close-button"
                onClick={() => setSelectedMessage(null)}
              >
                ×
              </button>
            </div>
            <div className="message-meta">
              <p><strong>From:</strong> {selectedMessage.sender?.username} ({selectedMessage.sender?.email})</p>
              <p><strong>To:</strong> {selectedMessage.receiver?.username} ({selectedMessage.receiver?.email})</p>
              <p><strong>Date:</strong> {formatDate(selectedMessage.sentAt)}</p>
            </div>
            <div className="message-content">
              {/* For rich text, consider a library like react-markdown or dangerouslySetInnerHTML with DOMPurify */}
              {selectedMessage.content}
            </div>
            <div className="message-actions">
              <CustomAlertDialog
                triggerText="Delete"
                title="Confirm Deletion"
                description="Are you sure you want to delete this message? This action cannot be undone."
                onConfirm={() => handleDeleteMessage(selectedMessage._id)}
              >
                <button className="delete-button">Delete</button>
              </CustomAlertDialog>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrivateMessageInbox;

