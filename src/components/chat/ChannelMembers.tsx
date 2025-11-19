import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {
	getChannelParticipant,
	removeParticipant,
} from "../../store/action/channel.action";
import Loader from "../ui/Loader";

const ChannelMembers = ({ id }: { id: string }) => {
	const dispatch = useAppDispatch();
	const userId = localStorage.getItem("id");

	const {
		channelParticipant,
		channelParticipantError,
		channelParticipantLoading,
		removeParticipantLoading,
	} = useAppSelector((state) => state.channel);

	useEffect(() => {
		dispatch(getChannelParticipant(id));
	}, [id, dispatch]);

	return (
		<div className="w-full h-full bg-white border-l border-gray-200 overflow-y-auto">
			<div className="p-6">
				{channelParticipantLoading ? (
					<div className="flex justify-center items-center h-32">
						<Loader />
					</div>
				) : channelParticipantError ? (
					<div className="text-center p-4">
						<div className="w-12 h-12 mx-auto mb-3 bg-red-100 rounded-full flex items-center justify-center">
							<svg
								className="w-6 h-6 text-red-500"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
								/>
							</svg>
						</div>
						<p className="text-red-500 font-medium">Error loading members</p>
						<p className="text-red-400 text-sm mt-1">
							{channelParticipantError}
						</p>
					</div>
				) : channelParticipant ? (
					<>
						<div className="mb-6">
							<h3 className="font-bold text-lg text-gray-800 mb-1">
								Channel Members
							</h3>
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<span>{channelParticipant.participants.length} members</span>
							</div>
						</div>

						<div className="mb-6">
							<h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
								Owner
							</h4>
							<div className="flex items-center gap-3 p-3  from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
								<div className="w-10 h-10   bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
									{channelParticipant.owner?.username?.charAt(0).toUpperCase()}
								</div>
								<div className="flex-1">
									<p className="font-semibold text-gray-800">
										{channelParticipant.owner?.username}
										{userId === channelParticipant.owner?._id && (
											<span className="ml-2 text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
												You
											</span>
										)}
									</p>
									<p className="text-xs text-blue-600 font-medium">
										Channel Owner
									</p>
								</div>
							</div>
						</div>

						<div>
							<h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
								Members ({channelParticipant.participants.length - 1})
							</h4>
							<ul className="space-y-2">
								{channelParticipant.participants.map((member) => {
									if (member._id === channelParticipant.owner?._id) return null;

									const isYou = userId === member._id;
									const canRemove =
										userId === channelParticipant.owner!._id && !isYou;

									return (
										<li
											key={member._id}
											className="group flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
										>
											<div className="flex items-center gap-3">
												<div className="w-8 h-8  bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
													{member.username?.charAt(0).toUpperCase()}
												</div>
												<div>
													<p className="font-medium text-gray-800 flex items-center gap-2">
														{member.username}
														{isYou && (
															<span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
																You
															</span>
														)}
													</p>
													<p className="text-xs text-gray-500">Member</p>
												</div>
											</div>

											{canRemove && (
												<button
													onClick={() => {
														dispatch(
															removeParticipant({
																channelId: id,
																participantId: member._id,
															}),
														);
													}}
													disabled={removeParticipantLoading}
													className=" group-hover:opacity-100 px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-1"
												>
													{removeParticipantLoading ? (
														<Loader />
													) : (
														<>
															<svg
																className="w-3 h-3"
																fill="none"
																stroke="currentColor"
																viewBox="0 0 24 24"
															>
																<path
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={2}
																	d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
																/>
															</svg>
															Remove
														</>
													)}
												</button>
											)}
										</li>
									);
								})}
							</ul>

							{channelParticipant.participants.length === 1 && (
								<div className="text-center py-8">
									<svg
										className="w-12 h-12 mx-auto text-gray-300"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
										/>
									</svg>
									<p className="text-gray-500 mt-2">
										No other members in this channel
									</p>
								</div>
							)}
						</div>
					</>
				) : (
					<div className="text-center py-8">
						<svg
							className="w-16 h-16 mx-auto text-gray-300"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
							/>
						</svg>
						<p className="text-gray-500 mt-2">No members found</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default ChannelMembers;
