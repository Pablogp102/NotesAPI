const saveButton = document.querySelector('#btnSave');
const titleInput = document.querySelector('#title');
const descriptionInput = document.querySelector('#description');
const notesContainer = document.querySelector('#notes__container');

function cleanForm() {
    titleInput.value = '';
    descriptionInput.value = '';
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
                            <div class="note">
                                    <h3>${note.title}</h3>
                                    <p>${note.description}</p>
                            </div>
                            `;
    allNotes += noteElement;
    });

    notesContainer.innerHTML = allNotes;


    document.querySelectorAll('.note').forEach(note =>{
        note.addEventListener('click', function(){
            alert();
        });
    });
}

function getAllNotes(){
    fetch('https://localhost:7279/api/notes')
    .then(data => data.json())
    .then(response => displayNotes(response));
}

getAllNotes();

saveButton.addEventListener('click', function() {
    addNote(titleInput.value, descriptionInput.value);
});
