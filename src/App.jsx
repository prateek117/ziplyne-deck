import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
  Badge,
  Divider,
  Link,
} from "@chakra-ui/react";

function SlideTextBlock({ current, diagramColumn }) {
  return (
    <>
      <Text
        fontSize="sm"
        fontWeight="600"
        color="brand.300"
        textTransform="uppercase"
        letterSpacing="0.2em"
        fontFamily="heading"
      >
        {current.kicker}
      </Text>
      <Heading
        as="h1"
        fontSize={{
          base: "3xl",
          md: "4xl",
          lg: diagramColumn ? "4xl" : "5xl",
          xl: diagramColumn ? "4xl" : "6xl",
        }}
        fontWeight="700"
        lineHeight="1.05"
        letterSpacing="-0.03em"
        bgGradient="linear(to-r, white, gray.400)"
        bgClip="text"
      >
        {current.title}
      </Heading>
      <Text
        fontSize={{ base: "md", md: "lg" }}
        color="whiteAlpha.800"
        lineHeight="1.65"
        maxW={diagramColumn ? "none" : "720px"}
      >
        {current.subtitle}
      </Text>

      {current.docHref && (
        <Link
          href={current.docHref}
          isExternal
          mt={1}
          color="brand.300"
          fontWeight="600"
          fontSize="sm"
          textDecoration="underline"
          textUnderlineOffset="4px"
          _hover={{ color: "brand.200" }}
        >
          Docs
        </Link>
      )}

      {current.bullets?.length > 0 && (
        <>
          <Divider borderColor="whiteAlpha.200" w="100%" />
          <VStack align="stretch" spacing={4} w="100%">
            {current.bullets.map((item, bi) => (
              <HStack key={`${current.id}-b-${bi}`} align="flex-start" spacing={3}>
                <Box
                  mt={2}
                  w="2"
                  h="2"
                  borderRadius="full"
                  bg="brand.400"
                  flexShrink={0}
                />
                <Text fontSize={{ base: "sm", md: "md" }} color="gray.200" lineHeight="1.6">
                  {item}
                </Text>
              </HStack>
            ))}
          </VStack>
        </>
      )}
    </>
  );
}
import { motion, AnimatePresence } from "framer-motion";
import { SelectorEngineFlowDiagram } from "./components/SelectorEngineFlowDiagram.jsx";
import { CreatorUIShowcase } from "./components/CreatorUIShowcase.jsx";
import { BranchingFlowDiagram } from "./components/BranchingFlowDiagram.jsx";

function ChevronLeftIcon(props) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      />
    </Icon>
  );
}

function ChevronRightIcon(props) {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      />
    </Icon>
  );
}

