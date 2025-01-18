import { Input, Textarea, Select, SelectItem, Button } from "@heroui/react";
import { PageContainer, Header, BadgeSelector, ButtonWithConfirm, arrayToObj } from "@hoqs/core-components";
import { useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import ProtectedPage from "../../auth/ProtectedPage";
import { driverAttributes } from "../../helpers/driverAttributes";
import { supabase, toPromise } from "../../helpers/supabase";
import { useSupabaseRequest } from "../../helpers/supabaseRequest";
import { DRIVER_BADGES, DRIVER_TYPES } from "../../helpers/variables";
import DriverImporter from "../DriverImporter";
import { DriverType } from "../../types/types";


export function EditDriver({ id }: { id: string }) {
  const navigate = useNavigate();
  const cabReq = useRef(supabase.from('drivers').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const driver = data?.[0] as DriverType;

  function saveDriver(driver: DriverType) {
    const uploader = toPromise(
      supabase.from('drivers').update(driver).eq('id', driver.id)
    );
    toast.promise(uploader, {
      loading: 'Saving driver to database',
      success: (c) => {
        navigate({to :`/drivers/${driver.id}`});
        return `Successfully saved driver ${driver.brand} - ${driver.model}`;
      },
      error: (e) => `Error saving driver ${e.message}`,
    });
  }

  function deleteDriver(driver: DriverType) {
    const deleter = toPromise(
      supabase.from('drivers').delete().eq('id', driver.id)
    );

    toast.promise(deleter, {
      loading: 'Deleting driver from database',
      success: (c) => {
        navigate({to: '/drivers'});
        return `Successfully deleted driver ${driver.brand} - ${driver.model}`;
      },
      error: (e) => `Error deleting driver ${e.message}`,
    });
  }

  return (
    <ProtectedPage>
      <PageContainer className="flex flex-col gap-4">
        <StatusComponent />
        {driver && (
          <EditForm
            initialDriver={driver}
            onSave={saveDriver}
            onDelete={deleteDriver}
          />
        )}
      </PageContainer>
    </ProtectedPage>
  );
}

interface EditFormProps {
  initialDriver: DriverType;
  onSave: (driver: DriverType) => void;
  onDelete?: (driver: DriverType) => void;
}

function EditForm({ initialDriver, onSave, onDelete }: EditFormProps) {
  const [driver, setDriver] = useState(initialDriver);

  return (
    <>
      <Header variant="subtitle">
        {driver.brand} - {driver.model}
      </Header>
      <DriverImporter driver={driver} setDriver={setDriver} />

      <Header variant="sub-subtitle">Details</Header>
      <div className="grid grid-cols-2 gap-4">
        <Input
          size="sm"
          value={driver.brand}
          onChange={(e) => setDriver({ ...driver, brand: e.target.value })}
          variant="underlined"
          aria-label="Write speaker brand"
          label="Brand"
        />
        <Input
          size="sm"
          value={driver.model}
          onChange={(e) => setDriver({ ...driver, model: e.target.value })}
          variant="underlined"
          aria-label="Write speaker model"
          label="Model"
        />
      </div>
      <Textarea
        label="Notes"
        variant="bordered"
        placeholder="Enter your notes"
        className="w-full h-fit"
        aria-label="Write notes about the driver"
        size="sm"
        minRows={5}
        maxRows={10}
        value={driver.description ?? ''}
        onChange={(e) => setDriver({ ...driver, description: e.target.value })}
      />
      <BadgeSelector
        setBadges={(badges) => setDriver({ ...driver, badges })}
        badges={driver.badges}
        badgeTypes={DRIVER_BADGES}
      />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Header variant="sub-subtitle">General</Header>
          <Input
            size="sm"
            aria-label="Write speaker sensitivity"
            value={String(driver.spl)}
            type="number"
            onChange={(e) =>
              setDriver({ ...driver, spl: Number(e.target.value) ?? null })
            }
            variant="underlined"
            label="Sensitivity (1w, 1m, free field)"
            endContent="dB"
          />
          <Input
            size="sm"
            value={String(driver.fr_start)}
            type="number"
            aria-label="Write speaker frequency response low"
            onChange={(e) =>
              setDriver({ ...driver, fr_start: Number(e.target.value) ?? null })
            }
            variant="underlined"
            label="Frequency response (low)"
            endContent="Hz"
          />
          <Input
            size="sm"
            value={String(driver.fr_end)}
            type="number"
            aria-label="Write speaker frequency response high"
            onChange={(e) =>
              setDriver({ ...driver, fr_end: Number(e.target.value) ?? null })
            }
            variant="underlined"
            label="Frequency response (high)"
            endContent="Hz"
          />
          <Select
            items={arrayToObj(DRIVER_TYPES)}
            label="Type"
            placeholder="Driver type"
            aria-label="Select driver type"
            variant="bordered"
            value={driver.type ? [driver.type] : undefined}
            defaultSelectedKeys={driver.type ? [driver.type] : undefined}
            onChange={(e) => {
              setDriver({ ...driver, type: e.target.value });
            }}
          >
            {DRIVER_TYPES.map((type) => (
              <SelectItem key={type} value={type}>
                {type}
              </SelectItem>
            ))}
          </Select>
        </div>

        {driverAttributes.map((category) => (
          <div key={category.name}>
            <Header variant="sub-subtitle">{category.name}</Header>
            {Object.entries(category.attributes).map(([key, value]) => (
              <Input
                size="sm"
                value={String(driver[key as keyof DriverType])}
                type={value.type === 'string' ? 'text' : 'number'}
                onChange={(e) =>
                  setDriver({ ...driver, [key]: e.target.value })
                }
                aria-label={`Write ${value.name}`}
                variant="underlined"
                label={`${value.name}${
                  value.symbol ? ' (' + value.symbol + ')' : ''
                }`}
                endContent={value.units}
              />
            ))}
          </div>
        ))}
      </div>
      {/* FOOTER */}
      <div className="flex justify-between flex-row-reverse">
        <Button color="primary" onClick={() => onSave(driver)}>
          Save Driver
        </Button>
        {onDelete && (
          <ButtonWithConfirm
            title="Are you sure?"
            description="Do you want to delete this driver?"
            cancelText="Cancel"
            color="danger"
            onConfirm={() => onDelete(driver)}
          >
            Delete Driver
          </ButtonWithConfirm>
        )}
      </div>
    </>
  );
}

export default EditDriver;
