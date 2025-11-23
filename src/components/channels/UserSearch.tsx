import { useState, useEffect, useRef } from "react";
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

	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const performSearch = async () => {
			if (searchQuery.trim().length < 1) {
				dispatch(clearSearchResults());
				setShowDropdown(false);
				return;
			}

			dispatch(searchUsers(searchQuery));
			setShowDropdown(true);
		};

		const debounceTimer = setTimeout(performSearch, 300);
		return () => clearTimeout(debounceTimer);
	}, [searchQuery, dispatch]);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(e.target as Node)
			) {
				setShowDropdown(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div className="relative mb-7" ref={wrapperRef}>
			{showDropdown && (
				<div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20"></div>
			)}

			<input
				type="text"
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				onFocus={() => {
					if (searchResults.length > 0) setShowDropdown(true);
				}}
				placeholder="Search users"
				className="w-full px-4 py-2 bg-white rounded-md shadow-[0_0_20px_5px_rgba(255,255,255,0.6)] focus:outline focus:outline-gray-500 relative z-30"
			/>

			{showDropdown && (
				<ul className="absolute z-30 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto">
					<li>{searchLoading && <Loader />}</li>
					{searchResults.map((user) => (
						<li
							key={user._id}
							className="w-full px-4 py-2 text-left flex flex-col"
						>
							<span
								className={`font-medium ${
									userId === user._id && "text-blue-500"
								}`}
							>
								{user.username} {userId === user._id && "(Вы)"}
							</span>
							<span className="text-sm text-gray-500">{user.email}</span>
						</li>
					))}
				</ul>
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
