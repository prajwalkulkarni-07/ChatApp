import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

const Sidebar = () => {
	return (
		<div className='border-r border-gray-700 p-4 flex flex-col w-full md:w-[350px] bg-gray-900 bg-opacity-50'>
			<SearchInput />
			<div className='divider my-2 bg-gray-700 h-[1px]' />
			<Conversations />
			<div className='mt-auto pt-4 border-t border-gray-700'>
				<LogoutButton />
			</div>
		</div>
	);
};
export default Sidebar;