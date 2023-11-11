import { NavigateFunction, useNavigate } from "react-router-dom";
import { currenyFormatter } from "../../utils/currencyFormatter";
import { BiEdit } from "react-icons/bi";

type Props = {
  serviceId: string;
  name: string;
  price: number;
  coverImage: string;
  description: string;
  reviewCount: number;
};

const ServiceCard: React.FC<Props> = ({
  serviceId,
  name,
  price,
  coverImage,
  description,
  reviewCount,
}: Props): React.JSX.Element => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div className="border bg-white w-full h-auto md:h-[352px] md:w-[352px] flex flex-col rounded-sm shadow-[0_2px_8px_var(--shadow-clr)] cursor-pointer hover:shadow-[0_2px_20px_var(--shadow-clr)]">
      <img
        src={coverImage}
        alt={name}
        className="h-[280px] md:h-[210px] object-cover object-center rounded-t-sm w-full p-[2px]"
      />
      <div className="flex flex-1 p-3 flex-col text-gray-800 gap-y-1">
        <div className="flex justify-between items-center gap-x-4">
          <span className="font-semibold text-xl line-clamp-1">{name}</span>
          <span>{currenyFormatter(price)}</span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
          {description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          temporibus, aspernatur repellendus soluta numquam modi nihil quas quod voluptate alias
          repudiandae qui rem in odio, reiciendis, perferendis ab eum dolorem porro. Quos dolores
          quaerat quod illum? Corporis architecto suscipit explicabo.
        </p>
        <span className="mt-auto flex justify-between items-center">
          <button
            className="bg-c-blue flex items-center px-[14px] py-[5px] rounded-md text-white gap-x-2 duration-150 hover:bg-blue-400"
            onClick={() => {
              navigate(`/admin/services/${serviceId}/edit`);
            }}
          >
            <BiEdit />
            <span className="text-sm">Edit</span>
          </button>
          <span className="text-sm">{reviewCount} reviews</span>
        </span>
      </div>
    </div>
  );
};

export default ServiceCard;
