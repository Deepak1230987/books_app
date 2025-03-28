import { useEffect, useState } from "react";
import axios from "axios";
import {
  BookOpenIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  BookmarkIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user))
      .catch(() => setUser(null));
  }, []);

  const logout = () => {
    axios
      .post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      )
      .then(() => {
        setUser(null);
      });

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpenIcon className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                BookApp
              </span>
            </div>
            <div className="flex items-center">
              <button
                onClick={logout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-emerald-500 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-200"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 sm:px-6 lg:px-8">
        {user ? (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {user.profileImg ? (
                    <img
                      className="h-20 w-20 rounded-full ring-4 ring-emerald-100"
                      src={user.profileImg}
                      alt="Profile"
                    />
                  ) : (
                    <div className="h-20 w-20 rounded-full bg-emerald-100 flex items-center justify-center">
                      <UserCircleIcon className="h-16 w-16 text-emerald-500" />
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    Welcome back, {user.fullname}!
                  </h2>
                  <p className="text-gray-500 text-lg">@{user.username}</p>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Total Books Card */}
              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-sky-100 flex items-center justify-center">
                        <BookOpenIcon className="h-6 w-6 text-sky-500" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Books
                        </dt>
                        <dd className="text-2xl font-bold text-gray-900">0</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Currently Reading Card */}
              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
                        <ClockIcon className="h-6 w-6 text-amber-500" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Currently Reading
                        </dt>
                        <dd className="text-2xl font-bold text-gray-900">0</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Completed Books Card */}
              <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-shadow duration-200">
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <BookmarkIcon className="h-6 w-6 text-emerald-500" />
                      </div>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Completed Books
                        </dt>
                        <dd className="text-2xl font-bold text-gray-900">0</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white shadow-lg rounded-xl border border-gray-100">
              <div className="px-6 py-5 border-b border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h3>
              </div>
              <div className="px-6 py-8">
                <div className="text-center">
                  <p className="text-gray-500 text-lg">No recent activity</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Your reading history will appear here
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-lg rounded-xl p-8 text-center border border-gray-100">
            <p className="text-gray-500 text-lg">
              Please log in to view your dashboard.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              You'll need to be logged in to access your reading statistics
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
