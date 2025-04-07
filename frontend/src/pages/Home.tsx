import MessageContainer from "../components/messages/MessageContainer";
import Sidebar from "../components/sidebar/Sidebar";

const Home = () => {
	return (
		<div className='flex h-[90vh] w-full lg:w-[80%] 2xl:w-[70%] rounded-xl overflow-hidden bg-gray-800 bg-opacity-40 backdrop-blur-lg'>
			<Sidebar />
			<MessageContainer />
		</div>
	);
};
export default Home;