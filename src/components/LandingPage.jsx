import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/images/library2.jpg')] bg-cover bg-center">
      <h1 className="text-5xl font-bold text-sky-50">Book Management System</h1>
      <br/>

      {/* Link to User Sign In */}
      <Link to="/usersignin" className=" px-4 py-2 rounded mb-2 bg-blue-600 text-black hover:bg-blue-700 hover:font-semibold ">
        User Sign In
      </Link>
      <br />
      {/* Link to User Sign Up */}
      <Link to="/usersignup">
        <button className="px-4 py-2 bg-blue-600 text-black  rounded hover:bg-blue-700 hover:font-semibold mb-2">
          User Sign Up
        </button>
      </Link>
      <br />
      {/* Link to Admin Sign In */}
      <Link to="/adminsignin" className="bg-blue-600 text-black  rounded hover:bg-blue-700 hover:font-semibold px-4 py-2 mb-2">
        Admin Sign In
      </Link>
      <br 
/>
      {/* Link to Admin Register */}
      <Link to="/adminsignup">
        <button className="px-4 py-2 bg-blue-600 text-black rounded hover:bg-blue-700">
          Admin Register
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
