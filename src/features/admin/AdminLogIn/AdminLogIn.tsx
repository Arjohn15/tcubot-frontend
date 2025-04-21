import TextField from "@mui/material/TextField";
import { Button, IconButton, InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { LuEyeOff } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [serverMessage, setServerMessage] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(): Promise<void> {
    try {
      const res = await axios.post("http://localhost:5000/auth/login/admin", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err: any) {
      setServerMessage(err.response.data.message);
    }
  }

  useEffect(() => {
    const checkAdminAccess = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await axios.get("http://localhost:5000/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          navigate("/admin/dashboard");
        }
      }
    };

    checkAdminAccess();
  }, []);

  return (
    <>
      <header className="relative flex border-b-2 border-gray-half p-[0.5rem]">
        <div>
          <a href="/">
            <img
              src="/images/logos/tcubot-main-logo.png"
              alt="TCUbot main logo"
              width={120}
            />
          </a>
        </div>
        <h1 className="text-red text-xl font-bold absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
          Admin Dashboard
        </h1>
      </header>
      <div className="grow-1 flex items-center justify-center">
        <div className="w-[25vw] border-2 border-gray-half px-[1.5rem] py-[2rem] rounded-lg grid gap-y-5">
          <div>
            <TextField
              id="admin-username"
              label="Username"
              variant="outlined"
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <TextField
              id="admin-password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <LuEye /> : <LuEyeOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <div>
            {serverMessage && (
              <p className="text-red text-center text-sm pb-[1rem]">
                {serverMessage}
              </p>
            )}
            <Button
              variant="contained"
              sx={{
                color: "white",
                textTransform: "none",
                padding: "0.75rem 0 0.75rem 0",
              }}
              fullWidth
              type="submit"
              onClick={handleSubmit}
            >
              <span className="text-lg">Log In</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogIn;
