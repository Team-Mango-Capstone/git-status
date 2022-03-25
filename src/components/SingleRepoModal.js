import React from "react";
import "../css/SingleRepoModal.css";

function SingleRepoModal({ setOpenModal, deleteRepo, buttonClicked, archiveRepo }) {
    console.log("This is frmo the MOdal PROPS", buttonClicked)

    function clickHandler() {
        if (buttonClicked === "Delete") {
            deleteRepo()
        }
        else {
            archiveRepo()
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
                    <h1>WARNING!</h1>
                </div>
                <div className="body">
                    <p>THIS ACTION IS ONLY REVERSIBLE ON THE GITHUB WEBSITE. ARE YOU SURE YOU WANT TO CONTINUE?</p>
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