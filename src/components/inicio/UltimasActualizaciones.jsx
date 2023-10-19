import React, { useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { StatisticsChart } from "@/widgets/charts";
import { ordersOverviewData, statisticsChartsData } from "@/data";
import {
  ArrowPathIcon,
  BanknotesIcon,
  BellIcon,
  BuildingLibraryIcon,
  CheckIcon,
  EnvelopeIcon,
  InformationCircleIcon,
  PencilSquareIcon,
  PlusCircleIcon,
  RocketLaunchIcon,
  TruckIcon,
  UserGroupIcon,
  UserPlusIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { formatearFechaNuevo } from "@/data/helpers/formatearFechaNuevo";
import useServicios from "@/hooks/useServicios";

const UltimasActualizaciones = () => {
  const {
    actualizaciones,
    obtenerActualizaciones,
    buscoActualizaciones,
    setBuscoActualizaciones,
  } = useServicios();

  useEffect(() => {
    const obtenerActus = async () => {
      await obtenerActualizaciones();
    };
    obtenerActus();
  }, []);

  useEffect(() => {
    const obtenerActus = async () => {
      if (buscoActualizaciones) {
        await obtenerActualizaciones();
        setBuscoActualizaciones(false);
      }
    };
    obtenerActus();
  }, [buscoActualizaciones]);

  return (
    <div className="mb-3 grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
      {statisticsChartsData.map((props) => (
        <StatisticsChart key={props.title} {...props} />
      ))}
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 p-6"
        >
          <Typography variant="h6" color="blue-gray" className="mb-2">
            Ultimos Actualizaciones
          </Typography>
        </CardHeader>
        <CardBody className="pt-0">
          {actualizaciones.map(
            ({ icon, color, title, description, _id }, key) => (
              <div key={_id} className="flex items-start gap-4 py-3">
                <div
                  className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                    key === ordersOverviewData.length - 1
                      ? "after:h-0"
                      : "after:h-4/6"
                  }`}
                >
                  {icon === "PlusCircleIcon" ? (
                    <PlusCircleIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "BellIcon" ? (
                    <BellIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "BanknotesIcon" ? (
                    <BanknotesIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "TruckIcon" ? (
                    <TruckIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "EnvelopeIcon" ? (
                    <EnvelopeIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "InformationCircleIcon" ? (
                    <InformationCircleIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "CheckIcon" ? (
                    <CheckIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "RocketLaunchIcon" ? (
                    <RocketLaunchIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "BuildingLibraryIcon" ? (
                    <BuildingLibraryIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "ArrowPathIcon" ? (
                    <ArrowPathIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "PencilSquareIcon" ? (
                    <PencilSquareIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "UserGroupIcon" ? (
                    <UserGroupIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "UsersIcon" ? (
                    <UsersIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}

                  {icon === "UserPlusIcon" ? (
                    <UserPlusIcon className={`h-5 w-5 ${color} `} />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="block font-medium"
                  >
                    {title}
                  </Typography>
                  <Typography
                    as="span"
                    variant="small"
                    className="text-xs font-medium text-blue-gray-500"
                  >
                    {formatearFechaNuevo(description)}
                  </Typography>
                </div>
              </div>
            )
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UltimasActualizaciones;
