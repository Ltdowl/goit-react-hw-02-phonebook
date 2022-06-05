import React, { Component } from 'react';
import { Notyf } from 'notyf';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './Phonebook.module.css';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const filterContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.trim().toLowerCase())
  );
};

export default class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContactIntoState = newContact => {
    const { contacts } = this.state;

    if (filterContacts(contacts, newContact.name).length) {
      notyf.error({
        message: `${newContact.name} is allready in phonebook`,
        duration: 5000,
        position: {
          x: 'center',
          y: 'center',
        },
      });

      return;
    }
    notyf.success({
      message: `Contact ${newContact.name} added`,
      duration: 2000,
      position: {
        x: 'center',
        y: 'center',
      },
    });
    this.setState(state => ({
      contacts: [...state.contacts, newContact],
    }));
  };

  deleteContactFromState = id => {
    this.setState(state => ({
      contacts: state.contacts.filter(contact => contact.id !== id),
    }));
    notyf.success({
      message: `Contact deleted`,
      duration: 2000,
      position: {
        x: 'center',
        y: 'center',
      },
    });
  };

  handleFilterChanges = filter => {
    this.setState({ filter });
  };

  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = filterContacts(contacts, filter);

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebok</h1>
        <ContactForm addContactIntoState={this.addContactIntoState} />

        <h2 className={styles.title}>Contacts</h2>
        <Filter filter={filter} onFilter={this.handleFilterChanges} />
        <ContactList
          renderContacts={filteredContacts}
          deleteContacts={this.deleteContactFromState}
        />
      </div>
    );
  }
}
