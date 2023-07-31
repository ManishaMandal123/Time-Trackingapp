import React, { useState, createContext, useContext } from 'react';
import './App.css';

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  return (
    <DataContext.Provider value={{ projects, setProjects, tasks, setTasks }}>
      {children}
    </DataContext.Provider>
  );
};

const Projects = () => {
  const { projects, setProjects } = useContext(DataContext);
  const [projectName, setProjectName] = useState('');

  const handleAddProject = () => {
    setProjects([...projects, projectName]);
    setProjectName('');
  };

  return (
    <>
      <h2>Projects</h2>
      <input
        type="text"
        value={projectName}
        onChange={e => setProjectName(e.target.value)}
        placeholder="Enter project name"
      />
      <button onClick={handleAddProject}>Add Project</button>
      <ul>
        {projects.map(project => (
          <li key={project}>{project}</li>
        ))}
      </ul>
    </>
  );
};

const Tasks = () => {
  const { projects, tasks, setTasks } = useContext(DataContext);
  const [taskName, setTaskName] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);
  const [description, setDescription] = useState('');

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        project: selectedProject,
        taskName,
        timeSpent,
        description,
      },
    ]);
    setTaskName('');
    setTimeSpent(0);
    setDescription('');
  };

  return (
    <>
      <h2>Tasks</h2>
      <select
        value={selectedProject}
        onChange={e => setSelectedProject(e.target.value)}
      >
        {projects.map(project => (
          <option key={project} value={project}>
            {project}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={taskName}
        onChange={e => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <input
        type="number"
        value={timeSpent}
        onChange={e => setTimeSpent(e.target.value)}
        placeholder="Enter time spent (in hours)"
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Enter description"
      />
      <button onClick={handleAddTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={`${task.project}-${task.taskName}`}>
            Project: {task.project} | Task: {task.taskName} | Time Spent: {task.timeSpent} hours | Description: {task.description}
          </li>
        ))}
      </ul>
    </>
  );
};

const App = () => {
  return (
    <DataProvider>
      <div className="container">
        <h1>Time-Tracking Application</h1>
        <Projects />
        <Tasks />
      </div>
    </DataProvider>
  );
};

export default App;
