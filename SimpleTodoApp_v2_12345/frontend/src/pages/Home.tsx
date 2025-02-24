import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  subtasks: Subtask[];
}

interface Subtask {
  id: number;
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newSubtask, setNewSubtask] = useState('');

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false, subtasks: [] }]);
      setNewTask('');
    }
  };

  const addSubtask = (taskId: number, e: React.FormEvent) => {
    e.preventDefault();
    if (newSubtask.trim()) {
      setTasks(tasks.map(task => 
        task.id === taskId 
          ? { ...task, subtasks: [...task.subtasks, { id: Date.now(), text: newSubtask, completed: false }] }
          : task
      ));
      setNewSubtask('');
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleSubtaskCompletion = (taskId: number, subtaskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, subtasks: task.subtasks.map(subtask => 
            subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
          )}
        : task
    ));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const deleteSubtask = (taskId: number, subtaskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId) }
        : task
    ));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col lg={4} className="order-lg-3 mb-3">
          <Card>
            <Card.Header>
              <h5>Add New Task</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={addTask}>
                <Form.Group as={Row}>
                  <Col xs={10} md={11} lg={10}>
                    <Form.Control
                      type="text"
                      placeholder="Enter a task"
                      value={newTask}
                      onChange={(e) => setNewTask(e.target.value)}
                    />
                  </Col>
                  <Col xs={2} md={1} lg={2}>
                    <Button variant="outline-success" type="submit">
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Col>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={1} className="order-lg-2" />

        <Col lg={7} className="order-lg-1 mb-3">
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">To Do List</h5>
              <Button variant="outline-danger" onClick={deleteAllTasks}>
                Delete All
              </Button>
            </Card.Header>
            <Card.Body className="p-0">
              <ListGroup>
                {tasks.map((task) => (
                  <ListGroup.Item key={task.id}>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className={task.completed ? 'text-decoration-line-through' : ''}>
                        {task.text}
                      </span>
                      <div>
                        <Button
                          variant="link"
                          className="text-success"
                          onClick={() => toggleTaskCompletion(task.id)}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </Button>
                        <Button
                          variant="link"
                          className="text-danger"
                          onClick={() => deleteTask(task.id)}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </Button>
                      </div>
                    </div>
                    <ListGroup className="mt-2">
                      {task.subtasks.map((subtask) => (
                        <ListGroup.Item key={subtask.id} className="d-flex justify-content-between align-items-center">
                          <span className={subtask.completed ? 'text-decoration-line-through' : ''}>
                            {subtask.text}
                          </span>
                          <div>
                            <Button
                              variant="link"
                              className="text-success"
                              onClick={() => toggleSubtaskCompletion(task.id, subtask.id)}
                            >
                              <FontAwesomeIcon icon={faCheck} />
                            </Button>
                            <Button
                              variant="link"
                              className="text-danger"
                              onClick={() => deleteSubtask(task.id, subtask.id)}
                            >
                              <FontAwesomeIcon icon={faTimes} />
                            </Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <Form onSubmit={(e) => addSubtask(task.id, e)} className="mt-2">
                      <Form.Group as={Row}>
                        <Col xs={10} md={11}>
                          <Form.Control
                            type="text"
                            placeholder="Enter Subtask"
                            value={newSubtask}
                            onChange={(e) => setNewSubtask(e.target.value)}
                          />
                        </Col>
                        <Col xs={2} md={1}>
                          <Button variant="primary" type="submit" className="p-0">
                            <FontAwesomeIcon icon={faPlus} />
                          </Button>
                        </Col>
                      </Form.Group>
                    </Form>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;