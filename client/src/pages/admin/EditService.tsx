import { useParams } from "react-router-dom";
import { useGetService } from "../../hooks/useGetService";

type T_Params = { id: string };

const EditService: React.FC = (): React.JSX.Element => {
   const { id } = useParams<T_Params>();
   const { isLoading, data } = useGetService({ id: id as string });

   if (data) {
      console.log(data);
   }

   return <div></div>;
};

export default EditService;
