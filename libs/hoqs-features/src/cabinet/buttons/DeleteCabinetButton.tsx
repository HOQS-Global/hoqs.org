import { supabase, toPromise } from '../../helpers/supabase';
import toast from 'react-hot-toast';
import { useNavigate } from '@tanstack/react-router';
import { ButtonWithConfirm } from '@hoqs/core-components';


export default function DeleteCabinetButton({ id }: { id: string }) {
  const navigate = useNavigate();
  return (
    <ButtonWithConfirm
      title="Are you sure?"
      description="Do you want to delete this precious cabinet?"
      cancelText="Cancel"
      color="danger"
      onConfirm={() => deleteCabinet(id, navigate)}
    >
      Delete Cabinet
    </ButtonWithConfirm>
  );
}

function deleteCabinet(
  id: string,
  navigate: ReturnType<typeof useNavigate>
) {
  const deleter = toPromise(
    supabase.from('cabinets').delete().eq('id', id)
  );

  toast.promise(deleter, {
    loading: 'Deleting cabinet from database',
    success: (c) => {
      navigate({to: '/cabinets'});
      return `Successfully deleted cabinet`;
    },
    error: (e) => `Error deleting cabinet ${e.message}`,
  });
}
