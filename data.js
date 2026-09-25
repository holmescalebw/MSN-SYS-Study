
const MODULES = [
  {
    id:1,
    title:"Foundational Principles",
    summary:"EM spectrum, wavelength/frequency, photon energy, and dB fundamentals.",
    concepts:[
      "c = fλ: frequency and wavelength are inversely related in free space.",
      "Long wavelength ↔ low frequency; short wavelength ↔ high frequency.",
      "Spectrum order: Radio → Microwave → IR → Visible → UV → X-ray → Gamma.",
      "dB is logarithmic: +3 dB ≈ 2× power, +10 dB = 10× power."
    ],
    equations:[
      {name:"Frequency–wavelength", eq:"f = c / λ", when:"Use when converting between frequency and wavelength."},
      {name:"Photon energy", eq:"E = hf", when:"Use when connecting EM frequency to photon energy."},
      {name:"Power ratio in dB", eq:"dB = 10 log10(P2/P1)", when:"Use for power ratios."}
    ]
  },
  {
    id:2,
    title:"Radar Systems",
    summary:"Radar range equation, RCS, Doppler, SAR, beamwidth, SNR, and integration.",
    concepts:[
      "Monostatic radar received power falls approximately as 1/R⁴.",
      "Detection range scales as the fourth root of RCS.",
      "Negative Doppler shift means opening/receding for the course sign convention.",
      "Pulse integration can detect signals whose instantaneous SNR is negative.",
      "Larger synthetic aperture → narrower SAR beam → better cross-range resolution."
    ],
    equations:[
      {name:"Radar range equation", eq:"Sr = Pt G² λ² σ / ((4π)³ R⁴ L)", when:"Use for monostatic radar received power."},
      {name:"RCS/range scaling", eq:"R2/R1 = (σ2/σ1)^(1/4)", when:"Use when RCS changes but detection threshold is fixed."},
      {name:"Radar Doppler", eq:"fd = -2 Ṙ / λ", when:"Use for two-way Doppler from range rate."},
      {name:"Beam footprint", eq:"ρA ≈ R Θ3dB", when:"Use to convert angular beamwidth to physical width."},
      {name:"SAR cross-range", eq:"ρCR = 0.44 λ R / Leff", when:"Use for SAR cross-range resolution."}
    ]
  },
  {
    id:3,
    title:"EO / IR Systems",
    summary:"Focal length, IFOV, pixel size, ground footprint, and optical resolution.",
    concepts:[
      "IFOV is the angular extent of one detector pixel.",
      "For fixed pixel size, increasing focal length decreases IFOV.",
      "Smaller IFOV gives a smaller ground footprint at the same altitude.",
      "Depth of field is the region that appears acceptably sharp."
    ],
    equations:[
      {name:"Exact IFOV", eq:"IFOV = 2 tan⁻¹(Xd / 2f)", when:"Use detector pixel size and focal length."},
      {name:"Small-angle IFOV", eq:"IFOV ≈ Xd / f", when:"Use when IFOV is small and expressed in radians."},
      {name:"Ground footprint", eq:"x ≈ H · IFOV", when:"Use altitude/range and IFOV to estimate one-pixel ground size."}
    ]
  },
  {
    id:4,
    title:"Navigation & Guidance",
    summary:"GPS/INS integration, Kalman filtering, GPS-denied and spoofed environments.",
    concepts:[
      "INS is continuous but drifts; GPS periodically corrects the drift.",
      "GPS jamming removes/denies information; spoofing provides plausible but wrong information.",
      "A Kalman filter blends prediction and measurement based on uncertainty.",
      "After GPS loss, INS continues but uncertainty grows."
    ],
    equations:[
      {name:"Residual", eq:"r = z - H x̂⁻", when:"Use to quantify measurement–prediction disagreement."},
      {name:"Kalman update", eq:"x̂⁺ = x̂⁻ + K r", when:"Use to correct a predicted state with a measurement."},
      {name:"State propagation", eq:"x̂(k+1)⁻ = Φ x̂(k)⁺", when:"Use to propagate an estimate forward one time step."}
    ]
  },
  {
    id:5,
    title:"Electronic Warfare",
    summary:"EA, EP, ES, jamming, J/S, and burn-through.",
    concepts:[
      "EA attacks adversary use of the electromagnetic spectrum.",
      "EP protects friendly use of the spectrum.",
      "ES senses/exploits the spectrum for awareness, targeting, or intelligence.",
      "Jammer power is a one-way 1/R² link while radar skin return is a two-way 1/R⁴ link.",
      "As range closes, radar signal rises faster than jammer power, so J/S decreases and burn-through can occur."
    ],
    equations:[
      {name:"J/S", eq:"J/S = jammer power at receiver / desired signal power", when:"Use to compare jammer strength to radar signal strength."},
      {name:"Range scaling", eq:"J ∝ 1/R², S ∝ 1/R⁴", when:"Use to reason about jammer advantage and burn-through."}
    ]
  },
  {
    id:6,
    title:"Communications & Datalinks",
    summary:"One-way Friis links, polarization, latency, and comparison with radar links.",
    concepts:[
      "Direct transmitter-to-receiver links fall as 1/R².",
      "Polarization mismatch can create severe link loss.",
      "High data rate and high latency can coexist.",
      "BLOS satellite links can have significant propagation delay."
    ],
    equations:[
      {name:"One-way Friis", eq:"Sr = Pt Gt Gr λ² / ((4π)² R² L)", when:"Use for direct Tx→Rx links such as telemetry, GPS, datalink, or jamming."},
      {name:"Free-space path loss", eq:"Ls(dB) = 32.4 + 20 log10(Rkm) + 20 log10(fMHz)", when:"Use for one-way spreading loss with range in km and frequency in MHz."}
    ]
  },
  {
    id:7,
    title:"Munitions",
    summary:"Weapon-platform messaging, BIT, alignment, pre-launch handshake, and markings.",
    concepts:[
      "BIT PASS means subsystem health is acceptable; it does not by itself mean launch-ready.",
      "GPS/INS weapons must reach ALIGNED status before successful launch.",
      "Pre-launch handshake includes Master Arm and final target-data transfer.",
      "Yellow = live high explosive; Brown = live propulsion; Blue = inert/training."
    ],
    equations:[]
  },
  {
    id:8,
    title:"Supporting Concepts",
    summary:"SWaP-C, tracking vs fusion, deep learning, DT buildup, and development models.",
    concepts:[
      "SWaP-C = Size, Weight, Power, Cost.",
      "Tracking = one sensor over time; Fusion = multiple sensors combined.",
      "Deep learning uses neural networks with multiple hidden layers.",
      "DT buildup: Subsystem Lab → SIL → HITL → Ground → Flight.",
      "Waterfall favors predictability; Agile favors iterative responsiveness."
    ],
    equations:[]
  }
];

