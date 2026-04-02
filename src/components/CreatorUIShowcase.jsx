import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { TransformComponent, TransformWrapper, useControls } from "react-zoom-pan-pinch";

/**
 * Drop images into public/creator/ using the filenames below. If a file is missing,
 * the dashed placeholder stays until you add it (failed loads fall back to placeholder).
 */
const SLOTS = [
  { key: "login", label: "Login", hint: "public/creator/login.png", src: "/creator/login.png" },
  {
    key: "guide-list",
    label: "Guide listing",
    hint: "public/creator/guide-list.png",
    src: "/creator/guide-list.png",
  },
  { key: "edit-guide", label: "Edit guide", hint: "public/creator/edit-guide.png", src: "/creator/edit-guide.png" },
  { key: "steps", label: "Create steps", hint: "public/creator/steps.png", src: "/creator/steps.png" },
  { key: "settings", label: "Settings", hint: "public/creator/setting.png", src: "/creator/setting.png" },
  { key: "rte", label: "Rich text editor (RTE)", hint: "public/creator/rte.png", src: "/creator/rte.png" },
];

function ZoomToolbar() {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <HStack spacing={2} flexShrink={0}>
      <Button size="sm" variant="outline" colorScheme="brand" onClick={() => zoomIn()} aria-label="Zoom in">
        +
      </Button>
      <Button size="sm" variant="outline" colorScheme="brand" onClick={() => zoomOut()} aria-label="Zoom out">
        −
      </Button>
      <Button size="sm" variant="ghost" color="whiteAlpha.900" onClick={() => resetTransform()} aria-label="Reset zoom">
        Reset
      </Button>
    </HStack>
  );
}

function ImageLightbox({ isOpen, onClose, src, label }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" motionPreset="none" scrollBehavior="inside">
      <ModalOverlay bg="blackAlpha.900" backdropFilter="blur(6px)" />
      <ModalContent
        bg="surface.900"
        m={0}
        maxW="100vw"
        minH="100vh"
        borderRadius={0}
        borderWidth={0}
        display="flex"
        flexDirection="column"
      >
        <ModalCloseButton
          zIndex={2}
          color="white"
          top={4}
          right={4}
          size="lg"
          borderRadius="full"
          bg="whiteAlpha.200"
          _hover={{ bg: "whiteAlpha.300" }}
        />
        <Flex
          align="center"
          justify="space-between"
          px={{ base: 4, md: 6 }}
          py={3}
          borderBottomWidth="1px"
          borderColor="whiteAlpha.100"
          flexShrink={0}
          gap={4}
          flexWrap="wrap"
        >
          <Text color="white" fontWeight="600" fontFamily="heading" fontSize={{ base: "sm", md: "md" }}>
            {label}
          </Text>
          <Text fontSize="xs" color="whiteAlpha.500" display={{ base: "none", sm: "block" }}>
            Scroll to zoom · drag to pan
          </Text>
        </Flex>

        <ModalBody p={0} flex="1" minH={0} display="flex" flexDirection="column" position="relative">
          {src && (
            <TransformWrapper
              key={src}
              initialScale={1}
              minScale={0.35}
              maxScale={6}
              centerOnInit
              limitToBounds
              wheel={{ step: 0.12 }}
              doubleClick={{ mode: "reset" }}
              panning={{ velocityDisabled: false }}
            >
              <Flex direction="column" h="full" minH={{ base: "70vh", md: "calc(100vh - 120px)" }}>
                <HStack
                  justify="flex-end"
                  px={4}
                  py={2}
                  bg="blackAlpha.400"
                  borderBottomWidth="1px"
                  borderColor="whiteAlpha.100"
                >
                  <ZoomToolbar />
                </HStack>
                <Box flex="1" minH={0} bg="black" position="relative" cursor="grab" _active={{ cursor: "grabbing" }}>
                  <TransformComponent
                    wrapperStyle={{ width: "100%", height: "100%" }}
                    contentStyle={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <img
                      src={src}
                      alt={label}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "min(85vh, 100%)",
                        width: "auto",
                        height: "auto",
                        objectFit: "contain",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                      draggable={false}
                    />
                  </TransformComponent>
                </Box>
              </Flex>
            </TransformWrapper>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

function ScreenshotSlot({ label, hint, src, onExpand }) {
  const [loadFailed, setLoadFailed] = useState(false);
  const showImage = Boolean(src) && !loadFailed;

  const openLightbox = () => {
    if (showImage && src) onExpand({ src, label });
  };

  return (
    <Box
      position="relative"
      borderRadius="xl"
      overflow="hidden"
      borderWidth="2px"
      borderStyle="dashed"
      borderColor={showImage ? "whiteAlpha.200" : "whiteAlpha.300"}
      bg="blackAlpha.300"
      aspectRatio="16 / 10"
    >
      {showImage ? (
        <>
          <Box
            w="100%"
            h="100%"
            minH="180px"
            bg="blackAlpha.500"
            display="flex"
            alignItems="center"
            justifyContent="center"
            cursor="zoom-in"
            onClick={openLightbox}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`Open ${label} screenshot to zoom`}
          >
            <img
              src={src}
              alt={label}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                objectPosition: "top center",
                display: "block",
                pointerEvents: "none",
              }}
              onError={() => setLoadFailed(true)}
            />
          </Box>
          <Box
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            bg="linear-gradient(to top, rgba(0,0,0,0.88), transparent)"
            px={3}
            py={2}
            pt={10}
            pointerEvents="none"
          >
            <Text fontSize="xs" fontWeight="600" color="white">
              {label}
            </Text>
            <Text fontSize="10px" color="whiteAlpha.700" mt={0.5}>
              Click to expand
            </Text>
          </Box>
          <Button
            position="absolute"
            top={2}
            right={2}
            size="xs"
            borderRadius="md"
            bg="blackAlpha.700"
            color="white"
            fontWeight="600"
            _hover={{ bg: "blackAlpha.600" }}
            aria-label={`Open ${label} fullscreen`}
            onClick={(e) => {
              e.stopPropagation();
              openLightbox();
            }}
          >
            Open
          </Button>
        </>
      ) : (
        <Flex
          direction="column"
          align="center"
          justify="center"
          h="100%"
          minH="160px"
          px={4}
          py={6}
        >
          <Text fontWeight="600" fontFamily="heading" color="white" fontSize="sm" textAlign="center">
            {label}
          </Text>
          <Text fontSize="xs" color="whiteAlpha.500" mt={3} textAlign="center" lineHeight="1.5">
            Paste or add screenshot
          </Text>
          <Text fontSize="xs" color="whiteAlpha.400" mt={2} fontFamily="mono" textAlign="center">
            {hint}
          </Text>
        </Flex>
      )}
    </Box>
  );
}

export function CreatorUIShowcase() {
  const [expanded, setExpanded] = useState(null);

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2, xl: 3 }} spacing={4} w="100%" pt={2}>
        {SLOTS.map((slot) => (
          <ScreenshotSlot
            key={slot.key}
            label={slot.label}
            hint={slot.hint}
            src={slot.src}
            onExpand={setExpanded}
          />
        ))}
      </SimpleGrid>

      <ImageLightbox
        isOpen={Boolean(expanded)}
        onClose={() => setExpanded(null)}
        src={expanded?.src}
        label={expanded?.label}
      />
    </>
  );
}
