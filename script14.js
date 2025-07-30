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
    if (data) {
        fragment.innerHTML = data.note;
    }
    containerOfFragment.innerHTML += `<i class="fa-solid fa-trash"></i>`;//de asta se pune += pentru a adauga nu pentru a suprascrie
    containerOfFragment.appendChild(fragment)
    containerOfNotes.appendChild(containerOfFragment);
    function loadData(data) {
        deleteNote(containerOfFragment, data);
        loadDatainStorage(fragment);
    }
    loadData(data);
}

if (notesData = checkLocalST()) {

    notesData.map(data => {
        addNotes(data);
    })
}

function deleteNote(container, data) {
    container.addEventListener('click', function (e) {
        if (e.target.classList.contains('fa-solid')) {
            e.target.parentNode.remove();
            // console.log(e.target.id === localStorage.getItem(`${data.id}`));
            // console.log(data, e.target.id, JSON.parse(localStorage.getItem(`notes`)));

            if (data) {
                const arrLocalStorage = JSON.parse(localStorage.getItem(`notes`));
                let indexOf = arrLocalStorage.findIndex(object => object.id === data.id)
                
                if (indexOf > -1) {
                    arrLocalStorage.splice(indexOf, 1);
                    localStorage.setItem('notes', JSON.stringify(arrLocalStorage))
                }
            }

        }
    })
}

function updateNote(paragraph, id) {
    note.push({
        id: id,
        note: paragraph.innerHTML
    });
    localStorage.setItem('notes', JSON.stringify(note))
}

function checkLocalST() {
    let notes = JSON.parse(localStorage.getItem('notes'));
    return notes ? notes.map(dd => dd) : false;

}

function loadDatainStorage(paragraph) {
    paragraph.addEventListener('blur', function () {
        const id = crypto.randomUUID();
        paragraph.id = id;
        updateNote(paragraph, id);
    })
}
