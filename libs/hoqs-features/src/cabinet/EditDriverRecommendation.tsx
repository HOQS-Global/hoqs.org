import { useEffect, useState, useMemo, ComponentProps } from 'react';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  Tooltip,
  useDisclosure,
} from '@heroui/react';
import { LuMessageSquarePlus, LuMessageSquareText, LuSearch} from "react-icons/lu";
import { DriverRank, DriverRecommendation, DriverRecommendationWithDriver } from '../types/types';
import { supabase } from '../helpers/supabase';
import { toMap } from '../helpers/translations';
import { compareRank, containsName, isHoqsBrand } from '../helpers/helpers';
import { DriverSizeSelector } from '../driver/DriverSizesSelector';
import { HoqsIcon, HoqsLogo } from '@hoqs/core-components';
import DriverRecommendationRank from '../driver/DriverRecommendationRank';
import { DRIVER_RANK } from '../helpers/variables';
import { KeyboardSubscriber } from '../helpers/keyboardSubscriber';
import { useSupabaseRequestOnce } from '../helpers/supabaseRequest';

interface Props {
  id: string;
  setRecommendationChanges: (changes: DriverRecommendation[]) => void;
}

export function EditDriverRecommendation({
  id,
  setRecommendationChanges,
}: Props) {
  const {
    StatusComponent: StatusComponentRecommendations,
    data: driverRecommendations,
  } = useSupabaseRequestOnce(
    supabase
      .from('driver_recommendations')
      .select(`id, notes, rank, driver_id`)
      .eq('cabinet_id', id)
  );

  const { StatusComponent: StatusComponentDrivers, data: drivers } =
    useSupabaseRequestOnce(
      supabase
        .from('drivers')
        .select(`id, brand, model, size_inches, p_max, x_max`)
    );

  const [recommendations, setRecommendations] = useState<
    DriverRecommendationWithDriver[] | null
  >(null);

  const [originalRecommendationsMap, setOriginalRecommendationsMap] =
    useState<Map<string, DriverRecommendation> | null>(null);

  useEffect(() => {
    if (!driverRecommendations || !drivers) return;

    const mappedRecommendations = toMap(driverRecommendations, 'driver_id');
    setOriginalRecommendationsMap(mappedRecommendations);

    setRecommendations(
      drivers
        .map((d) => ({
          notes: '',
          rank: 'None',
          driver_id: d.id,
          driver: d,
          ...mappedRecommendations.get(d.id),
        }))
        .sort(compareRank)
    );
  }, [driverRecommendations, drivers]);

  useEffect(() => {
    if (!recommendations || !originalRecommendationsMap) return;

    const newChanges = recommendations.filter(
      (r) =>
        originalRecommendationsMap.get(r.driver_id)?.rank !== r.rank &&
        !(r.rank === 'None' && !r.id)
    );

    setRecommendationChanges(newChanges);
  }, [recommendations]);

  if (!drivers) return <StatusComponentDrivers />;
  if (!driverRecommendations) return <StatusComponentRecommendations />;
  if (!recommendations) return null;

  return (
    <EditTable
      recommendations={recommendations}
      setRecommendations={setRecommendations}
    />
  );
}

interface EditTableProps {
  recommendations: DriverRecommendationWithDriver[];
  setRecommendations: React.Dispatch<
    React.SetStateAction<DriverRecommendationWithDriver[] | null>
  >;
}

