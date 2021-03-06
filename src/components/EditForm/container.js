import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getContact, editContact } from '../../actions/contacts';
import { required, number, renderField } from '../../utils/formVars';

import EditForm from './component';

const apiUrl = 'http://localhost:3001/contacts';

class EditFormContainer extends React.Component {
  editContact = (values) => {
    this.props.editContact(values, this.props.contactId);
  }

  componentDidMount() {
    this.props.getContact(apiUrl, this.props.contactId);
  }

  componentDidUpdate() {
    if (this.props.contactEdited) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <EditForm
        required={required}
        number={number}
        renderField={renderField}
        onSubmit={this.editContact}
        initialValues={this.props.initialValues}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    contactId: state.getIdForEdit,
    contact: state.contacts.contact,
    initialValues: state.loadContact.data,
    contactEdited: state.contacts.contactEdited
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getContact: (url, id) => dispatch(getContact(url, id)),
    editContact: (values, id) => dispatch(editContact(values, id))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditFormContainer));