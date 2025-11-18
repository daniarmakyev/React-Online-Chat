import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getChannelParticipant } from "../../store/action/channel.action";

const ChannelMembers = ({ id }: { id: string }) => {
	const dispatch = useAppDispatch();
	const userId = localStorage.getItem("id");

	const {
		channelParticipant,
		channelParticipantError,
		channelParticipantLoading,
	} = useAppSelector((state) => state.channel);

	useEffect(() => {
		dispatch(getChannelParticipant(id));
	}, [id, dispatch]);

	if (channelParticipantLoading) {
		return (
			<div className="fixed w-[20%] right-0 p-4">
				<p className="text-gray-400">Загрузка участников...</p>
			</div>
		);
	}

	if (channelParticipantError) {
		return (
			<div className="fixed w-[20%] right-0 p-4">
				<p className="text-red-500">Ошибка: {channelParticipantError}</p>
			</div>
		);
	}

	if (!channelParticipant) {
		return (
			<div className="fixed w-[20%] right-0 p-4">
				<p className="text-gray-400">Нет данных об участниках</p>
			</div>
		);
	}

	const { participants, owner } = channelParticipant;

	return (
		<div className="fixed w-[20%] right-0 overflow-y-auto p-4">
			<h3 className="font-bold mb-2">Members</h3>

			<ul className="space-y-1">
				{participants.map((member) => {
					const isOwner = owner._id === member._id;
					const isYou = userId === member._id;
					return (
						<li
							key={member._id}
							className={`border-b border-gray-700 pb-1 ${
								isOwner && "text-blue-500"
							}`}
						>
							{member.username}

							{isOwner && " (Owner)"}

							{!isOwner && isYou && " (You)"}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ChannelMembers;
