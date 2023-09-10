import "./TableRow.css"

function TableRow({ contact, index, onClick, onDelete }) {

    const { _id, firstName, lastName, mobile, email } = contact

    const date = new Date(contact.createdAt)

    const formattedDate = date.toLocaleDateString('en-US');

    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{firstName + " " + lastName}</td>
            <td> {mobile}</td>
            <td>{email}</td>
            <td>{formattedDate}</td>
            <td>
                <button className="edit-button btn" onClick={() => onClick(contact)}>Edit</button>
                <button className="delete-button btn" onClick={() => onDelete(contact._id)}>Delete</button>
            </td>
        </tr>
    )
}

export default TableRow