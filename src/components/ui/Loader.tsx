const Loader = () => {
	return (
		<div className="bg-white rounded-2xl shadow-lg  text-center">
			<div className="animate-spin w-8 h-8  border-4 border-purple-500 border-t-transparent rounded-full mx-auto "></div>
			<p className="text-slate-600">Loading...</p>
		</div>
	);
};

export default Loader;
