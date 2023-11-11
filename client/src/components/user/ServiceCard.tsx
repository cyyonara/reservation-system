import { currenyFormatter } from "../../utils/currencyFormatter";
import { useNavigate, NavigateFunction } from "react-router-dom";

type Props = { _id: string; coverImage: string; name: string; description: string; price: number };

const ServiceCard: React.FC<Props> = ({ _id, coverImage, name, description, price }: Props) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div
      key={_id}
      className="border bg-white w-full h-min md:h-[352px] md:w-[352px] flex flex-col rounded-sm shadow-[0_2px_8px_var(--shadow-clr)] cursor-pointer hover:shadow-[0_2px_20px_var(--shadow-clr)]"
    >
      <img
        src={coverImage}
        alt={name}
        className="h-[280px] md:h-[210px] object-cover object-center rounded-t-sm w-full p-[2px]"
      />
      <div className="flex flex-col p-2 flex-1">
        <div className="flex justify-between items-center gap-x-2 text-gray-800">
          <span className="text-xl font-semibold line-clamp-1">{name}</span>
          <span>{currenyFormatter(price)}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1 mb-2">
          {description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit esse
          reprehenderit voluptate? Quia, officiis placeat natus accusantium, blanditiis modi ex quod
          eveniet maiores a velit veniam veritatis perferendis vel expedita?
        </p>
        <button
          className="mt-auto w-full rounded-sm text-white text-sm p-3 py-[6px] bg-c-blue duration-150 hover:bg-blue-400"
          onClick={() => navigate(`/services/${_id}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
