interface ModalContentProps {
	children: React.ReactNode;
	onClick?: (e: React.MouseEvent) => void;
}

const ModalContent = ({ children, onClick }: ModalContentProps) => {
	return (
		<div
			className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default ModalContent;
