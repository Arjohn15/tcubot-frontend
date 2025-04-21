const AdminHeader = () => {
  return (
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
  );
};

export default AdminHeader;