const slides = [
  {
    id: "home",
    kicker: "Product release",
    title: "V8",
    subtitle: "What’s new in this release — a focused walkthrough of the capabilities we’ve shipped.",
    bullets: [
      "Creator UI revamp",
      "Creator UI screenshots",
      "Branching & out UI",
      "Selectors integrations",
      "Fallback strategy & auto-healing",
      "Impact over time",
    ],
  },
  {
    id: "creator",
    kicker: "Experience",
    title: "Creator UI revamp",
    subtitle:
      "Phased execution: establish infrastructure and auth, then guide management and data, then the step editor and RTE, then hardening from internal feedback, and finally full flow validation.",
    bullets: [
      "Phase 1 — Foundation & authentication: new Creator project setup, routing, env config, styling framework, centralized branding (primary/secondary, logo, typography), a shared component library (Button, Input, Dropdown, Checkbox, Toggle, AutoComplete, Card, Modal, Tooltip, Tabs, Loader, Toast, error/empty states), plus auth screens — login (validation + API + errors) and forgot password.",
      "Phase 2 — Guide management & data: create-guide flow, guide listing with search/filter/sort (status, dates, type, language), guide details for metadata edits, IndexedDB for local persistence, and context providers for guide/editor/session state.",
      "Phase 3 — Step editor & workflow: create/manage steps (ordering, edit, delete), RTE for step content, optional branching UI (TBD), integration with existing player logic and step data shapes, and configuration UI for guide behavior, display, triggers, and visibility.",
      "Phase 4 — Improvements from internal feedback: triage UI/UX/bugs from the team; iterate layout, navigation, hierarchy, reduce clicks, and fix workflow and integration issues.",
      "Phase 5 — Testing & validation: end-to-end coverage from login through guide creation/editing, steps, configs, and player; UI consistency pass, bug fixes, and performance checks on guide load, step rendering, and editor responsiveness.",
    ],
    docHref: "https://ziplyne.atlassian.net/wiki/x/AYAWD",
  },
  {
    id: "creator-showcase",
    kicker: "Experience",
    title: "Creator UI — screenshots",
      subtitle:
      "Screenshots: login, guide listing, edit guide, create steps, settings, and RTE. Assets live under public/creator/ and are wired in CreatorUIShowcase.jsx.",
    bullets: [],
    docHref: "https://ziplyne.atlassian.net/wiki/x/AYAWD",
    creatorShowcase: true,
  },
  {
    id: "branching",
    kicker: "Flows",
    title: "Branching & out UI",
    subtitle:
      "Route players into child guides when conditions on the page match — configured in the creator, evaluated during playback at the right moment.",
    bullets: [
      "Authoring: define one or more branch out steps, pick elements on the page, set how conditions are evaluated, and map outcomes to child guides.",
      "Playback: branching is checked when the user finishes a branch out step — not when they first land on it.",
      "If conditions match: either ask the user before leaving mid-guide, or branch automatically when the guide is complete.",
      "If nothing matches, the guide continues to the next step as usual.",
    ],
    docHref: "https://ziplyne.atlassian.net/wiki/x/AYBoCQ",
    branchingDiagram: true,
  },
  {
    id: "selectors",
    kicker: "Integrations",
    title: "Selectors integrations",
    subtitle:
      "Beyond wiring the SDK: capture is now built to survive real apps — dynamic UIs, shadow trees, and unstable attributes are modeled explicitly so replay has something solid to work with.",
    bullets: [
      "Dynamic selectors & values: detect and filter dynamic or unstable attribute values (e.g. isDynamicValue-style checks) so base selectors (id, attribute, class, tag) don’t lock onto values that disappear on the next render or reload.",
      "Attribute hygiene: whitelist/blacklist rules decide which attributes are safe to persist; reduces brittle class/attr noise from frameworks and third-party widgets.",
      "Rich metadata per element: tag, trimmed/capped text, stable attributes, positional hints (e.g. nth-of-type), parent summary, and shadow context (level, inside shadow root) — used later to disambiguate when a CSS query matches more than one node.",
      "Multi-path CSS, not one magic string: paths.tree holds multiple tree/path candidates up to a configurable parent limit (flexible depth, not fixed tree3…tree15 fields); selectors.main prefers the shortest tree candidate when paths exist, otherwise falls back through id → attribute → class → tag.",
      "Shadow & composition: shadow-safe resolution via composedPath() where available; the stored object chains one logical level per light root or shadow host (nested metadata + selectors + children) down to the real target.",
      "Recorder integration: the engine is integrated with the extension recorder so every recorded step persists a full selector object — the same structure the player and SDK consume for replay and recovery.",
    ],
    docHref: "https://ziplyne.atlassian.net/wiki/x/AYA8Cw",
    diagramHighlight: "recording",
  },
  {
    id: "fallback",
    kicker: "Reliability",
    title: "Fallback strategy & auto-healing",
    subtitle:
      "Replay doesn’t stop at “CSS missed”: ElementFinder runs a defined priority order, then heuristic recovery using the same metadata you stored at capture — plus optional auto-heal so the next run is smarter.",
    bullets: [
      "CSS priority per scope: try selectors.main, then paths.tree[] in order, then base fields (id → attribute → class → tag) with validation at each step so the engine prefers the strongest, most specific match first.",
      "Multiple matches: if a CSS strategy returns several nodes, narrow candidates using stored metadata (tag/text/attrs/position/parent context) before accepting a hit — fewer false positives on generic selectors.",
      "Shadow-aware replay: repeat the same pipeline for each stored level; when children is present, continue inside the host’s shadowRoot until the leaf scope — mirrors how capture flattened the tree.",
      "Heuristic recovery when CSS fails: internal tag / text / parent / attribute passes with scoring (_findByHeuristics, _scoreElement) — recovery is part of ElementFinder, not a separate fallbackRecovery() export, so behavior stays consistent across products.",
      "DOM snapshot comparison: compare live structure against stored snapshots to realign after DOM shifts (Phase 2) — complements pure CSS + metadata when the page layout changes materially.",
      "Auto-heal: optionally regenerate selectors and metadata on the element that was found so the stored step can be updated; findElement returns strategy, confidence, updated flags, and updatedSelectorObject when the engine refreshes what gets persisted.",
    ],
    docHref: "https://ziplyne.atlassian.net/wiki/x/AYA8Cw",
    diagramHighlight: "replay",
  },
  {
    id: "impact",
    kicker: "Outcomes",
    title: "What we’ve improved over time",
    subtitle:
      "These pieces compound: a better creator, clearer branching, stronger selectors, and resilient execution — delivering lasting value as you scale.",
    bullets: [],
    isClosing: true,
  },
];

