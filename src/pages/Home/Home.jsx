import { useContext, useEffect, useRef, useState } from "react"
import Header from "../../components/Header/Header"
import TableRow from "../../components/TableRow/TableRow"
import { UserContext } from "../../App"
import axios from "axios"
import "./Home.css"
import Modal from "../../components/Modal/Modal"

function Home() {
    const modalRef = useRef()
    
    const { BASE_CONTACT_URL, token, setContacts, contacts, isLoading, setIsLoading, setErrorMsg } = useContext(UserContext)

    const [searchValue, setSearchValue] = useState('')
    const [sortOrder, setSortOrder] = useState('ascending')

    const [isEditClicked, setIsEditClicked] = useState(false)
    const [addContactModal, setAddContactModal] = useState(false)
    const [inputValue, setInputValue] = useState({})

    // search filter
    const filteredAndSortedContacts = contacts && contacts.length > 0 ? contacts.filter((contact) =>
        contact.firstName.toLowerCase().includes(searchValue.toLowerCase())
    ) : [];
    //sorting
    filteredAndSortedContacts.sort((a, b) => {
        if (sortOrder === "ascending") {
            return a.firstName.localeCompare(b.firstName);
        } else {
            return b.firstName.localeCompare(a.firstName);
        }
    });

    const handleEditClick = (data) => {
        setInputValue({ ...data });
        setAddContactModal(true);
        setIsEditClicked(true)
    };

    const handleModalInput = (e) => {
        setInputValue((prevValue) => ({
            ...prevValue,
            [e.target.name]: e.target.value,
        }));
    };

    const handleModalOutSideClick = (e) => {
        if (e.target === modalRef.current) {
            setAddContactModal(false);
            setIsEditClicked(false)
            setInputValue({})
            setIsLoading(false)
            setErrorMsg("")
        }
    };

    const fetchAddContact = async () => {
        try {
            let response
            if (isEditClicked) {
                response = await axios.patch(BASE_CONTACT_URL + '/' + inputValue._id, {
                    ...inputValue
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            else {
                response = await axios.post(BASE_CONTACT_URL + '/', {
                    ...inputValue
                }, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            }
            if (response) {
                setIsLoading(false)
                setIsEditClicked(false)
                setAddContactModal(false)
                setInputValue({})
                setErrorMsg("")
            }
        } catch (error) {
            setIsLoading(false)
            const msg = error.response.data
            if (msg) {
                setErrorMsg(msg)
            } else {
                console.log('Login Error', error);
            }
        }
    }

    const fetchDeleteContact = async (contactId) => {
        try {
            const response = await axios.delete(BASE_CONTACT_URL + '/' + contactId, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (response) {
                setIsLoading(false)
            }
        } catch (error) {
            setIsLoading(false)
            console.log(error)
        }
    }

    const handleDelete = (contactId) => {
        setIsLoading(true)
        fetchDeleteContact(contactId)
    }

    const validateForm = () => {
        let newErrors = {}

        if (!inputValue.firstName) {
            newErrors.firstName = 'firstName is required'
        }
        if (!inputValue.lastName) {
            newErrors.lastName = 'lastName is required'
        }
        if (!inputValue.email) {
            newErrors.email = 'Email is required'
        }
        if (!inputValue.mobile) {
            newErrors.mobile = 'Mobile is required'
        }

        setErrorMsg(newErrors)

        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    }
    
    const handleSubmit = () => {

        let noerror = validateForm()
        
        if (noerror) {
            setIsLoading(true)
            fetchAddContact()
        }
    }

    useEffect(() => {
        if (token) {
            const fetchContacts = async () => {
                try {
                    const response = await axios.get(BASE_CONTACT_URL + '/', { headers: { Authorization: `Bearer ${token}` } })
                    if (response) {
                        const data = response.data
                        setContacts(data)
                    }
                } catch (error) {
                    console.log(`Error in getting Contacts ${error}`);
                }
            }
            if (!isLoading) fetchContacts()
        }
    }, [token, isLoading])

    return (
        <>
            <Header />

            <main>

                <div className="top">

                    <div className="search">
                        <label htmlFor="search">Search : </label>
                        <input type="text" name='search' placeholder='Search Name... ' onChange={(e) => setSearchValue(e.target.value)} />
                    </div>

                    <div className="sort">
                        <label htmlFor="sort">Sort : </label>
                        <select name="sort" id="sort" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                            <option value="ascending">Ascending</option>
                            <option value="descending">Decensing</option>
                        </select>
                    </div>

                    <div className="add-new">
                        <button className='add-new-btn' onClick={() => setAddContactModal(!addContactModal)}>Add New</button>
                    </div>
                </div>

                <table className="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date</th>
                            <th scope="col">Button</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredAndSortedContacts.length === 0 ?
                            <tr>
                                <td colSpan="6">No contacts available.</td>
                            </tr>
                            :
                            filteredAndSortedContacts.map((contact, index) =>
                                <TableRow key={contact._id} contact={contact} index={index} onClick={handleEditClick} onDelete={handleDelete} />
                            )}
                    </tbody>
                </table>

            </main>

            {addContactModal && <Modal modalRef={modalRef} handleModalOutSideClick={handleModalOutSideClick} inputValue={inputValue} handleModalInput={handleModalInput}
                handleSubmit={handleSubmit} isLoading={isLoading} isEditClicked={isEditClicked} setIsEditClicked={setIsEditClicked} />}
        </>
    )
}

export default Home