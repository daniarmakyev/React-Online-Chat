import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { createChannel } from "../../../store/action/channel.action";

import ChannelForm from "./ChannelForm";
import ModalBackdrop from "./ModalBackdrop";
import ModalContent from "./ModalContent";

interface CreateChannelModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const CreateChannelModal = ({ isOpen, onClose }: CreateChannelModalProps) => {
	const dispatch = useAppDispatch();
	const [channelName, setChannelName] = useState("");
	const { createChannelLoading, createChannelError } = useAppSelector(
		(state) => state.channel,
	);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!channelName.trim()) {
			return alert("Please enter a channel name!");
		}

		dispatch(createChannel({ name: channelName.trim() })).unwrap();
		setChannelName("");
		onClose();
	};

	const handleClose = () => {
		setChannelName("");
		onClose();
	};

	const handleContentClick = (e: React.MouseEvent) => {
		e.stopPropagation();
	};

	if (!isOpen) return null;

	return (
		<ModalBackdrop onClose={handleClose}>
			<ModalContent onClick={handleContentClick}>
				<ChannelForm
					channelName={channelName}
					onChannelNameChange={setChannelName}
					onSubmit={handleSubmit}
					onCancel={handleClose}
					loading={createChannelLoading}
					error={createChannelError}
				/>
			</ModalContent>
		</ModalBackdrop>
	);
};

export default CreateChannelModal;
