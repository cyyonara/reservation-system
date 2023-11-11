import AdminRootLayout from "../../shared/layout/AdminRootLayout";
import ServicesSearch from "../../components/admin/ServicesSearch";
import ServiceCard from "../../components/admin/ServiceCard";
import ServiceCardSkeleton from "../../components/admin/ServiceCardSkeleton";
import React, { useEffect } from "react";
import { MdPlaylistAdd } from "react-icons/md";
import { BiMenuAltRight } from "react-icons/bi";
import { useAdminMainNavbarStore } from "../../zustand-store/adminMainNavbarStore";
import { RiArrowRightSLine } from "react-icons/ri";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Select, Option } from "@material-tailwind/react";
import { HiSortDescending } from "react-icons/hi";
import { useAdminServiceList } from "../../hooks/useAdminServiceList";
import { useSearchParams, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

type PriceFilter = "asc" | "desc";

const Services: React.FC = () => {
  const { openMainNavBar } = useAdminMainNavbarStore((state) => state);
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get("page") ? parseInt(searchParams.get("page") as string) : 1;
  const priceFilter = searchParams.get("price") || "desc";

  const {
    isLoading,
    isSuccess,
    data: services,
  } = useAdminServiceList({
    currentPage,
    filterByPrice: priceFilter as PriceFilter,
  });

  useEffect(() => {
    document.title = "Services";
  }, []);

  return (
    <AdminRootLayout>
      <>
        <div className="flex-1 flex flex-col bg-gray-200 px-3 sm:px-8 md:px-12 pb-5">
          <nav className="py-3 sm:py-5 border-b flex justify-between border-gray-300">
            <div className="flex text-gray-700 gap-x-1 text-sm">
              <div className="flex items-center gap-x-1">
                <Link to="/admin/dashboard" className="flex items-center gap-x-1">
                  <LuLayoutDashboard />
                  <span className="leading-none">Dashboard</span>
                </Link>
                <RiArrowRightSLine size={18} />
              </div>
              <Link to="/admin/services" className="flex items-center leading-none text-black">
                Services
              </Link>
            </div>
            <div className="flex gap-x-3">
              <Link
                to={`create?${searchParams.toString()}`}
                className="flex items-center text-white bg-c-blue duration-150 hover:bg-blue-400 rounded-[4px] py-2 px-3"
              >
                <MdPlaylistAdd />
                <span className="text-xs uppercase ml-1 hidden sm:flex">Add new</span>
              </Link>
              <span className="flex xl:hidden items-center cursor-pointer" onClick={openMainNavBar}>
                <BiMenuAltRight size={25} />
              </span>
            </div>
          </nav>
          <div className="flex justify-between flex-col-reverse sm:flex-row items-center mt-8 gap-x-8 gap-y-3 border-b border-gray-300 pb-8">
            <ServicesSearch />
            <span className="w-full sm:max-w-min">
              <Select
                label="Sort by:"
                size="md"
                className="text-xs"
                arrow={<HiSortDescending />}
                onChange={(value) => {
                  setSearchParams({ price: value as string, page: String(1) });
                }}
              >
                <Option value="desc" className="whitespace-nowrap text-xs">
                  Price: Highest to Lowest
                </Option>
                <Option value="asc" className="whitespace-nowrap text-xs">
                  Price: Lowest to Highest
                </Option>
              </Select>
            </span>
          </div>
          <div className="flex-1 flex flex-wrap mb-3 sm:mb-5 mt-10 row-gap items-start gap-4">
            {isLoading && <ServiceCardSkeleton count={10} />}
            {isSuccess &&
              services!.data.map((service) => (
                <ServiceCard
                  key={service.serviceId}
                  serviceId={service.serviceId}
                  name={service.name}
                  price={service.price}
                  description={service.description}
                  coverImage={service.imageLinks[0]}
                  reviewCount={service.reviews.length}
                />
              ))}
          </div>
        </div>
        <AnimatePresence>
          <Outlet />
        </AnimatePresence>
      </>
    </AdminRootLayout>
  );
};

export default Services;
