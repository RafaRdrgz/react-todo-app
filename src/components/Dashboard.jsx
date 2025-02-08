import PropTypes from 'prop-types';

const Dashboard = ({ user }) => {

    return (
      <div>
        {user.name}
      </div>
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