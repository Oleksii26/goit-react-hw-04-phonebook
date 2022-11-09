import React from "react";
import css from './PhoneBook.module.css'
import shortid from "shortid";

class PhoneBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
           
            name: '',
            number: '',
        }
    }
    nameInputId = shortid.generate()
    numberInputId = shortid.generate()

    handleChangeForm = ({ target }) => {
        const { name, value } = target
        this.setState({ [name]: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        const { name, number } = this.state
        const { onAdd } = this.props
        const isValidaterForm = this.validateForm()

        if (!isValidaterForm) return
        onAdd({ id: shortid.generate(), name, number })
        this.resetForm()
    }

    validateForm = () => {
        const { name, number } = this.state
        const { onCheckUnique } = this.props
        if (!name || !number) {
            
            return false
        }
        return onCheckUnique(name)

    }
    resetForm = () => {
        this.setState({
            name: '',
            number: ''
        })
    }
   
    render() {
        const { name, number } = this.state
        return <form className={css.form} onSubmit={this.handleFormSubmit}>
            <label className={css.label} htmlFor={this.nameInputId}>
                Name
                <input type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required id={this.nameInputId} value={name} onChange={this.handleChangeForm} /></label>
            <label className={css.label} htmlFor={this.numberInputId}>
                Number
                <input type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required id={this.numberInputId} value={number} onChange={this.handleChangeForm} /></label>
            <button className={css.btn} type="submit">Add contact</button>
        </form>
    }

}
export default PhoneBook