interface ModalBackdropProps {
	children: React.ReactNode;
	onClose?: () => void;
}

const ModalBackdrop = ({ children, onClose }: ModalBackdropProps) => {
	return (
		<div
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
			onClick={onClose}
		>
			{children}
		</div>
	);
};

export default ModalBackdrop;
