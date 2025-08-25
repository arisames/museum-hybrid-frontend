import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { Toaster } from 'sonner';
import PrivateMessageInbox from './components/PrivateMessageInbox';
import ComposeMessage from './components/ComposeMessage';
import AccessibilityAudit from './components/AccessibilityAudit';
import useStore from './context/store';
import './App.css';

function App() {
  const setActiveTab = useStore((state) => state.setActiveTab);

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">
              Museum Collection Platform - Advanced Forum Features
            </h1>
            <nav className="main-nav">
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-md transition-all duration-300 border border-white/30 text-center ${
                      isActive 
                        ? 'bg-white/20 border-white/50' 
                        : 'hover:bg-white/10'
                    }`
                  }
                  onClick={() => setActiveTab('inbox')}
                >
                  Messages
                </NavLink>
                <NavLink 
                  to="/compose" 
                  className={({ isActive }) => 
                    `px-4 py-2 rounded-md transition-all duration-300 border border-white/30 text-center ${
                      isActive 
                        ? 'bg-white/20 border-white/50' 
                        : 'hover:bg-white/10'
                    }`
                  }
                  onClick={() => setActiveTab('compose')}
                >
                  Compose
                </NavLink>
              </div>
            </nav>
          </div>
        </header>

        <main className="app-main flex-1 p-4 md:p-6">
          <div className="container mx-auto max-w-6xl">
            <Routes>
              <Route 
                path="/" 
                element={<PrivateMessageInbox />} 
              />
              <Route 
                path="/compose" 
                element={
                  <ComposeMessage 
                    onMessageSent={() => setActiveTab('inbox')}
                    onCancel={() => setActiveTab('inbox')}
                  />
                } 
              />
            </Routes>
          </div>
        </main>

        <footer className="app-footer bg-gray-800 text-white text-center py-4">
          <div className="container mx-auto px-4">
            <p className="text-sm">
              Museum Collection Platform - Task 7.3: Advanced Forum Features Demo
            </p>
          </div>
        </footer>
      </div>
      <Toaster position="bottom-right" richColors />
      <AccessibilityAudit />
    </Router>
  );
}

export default App;

