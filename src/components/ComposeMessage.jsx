import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import useStore from '../context/store';
import useSendMessage from '../hooks/useSendMessage';
import UserSearchInput from './UserSearchInput';
import { sanitizeSubject, sanitizeMessageContent } from '../lib/utils'; // Assuming utils.js has sanitization functions
import './ComposeMessage.css';

// Zod validation schema with sanitization
const messageSchema = z.object({
  subject: z
    .string()
    .min(1, 'Subject is required')
    .max(200, 'Subject must be less than 200 characters')
    .transform((val) => sanitizeSubject(val))
    .refine(
      (val) => val.trim().length > 0,
      'Subject cannot be empty or contain only whitespace'
    ),
  content: z
    .string()
    .min(1, 'Message content is required')
    .max(5000, 'Message must be less than 5000 characters')
    .transform((val) => sanitizeMessageContent(val))
    .refine(
      (val) => val.trim().length > 0,
      'Message cannot be empty or contain only whitespace'
    ),
});

const ComposeMessage = ({ onMessageSent, onCancel, replyTo = null }) => {
  const { token } = useStore();
  const { sendMessage, sending } = useSendMessage();
  
  const [selectedUser, setSelectedUser] = useState(
    replyTo?.sender ? { _id: replyTo.sender._id, username: replyTo.sender.username, email: replyTo.sender.email } : null
  );

  // Initialize react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      subject: replyTo ? `Re: ${replyTo.subject}` : '',
      content: '',
    },
    mode: 'onChange',
  });

  // Watch form values for character counting
  const watchedSubject = watch('subject');
  const watchedContent = watch('content');

  // Form submission handler
  const onSubmit = async (data) => {
    if (!selectedUser) {
      toast.error('Please select a recipient');
      return;
    }

    try {
      const messageData = {
        receiverId: selectedUser._id,
        subject: data.subject,
        content: data.content,
        parentMessageId: replyTo?._id || null,
      };

      await sendMessage(messageData);
      
      // Reset form
      reset();
      setSelectedUser(null);
      
      if (onMessageSent) {
        onMessageSent();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="compose-message">
      <div className="compose-header">
        <h3>{replyTo ? 'Reply to Message' : 'Compose New Message'}</h3>
        {onCancel && (
          <button className="close-button" onClick={onCancel}>
            ×
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="compose-form">
        {!replyTo && (
          <div className="form-group">
            <label htmlFor="receiverId">To: *</label>
            <UserSearchInput
              onUserSelect={setSelectedUser}
              selectedUser={selectedUser}
            />
            {selectedUser && (
              <small className="help-text">
                Selected: {selectedUser.username} ({selectedUser.email})
              </small>
            )}
            {errors.receiverId && (
              <small className="error-message">{errors.receiverId.message}</small>
            )}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="subject">Subject: *</label>
          <input
            type="text"
            id="subject"
            {...register('subject')}
            placeholder="Enter message subject"
            className={errors.subject ? 'error' : ''}
          />
          <div className="field-info">
            <small className="char-count">
              {watchedSubject?.length || 0}/200 characters
            </small>
            {errors.subject && (
              <small className="error-message">{errors.subject.message}</small>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="content">Message: *</label>
          <textarea
            id="content"
            {...register('content')}
            placeholder="Enter your message"
            rows="8"
            className={errors.content ? 'error' : ''}
          />
          <div className="field-info">
            <small className="char-count">
              {watchedContent?.length || 0}/5000 characters
            </small>
            {errors.content && (
              <small className="error-message">{errors.content.message}</small>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="send-button"
            disabled={sending || !isValid || (!replyTo && !selectedUser)}
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
          {onCancel && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ComposeMessage;


