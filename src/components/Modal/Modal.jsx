import { useContext } from "react";
import "./Modal.css"
import { UserContext } from "../../App";

function Modal({ modalRef, handleModalOutSideClick, inputValue, handleModalInput, handleSubmit, isLoading, isEditClicked }) {
    
    const { errorMsg } = useContext(UserContext)
    
    return (
        <div className="modal-wrapper" ref={modalRef} onClick={handleModalOutSideClick}>
            <div className="modal-box">
                <div className="input-inside-container">
                    <label>First</label>
                    <input
                        type="text"
                        name="firstName"
                        value={inputValue.firstName}
                        onChange={handleModalInput}
                        placeholder="Enter FirstName"
                        className={`${errorMsg.firstName ? 'border-red' : "border-grey"}`}
                    />
                </div>

                <div className="input-inside-container">
                    <label>Last</label>
                    <input
                        type="text"
                        name="lastName"
                        value={inputValue.lastName}
                        onChange={handleModalInput}
                        placeholder="Enter Surname"
                        className={`${errorMsg.lastName ? 'border-red' : "border-grey"}`}
                    />
                </div>

                <div className="input-inside-container">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={inputValue.email}
                        onChange={handleModalInput}
                        placeholder="Enter Email"
                        className={`${errorMsg.email ? 'border-red' : "border-grey"}`}
                    />
                </div>

                <div className="input-inside-container">
                    <label>Mobile</label>
                    <input
                        type="tel"
                        name="mobile"
                        value={inputValue.mobile}
                        onChange={handleModalInput}
                        placeholder="Enter Mobile"
                        className={`${errorMsg.mobile ? 'border-red' : "border-grey"}`}
                    />
                </div>

                <button onClick={handleSubmit} className="update-button">
                    {isLoading ? 'Loading...' : isEditClicked ? 'Update Contact' : 'Add Contact'}
                </button>
            </div>
        </div>
    )
}

export default Modal;