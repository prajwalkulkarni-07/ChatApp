import { LogOut } from "lucide-react";
import useLogout from "../../hooks/useLogout";

const LogoutButton = () => {
	const { logout } = useLogout();

	return (
		<div className='mt-auto'>
			<button 
				onClick={logout} 
				className='flex items-center gap-2 text-gray-300 hover:text-white transition-colors duration-200'
			>
				<LogOut className='w-6 h-6 rotate-180' />
				<span>Logout</span>
			</button>
		</div>
	);
};
export default LogoutButton;