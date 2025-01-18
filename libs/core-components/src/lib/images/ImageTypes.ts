import { AbstractStorageFile } from "../files/fileHelpers";

export type ContributorRole =
  | 'Scientist'
  | 'Optimizer'
  | 'Prototyper'
  | 'Lead'
  | 'Helpful'
  | 'Writer';

export interface Contributor {
  name: string;
  description: string;
  role: ContributorRole;
}
  
export type StorageImage = {
  description?: string;
  location?: string;
  driver?: string;
  contributors?: Contributor[];
} & AbstractStorageFile;