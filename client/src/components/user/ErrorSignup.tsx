import { Link } from "react-router-dom";

type Props = {
   message: string;
};

const ErrorSignup: React.FC<Props> = ({ message }: Props) => {
   return (
      <div className="absolute flex inset-x-0 top-0 bg-red-800 py-[3px]">
         <div className="mx-auto flex text-sm text-white">
            <p>{message}.</p>
            <span className="ml-1 underline">
               <Link to="/sign-in">Sign-in</Link>
            </span>
         </div>
      </div>
   );
};

export default ErrorSignup;
