import { useState } from "react";
import { useAppSelector } from "../../store/hooks";
import { selectUserState } from "../redux/userSlice";
import { MdLock, MdOutlinePublic } from "react-icons/md";
import Modal from "../../../shared/components/Modal";

const UserProfilePN = () => {
  const [modal, setModal] = useState<boolean>(false);

  function handleOpenModal(): void {
    setModal(true);
  }
  function handleCloseModal(): void {
    setModal(false);
  }
  const { user } = useAppSelector(selectUserState);

  return (
    <>
      <span>
        <strong>Phone number:</strong> {user.phone_number}
      </span>
      <Modal
        boxContent={<p>Hello</p>}
        isModalOpen={modal}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        buttonContent={
          user.show_birthday ? (
            <span>
              <MdOutlinePublic />
            </span>
          ) : (
            <span>
              <MdLock />
            </span>
          )
        }
        buttonStyle="flex ml-[0.5rem] hover:cursor-pointer hover:opacity-[0.5] duration-300"
      />
    </>
  );
};

export default UserProfilePN;
