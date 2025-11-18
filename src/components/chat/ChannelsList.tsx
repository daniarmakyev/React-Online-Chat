import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getChannelList } from "../../store/action/channel.action";

const ChannelsList = () => {
	const dispatch = useAppDispatch();
	const { channelList, channelListLoading, channelListError } = useAppSelector(
		(state) => state.channel,
	);

	useEffect(() => {
		dispatch(getChannelList());
	}, [dispatch]);

	return (
		<div>
			<ul className="flex flex-col gap-2 max-w-[320px]">
				{channelListLoading
					? "Loading..."
					: channelList &&
					  channelList.map((item) => (
							<li key={item._id} className="border p-1 rounded   flex">
								<section className="flex flex-col">
									{" "}
									<h5 className="font-bold">{item.name}</h5>
									<span className="text-sm text-gray-600">
										Участников: {item.participants.length}
									</span>
								</section>
								<button></button>
							</li>
					  ))}
				{channelListError && (
					<span className="text-red-500 ">{channelListError}</span>
				)}
			</ul>
		</div>
	);
};

export default ChannelsList;
