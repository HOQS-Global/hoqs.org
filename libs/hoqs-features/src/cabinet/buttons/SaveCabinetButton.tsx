import toast from 'react-hot-toast';
import { Button } from '@heroui/react';
import { supabase, toPromise } from '../../helpers/supabase';
import { useNavigate } from '@tanstack/react-router';
import { CabinetRecommendedChanges, DriverRecommendation } from '../../types/types';

type Props = { cabinet: CabinetRecommendedChanges };

export default function SaveCabinetButton({ cabinet }: Props) {
  const navigate = useNavigate();
  return (
    <Button color="primary" onClick={() => saveCabinet(cabinet, navigate)}>
      Save Cabinet
    </Button>
  );
}

function saveCabinet(
  cabinet: CabinetRecommendedChanges,
  navigate: ReturnType<typeof useNavigate>
) {
  const upsertRecommendationChangesPromise = upsertRecommendationChanges(
    cabinet.id,
    cabinet.recommendationChanges ?? []
  );

  // Cannot save cabinet without removing recommendationChanges
  const trimmedCabinet = { ...cabinet };
  delete trimmedCabinet.recommendationChanges;

  const uploader = toPromise(
    supabase.from('cabinets').update(trimmedCabinet).eq('id', cabinet.id)
  );
  toast.promise(
    Promise.all([uploader, ...upsertRecommendationChangesPromise]),
    {
      loading: 'Saving cabinet to database',
      success: (c) => {
        navigate({to: `/cabinets/${cabinet.id}`});
        return `Successfully saved cabinet ${cabinet.brand} - ${cabinet.model}`;
      },
      error: (e) => `Error saving cabinet ${e.message}`,
    }
  );
}

function upsertRecommendationChanges(
  cabinetId: string,
  recommendations: DriverRecommendation[]
) {
  const mappedRecommendations = recommendations.map((r) => ({
    id: r.id ?? cabinetId + r.driver_id,
    rank: r.rank,
    driver_id: r.driver_id,
    cabinet_id: cabinetId,
    notes: r.notes,
  }));

  const toBeDeleted = mappedRecommendations.filter((r) => r.rank === 'None');

  const toBeUpdated = mappedRecommendations.filter((r) => r.rank !== 'None');

  const updater = toPromise(
    supabase.from('driver_recommendations').upsert(toBeUpdated)
  );

  const deleter = toPromise(
    supabase
      .from('driver_recommendations')
      .delete()
      .in(
        'id',
        toBeDeleted.map((r) => r.id)
      )
  );

  return [updater, deleter];
}
