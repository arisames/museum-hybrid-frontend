import { create } from 'zustand';

const useStore = create((set) => ({
  // Auth state
  token: localStorage.getItem('token') || null,
  user: JSON.parse(localStorage.getItem('user')) || null,
  setToken: (token) => {
    set({ token });
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  },
  setUser: (user) => {
    set({ user });
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  },
  logout: () => {
    set({ token: null, user: null });
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Message state (for private messages)
  messages: [],
  setMessages: (messages) => set({ messages }),
  addMessage: (message) => set((state) => ({ messages: [message, ...state.messages] })),
  updateMessage: (updatedMessage) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg._id === updatedMessage._id ? updatedMessage : msg
      ),
    })),
  deleteMessage: (messageId) =>
    set((state) => ({
      messages: state.messages.filter((msg) => msg._id !== messageId),
    })),

  // UI state (e.g., active tab in inbox)
  activeTab: 'inbox',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // Loading and error states (general purpose, can be refined later)
  loading: false,
  setLoading: (loading) => set({ loading }),
  error: null,
  setError: (error) => set({ error }),
}));

export default useStore;