const EQUATION_CARDS = [
  {page:1,title:"EM Spectrum",items:["f = c/λ","T = 1/f","E = hf","Refraction / wave speed relationships"]},
  {page:2,title:"One-Way Link",items:["Sr = Pt Gt Gr λ² / ((4π)²R²L)","Ls(dB) = 32.4 + 20log(Rkm) + 20log(fMHz)","Polarization-loss diagram"]},
  {page:3,title:"Two-Way Link",items:["Sr = Pt G² λ² σ / ((4π)³R⁴L)","Bistatic form with R1²R2²","ERP / deconstructed link budget"]},
  {page:4,title:"Radar Performance",items:["fd = -2Ṙ/λ","ρA = RΘ","ρR = cτ/2","Ru = c/(2fr)","SNR / integration equations","SAR equations"]},
  {page:5,title:"EO / Data Analysis",items:["IFOV = 2tan⁻¹(Xd/2f)","FOV relation","Planck / Wien / Stefan-Boltzmann","Spatial frequency"]},
  {page:6,title:"Navigation / State Estimation",items:["r = z - Hx̂⁻","K equation","x̂⁺ = x̂⁻ + Kr","P and state propagation","Frame rotations","Weighted least squares"]}
];

const QUIZ = [
  {module:1,q:"Frequency increases in free space. What happens to wavelength?",a:["It decreases","It increases","It stays constant","It becomes zero"],correct:0,explain:"Because c=fλ and c is constant, frequency and wavelength are inversely proportional."},
  {module:1,q:"Which relationship converts frequency to wavelength?",a:["λ=c/f","λ=cf","λ=f/c","λ=1/f"],correct:0,explain:"Rearrange c=fλ to λ=c/f."},
  {module:2,q:"A target RCS drops by a factor of 16. Detection range changes by what factor?",a:["1/2","1/4","1/16","No change"],correct:0,explain:"Range scales as σ^(1/4); the fourth root of 1/16 is 1/2."},
  {module:2,q:"A negative radar Doppler shift means:",a:["Opening / Ṙ>0","Closing / Ṙ>0","Opening / Ṙ<0","Closing / Ṙ<0"],correct:0,explain:"Opening means range increases, so Ṙ>0; fd=-2Ṙ/λ is then negative."},
  {module:3,q:"For fixed pixel size, increasing focal length does what to IFOV?",a:["Decreases it","Increases it","No change","Makes it equal to FOV"],correct:0,explain:"For small angles IFOV≈Xd/f."},
  {module:3,q:"At 10 km altitude, IFOV=100 µrad. Approximate one-pixel ground footprint:",a:["1 m","0.1 m","10 m","100 m"],correct:0,explain:"x≈H·IFOV = 10,000×100×10⁻⁶ = 1 m."},
  {module:4,q:"What is the complementary GPS/INS relationship?",a:["INS is continuous; GPS bounds INS drift","GPS is continuous; INS corrects GPS drift","They have identical error behavior","INS works only when GPS is available"],correct:0,explain:"INS is continuous but drifts; GPS periodically provides an absolute correction."},
  {module:4,q:"If x̂⁻=100, z=120, H=1, K=0.25, what is x̂⁺?",a:["105","110","115","120"],correct:0,explain:"Residual=20; correction=0.25×20=5; posterior=105."},
  {module:5,q:"Frequency agility used to defeat a jammer is primarily:",a:["EP","EA","ES","RCS reduction"],correct:0,explain:"The purpose is to protect friendly use of the electromagnetic spectrum."},
  {module:5,q:"As a self-protection jammer closes on a radar, what happens to J/S?",a:["It decreases","It increases","It stays constant","It becomes zero immediately"],correct:0,explain:"Radar skin return grows as R⁻⁴ while jammer power grows as R⁻², so S grows faster."},
  {module:6,q:"Satellite telemetry directly to a ground station uses:",a:["One-way Friis","Monostatic radar equation","EO IFOV equation","Two-way radar only"],correct:0,explain:"It is a direct Tx→Rx link with no reflection."},
  {module:6,q:"A -30 dB power loss leaves approximately:",a:["1/1000","1/100","1/30","1/10"],correct:0,explain:"10^(-30/10)=10^-3=1/1000."},
  {module:7,q:"BIT PASS + ALIGNING means:",a:["Healthy but not fully aligned","Fully ready","BIT failed","Target data is necessarily wrong"],correct:0,explain:"Health and alignment are separate launch-readiness conditions."},
  {module:7,q:"Yellow + brown bands indicate:",a:["Live warhead + live propulsion","Inert warhead + inert propulsion","Live warhead + inert propulsion","Inert warhead + live propulsion"],correct:0,explain:"Yellow marks high explosive/live warhead; brown marks live propulsion."},
  {module:8,q:"One radar over time, then radar+IRST+offboard combined. This is:",a:["Tracking, then fusion","Fusion, then tracking","Fusion in both cases","Tracking in both cases"],correct:0,explain:"Tracking uses one sensor over time; fusion combines multiple sensors."},
  {module:8,q:"Correct DT buildup sequence:",a:["Subsystem Lab → SIL → HITL → Ground → Flight","SIL → Lab → Ground → HITL → Flight","Lab → Ground → SIL → Flight → HITL","HITL → SIL → Lab → Flight → Ground"],correct:0,explain:"The review uses this crawl-walk-run progression."}
];
