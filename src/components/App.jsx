import  ContactList  from "./Phonebook/ContactList";
import Filter from "./Filter/Filter";
import { useState, useEffect, useMemo } from "react";
import  PhoneBook  from "./Phonebook/Phonebook";

const initContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
]

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? initContacts
  })

  const [filter, setFilter] = useState('')

  const handleFormSubmit = profile => {
    const nameToCheck = profile.name.toLocaleLowerCase()
    const isIncludeName = contacts.some(contact => contact.name.toLocaleLowerCase() === nameToCheck)

    if (isIncludeName) {
      return alert(`${profile.name} is already in contacts`)
    }
    setContacts(prev => [profile, ...prev])
  }

  const handleFilterChange = e => {
    const { value } = e.currentTarget
    setFilter(value)
  }

  const getVisibleContacts = useMemo(() => {
    const normalizedContacts = filter.toLocaleLowerCase()
    return contacts.filter(({ name }) => name.toLocaleLowerCase().includes(normalizedContacts))
  }, [contacts, filter])



  const handleRemoveContact = id => {
    const updateContacts = contacts.filter(contact => contact.id !== id)
    setContacts(updateContacts)
  }
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])

  return <div>
    <PhoneBook onFormSubmit={handleFormSubmit} />
    <Filter value={filter} onChange={handleFilterChange} />
    <ContactList contacts={getVisibleContacts} onRemove={handleRemoveContact} />
  </div >

}
