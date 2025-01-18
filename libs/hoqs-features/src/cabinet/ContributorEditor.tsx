
import { Button, Input, Select, SelectItem } from '@heroui/react';
import {
  LuAtom,
  LuAward,
  LuCrown,
  LuGauge,
  LuHammer,
  LuNotebookPen,
  LuCirclePlus,
  LuTrash,
} from 'react-icons/lu';
import React from 'react';
import { CONTRIBUTOR_ROLES } from '../helpers/variables';
import { cn, ContributorRole, Contributor } from '@hoqs/core-components';

interface ContributorsProps {
  contributors: Contributor[];
  setContributors: (contributors: Contributor[]) => void;
}

export function ContributorsEditor({
  contributors,
  setContributors,
}: ContributorsProps) {
  function addContributor() {
    setContributors([
      ...contributors,
      {
        name: 'John Doe',
        role: 'Prototyper',
        description: 'Prototype Cabinet',
      },
    ]);
  }

  function removeContributor(index: number) {
    setContributors(contributors.filter((_, i) => i !== index));
  }

  function setContributor(index: number, contributor: Contributor) {
    setContributors(
      contributors.map((c, i) => (i === index ? contributor : c))
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        {contributors.map((contributor, index) => (
          <ContributorEditor
            key={index}
            remove={() => removeContributor(index)}
            contributor={contributor}
            setContributor={(contributor) => setContributor(index, contributor)}
          />
        ))}
      </div>
      <Button color="primary" variant="bordered" onClick={addContributor}>
        <LuCirclePlus /> Add contributor
      </Button>
    </div>
  );
}

interface ContributorEditorProps {
  contributor: Contributor;
  setContributor: (contributor: Contributor) => void;
  remove: () => void;
}


const contributorRoleItems = CONTRIBUTOR_ROLES.map(role => ({ key: role, text: role }));

function ContributorEditor({
  contributor,
  setContributor,
  remove,
}: ContributorEditorProps) {
  function setDescription(description: string) {
    if (description.length > 30) return;
    setContributor({ ...contributor, description });
  }

  return (
    <div className="flex gap-2 items-center">
      <Input
        value={contributor.name}
        onChange={(e) =>
          setContributor({ ...contributor, name: e.target.value })
        }
        placeholder="John Doe"
        label="Name"
        aria-label="Contributor name"
        size="sm"
      />
      <Select
        items={contributorRoleItems}
        label="Role"
        size="sm"
        aria-label="Select contributor role"
        value={contributor.role}
        selectedKeys={[contributor.role]}
        onChange={(e) => {
          if (!e.target.value || e.target.value.length === 0) return;

          setContributor({
            ...contributor,
            role: e.target.value as Contributor['role'],
          });
        }}
        renderValue={(roles) => {
          const value = roles[0]?.key as Contributor['role'] | undefined;

          if (!value) return;

          return (
            <div className="flex gap-2 items-center">
              <ContributorIcon className="w-6 h-6" role={value} /> {value}
            </div>
          );
        }}
      >
        {CONTRIBUTOR_ROLES.map((role, index) => (
          <SelectItem textValue={role} key={role} value={role}>
            <div className="flex gap-2 items-center">
              <ContributorIcon className="w-6 h-6" role={role} /> {role}
            </div>
          </SelectItem>
        ))}
      </Select>
      <Input
        value={contributor.description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Prototype"
        label="Description (max 30)"
        size="sm"
      />

      <Button color="danger" isIconOnly onClick={remove}>
        <LuTrash />
      </Button>
    </div>
  );
}

interface IconProps {
  className: string;
  Icon: React.ElementType;
  rank: number;
}

export const contributorIconRoles: {
  [key in ContributorRole]: IconProps;
} = {
  Lead: { Icon: LuCrown, className: 'danger', rank: 1 },
  Scientist: { Icon: LuAtom, className: 'primary', rank: 2 },
  Optimizer: {
    Icon: LuGauge,
    className: 'primary',
    rank: 3,
  },
  Prototyper: {
    Icon: LuHammer,
    className: 'secondary',
    rank: 4,
  },
  Writer: { Icon: LuNotebookPen, className: 'default', rank: 5 },
  Helpful: {
    Icon: LuAward,
    className: 'warning',
    rank: 6,
  },
};

interface ContributorIconProps {
  role: ContributorRole | string;
  className?: string;
}

export function ContributorIcon({ role, className }: ContributorIconProps) {
  const Icon = contributorIconRoles[role];
  const iconColor = 'text-' + Icon.className + '-500';
  return <Icon.Icon className={cn('w-6 h-6', iconColor, className)} />;
}

export default ContributorsEditor;
