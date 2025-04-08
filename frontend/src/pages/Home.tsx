import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex h-[90vh] w-full lg:w-[80%] 2xl:w-[70%] rounded-xl overflow-hidden bg-gray-900 bg-opacity-40 backdrop-blur-sm'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;