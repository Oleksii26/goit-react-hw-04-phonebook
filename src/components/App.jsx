import PhoneBook from "./Phonebook/Phonebook";
import React from "react";
import ContactList from "./Phonebook/ContactList";
import Filter from "./Filter/Filter";



export class App extends React.Component {
  state = {
    contacts: [{ id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },],
    filter: '',
  }

  handleAddContact = (newContact) => {
    this.setState(({ contacts }) => ({
      contacts: [...contacts, newContact]
    }))
  }

  handleCheckUniqueContact = name => {
    const { contacts } = this.state
    const isExistContacts = !!contacts.find(e => e.name === name)
    isExistContacts && alert(`${name} contact already exists`)
    return !isExistContacts
  }

  handleRemoveContact = (id) => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id)
    }))
  }

  handleFilterChange = filter => this.setState({ filter })

  getVisibleContacts = () => {

    const { contacts, filter } = this.state
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  componentDidMount() {

    const todos = localStorage.getItem('contacts')
    const parseTodos = JSON.parse(todos)
    if (parseTodos) {
      this.setState({ contacts: parseTodos })
    }

  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state

    if (contacts === prevState.contacts) return
    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))

  }

  render() {
    const { filter } = this.state
    const visibleContacts = this.getVisibleContacts()
    return (
      <div>
        <PhoneBook onAdd={this.handleAddContact} onCheckUnique={this.handleCheckUniqueContact} />
        <Filter filter={filter} onChange={this.handleFilterChange} />
        <ContactList contacts={visibleContacts} onRemove={this.handleRemoveContact} />
      </div>
    )
  }
}
