const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var titleOptions = {
    describe: "Title of the note",
    demand: true,
    alias: 't'
};

var bodyOptions = {
    describe: "Body of the note",
    demand: true,
    alias: 'b'
};

var argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', "List all notes")
    .command('remove', "Remove a note", {
        title: titleOptions
    })
    .command('read', "Read a note", {
        title: titleOptions
    })
    .help().argv;

var command = argv._[0];

if (command == 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
}
else if (command == 'add') {
    notes.addNote(argv.title, argv.body);
}
else if (command == 'read') {
    var note = notes.readNote(argv.title);
        if (note) {
            notes.logNote(note);
        }
        else {
            console.log('Note not found');
        }
}
else if (command == 'remove') {
    if(notes.removeNote(argv.title)) {
        console.log(`Note ${argv.title} successfully removed`);
    }
    else {
        console.log('No such Note exists');
    }
}
else {
    console.log('Command not found');
}
