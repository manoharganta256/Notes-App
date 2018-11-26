var fs = require('fs');

var logNote = (note) => {
    console.log('--');
    console.log('Title:', note.title);
    console.log('Body:', note.body);
};

var fetchNotes = () => {
    try {
        return JSON.parse(fs.readFileSync('notes-data.json'));
    } catch (error) {
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    };

    var duplicateNotes = (title) => {
        for (let note of notes) {
            if (note.title == title) {
                return true;
            }
        }
        return false;
    };

    if (duplicateNotes(title)) {
        console.log('Note title already taken');
    }
    else {
        notes.push(note);
        saveNotes(notes);
        console.log('Note created');
        logNote(note)
    }
};

var getAll = () => {
    return fetchNotes();
};

var removeNote = (title) => {
    var notes = fetchNotes();
    filteredNotes = notes.filter((note) => note.title != title);
    saveNotes(filteredNotes);

    return notes.length != filteredNotes.length;
};

var readNote = (title) => {
    var notes = fetchNotes();
    return notes.filter((note) => note.title == title)[0];
};

module.exports = {
    addNote,
    getAll,
    removeNote,
    readNote,
    logNote
}