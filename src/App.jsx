
import React, { useState, useEffect } from 'react';
import Layout from './components/layout/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScenarioPlayer from './pages/ScenarioPlayer';
import CoursePlayer from './pages/CoursePlayer';
import AdminDashboard from './pages/AdminDashboard';
import { fullCourse as localFullCourse } from './data/fullCourse';
import { fetchCourseContent } from './services/sanityClient';

function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login'); // login, dashboard, scenario, course, admin
  const [activeScenarioId, setActiveScenarioId] = useState(null);
  const [courseData, setCourseData] = useState(localFullCourse);
  const [loadingCourse, setLoadingCourse] = useState(false);

  // Load course data on mount
  useEffect(() => {
    // Sanity fetching disabled to prioritize the new PI course content
    /*
    const loadCourse = async () => {
      setLoadingCourse(true);
      const data = await fetchCourseContent();
      if (data && data.length > 0) {
        setCourseData(data);
      } else {
        console.log("No Sanity data found, falling back to local.");
      }
      setLoadingCourse(false);
    };
    loadCourse();
    */
    console.log("Using local PI course content.");
  }, []);

  const handleLogin = (userData) => {
    // Backdoor for admin
    if (userData.name.toLowerCase() === 'admin') {
      setCurrentView('admin');
      setUser({ name: 'Administrator' });
    } else {
      setUser(userData);
      setCurrentView('dashboard');
    }
  };

  const handleSelectScenario = (id) => {
    if (id === 'full_course') {
      setCurrentView('course');
    } else {
      setActiveScenarioId(id);
      setCurrentView('scenario');
    }
  };

  const handleBackToDashboard = () => {
    setActiveScenarioId(null);
    setCurrentView('dashboard');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Content for authenticated users
  let content = null;
  if (currentView === 'dashboard') {
    content = <Dashboard onSelectScenario={handleSelectScenario} />;
  } else if (currentView === 'admin') {
    content = <AdminDashboard onBack={() => setCurrentView('dashboard')} />;
  } else if (currentView === 'course') {
    if (loadingCourse) {
      content = <div className="p-10 text-center">Loading course data...</div>;
    } else {
      content = (
        <CoursePlayer
          courseData={courseData}
          user={user}
          onComplete={handleBackToDashboard}
          onExit={handleBackToDashboard}
        />
      );
    }
  } else if (currentView === 'scenario') {
    content = (
      <ScenarioPlayer
        scenarioId={activeScenarioId}
        onComplete={handleBackToDashboard}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <Layout user={user}>
      {content}
    </Layout>
  );
}

export default App;
