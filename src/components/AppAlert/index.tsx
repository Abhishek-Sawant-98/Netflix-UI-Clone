import './index.scss';

const AppAlert = () => {
    return (
        // Bootstrap Alert Modal
        <div
            className="modal fade"
            id="alertModal"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex={-1}
        >
            <div className="modal-dialog modal-sm modal-dialog-centered">
                <div className="modal-content bg-dark">
                    <div className="modal-header border-0">
                        <h5 className="modal-title text-light ms-2">
                            Oops! Trailer Not Available
                        </h5>
                    </div>
                    <div className="modal-footer border-0">
                        <button className="btn btn-outline-info" data-bs-dismiss="modal">
                            Okay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppAlert;
