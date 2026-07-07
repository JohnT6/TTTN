import React, { useState } from 'react';
import PageManager from './pages/PageManager';
import Editor from './pages/Editor';
import Viewer from './pages/Viewer';

export default function App() {
  const [currentView, setCurrentView] = useState('manager'); // 'manager', 'editor', 'viewer'
  const [activePageId, setActivePageId] = useState(null);
  const [editLang, setEditLang] = useState('vi');

  const handleNavigate = (view, pageId = null, lang = 'vi') => {
    setCurrentView(view);
    setActivePageId(pageId);
    setEditLang(lang);
  };

  return (
    <div className="app-root">
      {currentView === 'manager' && (
        <PageManager onNavigate={handleNavigate} />
      )}
      {currentView === 'editor' && (
        <Editor 
          pageId={activePageId} 
          editLang={editLang}
          onNavigate={handleNavigate} 
        />
      )}
      {currentView === 'viewer' && (
        <Viewer 
          pageId={activePageId} 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
}