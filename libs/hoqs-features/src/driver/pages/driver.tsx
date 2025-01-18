import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";import { PageContainer, Header, Text } from "@hoqs/core-components";
import { useRef } from "react";
import ProtectedFeature from "../../auth/ProtectedFeature";
import { driverAttributes } from "../../helpers/driverAttributes";
import { supabase } from "../../helpers/supabase";
import { useSupabaseRequest } from "../../helpers/supabaseRequest";
import { formatFrequency } from "../../helpers/translations";
import CabinetRecommendation from "../CabinetRecommendation";
import { DriverBadgeList } from "../DriverBadge";
import { DriverType } from "../../types/types";
import { Link } from "@tanstack/react-router";

export function Driver({id}: {id: string}) {
  const cabReq = useRef(supabase.from('drivers').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const driver = data?.[0] as DriverType;
  return (
    <PageContainer>
      <StatusComponent />
      {driver && (
        <>
          <div className="flex justify-between">
            <Header>{driver.brand + ' ' + driver.model}</Header>
            <DriverBadgeList badges={driver.badges} />
            <ProtectedFeature>
              <Link to="/drivers/$id/edit" params={{ id: id }}>
                <Button as={Link} disabled color="primary">
                  Edit
                </Button>
              </Link>
            </ProtectedFeature>
          </div>
          <Text>{driver.description}</Text>
          <Header variant="subtitle">Attributes</Header>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <div>
              <Header variant="sub-subtitle">Primary</Header>
              <Table
                hideHeader
                aria-label="A table showing all attributes for the driver"
              >
                <TableHeader>
                  <TableColumn>ATTRIBUTE</TableColumn>
                  <TableColumn>VALUE</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow key="0">
                    <TableCell>Model</TableCell>
                    <TableCell>
                      {driver.brand} {driver.model}
                    </TableCell>
                  </TableRow>
                  <TableRow key="1">
                    <TableCell>Sensitivity (1w, 1m) (SPL 1w)</TableCell>
                    <TableCell>{driver.spl}dB</TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell>Frequency response (fr)</TableCell>
                    <TableCell>
                      {formatFrequency(driver.fr_start)} -{' '}
                      {formatFrequency(driver.fr_end)}
                    </TableCell>
                  </TableRow>
                  <TableRow key="3">
                    <TableCell>Type</TableCell>
                    <TableCell>{driver.type}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {driverAttributes.map((category) => (
              <div key={category.name}>
                <Header variant="sub-subtitle">{category.name}</Header>
                <Table
                  hideHeader
                  aria-label="A table showing all attributes for the driver"
                >
                  <TableHeader>
                    <TableColumn>ATTRIBUTE</TableColumn>
                    <TableColumn>VALUE</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(category.attributes)
                      .filter((a) => !!driver[a[0] as keyof DriverType])
                      .map(([key, value], i) => (
                        <TableRow key={i + 4}>
                          <TableCell>
                            {value.name}{' '}
                            {value.symbol ? `(${value.symbol})` : ''}
                          </TableCell>
                          <TableCell>
                            {driver[key as keyof DriverType]}
                            {value.units}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            ))}
          </div>
          {id && (
            <>
              <Header variant="subtitle">Cabinet Recommendations</Header>
              <CabinetRecommendation driverId={id} />
            </>
          )}
        </>
      )}
    </PageContainer>
  );
}

export default Driver;
