import UserRootLayout from "../../shared/layout/UserRootLayout";
import HomeNavbar from "../../components/user/HomeNavbar";
import ServiceCardSkeleton from "../../components/admin/ServiceCardSkeleton";
import ServiceCard from "../../components/user/ServiceCard";
import { useSearchParams } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { Select, Option } from "@material-tailwind/react";
import { useServiceList } from "../../hooks/useServiceList";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import React, { useEffect } from "react";

type PriceFilter = "desc" | "asc";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;
  const priceFilter = searchParams.get("price") || "desc";

  const {
    data: services,
    isLoading,
    isSuccess,
  } = useServiceList({
    currentPage,
    filterByPrice: priceFilter as PriceFilter,
  });

  useEffect(() => {
    document.title = "Home";
    window.scrollTo(0, 0);
  }, [searchParams]);

  return (
    <UserRootLayout showChatFloat={true}>
      <React.Fragment>
        <div className="flex-1 flex">
          <HomeNavbar />
          <div className="flex-1 flex flex-col lg:pb-0 ml-0 xl:ml-[320px] bg-white-smoke">
            <div className="flex p-6 justify-between">
              <span className="flex items-center flex-1 gap-x-2 max-w-[260px] bg-white p-3  rounded-md">
                <AiOutlineSearch size={18} color="gray" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-0 flex-1 focus:outline-none text-sm text-gray-600"
                />
              </span>
              <span>
                <Select
                  label="Sort by:"
                  size="md"
                  onChange={(value) => {
                    setSearchParams({ page: String(1), price: value as string });
                  }}
                >
                  <Option value="desc" className="whitespace-nowrap">
                    Price: Highest to Lowest
                  </Option>
                  <Option value="asc" className="whitespace-nowrap">
                    Price: Lowest to Highest
                  </Option>
                </Select>
              </span>
            </div>
            <div className="flex-1 flex flex-wrap p-4 gap-3">
              {isSuccess &&
                services.data.map((service) => (
                  <ServiceCard
                    key={service._id}
                    _id={service._id}
                    name={service.name}
                    coverImage={service.imageLinks[0]}
                    price={service.price}
                    description={service.description}
                  />
                ))}
              {isLoading && <ServiceCardSkeleton count={10} />}
            </div>
            {isSuccess && services.totalPages > 1 && (
              <div className="flex items-center justify-center gap-x-4 w-full pt-5 mb-5 px-4">
                <button
                  className="flex items-center gap-x-1 bg-c-blue text-white rounded-md py-2 px-6 text-sm duration-150 hover:bg-blue-400 disabled:hover:bg-blue-400 disabled:bg-blue-400"
                  disabled={currentPage <= 1}
                  onClick={() =>
                    setSearchParams({ page: String(currentPage - 1), price: priceFilter })
                  }
                >
                  <MdKeyboardArrowLeft />
                  <span>Previous</span>
                </button>
                <div className="flex items-center gap-x-2 text-gray-800">
                  <span>page</span>
                  <span className="bg-transparent border border-c-blue text-c-blue py-1 px-3 rounded-md">
                    {currentPage}
                  </span>
                  <span>of {services.totalPages}</span>
                </div>
                <button
                  className="flex items-center gap-x-1 bg-c-blue text-white rounded-md py-2 px-6 text-sm duration-150 hover:bg-blue-400 disabled:hover:bg-blue-400 disabled:bg-blue-400"
                  disabled={!services.hasNextPage}
                  onClick={() =>
                    setSearchParams({ page: String(currentPage + 1), price: priceFilter })
                  }
                >
                  <span>Next</span>
                  <MdKeyboardArrowRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </React.Fragment>
    </UserRootLayout>
  );
};

export default Home;
