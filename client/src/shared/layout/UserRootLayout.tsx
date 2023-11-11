import U_Footer from "../partials/U_Footer";
import U_Header from "../partials/U_Header";
import { TbMessage2 } from "react-icons/tb";

interface Props {
  children: React.JSX.Element;
  showFooter?: boolean;
  showChatFloat?: boolean;
}

const UserRootLayout: React.FC<Props> = ({
  children,
  showFooter = false,
  showChatFloat = false,
}: Props) => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <U_Header />
      {children}
      <span>
        {showChatFloat && (
          <div className="fixed bg-blue-500 p-2 bottom-[20px] right-[20px] rounded-full cursor-pointer duration-150 hover:scale-110">
            <TbMessage2 color="white" size={28} />
          </div>
        )}
      </span>
      {showFooter && <U_Footer />}
    </div>
  );
};

export default UserRootLayout;
