
import PropTypes from 'prop-types';
import TodoList from './TodoList';




const Dashboard = ({ user }) => {


    return (
      <main className='dashboard rounded-xl shadow-lg py-2 md:py-6 lg:py-10 px-8 md:px-16 lg:px-20'>
        <h2 className='ubuntu-bold text-xl text-center mb-8'>{user.name }&apos;s Dashboard</h2>

        <TodoList user={user}/>
        
      </main>
    );

};

Dashboard.propTypes = {

    user: PropTypes.shape({

      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      picture: PropTypes.string,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string,
      
    }).isRequired,
};
  
  export default Dashboard;