
import { Switch, Tabs, Tab, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@heroui/react';
import { PageContainer } from '@hoqs/core-components';
import { useNavigate } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import { LuGalleryHorizontal, LuText } from 'react-icons/lu';
import ProtectedFeature from '../../auth/ProtectedFeature';
import { supabase } from '../../helpers/supabase';
import { useSupabaseRequest } from '../../helpers/supabaseRequest';
import { formatFrequency } from '../../helpers/translations';
import AddCabinetButton from '../buttons/AddCabinetButton';
import { CabinetBadgeList } from '../CabinetBadge';
import CabinetCard from '../CabinetCard';

export function Cabinets() {
  const navigate = useNavigate();
  const [fetchSettings, setFetchSettings] = useState({
    active: true,
  });

  const cabFetch = useMemo(() => fetchCabinets(fetchSettings), [fetchSettings]);

  const { data: cabinets, StatusComponent } = useSupabaseRequest(cabFetch);

  function goToCabinet(id: string) {
    navigate({ to: `/cabinets/${id}` });
  }

  return (
    <PageContainer className="relative">
      <StatusComponent />
      <ProtectedFeature>
        <div className="absolute left-auto right-0 flex gap-4 mr-8">
          <Switch
            value={String(!fetchSettings.active)}
            onValueChange={(isSelected) =>
              setFetchSettings({ ...fetchSettings, active: !isSelected })
            }
          >
            Show hidden
          </Switch>
          <AddCabinetButton />
        </div>
      </ProtectedFeature>
      {cabinets && (
        <Tabs aria-label="Views">
          <Tab
            key="gallery"
            title={
              <div className="flex items-center space-x-2">
                <LuGalleryHorizontal className="w-5 h-5" />
                <span>Gallery</span>
              </div>
            }
          >
            <div className="flex gap-4 justify-center">
              {cabinets?.map((cabinet) => (
                <CabinetCard key={cabinet.id} cabinet={cabinet} />
              ))}
            </div>
          </Tab>
          <Tab
            key="table"
            title={
              <div className="flex items-center space-x-2">
                <LuText className="w-5 h-5" />
                <span>Table</span>
              </div>
            }
          >
            <Table aria-label="Example empty table" selectionMode="single">
              <TableHeader>
                <TableColumn>Cabinet</TableColumn>
                <TableColumn>Type</TableColumn>
                <TableColumn>Range</TableColumn>
                <TableColumn>Sensitivity</TableColumn>
              </TableHeader>
              <TableBody emptyContent={'No rows to display.'}>
                {cabinets
                  ? cabinets.map((cabinet) => (
                      <TableRow
                        key={cabinet.id}
                        onClick={() => goToCabinet(cabinet.id)}
                        className="cursor-pointer"
                      >
                        <TableCell>
                          {cabinet.brand + ' ' + cabinet.model}{' '}
                          <CabinetBadgeList size="sm" badges={cabinet.badges} />
                        </TableCell>
                        <TableCell>{cabinet.type}</TableCell>
                        <TableCell>
                          {formatFrequency(cabinet.frequency_start)}-
                          {formatFrequency(cabinet.frequency_end)}
                        </TableCell>
                        <TableCell>{cabinet.sensitivity}dB</TableCell>
                      </TableRow>
                    ))
                  : []}
              </TableBody>
            </Table>
          </Tab>
        </Tabs>
      )}
    </PageContainer>
  );
}

interface FetchSettings {
  active: boolean;
}

function fetchCabinets(settings: FetchSettings) {
  let fetch = supabase
    .from('cabinets')
    .select(
      'id, brand, model, images, type, badges, frequency_start, frequency_end, sensitivity'
    );

  if (settings.active) fetch = fetch.eq('active', true);

  return fetch;
}

export default Cabinets;
