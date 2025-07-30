const addNotesBTN = document.querySelector('.create-notes');
const containerOfNotes = document.querySelector('.content-notes');
const note = [];
addNotesBTN.addEventListener('click', addNotes)


function addNotes(data = false) {

    let containerOfFragment = document.createElement('div');
    let fragment = document.createElement('p');
    fragment.setAttribute('contenteditable', true);
    fragment.style.width = "600px";
    fragment.style.backgroundColor = "black";
    fragment.style.color = "white";

    const id = data?.id || crypto.randomUUID();
    fragment.setAttribute('data-id', id);
    fragment.innerHTML = data?.note || "";

    containerOfFragment.innerHTML += `<i class="fa-solid fa-trash"></i>`;//de asta se pune += pentru a adauga nu pentru a suprascrie
    containerOfFragment.appendChild(fragment)
    containerOfNotes.appendChild(containerOfFragment);
    deleteNote(containerOfFragment, id);
    loadDatainStorage(fragment,id);
}

function showData() {
    const notesData = checkLocalST();
    notesData.forEach(note => addNotes(note))
}
showData();

function deleteNote(container, id) {
    container.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-solid')) {
            container.remove();

            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const index = notes.findIndex(note => note.id === id);
            if (index !== -1) {
                notes.splice(index, 1);
                localStorage.setItem('notes', JSON.stringify(notes));
            }

        }
    })
}

function checkLocalST() {
    return JSON.parse(localStorage.getItem('notes')) || [];
}

function loadDatainStorage(paragraph, id) {
    paragraph.addEventListener('blur', function () {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

        const existing = storedNotes.find(n => n.id === id)
        if (existing) {
            existing.note = paragraph.innerHTML;
        } else {
            storedNotes.push({
                id: id,
                note: paragraph.innerHTML
            });
        }
        localStorage.setItem('notes', JSON.stringify(storedNotes))
    });
}
