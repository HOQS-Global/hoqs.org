
import { LuFileText, LuPencil, LuCirclePlus, LuTrash } from 'react-icons/lu';
import { Button, Chip } from '@heroui/react';
import EditTimelineEntryButton from './EditTimelineEntry';
import { TIMELINE_ICONS } from './timeLineIcons';
import { Text } from '../Text';
import { ColorVariant } from '../ColorSelector';
import Icon from '../Icon';
import { formatDate } from '../translations';

export interface TimelineEntry {
  title: string;
  date: string;
  description: string;
  color: ColorVariant;
  badge?: string;
  icon?: keyof typeof TIMELINE_ICONS;
}

interface Props {
  entries: TimelineEntry[];
  setEntries?: (entries: TimelineEntry[]) => void;
}

export function Timeline({ entries, setEntries }: Props) {
  if (entries.length === 0 && !setEntries) return null;

  function setEntry(index: number, entry: TimelineEntry | null) {
    if (!entry) {
      setEntries?.(entries.filter((_, i) => i !== index));
      return;
    }
    setEntries?.(entries.map((e, i) => (i === index ? entry : e)));
  }

  function addEntry() {
    setEntries?.([
      {
        title: 'New entry',
        date: new Date().toISOString(),
        description: 'This is the new epic entry about something cool',
        color: 'primary',
        icon: 'flag',
      },
      ...entries,
    ]);
  }

  return (
    <>
      {setEntries && (
        <Button variant="bordered" onClick={addEntry} className="w-fit">
          <LuCirclePlus />
          Add new Entry
        </Button>
      )}
      <div
        className="grid gap-y-2 gap-x-4 grid-cols-2"
        style={{ gridTemplateColumns: '40px 1fr' }}
      >
        {entries
          .sort((a, b) => b.date.localeCompare(a.date))
          .map((entry, i) => (
            <TimelineEntry
              key={entry.title}
              entry={entry}
              setEntry={setEntries ? (entry) => setEntry(i, entry) : undefined}
              isLast={i === entries.length - 1}
            />
          ))}
      </div>
    </>
  );
}

interface TimelineEntryProps {
  isLast?: boolean;
  entry: TimelineEntry;
  setEntry?: (entry: TimelineEntry | null) => void;
}

function TimelineEntry({ setEntry, entry, isLast }: TimelineEntryProps) {
  const bgColor = `bg-${entry.color}-100`;

  function deleteEntry() {
    setEntry?.(null);
  }

  const EntryIcon = entry.icon ? TIMELINE_ICONS[entry.icon] : LuFileText;

  return (
    <>
      <div className="h-full flex flex-col items-center gap-2">
        <Icon Icon={EntryIcon} color={entry.color}></Icon>
        {!isLast && <div className={`flex-1 w-0.5 rounded ${bgColor}`} />}
      </div>
      <div className="relative h-fit mb-6">
        <div className="flex gap-4">
          <Text className="my-0" variant="thick">
            {entry.title}
          </Text>
          {entry.badge && entry.badge.length !== 0 && (
            <Chip size="sm" variant="flat" color={entry.color}>
              {entry.badge}
            </Chip>
          )}
          {setEntry && (
            <div className="flex-1 w-full flex justify-end gap-4 h-0">
              <Button color="danger" isIconOnly onClick={deleteEntry}>
                <LuTrash />
              </Button>
              <EditTimelineEntryButton
                color="default"
                entry={entry}
                isIconOnly
                setEntry={setEntry}
              >
                <LuPencil />
              </EditTimelineEntryButton>
            </div>
          )}
        </div>
        <Text className="my-0" variant="small" color="muted">
          {formatDate(entry.date)}
        </Text>
        <Text className="my-0">{entry.description}</Text>
      </div>
    </>
  );
}

export default Timeline;
