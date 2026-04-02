import { Box } from "@chakra-ui/react";

/**
 * Branching: creator summary + playback decision flow (evaluate on leave, confirm mid-guide).
 */
export function BranchingFlowDiagram() {
  return (
    <Box
      w="100%"
      maxW="100%"
      borderRadius="xl"
      borderWidth="1px"
      borderColor="whiteAlpha.100"
      bg="blackAlpha.400"
      p={{ base: 3, md: 4 }}
      overflow="hidden"
    >
      <Box
        as="svg"
        viewBox="0 0 900 520"
        w="100%"
        h="auto"
        role="img"
        aria-label="Branching: creator configuration and playback flow with condition evaluation and confirmation"
      >
        <defs>
          <linearGradient id="bf-box" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a5f" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0a0f18" stopOpacity="0.95" />
          </linearGradient>
          <marker id="bf-ar" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#64748b" />
          </marker>
        </defs>

        <text x="12" y="20" fill="#7dd3fc" fontSize="11" fontFamily="system-ui" fontWeight="600">
          Creator
        </text>
        <rect x="12" y="26" width="876" height="46" rx="8" fill="url(#bf-box)" stroke="#38bdf8" strokeWidth="1.2" />
        <text x="450" y="50" fill="#e2e8f0" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          Branch out steps · elements & conditions · map to child guides · save
        </text>

        <text x="12" y="94" fill="#7dd3fc" fontSize="11" fontFamily="system-ui" fontWeight="600">
          Playback
        </text>

        {/* vertical stack center x=450 */}
        <rect x="370" y="100" width="160" height="28" rx="6" fill="url(#bf-box)" stroke="#34d399" strokeWidth="1.2" />
        <text x="450" y="118" fill="#f1f5f9" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          Play starts · load configs
        </text>

        <line x1="450" y1="128" x2="450" y2="142" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bf-ar)" />

        <rect x="330" y="142" width="240" height="34" rx="6" fill="url(#bf-box)" stroke="#fbbf24" strokeWidth="1.2" />
        <text x="450" y="158" fill="#f1f5f9" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          Branch out step: land — play normally
        </text>
        <text x="450" y="170" fill="#fde68a" fontSize="7" fontFamily="system-ui" textAnchor="middle">
          no check on landing
        </text>

        <line x1="450" y1="176" x2="450" y2="194" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bf-ar)" />

        <rect x="330" y="194" width="240" height="30" rx="6" fill="url(#bf-box)" stroke="#38bdf8" strokeWidth="1.2" />
        <text x="450" y="212" fill="#f1f5f9" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          User completes step → evaluate
        </text>

        <line x1="450" y1="224" x2="450" y2="238" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bf-ar)" />

        <rect x="340" y="238" width="220" height="28" rx="6" fill="url(#bf-box)" stroke="#a78bfa" strokeWidth="1.2" />
        <text x="450" y="255" fill="#f1f5f9" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          Conditions match?
        </text>

        {/* split */}
        <path d="M 340 252 L 140 252 L 140 280" stroke="#64748b" strokeWidth="1.5" fill="none" markerEnd="url(#bf-ar)" />
        <path d="M 560 252 L 730 252 L 730 280" stroke="#64748b" strokeWidth="1.5" fill="none" markerEnd="url(#bf-ar)" />
        <text x="240" y="246" fill="#94a3b8" fontSize="7" fontFamily="system-ui" textAnchor="middle">
          no
        </text>
        <text x="640" y="246" fill="#94a3b8" fontSize="7" fontFamily="system-ui" textAnchor="middle">
          yes
        </text>

        <rect x="40" y="280" width="200" height="32" rx="6" fill="url(#bf-box)" stroke="#64748b" strokeWidth="1.2" />
        <text x="140" y="300" fill="#e2e8f0" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          Next step (same guide)
        </text>

        <rect x="630" y="280" width="200" height="32" rx="6" fill="url(#bf-box)" stroke="#34d399" strokeWidth="1.2" />
        <text x="730" y="298" fill="#f1f5f9" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          progress == 1 ?
        </text>

        <line x1="730" y1="312" x2="730" y2="330" stroke="#64748b" strokeWidth="1.5" markerEnd="url(#bf-ar)" />

        <path d="M 730 330 L 730 344 L 520 344 L 520 358" stroke="#64748b" strokeWidth="1.5" fill="none" markerEnd="url(#bf-ar)" />
        <path d="M 730 330 L 730 344 L 820 344 L 820 358" stroke="#64748b" strokeWidth="1.5" fill="none" markerEnd="url(#bf-ar)" />
        <text x="620" y="338" fill="#94a3b8" fontSize="7" fontFamily="system-ui" textAnchor="middle">
          yes
        </text>
        <text x="780" y="338" fill="#94a3b8" fontSize="7" fontFamily="system-ui" textAnchor="middle">
          no
        </text>

        <rect x="420" y="358" width="200" height="36" rx="6" fill="url(#bf-box)" stroke="#22d3ee" strokeWidth="1.2" />
        <text x="520" y="376" fill="#f1f5f9" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          Auto branch → child @ stepId
        </text>
        <text x="520" y="388" fill="#94a3b8" fontSize="7" fontFamily="system-ui" textAnchor="middle">
          no confirmation (legacy)
        </text>

        <rect x="680" y="358" width="200" height="44" rx="6" fill="url(#bf-box)" stroke="#fbbf24" strokeWidth="1.2" />
        <text x="780" y="376" fill="#f1f5f9" fontSize="9" fontFamily="system-ui" textAnchor="middle">
          Confirmation dialog
        </text>
        <text x="780" y="390" fill="#fde68a" fontSize="7" fontFamily="system-ui" textAnchor="middle">
          Branch to Guide · Continue guide
        </text>

        <text x="12" y="430" fill="#64748b" fontSize="8" fontFamily="system-ui">
          Each branch out step is evaluated when the user completes that step
        </text>
      </Box>
    </Box>
  );
}
