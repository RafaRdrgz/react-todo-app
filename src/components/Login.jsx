import { useState } from 'react';

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implementar la lógica de login
    console.log(email, password);
  };

  return (

      <div className='login rounded-xl flex flex-col py-4 md:py-12 lg:py-16 px-8 md:px-16 lg:px-20'>

          <h2 className='ubuntu-bold text-xl text-center mb-8'>Login:</h2>

          <form className='login-form flex flex-col' onSubmit={handleLogin}>

              <div className='login-inputs mb-8 flex flex-col justify-center items-center'>

                  <div className='login-input flex mb-4 md:mb-6'>

                    <label htmlFor="email" className="ubuntu-regular text-regular p-0 md:p-2 ml-6 w-32 flex items-center">
                      <i className="ph ph-at mr-2 text-2xl"></i>
                      Email:
                    </label>

                    <input
                      className='flex-1 p-0 md:p-2 text-center border-1 rounded-lg'
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your Email"
                    />
                    
                  </div>

                  <div className='login-input flex'>

                    <label htmlFor="password" className="ubuntu-regular text-regular p-0 md:p-2 ml-6 w-32 flex items-center">
                      <i className="ph ph-password mr-2 text-2xl"></i>
                      Password:
                    
                    </label>

                    <input
                      className='flex-1 p-0 md:p-2 text-center border-1 rounded-lg'
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Your Password"
                    />

                  </div>

              </div>

              <div className='login-inpu flex justify-center items-center'>
                <button  className="login-btn p-4 border-2 rounded-xl  ubuntu-medium text-lg"type="submit">Login</button>
              </div>
          </form>

      </div>

  );
};

export default Login;