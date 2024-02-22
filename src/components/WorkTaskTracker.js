import axios from "axios";
import { useEffect, useState } from "react";
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function WorkTaskTracker() {
const [id, setId] = useState("");
const [workTaskName, setWorkTask] = useState("");
const [workTaskDueDate, setDueDate] = useState("");
const [workTaskStatus, setStatus] = useState("");
const [workTasks, setTasks] = useState([]);
 
  useEffect(() => {
    (async () => await Load())();
  }, []);
 
  async function Load() {
    
    const result = await axios.get("https://localhost:7059/api/WorkTask/GetWorkTask");
    setTasks(result.data);
    console.log(result.data);
  }
 
  async function save(event) {
   
    event.preventDefault();
    
    try {
      await axios.post("https://localhost:7059/api/WorkTask/AddWorkTask", {
        
      workTaskName: workTaskName,
      workTaskDueDate: workTaskDueDate,
      workTaskStatus: workTaskStatus,
       
      });
      alert("Task Added Successfully");
          setId("");
          setWorkTask("");
          setDueDate("");
          setStatus("");
       
     
      Load();
    } catch (err) {
      alert(err);
    }
  }
  async function editTask(workTasks) {
    setWorkTask(workTasks.workTaskName);
    setDueDate(workTasks.workTaskDueDate);
    setStatus(workTasks.workTaskStatus);
   
 
    setId(workTasks.id);
  }
 
  async function deleteTask(id) {
  await axios.delete("https://localhost:7059/api/WorkTask/DeleteWorkTask/" + id);
   alert("Task deleted Successfully");
   setId("");
   setWorkTask("");
   setDueDate("");
   setStatus("");
   Load();
  }
 
  async function update(event) {
    event.preventDefault();
    try {
  await axios.patch("https://localhost:7059/api/WorkTask/UpdateWorkTask/"+ workTasks.find((u) => u.id === id).id || id,
        {
        id: id,
        workTaskName: workTaskName,
        workTaskDueDate: workTaskDueDate,
        workTaskStatus: workTaskStatus,
        }
      );
      alert("Task Updated");
      setId("");
      setWorkTask("");
      setDueDate("");
      setStatus("");
     
      Load();
    } catch (err) {
      alert(err);
    }
  }
    return (
      <div>
        <h1>Task Details</h1>
      <div class="container mt-4">
        <form>
          <div class="form-group">
           
            <input
              type="text"
              class="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Task Name</label>
            <input
              type="text"
              class="form-control"
              id="workTaskName"
              value={workTaskName}
              onChange={(event) => {
                setWorkTask(event.target.value);
              }}
            />
          </div>
          <div class="form-group">
          <label>Due Date</label>
          <br></br>
            <Datepicker className="form-control" selected={workTaskDueDate} onChange={dueDate=> setDueDate(dueDate)} />                     
          </div>
          <div class="form-group">
            <label>Status</label>
            <input
              type="text"
              class="form-control"
              id="workTaskStatus"
              value={workTaskStatus}
              onChange={(event) => {
                setStatus(event.target.value);
              }}
            />
          </div>
          <div>
            <button class="btn btn-primary mt-4" onClick={save}>
              Add Task
            </button>
            <button class="btn btn-warning mt-4" onClick={update}>
              Update Task
            </button>
          </div>
        </form>
      </div>
      <br></br>
      <table align="center">
        <thead>
          <tr>
            <th scope="col">Task Id</th>
            <th scope="col">Task Name</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
         
 
            <th scope="col">Option</th>
          </tr>
        </thead>
        {workTasks.map(function fn(workTask) {
          return (
            <tbody>
              <tr>
                <td>{workTask.id} </td>
                <td>{workTask.workTaskName}</td>
                <td>{workTask.workTaskDueDate}</td>
                <td>{workTask.workTaskStatus}</td>
                
                <td>
                  <button
                    type="button"
                    class="btn btn-warning"
                    onClick={() => editTask(workTask)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => deleteTask(workTask.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
        
      </div>
    );
  }
  
  export default WorkTaskTracker;