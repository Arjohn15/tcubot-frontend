import { FC, useState } from "react";
import { RegistrantType } from "./Registrant";
import dayjs from "dayjs";
import { getYearDescription } from "../../../utils/getYearDescription";
import { getCourseFormalName } from "../../../utils/getCourseFormalName";
import RejectRegistrant from "./RejectRegistrant";
import AcceptRegistrant from "./AcceptRegistrant";
import SnackbarAuto, {
  severity_type,
} from "../../../shared/components/SnackbarAuto";

interface RegistrantOverviewProps {
  registrant?: RegistrantType;
}

const RegistrantOverview: FC<RegistrantOverviewProps> = ({ registrant }) => {
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: severity_type;
  }>({ isOpen: false, message: "", severity: "info" });

  function handleOpenSB(mes: string, sev: severity_type): void {
    setSnackbar({ message: mes, isOpen: true, severity: sev });
  }

  function handleCloseSB(): void {
    setSnackbar({ ...snackbar, isOpen: false });
  }

  return (
    <div className="grow-1 border-2 border-gray rounded-lg ml-[8rem] w-[200px] relative pb-[1rem]">
      <h2 className="text-center text-lg font-bold py-[2rem]">Registrant</h2>

      <div className="px-[2rem]">
        {registrant ? (
          <>
            <ul className="text-base grid gap-y-5">
              <li className="gap-x-1 flex">
                <b>First name:</b> <span>{registrant.first_name}</span>
              </li>
              <li className="gap-x-1 flex">
                <b>Last name:</b> <span>{registrant.last_name}</span>
              </li>
              <li className="gap-x-1 flex">
                <b>Birthday:</b>
                <span>
                  {dayjs(registrant.birthday).format("MMMM DD, YYYY")}
                </span>
              </li>
              <li className="gap-x-1 flex">
                <b>Email:</b> <span>{registrant.email}</span>
              </li>
              <li className="gap-x-1 flex">
                <b>Phone number:</b> <span>{registrant.phone_number}</span>
              </li>
              <li className="gap-x-1 flex">
                <b>Role:</b>{" "}
                <span className="capitalize">{registrant.role}</span>
              </li>
              <li className="gap-x-1 flex">
                <b>School assigned number:</b>
                <span>{registrant.school_assigned_number}</span>
              </li>
              {registrant.role === "student" && (
                <>
                  <li className="gap-x-1 flex">
                    <b>Year level:</b>
                    <span>{getYearDescription(registrant.year)}</span>
                  </li>
                  <li className="gap-x-1 flex">
                    <b>Course:</b>
                    <span>
                      {getCourseFormalName(registrant.course)} (
                      {registrant.course})
                    </span>
                  </li>
                </>
              )}
            </ul>
            <div className="flex justify-center mt-[2rem]">
              <div className="flex gap-x-5">
                <RejectRegistrant
                  email={registrant.email}
                  first_name={registrant.first_name}
                  id={registrant.id}
                  onOpenSB={handleOpenSB}
                />
                <AcceptRegistrant
                  email={registrant.email}
                  first_name={registrant.first_name}
                  id={registrant.id}
                  onOpenSB={handleOpenSB}
                />
              </div>
            </div>
          </>
        ) : (
          <span className="absolute top-[50%] left-[50%] translate-x-[-50%] text-center text-gray text-lg font-bold text-nowrap">
            No registrant. Please select one to view
          </span>
        )}
      </div>
      <SnackbarAuto
        isOpen={snackbar.isOpen}
        message={snackbar.message}
        onClose={handleCloseSB}
        severity={snackbar.severity}
      />
    </div>
  );
};

export default RegistrantOverview;
