import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSingleNote, deletePromptModal, deleteNote } from '../store/actions/';

import { Note } from '../components/Note/';

class NoteContainer extends Component {
    componentDidMount() {
        this.props.getSingleNote(this.props.match.params.id);
    };

    render() {
        return (
            <Note 
                {...this.props}
                note={this.props.note}
                deletePromptModal={this.props.deletePromptModal}
                deleteNote={this.props.deleteNote}
            />
        );
    }
};

NoteContainer.propTypes = {
    note: PropTypes.shape({
        tags: PropTypes.arrayOf(PropTypes.string),
        title: PropTypes.string,
        textBody: PropTypes.string,
        _id: PropTypes.string,
        __v: PropTypes.number
    }),
    status: PropTypes.shape({
        postingNote: PropTypes.bool,
		postedNote: PropTypes.bool,
		gettingNotes: PropTypes.bool,
        gotNotes: PropTypes.bool,
        gettingSingleNote: PropTypes.bool,
        gotSingleNote: PropTypes.bool,
		puttingNote: PropTypes.bool,
		putNote: PropTypes.bool,
		deletePrompt: PropTypes.bool,
		deletingNote: PropTypes.bool,
        deletedNote: PropTypes.bool,
        noteMessage: PropTypes.string,
		noteError: PropTypes.string
    }),
    getSingleNote: PropTypes.func.isRequired,
    deletePromptModal: PropTypes.func,
    deleteNote: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        note: state.notesReducers.noteViewer,
        status: state.notesReducers.status
    };
};

export default connect(mapStateToProps, { getSingleNote, deletePromptModal, deleteNote })(NoteContainer);