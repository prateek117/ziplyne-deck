import { Box } from "@chakra-ui/react";

/**
 * Visual flow for @ziplyne-inc/enterprise-selectors:
 * Recording (capture) vs Replay (find + fallback + optional autoheal).
 */
export function SelectorEngineFlowDiagram({ highlight = "full" }) {
  const dimRecording = highlight === "replay" ? 0.38 : 1;
  const dimReplay = highlight === "recording" ? 0.38 : 1;

  return (
    <Box
      w="100%"
      maxW="100%"
      mx="auto"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      bg="blackAlpha.400"
      p={{ base: 3, md: 5 }}
      overflow="hidden"
    >
      <Box
        as="svg"
        viewBox="0 0 880 500"
        w="100%"
        h="auto"
        role="img"
        aria-label="Selector engine: recording flow and replay flow with heuristics and optional autoheal"
      >
        <defs>
          <linearGradient id="se-box" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0a0f18" stopOpacity="0.95" />
          </linearGradient>
          <marker
            id="se-arrow"
            markerWidth="7"
            markerHeight="7"
            refX="6"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#64748b" />
          </marker>
        </defs>

        {/* Recording */}
        <g opacity={dimRecording}>
          <text x="16" y="26" fill="#7dd3fc" fontSize="13" fontFamily="system-ui, sans-serif" fontWeight="600">
            Recording — capture
          </text>
          <rect x="16" y="38" width="118" height="42" rx="8" fill="url(#se-box)" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="75" y="58" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            User action
          </text>
          <text x="75" y="72" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            DOM event
          </text>

          <line
            x1="134"
            y1="59"
            x2="162"
            y2="59"
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#se-arrow)"
          />
          <rect x="162" y="38" width="172" height="42" rx="8" fill="url(#se-box)" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="248" y="58" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            generateSelectors(event)
          </text>
          <text x="248" y="72" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            composedPath → target
          </text>

          <line
            x1="334"
            y1="59"
            x2="362"
            y2="59"
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#se-arrow)"
          />
          <rect x="362" y="32" width="206" height="54" rx="8" fill="url(#se-box)" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="465" y="52" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            MetadataGenerator
          </text>
          <text x="465" y="68" fill="#cbd5e1" fontSize="10" fontFamily="system-ui" textAnchor="middle">
            + SelectorGenerator
          </text>
          <text x="465" y="82" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            per level · shadow chain
          </text>

          <line
            x1="568"
            y1="59"
            x2="596"
            y2="59"
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#se-arrow)"
          />
          <rect x="596" y="36" width="268" height="48" rx="8" fill="url(#se-box)" stroke="#22d3ee" strokeWidth="1.2" />
          <text x="730" y="56" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            Store {"{"} metadata, selectors, children {"}"}
          </text>
          <text x="730" y="72" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            base · paths.tree · main · nested shadow
          </text>
        </g>

        <line
          x1="730"
          y1="108"
          x2="730"
          y2="128"
          stroke="#475569"
          strokeWidth="1"
          strokeDasharray="5 4"
          opacity={Math.min(dimRecording, dimReplay)}
        />
        <line
          x1="730"
          y1="128"
          x2="75"
          y2="128"
          stroke="#475569"
          strokeWidth="1"
          strokeDasharray="5 4"
          opacity={Math.min(dimRecording, dimReplay)}
        />
        <line
          x1="75"
          y1="128"
          x2="75"
          y2="188"
          stroke="#475569"
          strokeWidth="1"
          strokeDasharray="5 4"
          opacity={Math.min(dimRecording, dimReplay)}
        />
        <text x="400" y="122" fill="#64748b" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          persisted with recorded step
        </text>

        {/* Replay */}
        <g opacity={dimReplay}>
          <text x="16" y="178" fill="#7dd3fc" fontSize="13" fontFamily="system-ui" fontWeight="600">
            Replay — find & recovery
          </text>
          <rect x="16" y="190" width="118" height="42" rx="8" fill="url(#se-box)" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="75" y="210" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            Replay step
          </text>
          <text x="75" y="224" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            player
          </text>

          <line
            x1="134"
            y1="211"
            x2="162"
            y2="211"
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#se-arrow)"
          />
          <rect x="162" y="190" width="138" height="42" rx="8" fill="url(#se-box)" stroke="#38bdf8" strokeWidth="1.2" />
          <text x="231" y="210" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            findElement(…)
          </text>
          <text x="231" y="224" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            rootElement?
          </text>

          <line
            x1="300"
            y1="211"
            x2="328"
            y2="211"
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#se-arrow)"
          />
          <rect x="328" y="184" width="212" height="54" rx="8" fill="url(#se-box)" stroke="#34d399" strokeWidth="1.2" />
          <text x="434" y="204" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            Stage 1–2: CSS + validation
          </text>
          <text x="434" y="220" fill="#a7f3d0" fontSize="10" fontFamily="system-ui" textAnchor="middle">
            main → paths.tree[] → base
          </text>
          <text x="434" y="234" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            metadata filter if multiple
          </text>

          <line
            x1="540"
            y1="211"
            x2="568"
            y2="211"
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#se-arrow)"
          />
          <rect x="568" y="184" width="156" height="54" rx="8" fill="url(#se-box)" stroke="#fbbf24" strokeWidth="1.2" />
          <text x="646" y="204" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            Stage 3: heuristics
          </text>
          <text x="646" y="220" fill="#fde68a" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            tag · text · parent · attrs
          </text>
          <text x="646" y="234" fill="#94a3b8" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            scoring
          </text>

          <line
            x1="724"
            y1="211"
            x2="752"
            y2="211"
            stroke="#64748b"
            strokeWidth="1.5"
            markerEnd="url(#se-arrow)"
          />
          <rect x="752" y="190" width="112" height="42" rx="8" fill="url(#se-box)" stroke="#a78bfa" strokeWidth="1.2" />
          <text x="808" y="210" fill="#f1f5f9" fontSize="11" fontFamily="system-ui" textAnchor="middle">
            Autoheal
          </text>
          <text x="808" y="224" fill="#c4b5fd" fontSize="9" fontFamily="system-ui" textAnchor="middle">
            optional
          </text>

          <path
            d="M 808 260 L 808 278 L 440 278 L 440 290"
            stroke="#64748b"
            strokeWidth="1.2"
            fill="none"
            markerEnd="url(#se-arrow)"
          />
          <rect x="200" y="290" width="480" height="52" rx="10" fill="url(#se-box)" stroke="#22d3ee" strokeWidth="1.2" />
          <text x="440" y="312" fill="#f1f5f9" fontSize="12" fontFamily="system-ui" textAnchor="middle" fontWeight="600">
            Result
          </text>
          <text x="440" y="330" fill="#94a3b8" fontSize="10" fontFamily="system-ui" textAnchor="middle">
            element · selector · strategy · confidence · updated? · updatedSelectorObject?
          </text>
        </g>

        {/* Footnotes */}
        <g opacity="0.92">
          <text x="16" y="378" fill="#64748b" fontSize="10" fontFamily="system-ui" fontWeight="600">
            Stored object (per light/shadow level)
          </text>
          <text x="16" y="396" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
            selectors.base · selectors.paths.tree[] · selectors.main — children chain for shadow hosts
          </text>
          <text x="16" y="418" fill="#64748b" fontSize="10" fontFamily="system-ui" fontWeight="600">
            Note
          </text>
          <text x="16" y="436" fill="#94a3b8" fontSize="9" fontFamily="system-ui">
            Recovery runs inside ElementFinder (not a separate fallbackRecovery export). Snapshot comparison aids recovery when DOM shifts.
          </text>
        </g>
      </Box>
    </Box>
  );
}
