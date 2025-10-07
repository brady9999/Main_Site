let notes =JSON.parse(localStorage.getItem("notes")) || [];
let currentNoteId = null;

const listContainer = document.getElementById("notes-list");
const titleInput = document.getElementById("noteTitle");
const contentInput = document.getElementById("note-content");
const notedate = document.getElementById("note-date");
const searchInput = document.getElementById("searchBar");
const pinBtn = document.getElementById("pinBtn");
const deleteModel = document.getElementById("deleteModal");

function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function renderNotes() {
    const query = searchInput.value.toLowerCase();
    listContainer.innerHTML = "";
    const pinned = notes.filter(n => n.pinned);
    const other = notes.filter(n => !n.pinned);

    const filtered = [...pinned, ...other].filter(n => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query));

    for (let note of filtered) {
        const div = document.createElement("div");
        div.className = "note-item" + (note.id === currentNoteId ? " active" : "");
        div.onclick = () => selectNote(note.id);
        div.innerHTML = `
        <h4>${note.title || "Untitled"}</h4>
        <small>${note.title}</small>
        ${note.pinned ? '<span class="pin-icon">📌</span>' : ''}
        `;
        listContainer.appendChild(div);
    }
}

function selectNote(id) {
    currentNoteId = id;
    const note = notes.find(n => n.id === id);
    if (!note) return; 
    titleInput.value = note.title;
    contentInput.value = note.content;
    notedate.textContent = "Last Edited: " + note.date;
    pinBtn.textContent = note.pinned ? "Unpin" : "Pin";
    renderNotes();
}

function updateCurrentNote() {}
