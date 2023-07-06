import React, { useState } from "react";
import Modal from "./components/modal/Modal";
import "./App.css";

const App: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleOpenModal = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<>
			<div className="app">
				<h1>My App</h1>
				<button onClick={handleOpenModal}>Open Modal</button>
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={`Normal Modal`}
			>
				<div className="example-modal">
					<h2>Modal Content</h2>
					<p>
						This is the content of the modal. This is the content of the modal.
						This is the content of the modal. This is the content of the
						modal.This is the content of the modal.
					</p>
				</div>
			</Modal>
		</>
	);
};

export default App;
