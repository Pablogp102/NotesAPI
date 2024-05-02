const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes__container');
const deleteButton = document.querySelector('#btnDelete');



function cleanForm() {
    titleInput.value = '';
    descriptionInput.value = '';
    deleteButton.classList.add('hidden');
}

function populateForm(id) {
    getNoteById(id);
}

function displayNoteInForm(note) {
    titleInput.value = note.title;
    descriptionInput.value = note.description;
    deleteButton.classList.remove('hidden');
    deleteButton.setAttribute('data-id', note.id);
    saveButton.setAttribute('data-id', note.id);
    
}

function getNoteById(id) {
    fetch(`https://localhost:7279/api/notes/${id}`)
    .then(data => data.json())
    .then(response => displayNoteInForm(response));
}

function addNote(title, description) {
    const body = {
        title: title,
        description: description,
        isVisible: true
    };

    fetch('https://localhost:7279/api/notes', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(response => {
        cleanForm();
        getAllNotes();
    });
}

function displayNotes(notes) {
    let allNotes = '';


    notes.forEach(note => {
       const noteElement = `
                            <div class="note" data-id="${note.id}">
                                    <h3>${note.title}</h3>
                                    <p>${note.description}</p>
                            </div>
                            `;
    allNotes += noteElement;
    });

    notesContainer.innerHTML = allNotes;


    document.querySelectorAll('.note').forEach(note =>{
        note.addEventListener('click', function() {
            populateForm(note.dataset.id);
        });
    });
}

function getAllNotes(){
    fetch('https://localhost:7279/api/notes')
    .then(data => data.json())
    .then(response => displayNotes(response));
}

getAllNotes();

function updateNote(id, title, description) {
    const body = {
        title: title,
        description: description,
        isVisible: true
    };

    fetch(`https://localhost:7279/api/notes/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    })
    .then(data => data.json())
    .then(response => {
        cleanForm();
        getAllNotes();
        saveButton.dataset.id = '';
    });
}

saveButton.addEventListener('click', function() {
    const id = saveButton.dataset.id;

    if(id) {
        updateNote(id, titleInput.value, descriptionInput.value)
    }
    else {
    addNote(titleInput.value, descriptionInput.value);
    }
});

function deleteNote(id){
    fetch(`https://localhost:7279/api/notes/${id}`, {
        method: 'DELETE',
        headers: {
            "content-type": "application/json"
        }
})
    .then(response => {
        cleanForm();
        getAllNotes();
        saveButton.dataset.id = '';
    });
}

deleteButton.addEventListener('click', function() {
    const id = deleteButton.dataset.id;
    deleteNote(id);
});