import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../store/store";
import { searchUsers } from "../../store/action/user.action";
import { clearSearchResults } from "../../store/slice/user.slice";
import Loader from "../ui/Loader";

const UserSearch = () => {
	const dispatch = useAppDispatch();
	const { searchResults, searchLoading, searchError } = useAppSelector(
		(state) => state.user,
	);
	const userId = localStorage.getItem("id");
	const [searchQuery, setSearchQuery] = useState("");
	const [showDropdown, setShowDropdown] = useState(false);

	useEffect(() => {
		const performSearch = async () => {
			if (searchQuery.trim().length < 1) {
				dispatch(clearSearchResults());
				setShowDropdown(true);
				return;
			}

			dispatch(searchUsers(searchQuery));
			setShowDropdown(true);
		};

		const debounceTimer = setTimeout(performSearch, 300);
		return () => clearTimeout(debounceTimer);
	}, [searchQuery, dispatch]);

	return (
		<div className="relative mb-7">
			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder="Search users"
				className="w-full px-4 py-2  bg-white rounded-md shadow-[0_0_10px_5px_rgba(0,0,0,0.1)] transition-all p-6 focus:outline-none focus:ring-2 "
			/>

			{searchLoading && <Loader />}

			{showDropdown && (
				<div className="absolute z-10 w-full mt-1 bg-white   rounded-lg shadow-lg max-h-60 overflow-y-auto">
					{searchResults.map((user) => (
						<button
							key={user._id}
							className="w-full px-4 py-2 text-left  flex flex-col"
						>
							<span
								className={`font-medium ${
									userId === user._id && "text-blue-500"
								}`}
							>
								{user.username} {userId === user._id && " (Вы)"}
							</span>
							<span className="text-sm text-gray-500">{user.email}</span>
						</button>
					))}
				</div>
			)}

			{searchError && (
				<p className="text-red-500 text-sm mt-1">{searchError}</p>
			)}

			{searchQuery.length > 0 &&
				!searchLoading &&
				searchResults.length === 0 && (
					<p className="text-gray-500 text-sm mt-1">No users found</p>
				)}
		</div>
	);
};

export default UserSearch;