const MotionBox = motion(Box);

export default function App() {
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const current = slides[index];

  const go = useCallback(
    (delta) => {
      setIndex((i) => Math.min(Math.max(0, i + delta), total - 1));
    },
    [total]
  );

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        go(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        setIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setIndex(total - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  return (
    <Box
      minH="100dvh"
      position="relative"
      overflow="hidden"
      bg="surface.950"
      backgroundImage="radial-gradient(ellipse 80% 50% at 50% -20%, rgba(3, 155, 229, 0.18), transparent), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(3, 155, 229, 0.08), transparent)"
    >
      {/* subtle grid */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.04}
        backgroundImage="linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)"
        backgroundSize="48px 48px"
        pointerEvents="none"
      />

      <Flex
        direction="column"
        minH="100dvh"
        px={{ base: 5, md: 8, lg: 10, xl: 12 }}
        py={{ base: 8, md: 12 }}
        maxW={{ base: "100%", xl: "1680px" }}
        w="100%"
        mx="auto"
        position="relative"
        zIndex={1}
      >
        <HStack justify="space-between" align="center" mb={6} flexShrink={0}>
          <Badge
            colorScheme="brand"
            variant="subtle"
            px={3}
            py={1}
            borderRadius="full"
            fontSize="xs"
            textTransform="uppercase"
            letterSpacing="wider"
          >
            Release deck
          </Badge>
          <Text fontSize="sm" color="whiteAlpha.600" fontFamily="heading">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </Text>
        </HStack>

        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent={current.creatorShowcase ? "flex-start" : "center"}
          minH={0}
          overflowY="auto"
          overflowX="hidden"
          py={{ base: 2, md: 4 }}
        >
          <AnimatePresence mode="wait">
            <MotionBox
              key={current.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              w="100%"
            >
              {current.diagramHighlight ? (
                <Flex
                  direction={{ base: "column", lg: "row" }}
                  gap={{ base: 8, lg: 10, xl: 12 }}
                  align={{ base: "stretch", lg: "center" }}
                  w="100%"
                >
                  <VStack
                    align="stretch"
                    spacing={6}
                    flex={{ base: "none", lg: "0 0 38%", xl: "0 0 36%" }}
                    minW={0}
                    w="100%"
                  >
                    <SlideTextBlock current={current} diagramColumn />
                  </VStack>
                  <Box flex="1" minW={0} w="100%">
                    <SelectorEngineFlowDiagram highlight={current.diagramHighlight} />
                  </Box>
                </Flex>
              ) : current.branchingDiagram ? (
                <Flex
                  direction={{ base: "column", lg: "row" }}
                  gap={{ base: 8, lg: 10, xl: 12 }}
                  align={{ base: "stretch", lg: "center" }}
                  w="100%"
                >
                  <VStack
                    align="stretch"
                    spacing={6}
                    flex={{ base: "none", lg: "0 0 38%", xl: "0 0 36%" }}
                    minW={0}
                    w="100%"
                  >
                    <SlideTextBlock current={current} diagramColumn />
                  </VStack>
                  <Box flex="1" minW={0} w="100%">
                    <BranchingFlowDiagram />
                  </Box>
                </Flex>
              ) : current.creatorShowcase ? (
                <VStack
                  align="stretch"
                  spacing={6}
                  w="100%"
                  maxW="none"
                  mx={0}
                >
                  <SlideTextBlock current={current} diagramColumn={false} />
                  <CreatorUIShowcase />
                </VStack>
              ) : (
                <VStack
                  align="stretch"
                  spacing={8}
                  maxW={current.isClosing ? "100%" : "1040px"}
                  mx={current.isClosing ? 0 : "auto"}
                  w="100%"
                >
                  <SlideTextBlock current={current} diagramColumn={false} />
                  {current.isClosing && (
                    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap={4} w="100%" pt={2}>
                      {[
                        {
                          title: "Ship faster",
                          body: "Less friction in the creator means quicker experiments and delivery.",
                        },
                        {
                          title: "Stay maintainable",
                          body: "Clearer branching and integrations keep flows understandable as they grow.",
                        },
                        {
                          title: "Run reliably",
                          body: "Fallbacks and auto-healing reduce breakage when the UI changes.",
                        },
                        {
                          title: "Scale the platform",
                          body: "Selectors and resilience set the stage for what comes next.",
                        },
                      ].map((card) => (
                        <Box
                          key={card.title}
                          p={5}
                          borderRadius="xl"
                          borderWidth="1px"
                          borderColor="whiteAlpha.100"
                          bg="whiteAlpha.50"
                          backdropFilter="blur(8px)"
                        >
                          <Text fontWeight="600" fontFamily="heading" color="white">
                            {card.title}
                          </Text>
                          <Text fontSize="sm" color="whiteAlpha.600" mt={2} lineHeight="1.5">
                            {card.body}
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  )}
                </VStack>
              )}
            </MotionBox>
          </AnimatePresence>
        </Box>

        <HStack
          justify="space-between"
          align="center"
          pt={4}
          flexWrap="wrap"
          gap={4}
          flexShrink={0}
        >
          <HStack spacing={2}>
            {slides.map((s, i) => (
              <Box
                key={s.id}
                as="button"
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                w={i === index ? 8 : 2}
                h={2}
                borderRadius="full"
                bg={i === index ? "brand.400" : "whiteAlpha.300"}
                transition="all 0.25s ease"
                _hover={{ bg: i === index ? "brand.300" : "whiteAlpha.500" }}
              />
            ))}
          </HStack>

          <HStack spacing={3}>
            <IconButton
              aria-label="Previous slide"
              icon={<ChevronLeftIcon boxSize={6} />}
              variant="ghost"
              color="whiteAlpha.800"
              isDisabled={index === 0}
              onClick={() => go(-1)}
              size="lg"
              borderRadius="xl"
              _hover={{ bg: "whiteAlpha.100" }}
            />
            <Button
              size="lg"
              borderRadius="xl"
              px={8}
              onClick={() => go(1)}
              isDisabled={index === total - 1}
              rightIcon={<ChevronRightIcon />}
            >
              {index === total - 1 ? "End" : "Next"}
            </Button>
          </HStack>
        </HStack>

        <Text fontSize="xs" color="whiteAlpha.400" mt={3} textAlign="center" flexShrink={0}>
          Use arrow keys, Space, or Page Up/Down · Home / End for first / last slide
        </Text>
      </Flex>
    </Box>
  );
}
