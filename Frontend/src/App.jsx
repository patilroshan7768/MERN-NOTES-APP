import { useState, useEffect } from "react";
import { getNotes, addNote, updateNote, deleteNote } from "./services/api";

function App() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  }

  async function handleAddOrUpdate() {
    if (!title.trim() || !content.trim()) {
      alert("Enter title and content");
      return;
    }

    try {
      if (editingId) {
        const updated = await updateNote(editingId, title, content);
        setNotes(notes.map(n => (n._id === editingId ? updated : n)));
        setEditingId(null);
      } else {
        const newNote = await addNote(title, content);
        setNotes([newNote, ...notes]);
      }
      setTitle("");
      setContent("");
    } catch (err) {
      console.error("Error saving note:", err);
    }
  }

  function startEdit(note) {
    setEditingId(note._id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo(0, 0);
  }

  async function handleDelete(id) {
    if (!confirm("Delete this note?")) return;
    try {
      await deleteNote(id);
      setNotes(notes.filter(n => n._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600">
          📝 Notes App
        </h1>

        <div className="mb-6">
          <input
            className="w-full border rounded-lg p-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border rounded-lg p-3 h-28 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="mt-4 flex gap-3">
            <button
              onClick={handleAddOrUpdate}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
            >
              {editingId ? "Update Note" : "Add Note"}
            </button>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  setTitle("");
                  setContent("");
                }}
                className="flex-1 bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <ul className="space-y-4">
          {notes.map((n) => (
            <li
              key={n._id}
              className="border rounded-lg p-4 bg-gray-50 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-semibold text-lg">{n.title}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(n.createdAt).toLocaleString()}
                </span>
              </div>
              <p className="text-gray-700 mb-3">{n.content}</p>
              <div className="flex gap-3">
                <button
                  onClick={() => startEdit(n)}
                  className="bg-yellow-400 text-black py-1 px-3 rounded-lg hover:bg-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(n._id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
