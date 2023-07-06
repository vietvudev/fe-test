import React, { PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import CloseIcon from "../icons/CloseIcon";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	el?: string;
	showAction?: boolean;
	okText?: string;
	cancelText?: string;
	onOk?: () => void;
	onCancel?: () => void;
}

const Modal: React.FC<PropsWithChildren<ModalProps>> = ({
	isOpen,
	onClose,
	title,
	children,
	el = "div",
	showAction = true,
	okText = 'ok',
	cancelText = 'cancel',
	onOk,
	onCancel,
}) => {
	const [container, setContainer] = useState<HTMLElement | null>(
		window ? window.document.createElement(el) : null
	);

	useEffect(() => {
		if (!container) {
			setContainer(window.document.createElement(el));
		} else {
			window.document.body?.appendChild(container);
		}
		return () => {
			if (
				container &&
				window.document.body &&
				window.document.body.contains(container)
			) {
				window.document.body.removeChild(container);
			}
		};
	}, [container, el]);

	useEffect(() => {
		const handleEscapeKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscapeKey);
		}

		return () => {
			document.removeEventListener("keydown", handleEscapeKey);
		};
	}, [isOpen, onClose]);

	const handleCancel = () => {
		if (onCancel) {
			onCancel();
		}
		onClose();
	}

	if (!isOpen) {
		return null;
	}

	const child = (
		<div
			className={`modal-root`}
		>
			<div className="modal-overlay" onClick={onClose}/>
			<div
				className={`modal ${isOpen ? "show" : ""}`}
				onClick={(event) => event.stopPropagation()}
			>
				<div className="modal-close" onClick={onClose}>
					<CloseIcon />
				</div>
				{title ? <div className="modal-title">{title}</div> : null}
				<div className={`modal-content`}>{children}</div>
				{showAction && (
					<div className="modal-actions">
						<button onClick={onOk} className="modal-button modal-button-ok">{okText}</button>
						<button onClick={handleCancel} className="modal-button modal-button-cancel">{cancelText}</button>
					</div>
				)}
			</div>
		</div>
	);

	return container ? ReactDOM.createPortal(child, container) : null;
};

export default Modal;
