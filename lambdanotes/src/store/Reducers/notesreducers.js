import {
    POSTING_NOTE,
    POSTED_NOTE,
    GETTING_NOTES,
    GOT_NOTES,
    GETTING_SINGLE_NOTE,
    GOT_SINGLE_NOTE,
    PUTTING_NOTE,
    PUTTED_NOTE,
    DELETE_PROMPT,
    DELETING_NOTE,
    DELETED_NOTE,
    NOTE_ERROR,
    NOTE_TO_EDIT
} from '../actions/';

const initialState = {
    "notes": [],
    "noteViewer": {
        "tags": [],
        "title": "",
        "textBody": "",
        "_id": "",
        "__v": -1
    },
	"editing": {
		"isEditing": false,
		"tmpNote": {
			"tags": [],
			"title": "",
			"textBody": "",
			"_id": "",
			"__v": -1
		}
    },
	"status": {
		"postingNote": false,
		"postedNote": false,
		"gettingNotes": false,
        "gotNotes": false,
        "gettingSingleNote": false,
        "gotSingleNote": false,
		"puttingNote": false,
        "puttedNote": false,
        "deletePrompt": false,
		"deletingNote": false,
        "deletedNote": false,
        "noteMessage": "",
		"noteError": ""
	}
}

export default (state = initialState, action) => {
    switch(action.type) {
        //~~~~~Error Handling~~~~~//
        case NOTE_ERROR:
            return {...state, status: {...state.status, postingNote: false, gettingNotes: false, gettingSingleNote: false, puttingNote: false, deletingNote: false, noteMessage: "", noteError: action.payload}};
        //~~~~~POST Handling~~~~~//
        case POSTING_NOTE:
            return {...state, status: {...state.status, postingNote: true, postedNote: false, noteMessage: "", noteError: ""}};
        case POSTED_NOTE:
            return {...state, status: {...state.status, postingNote: false, postedNote: true}};
        //~~~~~GET Handling~~~~~//
        case GETTING_NOTES:
            return {...state, status: {...state.status, gettingNotes: true, gotNotes: false, noteMessage: "", noteError: ""}};
        case GOT_NOTES:
            return {...state, status: {...state.status, gettingNotes: false, gotNotes: true}, notes: action.payload};
        case GETTING_SINGLE_NOTE:
            return {...state, status: {...state.status, gettingSingleNote: true, gotSingleNote: false, noteMessage: "", noteError: ""}};
        case GOT_SINGLE_NOTE:
            return {...state, status: {...state.status, gettingSingleNote: false, gotSingleNote: true, noteError: action.payload.errorMessage ? action.payload.errorMessage : ""}, noteViewer: {...action.payload}};
        //~~~~~PUT Handling~~~~~//
        case NOTE_TO_EDIT:
            const noteToEdit = state.notes.find( (note) => action.payload === note._id);
            return {...state, editing: {...state.editing, isEditing: true, tmpNote: {...noteToEdit}}};
        case PUTTING_NOTE:
            return {...state, status: {...state.status, puttingNote: true, puttedNote: false, noteMessage: "", noteError: ""}};
        case PUTTED_NOTE:
            const spliceId = state.notes.find( (note, i) => {
                if(note._id === action.payload._id) return i;
                return null;
            });
            let tmpNotes = [...state.notes];
            tmpNotes.splice(spliceId, 1, action.payload);
            return {...state, status: {...state.status, puttingNote: false, puttedNote: true}, editing: {...state.editing, isEditing: false, tmpNote: {tags: [], title: "", textBody: "", _id: "", __v: -1}}, notes: [...tmpNotes]};
        //~~~~~DELETE Handling~~~~~//
        case DELETE_PROMPT:
            return {...state, status: {...state.status, deletePrompt: !state.status.deletePrompt}};
        case DELETING_NOTE:
            return {...state, status: {...state.status, deletingNote: true, deletedNote: false, noteMessage: "", noteError: ""}};
        case DELETED_NOTE:
            return {...state, status: {...state.status, deletingNote: false, deletedNote: true, deletePrompt: false}};
        //~~~~~default~~~~~//
        default:
            return state;
    }
};
