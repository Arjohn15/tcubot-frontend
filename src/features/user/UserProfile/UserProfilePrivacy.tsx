import { Button } from "@mui/material";
import { FC } from "react";
import { MdOutlinePublic } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";

const privacy_options = [
  {
    name: "Private",
    icon: <FaLock />,
    id: "privacy-private",
    helper_text: "(Only me)",
    comparer_text: "private",
  },
  {
    name: "Public",
    icon: <MdOutlinePublic />,
    id: "privacy-public",
    helper_text: "",
    comparer_text: "public",
  },
];

interface ProfilePrivacyProps {
  name: string;
  onCloseModal: () => void;
  is_public: "public" | "private";
}

const UserProfilePrivacy: FC<ProfilePrivacyProps> = ({
  name,
  onCloseModal,
  is_public,
}) => {
  function handleClickOption(): void {
    onCloseModal();
  }

  return (
    <div className="bg-white p-[1rem] rounded-lg w-[20vw]">
      <h3 className="font-bold text-center text-xl pb-[1rem]">{name}</h3>

      <div className="flex flex-col gap-y-2">
        {privacy_options.map((privacy) => {
          return (
            <Button
              onClick={handleClickOption}
              key={privacy.id}
              sx={{
                color: "black",
                textTransform: "capitalize",
                justifyContent: "left",
                padding: "0.5rem",
                position: "relative",
                backgroundColor:
                  is_public === privacy.comparer_text
                    ? "rgba(0,0,0,0.05)"
                    : "none",
              }}
              color="info"
            >
              <span>{privacy.name}:</span>
              <span className="block ml-[0.5rem]">{privacy.icon}</span>
              <span className="block ml-[0.5rem] text-gray">
                {privacy.helper_text}
              </span>
              {is_public === privacy.comparer_text && (
                <span className="absolute top-[50%] right-[0.5rem] translate-y-[-50%] text-xl text-green">
                  <FaCheck />
                </span>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfilePrivacy;
