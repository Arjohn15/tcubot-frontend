import { FC, useRef, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import ClickOutside from "../../../shared/components/OutsideClick";

const subjects = [
  { name: "student" },
  { name: "professor" },
  { name: "personnel" },
];
const UserChat: FC = () => {
  const [subject, setSubject] = useState("student");
  const [openSubjects, setOpenSubjects] = useState<boolean>(false);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function handleClickOutside(): void {
    setOpenSubjects(false);
  }

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 85) + "px";
    }
  };

  return (
    <div>
      <div className="w-max flex m-[0.85rem] relative">
        <span>I'm inquiring about a</span>
        <button
          onClick={() => setOpenSubjects(!openSubjects)}
          className="flex items-center border border-gray rounded-xl px-[0.5rem] ml-[0.25rem] hover:bg-gray-half hover:cursor-pointer duration-300"
        >
          <span className="font-bold">{subject}</span>
          <span className="text-red ">
            {openSubjects ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </button>
        {openSubjects && (
          <ClickOutside onClickOutside={handleClickOutside}>
            <div className="absolute right-[0] top-[120%]">
              <ul className="border-gray border-2 rounded-lg bg-white">
                {subjects.map((s) => {
                  return (
                    <li key={s.name}>
                      <button
                        onClick={() => {
                          setSubject(s.name);
                          setOpenSubjects(false);
                        }}
                        className="w-full text-left flex items-center p-[0.5rem] hover:cursor-pointer hover:bg-gray-half duration-300"
                      >
                        <span>{s.name}</span>
                        {subject === s.name ? (
                          <span className="text-red block ml-[0.5rem]">
                            <FaCheckCircle />
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </ClickOutside>
        )}
      </div>
      <div className="h-[65vh] border-2 border-gray mx-[7.5rem] rounded-lg"></div>
      <div className="flex justify-center mt-[1rem]">
        <div className="rounded-xl bg-gray w-[25%] flex items-center px-[1rem] py-[0.5rem]">
          <textarea
            placeholder="Ask about people of TCU"
            ref={textareaRef}
            onInput={handleInput}
            className="w-full p-2 rounded resize-none overflow-auto max-h-[5.3125rem] outline-none"
            rows={1}
          ></textarea>
          <button className="ml-[0.5rem] hover:opacity-[0.5] hover:cursor-pointer duration-300">
            <span className="text-3xl text-red">
              <IoSend />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserChat;
