import React from "react";
import "../css/SingleRepoModal.css";

function SingleRepoModal({ setOpenModal, deleteClickHandler, buttonClicked, archiveClickHandler }) {
    console.log("This is frmo the MOdal PROPS", buttonClicked)

    function clickHandler() {
        if (buttonClicked === "Delete") {
            deleteClickHandler()
        }
        else {
            archiveClickHandler()
        }
    }

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Are You Sure You Want to Continue?</h1>
                </div>
                <div className="body">
                    <p>Danger Zone: This action is only reversible on the Github website.</p>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button onClick={clickHandler}>Continue</button>
                </div>
            </div>
        </div>
    );
}

export default SingleRepoModal;