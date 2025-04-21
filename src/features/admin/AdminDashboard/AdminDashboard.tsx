import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Registrant, { RegistrantType } from "./Registrant";
import AdminAvatar, { AdminAvatarProps } from "../shared/AdminAvatar";
import { MdErrorOutline } from "react-icons/md";
import AdminHeader from "../shared/AdminHeader";
import CircularLoading from "../../../shared/components/LoadingCircular";
import RegistrantOverview from "./RegistrantOverview";

const AdminDashboard = () => {
  const [registrants, setRegistrants] = useState<RegistrantType[]>([]);
  const [admin, setAdmin] = useState<AdminAvatarProps>({
    first_name: "",
    last_name: "",
    role: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [registrantID, setRegistrantID] = useState<string>("");

  const navigate = useNavigate();

  const fetchedAdminData = async () => {
    try {
      const res = await axios.get(
        "http://192.168.100.234:5000/admin/dashboard",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRegistrants(res.data.registrants);
      setAdmin(res.data.admin[0]);

      setLoading(false);
    } catch (err: any) {
      setLoading(false);

      const status = err.response?.status;
      if (status === 401 || status === 403) {
        localStorage.removeItem("token");
        navigate("/admin");
      }
      setError("Something went wrong. Please try again later.");
    }
  };

  function handeClickID(id: string): void {
    setRegistrantID(id);
  }

  const registrant = registrants.find(
    (registrant) => registrant.id === registrantID
  );

  useEffect(() => {
    fetchedAdminData();

    const interval = setInterval(() => {
      fetchedAdminData();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <>
        <AdminHeader />
        <div className="flex items-center justify-center h-screen bg-gray-50">
          <div className="flex items-center gap-2 p-4 text-[rgba(0,0,0,0.5)]">
            <MdErrorOutline className="text-2xl" />
            <span className="text-lg font-medium">
              Something went wrong. Please try again later.
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="flex items-center justify-between border-b-2 border-gray-half py-[0.5rem] px-[2rem]">
        <div>
          <a href="/">
            <img
              src="/images/logos/tcubot-main-logo.png"
              alt="TCUbot main logo"
              width={120}
            />
          </a>
        </div>
        <h1 className="text-red text-xl font-bold">Admin Dashboard</h1>
        <AdminAvatar
          first_name={admin.first_name}
          last_name={admin.last_name}
          role={admin.role}
        />
      </header>

      <div className="mx-[10rem] my-[2rem] flex flex-col h-[100vh] pb-[2rem]">
        <h1 className="text-xl font-bold pb-[1rem]">New register requests</h1>
        <div className="grow-1 flex">
          <div className="w-[40%]">
            <div className="h-[550px] max-h-[550px] overflow-y-auto py-[1rem] border-2 border-gray rounded-lg">
              {loading ? (
                <>
                  <CircularLoading />
                </>
              ) : (
                <>
                  {registrants.length === 0 ? (
                    <div className="h-full flex justify-center items-center">
                      <h2 className="text-lg font-bold text-gray">
                        No register requests
                      </h2>
                    </div>
                  ) : (
                    <ul className="grid gap-y-3 px-[0.5rem]">
                      {registrants.map((registrant) => {
                        const { id, first_name, last_name } = registrant;
                        return (
                          <li key={id}>
                            <Registrant
                              isSelected={id === registrantID}
                              onClickID={handeClickID}
                              first_name={first_name}
                              last_name={last_name}
                              id={id}
                            />
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
          <RegistrantOverview registrant={registrant} />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
