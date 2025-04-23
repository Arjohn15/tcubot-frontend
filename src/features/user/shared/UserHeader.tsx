import { FC } from "react";

const UserHeader: FC = () => {
  return (
    <header className="flex justify-between items-center border-gray border-b-2 px-[1rem] py-[0.5rem]">
      <div>
        <a href="/user">
          <img
            src="/images/logos/tcubot-main-logo.png"
            alt="TCUbot main logo"
            width={120}
          />
        </a>
      </div>
      <div>Avatar</div>
    </header>
  );
};

export default UserHeader;
