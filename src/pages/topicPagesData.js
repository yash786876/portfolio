export const TOPIC_PAGES = [
  {
    path: '/deep-tech/healthcare',
    domainKey: 'healthcare',
    title: 'Healthcare',
    intro: 'Where deep tech meets medicine — swap in the real reading and takes.',
    bullets: [
      {
        label: 'Digital health & telemedicine',
        note: 'Teladoc, Practo, remote monitoring — the check-up became an app tap.',
        abstract:
          'Digital health uses software and connected devices to deliver and monitor care outside a traditional clinic — video visits, wearables, and remote patient monitoring turned routine check-ins into something that fits in a pocket. Platforms like Teladoc and Practo now handle millions of consultations a year, especially valuable where doctors are scarce.',
        diagram: { type: 'flow', steps: ['Patient symptom', 'App / video consult', 'Diagnosis', 'e-Prescription', 'Remote monitoring'] },
      },
      {
        label: 'Biotech & gene therapy',
        note: 'CRISPR-based therapies (Casgevy) are FDA-approved now, not just theoretical.',
        abstract:
          'Gene therapy treats disease by correcting or replacing faulty genes rather than just managing symptoms. CRISPR-based tools can now edit DNA with real precision, and therapies like Casgevy (approved for sickle cell disease) prove the lab-to-clinic pipeline actually works, not just the theory.',
        diagram: { type: 'flow', steps: ['Identify faulty gene', 'Design CRISPR edit', 'Deliver via vector', 'Edit patient cells', 'Clinical monitoring'] },
      },
      {
        label: 'Health-tech infrastructure',
        note: 'EHR interoperability (FHIR standards) is the unsexy backbone making it all work.',
        abstract:
          "None of digital health works without data moving safely between systems. FHIR (Fast Healthcare Interoperability Resources) is the standard letting a hospital's records system talk to a pharmacy or a wearable app — unglamorous, but it's the plumbing the entire industry depends on.",
        diagram: { type: 'stack', layers: ['Patient-facing apps', 'APIs (FHIR standard)', 'Electronic Health Records', 'Hospital / clinic data systems'] },
      },
      {
        label: 'Regulatory landscape (FDA / EMA)',
        note: 'Approval timelines are the real bottleneck, not the science.',
        abstract:
          'Before any drug or device reaches a patient, it passes through years of regulatory review — preclinical trials, then Phase I-III human trials, then agency review (FDA in the US, EMA in Europe). This is usually the longest and most expensive part of bringing a health innovation to market, often longer than the science itself took.',
        diagram: { type: 'flow', steps: ['Preclinical research', 'Phase I trial', 'Phase II trial', 'Phase III trial', 'Agency review', 'Market approval'] },
      },
    ],
  },
  {
    path: '/deep-tech/computing',
    domainKey: 'computing',
    title: 'Computing',
    intro: 'The hardware and infrastructure layer under everything else.',
    bullets: [
      {
        label: 'Semiconductors & chip design',
        note: "TSMC and Nvidia's grip on leading-edge chips defines who gets to build AI.",
        abstract:
          "Modern chips are designed by a handful of companies (Nvidia, AMD) but manufactured by an even smaller number of foundries — TSMC alone produces most of the world's leading-edge chips. That concentration means a handful of factories effectively set the global pace of AI progress.",
        diagram: { type: 'flow', steps: ['Chip design', 'Foundry fabrication', 'Packaging & testing', 'Server / device integration'] },
      },
      {
        label: 'Quantum computing',
        note: 'Years from practical use, but IBM and Google keep pushing qubit counts higher.',
        abstract:
          "Quantum computers use qubits, which can represent multiple states at once, to tackle certain problems exponentially faster than classical computers. The field is still mostly in the research and error-correction stage — real-world quantum advantage is probably still years away, but qubit counts and stability keep climbing.",
        diagram: { type: 'stack', layers: ['Application layer (future use cases)', 'Error correction', 'Qubit hardware', 'Cryogenic control systems'] },
      },
      {
        label: 'Edge & cloud infrastructure',
        note: 'AWS, Azure, GCP — the real toll booths of the internet.',
        abstract:
          'Cloud computing centralizes processing in massive data centers (AWS, Azure, GCP); edge computing pushes some of that processing closer to the device generating the data, cutting latency. Most modern systems now blend both — heavy lifting in the cloud, time-sensitive decisions at the edge.',
        diagram: { type: 'stack', layers: ['Device / sensor (edge)', 'Local edge processing', 'Network', 'Centralized cloud data center'] },
      },
      {
        label: 'AI / ML hardware',
        note: "GPUs became the world's most contested resource almost overnight.",
        abstract:
          'Training large AI models needs massively parallel math, which is what GPUs — originally built for graphics — turned out to be great at. Demand exploded so fast that GPUs became one of the most contested resources in tech, pushing companies to design custom AI chips just to reduce their dependence on the shortage.',
        diagram: { type: 'flow', steps: ['Training data', 'GPU / TPU compute cluster', 'Trained model', 'Inference at scale'] },
      },
    ],
  },
  {
    path: '/deep-tech/manufacturing',
    domainKey: 'manufacturing',
    title: 'Manufacturing',
    intro: 'How things actually get built, at scale.',
    bullets: [
      {
        label: 'Industrial automation & robotics',
        note: 'Boston Dynamics and a wave of Chinese robotics firms are racing to automate warehouses.',
        abstract:
          'Robots have moved from repetitive factory-line tasks to more adaptive warehouse and logistics work. Companies like Boston Dynamics and a wave of Chinese robotics firms are racing to build machines that handle irregular objects and environments, not just fixed assembly lines.',
        diagram: { type: 'flow', steps: ['Order received', 'Robotic picking', 'Automated packing', 'Sorting & routing', 'Dispatch'] },
      },
      {
        label: '3D printing / additive manufacturing',
        note: 'From prototyping to real aerospace parts — see Relativity Space.',
        abstract:
          "Additive manufacturing builds parts layer by layer instead of cutting from a block, which used to mean prototypes only. That's changed — Relativity Space now 3D prints structural rocket parts, and aerospace increasingly trusts printed metal components in flight.",
        diagram: { type: 'flow', steps: ['3D digital design', 'Slice into layers', 'Layer-by-layer print', 'Post-processing', 'Finished part'] },
      },
      {
        label: 'Supply chain resilience',
        note: "Post-2020, “just in time” quietly became “just in case.”",
        abstract:
          "For decades, “just in time” manufacturing minimized inventory to cut costs. Repeated disruptions changed that calculus — most manufacturers now deliberately hold more buffer stock and diversify suppliers across regions, trading some efficiency for the ability to survive the next shock.",
        diagram: { type: 'stack', layers: ['Raw material suppliers (diversified)', 'Buffer inventory', 'Manufacturing', 'Distribution network'] },
      },
      {
        label: 'Smart factories (Industry 4.0)',
        note: 'Sensors plus data turned factories into real-time dashboards.',
        abstract:
          "Industry 4.0 wires sensors into every machine on a factory floor, streaming real-time data on output, wear, and quality. That turns a factory into something closer to a live dashboard than a black box — problems get caught in minutes instead of showing up as defects days later.",
        diagram: { type: 'flow', steps: ['Sensors on machines', 'Real-time data stream', 'Analytics dashboard', 'Predictive maintenance'] },
      },
    ],
  },
  {
    path: '/deep-tech/new-innovation',
    domainKey: 'new-innovation',
    title: 'New Innovation',
    intro: 'Whatever is early enough that nobody has a strong opinion yet.',
    bullets: [
      {
        label: 'Emerging technologies to watch',
        note: 'Whatever the latest YC batch is quietly building.',
        abstract:
          "The technologies that matter in five years rarely look impressive today — they usually start as a small, weird-looking demo most people dismiss. Watching accelerator batches (like YC's) and early-stage funding rounds is often a better signal than watching what's already mainstream.",
        diagram: { type: 'flow', steps: ['Early prototype', 'Seed funding', 'Niche adoption', 'Mainstream product'] },
      },
      {
        label: 'Frontier startups',
        note: "The ones nobody's heard of yet — until they are.",
        abstract:
          "The startups worth watching are usually the ones nobody outside their niche has heard of — often solving a problem so specific it looks unimportant until the underlying technology matures and the market catches up all at once.",
        diagram: { type: 'stack', layers: ['Stealth / pre-seed', 'Seed stage', 'Series A-B growth', 'Category leader'] },
      },
      {
        label: 'R&D breakthroughs',
        note: 'Lab results that take 5-10 years to become an actual product.',
        abstract:
          'Most genuinely new technology spends five to ten quiet years in a lab before it becomes a product anyone can buy — the gap between a promising research result and something that ships is usually underestimated by everyone except the people doing the engineering.',
        diagram: { type: 'flow', steps: ['Lab discovery', 'Proof of concept', 'Engineering & scaling', 'Commercial product'] },
      },
      {
        label: 'Patents & IP trends',
        note: "Who's actually filing versus who's just talking about it.",
        abstract:
          "Patent filings are a leading indicator — companies file years before a product ships, so tracking who's actually filing (versus who's just talking in interviews) is one of the more reliable ways to see where real R&D investment is heading.",
        diagram: { type: 'flow', steps: ['R&D breakthrough', 'Patent application filed', 'Examination', 'Patent granted', 'Product launch'] },
      },
    ],
  },
  {
    path: '/deep-tech/out-of-this-world',
    domainKey: 'out-of-this-world',
    title: 'Out of This World',
    intro: 'Space tech, and anything else that sounds like science fiction until it ships.',
    bullets: [
      {
        label: 'Space tech & satellites',
        note: 'Starlink alone has thousands of satellites reshaping global internet access.',
        abstract:
          'Satellite constellations used to mean a handful of large, expensive satellites. Starlink flipped that model — thousands of smaller, cheaper satellites in low Earth orbit, reshaping global internet access in places fiber will probably never reach.',
        diagram: { type: 'stack', layers: ['Ground user terminal', 'Low Earth orbit satellite mesh', 'Ground station network', 'Internet backbone'] },
      },
      {
        label: 'Commercial spaceflight',
        note: 'SpaceX, Blue Origin, and a growing list of private players.',
        abstract:
          "Launch used to be the exclusive domain of national space agencies. SpaceX's reusable rockets broke that — private companies now compete on cost per launch, and Blue Origin and a growing list of players are racing to make orbital and even lunar missions routine business, not a national milestone.",
        diagram: { type: 'flow', steps: ['Rocket build & test', 'Launch', 'Payload deployment', 'Booster recovery', 'Reuse next mission'] },
      },
      {
        label: 'Asteroid mining concepts',
        note: 'Still theoretical, but the economics are being modeled seriously.',
        abstract:
          "The economics are still mostly theoretical, but the pitch is real: some near-Earth asteroids are estimated to contain more platinum-group metal than has ever been mined on Earth. The blocker isn't the resource, it's the cost of getting there and back cheaply enough to matter.",
        diagram: { type: 'flow', steps: ['Identify target asteroid', 'Robotic prospecting', 'Extraction', 'Return / in-space processing'] },
      },
      {
        label: 'Deep-space communications',
        note: "NASA's Deep Space Network keeps us in touch with things billions of miles away.",
        abstract:
          "Signals from a Mars rover take minutes to reach Earth, and probes headed further out take hours — there's no fixing a live connection at that distance. NASA's Deep Space Network, a set of giant dish antennas spread around the globe, is the only reason we stay in contact with anything past the Moon.",
        diagram: { type: 'stack', layers: ['Spacecraft transmitter', 'Deep Space Network dish (Earth)', 'Signal processing', 'Mission control'] },
      },
    ],
  },
]
