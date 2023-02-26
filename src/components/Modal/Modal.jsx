import { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { ModalWrapper } from "./ModalWrapper.styled";



const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {

    componentDidMount() {
        document.addEventListener('keydown', this.closeModalByEsc)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModalByEsc)
    }

    closeModalByEsc = e => {
        if (e.code === 'Escape') {
                this.props.toggleModal()
            }
    }


    render() {
        const {largeImageURL} = this.props

        return createPortal(
            <ModalWrapper>
                <div className="Modal">
                    <img src={largeImageURL} alt="" />
                </div>
            </ModalWrapper>,
            modalRoot
        );
    };
};


Modal.propTypes = {
    toggleModal: PropTypes.func.isRequired,
    largeImageURL: PropTypes.string.isRequired,
}
