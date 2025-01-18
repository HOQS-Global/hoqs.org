import { Link, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { supabase } from "../../helpers/supabase";
import { Button } from "@heroui/react";
import { PageContainer, Header, Text, Timeline, ImageCarousel } from "@hoqs/core-components";
import ProtectedFeature from "../../auth/ProtectedFeature";
import { SpeakerCabinet } from "../../types/types";
import { CabinetBadgeList } from "../CabinetBadge";
import Contributors from "../Contributors";
import DriverRecommendation from "../DriverRecommendation";
import Specifications from "../Specifications";
import { useSupabaseRequest } from "../../helpers/supabaseRequest";
import {FileList} from "../../uploader/FileList";

export function Cabinet({id}: {id: string}) {
  const cabReq = useRef(supabase.from('cabinets').select('*').eq('id', id));
  const { StatusComponent, data } = useSupabaseRequest(cabReq.current);
  const cabinet = data?.[0] as SpeakerCabinet;
  const navigate = useNavigate();

  return (
    <PageContainer>
      <StatusComponent />
      {cabinet?.active === false && (
        <div className="w-full flex justify-center bg-red-500">
          <Text className="my-0">NOT PUBLISHED</Text>
        </div>
      )}
      {cabinet && (
        <div>
          <ImageCarousel images={cabinet.images} className="mb-8" />
          <div className="flex justify-between">
            <Header>{cabinet.brand + ' ' + cabinet.model}</Header>
            <ProtectedFeature>
                <Button 
                  as={Link} 
                  disabled 
                  onPress={() => navigate({to: `/cabinets/${id}/edit`})} 
                  color="primary"
                >
                  Edit
                </Button>
            </ProtectedFeature>
          </div>
          <CabinetBadgeList badges={cabinet.badges} />
          <Text variant="thick">{cabinet.short_description}</Text>
          <Text>{cabinet.description}</Text>
          <Specifications cabinet={cabinet} />
          {cabinet.measurements && 0 < cabinet.measurements.length && (
            <>
              <Header variant="subtitle">Measurements</Header>
              <ImageCarousel images={cabinet.measurements} />
            </>
          )}

          {cabinet.contributors.length !== 0 && (
            <>
              <Header variant="subtitle">Contributors</Header>
              <Contributors contributors={cabinet.contributors} />
            </>
          )}
          {cabinet.timeline.length !== 0 && (
            <>
              <Header variant="subtitle">Timeline</Header>
              <Timeline entries={cabinet.timeline} />
            </>
          )}
          {id && (
            <>
              <Header variant="subtitle">Recommended Drivers</Header>
              <DriverRecommendation id={id} />
            </>
          )}
          <Header variant="subtitle">Files</Header>
          <FileList files={cabinet.files} />
        </div>
      )}
    </PageContainer>
  );
}

export default Cabinet;

