import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Box,
  Stack,
  Flex,
  Heading,
  FormControl,
  FormLabel,
  Select,
  Button,
  useToast,
} from '@chakra-ui/react';

export interface AvatarConfig {
  hairstyle: string;
  hairColor: string;
  skinTone: string;
  clothing: string;
  clothingColor: string;
}

const HAIR_COLORS = [
  { name: 'Black', hex: '#000000', value: 'black' },
  { name: 'Brown', hex: '#8B4513', value: 'brown' },
  { name: 'Blonde', hex: '#FFD700', value: 'blonde' },
  { name: 'Red', hex: '#DC143C', value: 'red' },
  { name: 'Gray', hex: '#A9A9A9', value: 'gray' },
];

const SKIN_TONES = [
  { name: 'Light', hex: '#FFE0BD', value: 'light' },
  { name: 'Fair', hex: '#F1C27D', value: 'fair' },
  { name: 'Medium', hex: '#E0AC69', value: 'medium' },
  { name: 'Olive', hex: '#C68642', value: 'olive' },
  { name: 'Tan', hex: '#A67B5B', value: 'tan' },
  { name: 'Brown', hex: '#8D5524', value: 'brown' },
  { name: 'Dark', hex: '#613D24', value: 'dark' },
];

const CLOTHING_COLORS = [
  { name: 'Blue', hex: '#3182CE', value: 'blue' },
  { name: 'Green', hex: '#38A169', value: 'green' },
  { name: 'Red', hex: '#E53E3E', value: 'red' },
  { name: 'Yellow', hex: '#D69E2E', value: 'yellow' },
  { name: 'Purple', hex: '#805AD5', value: 'purple' },
];

export const defaultAvatarConfig: AvatarConfig = {
  hairstyle: 'short',
  hairColor: 'black',
  skinTone: 'fair',
  clothing: 'casual',
  clothingColor: 'blue',
};

interface AvatarCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: AvatarConfig) => void;
  initialConfig?: AvatarConfig;
  mode?: 'new-user' | 'settings';
}

