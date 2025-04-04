
import PropTypes from 'prop-types';
import CreateTaskBtn from './CreateTaskBtn';
import TodoList from './TodoList';



const Dashboard = ({ userId, userName }) => {


    return (

      <main className='dashboard rounded-xl shadow-lg py-2 md:py-6 lg:py-10 px-8 md:px-16 lg:px-20'>
        <h2 className='ubuntu-bold text-xl text-center mb-8'>{ userName }&apos;s Dashboard</h2>

        <div className='dashItems flex flex-col justify-center align-center'>

            <CreateTaskBtn></CreateTaskBtn>
            <TodoList user={userId}/>
        </div>
      </main>

    );

};

Dashboard.propTypes = {

  userId: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired

};
  
  export default Dashboard;