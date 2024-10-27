import { useState } from 'react';
import '../../../App.css';
import {
  useCreate,
  useDeleteAllTodos,
  useDeleteById,
  useGetAllTodos,
  useGetEdit,
} from '../services';

function Add() {
  const [task, setTask] = useState();
  const [editId, setEditId] = useState();

  const { data } = useGetAllTodos();
  const { mutate: create } = useCreate();
  const { mutate: del } = useDeleteAllTodos();
  const { mutate: delId } = useDeleteById();
  const { mutate: edit } = useGetEdit();

  const deleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all tasks?')) {
      try {
        await del();
      } catch (error) {
        console.error('Error deleting all tasks:', error);
      }
    }
  };

  const handleDelete = (id) => {
    delId(id);
  };

  const handleInputChange = (e) => {
    setTask(e.target.value);
  };

  const handleEdit = (item) => {
    setTask(item.title);
    setEditId(item.id);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim()) {
      try {
        if (editId) {
          await edit({ reqBody: { id: editId, title: task } });
          setEditId(null);
        } else {
          await create({ title: task });
        }
        setTask('');
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Task cannot be empty!');
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <h1>ToDoList</h1>
      <div className="context">
        <input
          type="text"
          id="task"
          value={task}
          placeholder="Enter the task"
          onChange={handleInputChange}
        />
        <input
          style={{
            padding: '0 1rem',
            margin: '0 1rem',
            border: 'none',
            cursor: 'pointer',
          }}
          id="adding"
          type="submit"
          value={editId ? 'Edit' : 'Add'}
        />

        <input
          type="button"
          style={{ padding: '0 1rem', margin: '0 0.1rem', border: 'none' }}
          value="Clear"
          onClick={() => deleteAll()}
        />
      </div>

      <ul className="text" id="text">
        {data?.data.map((item) => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            {item?.title}
            <div>
              <button
                style={{ border: 'none', marginRight: '1rem' }}
                type="button"
                onClick={() => handleEdit(item)}
              >
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{ color: '#63E6BE', cursor: 'pointer' }}
                />
              </button>
              <button
                style={{ border: 'none' }}
                type="button"
                onClick={() => handleDelete(item?.id)}
              >
                <i
                  className="fa-solid fa-trash"
                  style={{ color: '#63E6BE', cursor: 'pointer' }}
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Add;
