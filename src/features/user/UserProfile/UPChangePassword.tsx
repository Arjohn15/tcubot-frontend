import { FC, useState } from "react";
import Modal from "../../../shared/components/Modal";
import { FaKey } from "react-icons/fa6";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { LuEye, LuEyeOff } from "react-icons/lu";

const UPChangePassword: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [oldPassword, setOldPassword] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);

  function handleOpenModal(): void {
    setModal(true);
  }
  function handleCloseModal(): void {
    setModal(false);
  }

  return (
    <>
      <Modal
        isModalOpen={modal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        buttonContent={
          <>
            <span>Change my password</span>
            <span className="block ml-[0.5rem]">
              <FaKey />
            </span>
          </>
        }
        buttonStyle="flex items-center border-2 border-gray rounded-xl px-[0.5rem] hover:cursor-pointer hover:opacity-[0.65] duration-300 font-bold"
        boxContent={
          <div className="bg-white p-[1rem] rounded-lg w-[20vw]">
            <h3 className="font-bold text-center text-xl pb-[1rem]">
              Change password
            </h3>

            <div className="grid gap-y-5">
              <div>
                <TextField
                  variant="outlined"
                  label="Old password"
                  fullWidth
                  type={oldPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setOldPassword(!oldPassword)}
                            edge="end"
                          >
                            {oldPassword ? <LuEye /> : <LuEyeOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  label="New password"
                  fullWidth
                  type={newPassword ? "text" : "password"}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setNewPassword(!newPassword)}
                            edge="end"
                          >
                            {newPassword ? <LuEye /> : <LuEyeOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
              <div className="flex justify-center gap-x-5">
                <Button variant="text" onClick={handleCloseModal}>
                  <span className="capitalize">Cancel</span>
                </Button>
                <Button variant="contained">
                  <span className="capitalize text-white">Save</span>
                </Button>
              </div>
            </div>
          </div>
        }
      />
    </>
  );
};

export default UPChangePassword;
