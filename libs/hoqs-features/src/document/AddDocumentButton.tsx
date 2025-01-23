import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import toast from 'react-hot-toast';
import slugify from 'slugify';
import { supabase, toPromise } from '../helpers/supabase';
import { Text } from '@hoqs/core-components';

const emptyDocument = `## Section 1
This is a subsection of the document
## Section 2
This is another subsection of the document`;

function AddDocumentButton() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [document, setDocument] = useState({
    content: emptyDocument,
    title: 'New Topic',
    published: false,
  });
  const navigate = useNavigate();

  const slug = slugify(document.title, { lower: true, strict: true });

  function createCabinet() {
    const uploader = toPromise(
      supabase.from('documents').insert([{ ...document, id: slug }])
    );
    toast.promise(uploader, {
      loading: 'Saving document to database',
      success: (c) => {
        navigate({to: '/wiki/$id/edit', params: {id: slug}});
        return `Successfully saved document ${document.title}`;
      },
      error: (e) => `Error saving document ${e.message}`,
    });
  }

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Add
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create new document for the wiki
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Topic"
                  placeholder="Enter title here"
                  variant="bordered"
                  defaultValue="New Topic"
                  onChange={(e) =>
                    setDocument((c) => ({ ...c, title: e.target.value }))
                  }
                />
                <Text color="muted">https://hoqs.org/wiki/{slug}</Text>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={createCabinet}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddDocumentButton;