export default function AvatarCustomizer({
  isOpen,
  onClose,
  onSave,
  initialConfig = defaultAvatarConfig,
  mode = 'new-user',
}: AvatarCustomizerProps): JSX.Element {
  const [config, setConfig] = useState<AvatarConfig>(initialConfig);
  const toast = useToast();

  const updateConfig = (updates: Partial<AvatarConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    // TODO: Update Phaser preview here when implemented
  };

  const handleReset = () => {
    setConfig(defaultAvatarConfig);
    toast({
      title: 'Reset to default',
      description: 'Avatar reset to default appearance.',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  const handleSave = () => {
    onSave(config);
    toast({
      title: 'Avatar saved!',
      description: 'Your customization has been applied.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
  };

  const handleCancel = () => {
    setConfig(initialConfig);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size='6xl' closeOnOverlayClick={false}>
      <ModalOverlay />
      <ModalContent containerProps={{ style: {} }}>
        <ModalHeader>
          <Heading as='h2' size='lg'>
            {mode === 'new-user' ? 'Customize Your Avatar' : 'Avatar Customization'}
          </Heading>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody p={0}>
          <Stack spacing={0}>
            {/* Preview Section */}
            <Box p='4' borderWidth='1px' borderRadius='lg'>
              <Heading as='h3' size='md' mb={4}>
                Preview
              </Heading>
              <Flex justify='center'>
                <Box
                  width='400px'
                  height='400px'
                  borderWidth='1px'
                  borderRadius='lg'
                  bg='gray.50'
                  display='flex'
                  alignItems='center'
                  justifyContent='center'>
                  {/* TODO: Phaser canvas will be integrated here in Sprint 2 */}
                  <div id='avatar-preview-canvas'>
                    <Box textAlign='center' color='gray.500'>
                      Avatar Preview
                      <br />
                      (Phaser integration coming in Sprint 2)
                    </Box>
                  </div>
                </Box>
              </Flex>
            </Box>

            {/* Customization Options Section */}
            <Box p='4' borderWidth='1px' borderRadius='lg'>
              <Heading as='h3' size='md' mb={4}>
                Customization Options
              </Heading>

              <Stack spacing={4}>
                {/* Hairstyle */}
                <FormControl>
                  <FormLabel htmlFor='hairstyle'>Hairstyle</FormLabel>
                  <Select
                    id='hairstyle'
                    name='hairstyle'
                    placeholder='Select hairstyle'
                    value={config.hairstyle}
                    onChange={e => updateConfig({ hairstyle: e.target.value })}>
                    <option value='short'>Short Hair</option>
                    <option value='medium'>Medium Hair</option>
                    <option value='long'>Long Hair</option>
                    <option value='ponytail'>Ponytail</option>
                    <option value='bun'>Bun</option>
                  </Select>
                </FormControl>

                {/* Hair Color */}
                <FormControl>
                  <FormLabel htmlFor='hairColor'>Hair Color</FormLabel>
                  <Flex wrap='wrap' gap={2}>
                    {HAIR_COLORS.map(color => (
                      <Button
                        key={color.value}
                        bg={color.hex}
                        borderRadius='full'
                        width='50px'
                        height='50px'
                        minWidth='50px'
                        borderWidth={config.hairColor === color.value ? '3px' : '1px'}
                        borderColor={config.hairColor === color.value ? 'blue.500' : 'gray.200'}
                        onClick={() => updateConfig({ hairColor: color.value })}
                        _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }}
                        aria-label={`${color.name} hair color`}
                      />
                    ))}
                  </Flex>
                </FormControl>

                {/* Skin Tone */}
                <FormControl>
                  <FormLabel htmlFor='skinTone'>Skin Tone</FormLabel>
                  <Flex wrap='wrap' gap={2}>
                    {SKIN_TONES.map(tone => (
                      <Button
                        key={tone.value}
                        bg={tone.hex}
                        borderRadius='full'
                        width='50px'
                        height='50px'
                        minWidth='50px'
                        borderWidth={config.skinTone === tone.value ? '3px' : '1px'}
                        borderColor={config.skinTone === tone.value ? 'blue.500' : 'gray.200'}
                        onClick={() => updateConfig({ skinTone: tone.value })}
                        _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }}
                        aria-label={`${tone.name} skin tone`}
                      />
                    ))}
                  </Flex>
                </FormControl>

                {/* Clothing */}
                <FormControl>
                  <FormLabel htmlFor='clothing'>Clothing</FormLabel>
                  <Select
                    id='clothing'
                    name='clothing'
                    placeholder='Select clothing'
                    value={config.clothing}
                    onChange={e => updateConfig({ clothing: e.target.value })}>
                    <option value='casual'>Casual</option>
                    <option value='formal'>Formal</option>
                    <option value='sporty'>Sporty</option>
                    <option value='sweater'>Sweater</option>
                  </Select>
                </FormControl>

                {/* Clothing Color */}
                <FormControl>
                  <FormLabel htmlFor='clothingColor'>Clothing Color</FormLabel>
                  <Flex wrap='wrap' gap={2}>
                    {CLOTHING_COLORS.map(color => (
                      <Button
                        key={color.value}
                        bg={color.hex}
                        borderRadius='full'
                        width='50px'
                        height='50px'
                        minWidth='50px'
                        borderWidth={config.clothingColor === color.value ? '3px' : '1px'}
                        borderColor={config.clothingColor === color.value ? 'blue.500' : 'gray.200'}
                        onClick={() => updateConfig({ clothingColor: color.value })}
                        _hover={{ transform: 'scale(1.1)', transition: 'transform 0.2s' }}
                        aria-label={`${color.name} clothing color`}
                      />
                    ))}
                  </Flex>
                </FormControl>
              </Stack>
            </Box>
          </Stack>
        </ModalBody>

        <ModalFooter>
          {mode === 'new-user' ? (
            <Flex gap={2}>
              <Button onClick={handleReset}>Reset to Default</Button>
              <Button colorScheme='blue' onClick={handleSave}>
                Continue
              </Button>
            </Flex>
          ) : (
            <Flex width='100%' justify='space-between'>
              <Button onClick={handleCancel}>Cancel</Button>
              <Flex gap={2}>
                <Button onClick={handleReset}>Reset to Default</Button>
                <Button colorScheme='blue' onClick={handleSave}>
                  Save Changes
                </Button>
              </Flex>
            </Flex>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
