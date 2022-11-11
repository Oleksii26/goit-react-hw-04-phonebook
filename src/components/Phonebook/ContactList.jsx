
import css from './PhoneBook.module.css'

const ContactListItem = ({ id, name, number, onRemove }) => {

    return (<li  className={css.item}>
        {name}: {number} <button  className={css.btnDelete} onClick={() => onRemove(id)}>delete</button>
    </li>)
}


const ContactList = ({ contacts, onRemove }) => {
    if (contacts.length === 0) { return null }
    return (
        <ul className={css.list}> {contacts.map(contact => <ContactListItem {...contact} onRemove={onRemove} />)}</ul>
    )

}

export default ContactList