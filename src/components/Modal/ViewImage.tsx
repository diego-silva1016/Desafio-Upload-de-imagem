import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay opacity={0.8} />
      <ModalContent>
        <ModalBody p={0} borderRadius={5}>
          <Image
            src={imgUrl}
            alt="image"
            objectFit="cover"
            htmlHeight={600}
            htmlWidth={900}
          />
        </ModalBody>
        <ModalFooter
          background="#353431"
          display="flex"
          justifyContent="flex-start"
        >
          <Link href={imgUrl} isExternal>
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
