import { Input, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { PageContainer } from "@hoqs/core-components";
import { SortDescriptor } from "@react-types/shared";
import { useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import ProtectedFeature from "../../auth/ProtectedFeature";
import { CabinetBadgeList } from "../../cabinet/CabinetBadge";
import { sortByDescriptor, containsName } from "../../helpers/helpers";
import { supabase } from "../../helpers/supabase";
import { useSupabaseRequest } from "../../helpers/supabaseRequest";
import AddDriverButton from "../AddDriver";
import { DriverSizeSelector } from "../DriverSizesSelector";
import { DriverType } from "../../types/types";
import { LuSearch } from "react-icons/lu";


export function Drivers() {
  const navigate = useNavigate();
  const [fetchSettings] = useState({
    active: true,
  });
  const [selectedDriverSizes, setSelectedDriverSizes] = useState<number[]>([]);

  const cabFetch = useMemo(() => fetchDrivers(fetchSettings), [fetchSettings]);

  const { data: d, StatusComponent } = useSupabaseRequest(cabFetch);
  const [drivers, setDrivers] = useState<DriverType[] | null>(null);
  const [filterValue, setFilterValue] = useState('');
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'model',
    direction: 'ascending',
  });

  useEffect(() => {
    if (d) {
      // @ts-expect-error - Does not return the right type
      setDrivers(d.map((d) => ({ ...d, name: d.brand + ' ' + d.model })));
    }
  }, [d]);

  function goToDriver(id: string) {
    navigate({to: `/drivers/${id}`});
  }

  function addDriver(driver: DriverType) {
    // @ts-expect-error - Does not return the right type
    setDrivers((drivers) => [driver, ...drivers]);
  }

  return (
    <PageContainer className="relative">
      <StatusComponent />
      <ProtectedFeature>
        <div className="flex justify-between mb-4">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            aria-label="Search by name"
            startContent={<LuSearch/>}
            value={filterValue}
            onClear={() => setFilterValue('')}
            onValueChange={setFilterValue}
          />
          <DriverSizeSelector
            drivers={drivers}
            selectedDriverSizes={selectedDriverSizes}
            setSelectedDriverSizes={setSelectedDriverSizes}
          />
          <AddDriverButton onNewDriver={addDriver} />
        </div>
      </ProtectedFeature>
      {drivers && (
        <Table
          onSortChange={setSortDescriptor}
          sortDescriptor={sortDescriptor}
          aria-label="Example empty table"
          selectionMode="single"
        >
          <TableHeader>
            <TableColumn key="name" allowsSorting>
              Model
            </TableColumn>
            <TableColumn key="size_inches" allowsSorting>
              Size
            </TableColumn>
            <TableColumn key="p_w" allowsSorting>
              Power
            </TableColumn>
            <TableColumn key="spl" allowsSorting>
              Sensitivity
            </TableColumn>
            <TableColumn key="bl" allowsSorting>
              Bl
            </TableColumn>
            <TableColumn key="x_max" allowsSorting>
              Xmax
            </TableColumn>
          </TableHeader>
          <TableBody emptyContent={'No rows to display.'}>
            {drivers
              ? drivers
                  .sort(sortByDescriptor(sortDescriptor))
                  .filter(
                    (d) =>
                      selectedDriverSizes.length === 0 ||
                      selectedDriverSizes.includes(d.size_inches ?? 0)
                  )
                  .filter((d) => containsName([d.brand, d.model], filterValue))
                  .map((driver) => (
                    <TableRow
                      key={driver.id}
                      onClick={() => goToDriver(driver.id)}
                      className="cursor-pointer"
                    >
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <CabinetBadgeList size="sm" badges={driver.badges} />
                          <div>{driver.brand + ' ' + driver.model}</div>
                        </div>
                      </TableCell>
                      <TableCell>{driver.size_inches}"</TableCell>
                      <TableCell>{driver.p_w}w</TableCell>
                      <TableCell>{driver.spl}dB</TableCell>
                      <TableCell>{driver.bl}</TableCell>
                      <TableCell>{driver.x_max}mm</TableCell>
                    </TableRow>
                  ))
              : []}
          </TableBody>
        </Table>
      )}
    </PageContainer>
  );
}

interface FetchSettings {
  active: boolean;
}

function fetchDrivers(settings: FetchSettings) {
  const fetch = supabase
    .from('drivers')
    .select('id, brand, badges, model, size_inches, p_w, spl, bl, x_max');

  return fetch;
}

export default Drivers;