function EditTable({ recommendations, setRecommendations }: EditTableProps) {
  const [filterValue, setFilterValue] = useState('');
  const [selectedDriverSizes, setSelectedDriverSizes] = useState<number[]>([]);

  useEffect(() => {
    if (recommendations) {
      setRecommendations(recommendations.sort(compareRank));
    }
  }, [selectedDriverSizes, filterValue]);

  const drivers = useMemo(
    () => recommendations.map((r) => r.driver),
    [recommendations]
  );

  function updateRecommendation(
    recommendation: DriverRecommendationWithDriver
  ) {
    setRecommendations((r) => {
      if (!r) return null;
      const index = r.findIndex(
        (rec) => rec.driver_id === recommendation.driver_id
      );
      r[index] = recommendation;
      return [...r];
    });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Search by name..."
          aria-label="Search by name"
          startContent={<LuSearch />}
          value={filterValue}
          onClear={() => setFilterValue('')}
          onValueChange={setFilterValue}
        />
        <DriverSizeSelector
          drivers={drivers}
          selectedDriverSizes={selectedDriverSizes}
          setSelectedDriverSizes={setSelectedDriverSizes}
        />
      </div>
      <Table
        isHeaderSticky
        aria-label="A table showing all drivers that fit the cabinet"
        classNames={{
          base: 'max-h-[520px]',
        }}
      >
        <TableHeader>
          <TableColumn key="driver">Driver</TableColumn>
          <TableColumn key="specs">Specs</TableColumn>
          <TableColumn key="rank">Rank</TableColumn>
          <TableColumn key="rank">Note</TableColumn>
        </TableHeader>
        <TableBody>
          {recommendations
            .filter(
              (d) =>
                selectedDriverSizes.length === 0 ||
                selectedDriverSizes.includes(d.driver.size_inches)
            )
            .filter((d) =>
              containsName([d.driver.brand, d.driver.model], filterValue)
            )
            .map((driver, i) => (
              <TableRow key={i}>
                <TableCell className="flex gap-2 h-10 items-center">
                  {isHoqsBrand(driver.driver) && <HoqsIcon size={20} />}
                  {driver.driver.brand} {driver.driver.model}
                </TableCell>
                <TableCell>
                  {driver.driver.size_inches}" {driver.driver.p_max}W{' '}
                  {driver.driver.x_max}mm xmax{' '}
                </TableCell>
                <TableCell>
                  <Select
                    radius="full"
                    aria-label="Select Rank"
                    className="w-32"
                    classNames={{ base: 'm-0' }}
                    size="sm"
                    placeholder="Select Rank"
                    selectionMode="single"
                    variant="underlined"
                    isRequired
                    defaultSelectedKeys={[driver.rank]}
                    onChange={(e) =>
                      updateRecommendation({
                        ...driver,
                        rank: e.target.value as DriverRank,
                      })
                    }
                    renderValue={(value) => (
                      <DriverRecommendationRank
                        rank={
                          (value[0].key as DriverRank | undefined) ?? 'None'
                        }
                      />
                    )}
                  >
                    {DRIVER_RANK.map((rank) => (
                      <SelectItem key={rank} value={rank} textValue={rank}>
                        <DriverRecommendationRank rank={rank} />
                      </SelectItem>
                    ))}
                  </Select>
                </TableCell>
                <TableCell>
                  <SetNoteButton
                    isIconOnly
                    value={driver.notes}
                    title={`Set Note of ${driver.driver.brand} ${driver.driver.model}`}
                    setValue={(notes) => {
                      console.log(notes);
                      updateRecommendation({
                        ...driver,
                        notes,
                      });
                    }}
                    variant="light"
                    color={
                      0 < (driver.notes?.length ?? 0) ? 'default' : 'primary'
                    }
                  >
                    {0 < (driver.notes?.length ?? 0) ? (
                      <LuMessageSquareText />
                    ) : (
                      <LuMessageSquarePlus />
                    )}
                  </SetNoteButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

type SetNoteButtonProps = Omit<
  ComponentProps<typeof Button>,
  'value' | 'setValue'
> & {
  value: string | null;
  setValue: (value: string | null) => void;
  title: string;
};

export function SetNoteButton({
  value,
  setValue,
  title,
  children,
  ...props
}: SetNoteButtonProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [internalValue, setInternalValue] = useState(value);

  return (
    <>
      <Tooltip
        content={value}
        classNames={{
          base: 'max-w-md',
        }}
        closeDelay={0}
      >
        <Button onPress={onOpen} {...props}>
          {children}
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <KeyboardSubscriber
                onEnter={() => {
                  setValue(internalValue);
                  onClose();
                }}
              />
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Textarea
                  label="Description"
                  placeholder="Enter a note to elaborate on the ranking of a driver"
                  value={internalValue ?? ''}
                  onChange={(e) => setInternalValue(e.target.value)}
                  variant="bordered"
                  minRows={10}
                  maxRows={20}
                  autoFocus
                />
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => {
                    setValue(null);
                    onClose();
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    setValue(internalValue);
                    onClose();
                  }}
                >
                  Continue
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditDriverRecommendation;
