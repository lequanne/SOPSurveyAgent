import { useState, useRef, useEffect } from "react";

const KB = [
  {
    id:"fd1", category:"Survey Design Fundamentals", title:"Conceptual Framework Before Instrumentation",
    tags:["design","construct","theory","measurement"],
    content:`Before writing a single survey item, researchers must establish a clear conceptual framework that defines what constructs are being measured and why. Constructs are latent, unobservable variables (e.g., self-efficacy, burnout, trust) that must be operationalised through observable indicators. The American Psychological Association (APA) and the Standards for Educational and Psychological Testing (AERA/APA/NCME, 2014) require that construct definitions precede item generation. Best practice: (1) Conduct a systematic literature review to identify validated definitions and existing scales. (2) Draft a conceptual model mapping constructs to theoretical antecedents and outcomes. (3) Write an item generation rationale that ties each item to a specific facet of the construct. (4) Distinguish between formative constructs (indicators cause the latent variable, e.g., SES) and reflective constructs (latent variable causes indicators, e.g., depression). This distinction fundamentally changes how reliability and validity are assessed. Failure to establish the framework first leads to construct underrepresentation, construct-irrelevant variance, and uninterpretable factor structures.`
  },
  {
    id:"fd2", category:"Survey Design Fundamentals", title:"Survey Objectives and Research Questions Alignment",
    tags:["objectives","alignment","scope","design"],
    content:`Every survey item must trace back to a specific research question or objective. The SOP for academic survey design requires a traceability matrix — a document that maps each item to: (1) the research question it addresses, (2) the construct it operationalises, (3) the analysis that will use it, and (4) the decision it will inform. Items without a clear purpose inflate respondent burden and introduce noise. The common pitfall of "kitchen-sink" surveys — including items because they seem interesting — must be avoided. Per Dillman, Smyth & Christian (2014), every additional minute of survey length reduces completion probability by approximately 3–5%. The traceability matrix also supports IRB review by demonstrating that data collection is proportionate to scientific objectives. Surveys should be designed answer-backwards: start with how each variable will be analysed, then determine what must be measured, then write items. This prevents collecting data that cannot be analysed or that were never needed.`
  },
  {
    id:"qc1", category:"Question Construction", title:"Question Wording Principles: Clarity and Precision",
    tags:["wording","clarity","bias","double-barrelled","leading"],
    content:`Question wording is among the most consequential decisions in survey design. Core principles from Fowler (2014) and Sudman & Bradburn (1982): (1) Use simple, unambiguous vocabulary at or below an 8th-grade reading level unless the population warrants otherwise. (2) Avoid double-barrelled questions that ask about two things simultaneously ("How satisfied are you with the pay and working conditions?"). (3) Avoid leading questions that suggest a socially correct answer ("Don't you agree that...?"). (4) Avoid loaded terms with strong positive or negative connotations. (5) Ensure every respondent interprets the question identically — this is the principle of univocal interpretation. (6) Include only one idea per item. (7) Use specific timeframes ("In the past 30 days...") rather than vague references ("recently"). (8) Avoid negations and double negations ("I do not disagree that...") which increase cognitive load and error rates. (9) Match question vocabulary to the construct's theoretical language. Pre-test each item with cognitive interviews to identify interpretation heterogeneity before fielding.`
  },
  {
    id:"qc2", category:"Question Construction", title:"Open-Ended vs. Closed-Ended Questions",
    tags:["open-ended","closed","qualitative","quantitative","hybrid"],
    content:`The choice between open-ended and closed-ended questions has profound implications for data type, analysis, and respondent experience. Closed-ended questions offer: standardised responses enabling quantitative analysis, lower cognitive burden, and higher completion rates. Open-ended questions offer: unanticipated response content, richness of detail, and avoidance of response-option anchoring bias. Best practices: (1) Use closed-ended items when the construct's response domain is well-understood and exhaustive options can be provided. Always include "Other (please specify)" when the option list may be incomplete. (2) Reserve open-ended items for exploratory objectives, for capturing nuance, or for follow-up on closed items. (3) Funnel structure: place closed items first to orient respondents to the domain, then open-ended items to allow elaboration. (4) In mixed-methods designs, open-ended items should have a dedicated qualitative analysis plan (e.g., thematic analysis, grounded theory coding). (5) Avoid placing open-ended items early in long surveys — respondents who engage deeply early may fatigue and satisfice later. (6) Include character limits in digital surveys to prevent uninformative one-word responses or essay-length outliers.`
  },
  {
    id:"sd1", category:"Scale Design", title:"Likert Scales: Construction and Common Errors",
    tags:["likert","scale","response options","anchors","ordinal"],
    content:`Likert scales remain the dominant response format in social and behavioural science surveys. Critical SOP requirements: (1) True Likert scales use a unidimensional agree–disagree continuum and are summed across items into a composite score. Individual items are Likert-type; only the full battery is a Likert scale. (2) Response options should be fully labelled (not just endpoints) to reduce inter-respondent variability in interpreting unlabelled midpoints. (3) The number of points (5, 6, 7, 10) affects variance and normality. Five- to seven-point scales are standard; beyond 7 points, additional granularity typically does not add information. (4) Middle/neutral options: Omitting the midpoint forces a directional response (useful for attitude surveys); including it permits genuine neutrality and reduces acquiescence. (5) Balance: scales should have equal numbers of positive and negative poles. (6) Avoid mixing scale formats across items in the same battery — anchor label changes reset respondents' mental frame. (7) Direction balance: approximately half of items in a multi-item scale should be reverse-keyed to detect acquiescence bias and satisficing. (8) Per Revelle & Zinbarg (2009), minimum 4–5 items per construct are needed for reliable composite scores (α ≥ 0.70).`
  },
  {
    id:"sd2", category:"Scale Design", title:"Semantic Differential, VAS, and Ranking Formats",
    tags:["semantic differential","VAS","ranking","visual analogue","format"],
    content:`Beyond Likert scales, behavioural science surveys employ several specialised formats. Semantic Differential scales (Osgood, Suci & Tannenbaum, 1957) present bipolar adjective pairs (e.g., Good–Bad, Strong–Weak, Active–Passive) and are especially suited for attitude and perception measurement. SOP: use 7-point bipolar anchors; randomise pole placement; keep adjective pairs conceptually distinct. Visual Analogue Scales (VAS) present a continuous line (typically 100mm or 100 pixels) with anchors at each end. VAS yields quasi-continuous data and higher sensitivity but requires careful standardisation in digital environments (screen size, input device). Ranking tasks ask respondents to order items by preference or importance. Rankings force discrimination but are cognitively demanding above 7 items and produce ipsative (interdependent) data that violates assumptions of standard multivariate analyses. Best practice: limit ranking to 5–7 items maximum; use card-sort interfaces in digital surveys. Forced-choice formats (selecting between pairs or profiles) are used in conjoint analysis and Best-Worst Scaling to reduce acquiescence and social desirability by removing neutral options. Each format should match the construct's theoretical measurement model and the respondent's cognitive capacity.`
  },
  {
    id:"cb1", category:"Cognitive Bias & Response Effects", title:"The Cognitive Response Process Model (CARP)",
    tags:["cognition","CARP","Tourangeau","comprehension","retrieval","judgement","response"],
    content:`Tourangeau, Rips & Rasinski (2000) identified four cognitive stages respondents traverse when answering survey questions — the CARP model: (1) Comprehension: respondents parse the question and infer its intent. Poorly worded questions generate heterogeneous interpretations, inflating measurement error. (2) Retrieval: respondents search autobiographical memory for relevant information. Retrieval is reconstructive, not archival — responses are influenced by what is salient, recent, or emotionally significant. (3) Judgement: respondents integrate retrieved information into an overall assessment. Anchoring, context effects, and prior questions influence this stage. (4) Response: respondents map their internal judgement onto the response scale. Scale format, labelling, and social desirability all operate here. Survey designers must consider where in the CARP process a particular source of error enters. For example: vague timeframes impair retrieval accuracy; unlabelled scale midpoints impair response mapping; leading questions contaminate comprehension. Cognitive interviewing — structured think-aloud protocols — is the gold-standard method for diagnosing CARP failures before fielding. Each cognitive interview should be conducted with 5–10 respondents drawn from the target population.`
  },
  {
    id:"cb2", category:"Cognitive Bias & Response Effects", title:"Acquiescence, Social Desirability, and Extreme Response Bias",
    tags:["acquiescence","social desirability","extreme response","yea-saying","bias"],
    content:`Three systematic response biases are particularly prevalent in Likert-format surveys: (1) Acquiescence bias (yea-saying): the tendency to agree with items regardless of content, driven by deference norms and cognitive ease. Mitigation: include reverse-keyed items; use forced-choice or ranking formats; statistically control using balanced scale scores. (2) Social desirability bias: responding in ways perceived as socially acceptable rather than truthfully. Especially prevalent for sensitive topics (substance use, income, prejudice, health behaviours). Mitigation strategies include: indirect questioning ("What do most people in your community think about...?"), Randomised Response Technique (RRT), bogus pipeline manipulation, and anonymous/confidential administration. The Marlowe-Crowne Social Desirability Scale or the Balanced Inventory of Desirable Responding (BIDR) can be included as a covariate. (3) Extreme response style: systematic preference for scale endpoints, found more commonly in certain cultural contexts (Hui & Triandis, 1989). Mitigation: use longer scales (7+ points); statistically model latent response styles using Item Response Theory (IRT) or multilevel modelling. Report checks for all three biases in the methods section of any published survey study.`
  },
  {
    id:"cb3", category:"Cognitive Bias & Response Effects", title:"Satisficing and Survey Speeding",
    tags:["satisficing","speeding","engagement","data quality","attention"],
    content:`Satisficing (Krosnick, 1991) occurs when respondents provide "good enough" answers rather than optimal ones, reducing effort to complete the survey. Satisficing manifests as: straight-lining (selecting the same response for all items in a matrix), non-differentiation, random responding, primacy and recency effects (selecting first or last options), and high rates of "Don't know" and midpoint responses. Survey speeding is a related phenomenon detectable via response time data — respondents completing items faster than a human can cognitively process them. SOP for detecting and managing satisficing: (1) Embed attention check items ("Please select 'Strongly Agree' for this item to confirm you are reading carefully"). Include 2–3 per survey; flag respondents who fail ≥1. (2) Monitor response time distributions; flag respondents completing the survey in <40% of median completion time. (3) Use instructional manipulation checks (IMC; Oppenheimer et al., 2009). (4) Analyse inter-item standard deviation — respondents with near-zero SD across Likert batteries are likely straight-liners. (5) Reduce satisficing probability by: shortening surveys, increasing intrinsic motivation, randomising item and option order, and using varied response formats. Report exclusion criteria and n excluded in methods.`
  },
  {
    id:"cb4", category:"Cognitive Bias & Response Effects", title:"Question Order and Context Effects",
    tags:["order effects","context","priming","framing","sequencing"],
    content:`The sequence of survey questions is not neutral — each question creates a cognitive frame that influences responses to subsequent items. Key order effects: (1) Assimilation effect: responses on a general item shift toward a specific item asked previously (e.g., asking about relationship satisfaction before life satisfaction inflates life satisfaction ratings). (2) Contrast effect: responses shift away from a previously activated concept. (3) Priming: earlier questions activate schemas that bias retrieval and judgement for later questions. (4) Fatigue effects: question quality deteriorates later in long surveys as cognitive resources deplete. Mitigation strategies: (1) Place broad, general items before specific ones (funnel approach). (2) Randomise item order within blocks to counterbalance order effects across respondents — report whether randomisation was used. (3) Separate related constructs with unrelated "buffer" items. (4) Place sensitive or burdensome items after rapport is established (typically mid-survey). (5) Demographic items should generally appear at the end (Dillman et al., 2014) to avoid triggering stereotype threat. (6) In experimental survey designs, randomise condition order and test for order × condition interactions. Document the item sequence rationale in the SOP.`
  },
  {
    id:"pt1", category:"Pilot Testing & Validation", title:"Cognitive Interviewing Protocol",
    tags:["cognitive interview","think-aloud","pilot","pretesting","qualitative"],
    content:`Cognitive interviewing is the systematic use of structured verbal protocols to identify comprehension, retrieval, judgement, and response difficulties with draft survey items (Willis, 2005). The gold-standard approach involves: (1) Think-aloud technique: respondents verbalise their thought process while answering each item. Interviewers probe with neutral follow-ups: "What did that question mean to you?", "How did you decide on that answer?", "How easy or difficult was it to think of an example?". (2) Verbal probing technique: targeted questions posed after each item to assess specific CARP stages. (3) Sample size: 5–10 interviews per round are generally sufficient to identify major problems (Blair & Presser, 1993). Conduct multiple rounds until no new problems emerge. (4) Documentation: record all sessions (with consent), transcribe, code difficulties by item and CARP stage, and revise items accordingly. Maintain a revision log linking each change to a specific cognitive interview finding. (5) Participant selection: cognitive interview participants should be drawn from the target population, not convenience samples of colleagues. (6) Cognitive interviewing should precede any quantitative pilot. The SOP should specify the cognitive interview protocol, number of rounds, and participant criteria as a mandatory pre-registration component.`
  },
  {
    id:"pt2", category:"Pilot Testing & Validation", title:"Quantitative Pilot Study and Item Analysis",
    tags:["pilot","item analysis","reliability","factor analysis","EFA"],
    content:`Following cognitive interviewing and item revision, a quantitative pilot study is conducted before full fielding. SOP requirements: (1) Sample size: minimum 5–10 respondents per item for Exploratory Factor Analysis (EFA); 200–300 respondents are recommended for stable factor solutions. (2) Item-total correlations: each item should correlate ≥0.30 with its scale total (corrected for item overlap). Items with r < 0.20 are candidates for revision or removal. (3) Internal consistency: Cronbach's alpha ≥ 0.70 for research instruments; ≥ 0.80 for high-stakes individual assessment. Report alpha with 95% CI. Also compute McDonald's omega (ω) as a more robust reliability coefficient for non-tau-equivalent scales. (4) Exploratory Factor Analysis: use parallel analysis (not Kaiser criterion eigenvalue > 1) to determine number of factors. Report factor loadings, communalities, and factor intercorrelations. Target loading ≥ 0.40 on primary factor; cross-loadings < 0.30. (5) Item difficulty and discrimination: for ability-type items, compute p-values and biserial correlations. (6) Missing data patterns: examine if items have systematically elevated missing rates (>5%) — a signal of comprehension difficulty or sensitivity. Document all pilot decisions in the SOP revision log.`
  },
  {
    id:"pt3", category:"Pilot Testing & Validation", title:"Confirmatory Factor Analysis and Construct Validity",
    tags:["CFA","construct validity","convergent","discriminant","SEM","fit indices"],
    content:`After EFA in a pilot sample, Confirmatory Factor Analysis (CFA) in a new, independent sample tests whether the hypothesised measurement model fits the data. SOP for CFA reporting (per Jackson, Gillaspy & Purc-Stephenson, 2009): (1) Report multiple fit indices: CFI ≥ 0.95 (good), ≥ 0.90 (acceptable); RMSEA ≤ 0.06 (good), ≤ 0.08 (acceptable); SRMR ≤ 0.08; TLI ≥ 0.95. Do not rely on χ² alone — it is sensitive to sample size. (2) Convergent validity: Average Variance Extracted (AVE) should be ≥ 0.50 per factor; standardised factor loadings ≥ 0.70. (3) Discriminant validity: AVE for each factor should exceed the squared inter-factor correlation (Fornell-Larcker criterion). Also compute the Heterotrait-Monotrait (HTMT) ratio — values < 0.85 indicate adequate discriminant validity. (4) Test for measurement invariance across subgroups (gender, age cohort, language version) before comparing latent means: configural, metric, and scalar invariance using χ² difference tests and ΔCFI ≤ 0.01. (5) If CFA model fits poorly, examine modification indices cautiously — modifications should be theoretically justified, not merely data-driven. Report all tested models, not just the best-fitting one.`
  },
  {
    id:"sm1", category:"Sampling & Methodology", title:"Sampling Strategy and Representativeness",
    tags:["sampling","probability","non-probability","representativeness","coverage"],
    content:`The sampling strategy determines to whom results can be generalised. Probability sampling (where each population member has a known, non-zero probability of selection) is the gold standard for population inference. Types: (1) Simple random sampling (SRS): equal probability for all units. (2) Stratified sampling: divides population into strata (e.g., age groups, regions) and samples within each — improves precision for subgroup analyses. (3) Cluster sampling: samples groups (e.g., schools, firms) then surveys all or some members — economical but reduces effective sample size (design effect). Non-probability sampling (convenience, snowball, purposive) is acceptable for theoretical sampling in qualitative work and for pilot studies, but inferential statistics should not be used to generalise to a defined population without acknowledging this limitation. Online panels (Mechanical Turk, Prolific, Qualtrics Panels) are non-probability samples — report platform, recruitment criteria, and known demographic characteristics. Quota sampling with post-stratification weighting can partially address representativeness in non-probability online samples. Always report: target population definition, sampling frame, sampling method, response rate (AAPOR formula), and cooperation rate. Design effect (DEFF) must be reported for cluster samples.`
  },
  {
    id:"sm2", category:"Sampling & Methodology", title:"Sample Size Determination and Power Analysis",
    tags:["sample size","power","effect size","G*Power","SEM","reliability"],
    content:`Adequate sample size is a methodological and ethical requirement — underpowered studies waste resources and produce unreliable estimates; overpowered studies may detect trivially small effects. SOP for sample size determination: (1) For inferential statistics: conduct an a priori power analysis using G*Power or pwr (R). Specify: effect size (based on prior literature or smallest effect of interest), α (typically 0.05), desired power (1-β ≥ 0.80, ideally 0.90), and test type. Report all power analysis inputs and outputs in the methods section. (2) For SEM/CFA: minimum 200 respondents for simple models; complex models (>5 factors, cross-loadings) require 300–500+. The 10:1 respondent-to-parameter ratio is a rough heuristic; Monte Carlo simulation is more accurate. (3) For scale development: pilot EFA requires 5–10 per item; validation CFA requires an independent sample of similar size. (4) For subgroup analyses: power must be calculated for the smallest subgroup, not the full sample. (5) Anticipated attrition: inflate required sample by expected dropout rate (typically 10–30% for online surveys). Pre-register sample size and stopping rule before data collection begins.`
  },
  {
    id:"eth1", category:"Ethics & IRB", title:"Institutional Review Board Requirements for Survey Research",
    tags:["IRB","ethics","review","exempt","expedited","full board"],
    content:`Survey research involving human subjects requires IRB (Institutional Review Board) or equivalent ethics committee review in accordance with national regulations (Belmont Report principles; EU GDPR; Declaration of Helsinki). Review categories: (1) Exempt review: minimal-risk surveys of adults on non-sensitive topics where responses cannot be linked to individuals. Researchers may not self-declare exemption — exemption must be granted by the IRB. (2) Expedited review: surveys involving sensitive topics (health, finances, criminal behaviour, sexual behaviour, political views) or identifiable data, but no more than minimal risk. (3) Full board review: surveys that may cause psychological distress, involve vulnerable populations (minors, prisoners, pregnant women, cognitively impaired individuals), or include deception. SOP requirements: (1) Submit IRB protocol before any data collection. (2) Protocol must include: research objectives, survey instrument, recruitment scripts, consent materials, data security plan, and risk/benefit analysis. (3) Any modification to the approved protocol requires amendment submission. (4) Data should be stored in IRB-compliant systems (encrypted, access-controlled). (5) IRB approval number must be reported in all publications and presentations. Record IRB correspondence in the study SOP file.`
  },
  {
    id:"eth2", category:"Ethics & IRB", title:"Informed Consent and Confidentiality Standards",
    tags:["informed consent","confidentiality","anonymity","GDPR","data protection"],
    content:`Informed consent is a cornerstone of ethical survey research. For surveys, consent is typically obtained via a consent form or information statement presented before the survey begins. Required elements per APA ethical standards: (1) Study purpose (at appropriate level of detail — full disclosure unless deception is IRB-approved). (2) What participation involves (time, tasks, any recording). (3) Risks and benefits. (4) Voluntary participation and right to withdraw without penalty. (5) Confidentiality protections: specify whether responses are anonymous (cannot be linked to individual), confidential (linked but protected), or identified. Never claim anonymity if IP addresses or timestamps are logged. (6) Data storage duration and destruction plan. (7) Contact information for researcher and IRB. Distinguish confidentiality from anonymity: online surveys that log IP addresses are not anonymous. Under GDPR (EU), consent must be freely given, specific, informed, and unambiguous; data minimisation and purpose limitation principles apply; participants have the right to access, correct, and erase their data. Include a plain-language data protection statement in the consent form. Obtain explicit consent for any secondary use of data. Store signed consent forms separately from survey data to preserve de-identification.`
  },
  {
    id:"dq1", category:"Data Quality & Analysis", title:"Data Cleaning and Quality Exclusion Criteria",
    tags:["data cleaning","exclusion","quality","outliers","flagging"],
    content:`Data quality assessment is a mandatory step before analysis in academic survey SOP. Pre-specified exclusion criteria (defined before data collection) should address: (1) Duplicate responses: check IP addresses, response timestamps, and open-text similarity. Flag and adjudicate duplicates rather than silently deleting. (2) Attention check failures: respondents failing ≥1 instructed-response item (e.g., "Select 5") should be flagged; researchers must decide whether to exclude or retain with sensitivity analyses. (3) Speeders: exclude respondents completing the survey in < X seconds (X = minimum plausible reading time, typically 30–40% of median). (4) Straight-liners: compute within-person standard deviation across Likert battery items; flag if SD < 0.5 across ≥10 consecutive items. (5) Patterned responding: visual inspection of response heatmaps. (6) Implausible open-text responses: gibberish, keyboard mashing, copied text. (7) Incomplete responses: pre-specify minimum completion threshold (e.g., ≥80% of items). Document all exclusion criteria in the pre-registration. Report exclusions in a CONSORT-style participant flow diagram: invited → started → completed → included in analysis. Conduct sensitivity analyses comparing results with and without excluded respondents.`
  },
  {
    id:"dq2", category:"Data Quality & Analysis", title:"Missing Data Theory and Imputation Methods",
    tags:["missing data","MCAR","MAR","MNAR","imputation","multiple imputation"],
    content:`Missing data is nearly universal in survey research. The mechanism of missingness determines the appropriate analytical response (Rubin, 1976; Little & Rubin, 2002): (1) Missing Completely At Random (MCAR): missingness is unrelated to any variable. Little's MCAR test can be used. Listwise deletion is unbiased but wasteful. (2) Missing At Random (MAR): missingness is related to observed variables but not to the missing values themselves, conditional on observed data. Multiple Imputation (MI) or Full Information Maximum Likelihood (FIML) are appropriate. (3) Missing Not At Random (MNAR): missingness depends on the unobserved values themselves (e.g., high-earners refusing to report income). This is the most problematic case; sensitivity analyses with pattern-mixture models or selection models are required. SOP requirements: (1) Report missing data rates by item and by respondent. (2) Test for MCAR. (3) Use Multiple Imputation by Chained Equations (MICE) for MAR data — impute ≥20 datasets, pool results using Rubin's rules. (4) Never use mean substitution — it attenuates variance and correlations. (5) FIML is preferred over MI for SEM. (6) Pre-specify missing data handling in the pre-registration. Document imputation model variables (include auxiliary variables correlated with missingness).`
  },
  {
    id:"rep1", category:"Reporting Standards", title:"AAPOR Reporting Standards and Transparency",
    tags:["AAPOR","reporting","transparency","response rate","methods"],
    content:`The American Association for Public Opinion Research (AAPOR) has established the field-standard reporting guidelines for survey studies. Core requirements: (1) Response rate: report using AAPOR Response Rate formulas (RR1–RR6). RR1 = complete interviews / (complete + partial + refusals + non-contacts + other). Distinguish response rate, cooperation rate, refusal rate, and contact rate. (2) Questionnaire: make the full instrument available (as appendix or supplementary materials). (3) Field period: exact dates of data collection. (4) Sampling frame and method: describe the sampling frame in detail, including known coverage gaps. (5) Weighting: describe any post-stratification weighting scheme and report weighted and unweighted n. (6) Mode: telephone, online, paper, face-to-face — each mode has known coverage and measurement biases that must be acknowledged. (7) Funding source: disclose. (8) For registered reports: pre-registration DOI. The APA Publication Manual (7th ed.) additionally requires: reporting of survey length, platform (for online surveys), incentive structure, and evidence of validity for any scale used. Supplementary materials should include the full codebook, scoring algorithms, and syntax files for all analyses.`
  },
  {
    id:"rep2", category:"Reporting Standards", title:"Pre-Registration of Survey Studies",
    tags:["pre-registration","open science","OSF","hypotheses","confirmatory"],
    content:`Pre-registration is the practice of specifying study hypotheses, design, measures, and analysis plan in a time-stamped public repository before data collection, preventing post-hoc hypothesising (HARKing) and selective reporting. Platforms: OSF (osf.io), AsPredicted (aspredicted.org), ClinicalTrials.gov (for health surveys). A complete survey pre-registration includes: (1) Research questions and directional hypotheses (clearly distinguished from exploratory questions). (2) Study design: cross-sectional, longitudinal, experimental. (3) Target population and sampling strategy. (4) Exact sample size with power analysis. (5) Survey instrument: attach the finalised instrument or describe any items that cannot be disclosed for validity reasons. (6) Primary and secondary outcome variables and their operationalisation. (7) Analysis plan: statistical tests, model specifications, covariates. (8) Exclusion criteria for data quality. (9) Missing data handling. (10) Multiple comparison correction strategy. Any deviation from the pre-registration in the final report must be explicitly disclosed and justified. Distinguish confirmatory (hypothesis-driven, pre-registered) from exploratory analyses in the results section. Pre-registration is now required or strongly encouraged by major journals including JPSP, Psychological Science, and NEJM.`
  },
  {
    id:"onl1", category:"Digital & Online Surveys", title:"Platform Selection and Digital Survey Design",
    tags:["online","Qualtrics","platform","mobile","UX","design"],
    content:`The choice of survey platform and digital design decisions directly affect data quality. Platform considerations: (1) Qualtrics, SurveyMonkey, REDCap, and LimeSurvey offer varying capabilities for randomisation, piped text, embedded data, response validation, and API integration. For academic research, Qualtrics (with institutional licensing) and REDCap (for clinical/health) are standard. (2) Response time recording: essential for detecting speeders; Qualtrics logs this automatically. (3) Mobile optimisation: >50% of online surveys are completed on smartphones. Avoid wide matrix/grid questions on mobile — they produce lower data quality (Tourangeau et al., 2017). Use mobile-responsive question formats. (4) Progress indicators: inclusion increases completion rates by 5–10% but can also create abandonment at anticipated long sections. (5) One-question-per-page vs. scroll design: page-by-page increases completion time but reduces straight-lining and allows skip-logic validation. (6) Forced response vs. soft validation: forcing responses for sensitive items increases item non-response with warning rather than block; use request-not-require for sensitive items. (7) Pilot test on target device types (desktop, iOS, Android) before launch. Document platform, version, and design decisions in the SOP.`
  },
  {
    id:"onl2", category:"Digital & Online Surveys", title:"Incentive Design and Response Rate Optimisation",
    tags:["incentives","response rate","follow-up","non-response","gamification"],
    content:`Response rates for online surveys have declined dramatically — from >70% in the 1990s to 10–30% for cold-contact online surveys. Incentive and design strategies to maximise response: (1) Prepaid vs. promised incentives: prepaid incentives (small gift card delivered with invitation) are more effective than promised post-completion incentives — they activate reciprocity norms (Dillman et al., 2014). (2) Incentive amount: for general population surveys, $5–$10 prepaid is effective; for professional/expert populations, $20–$50 is standard. Incentives must be reported to IRB and disclosed in consent. (3) Contact strategy: initial invitation + reminder at 7 days + final reminder at 14 days is standard. Personalised salutations increase response rate 5–10%. (4) Survey design: shorter surveys with clear purpose statements, visible institutional branding, and assurance of data security increase completion. (5) Tailored Design Method (Dillman, 2000): systematically reduce the social exchange calculus by maximising benefits (interesting topic, valued feedback), reducing costs (effort, time), and establishing trust (institutional affiliation, privacy assurance). (6) Non-response bias check: compare early and late respondents on key variables (wave analysis) as a proxy for non-response bias — if they do not differ significantly, non-response bias is less likely.`
  },
  {
    id:"cul1", category:"Cultural Adaptation", title:"Cross-Cultural Survey Adaptation and Translation",
    tags:["translation","cross-cultural","back-translation","equivalence","TRAPD"],
    content:`When surveys are used across language groups or cultures, translation and cultural adaptation are required to maintain construct equivalence. The gold-standard process is TRAPD (Translation, Review, Adjudication, Pretesting, Documentation; Harkness, 2003): (1) Translation: two independent forward translators produce separate target-language versions. Translators should be native speakers of the target language with domain expertise. (2) Review: a review panel (including at least one subject-matter expert) reconciles the two translations, identifying discrepancies. (3) Adjudication: a senior researcher adjudicates unresolved differences. (4) Pretesting: cognitive interviews conducted with target-language respondents to identify comprehension difficulties. (5) Documentation: full record of changes and rationale. Back-translation alone (source → target → source) is insufficient — it identifies obvious errors but misses nuanced cultural mismatches. Cultural adaptation goes beyond linguistic translation: response scale labels, exemplars, and sensitive topics require cultural review (e.g., family structure questions, income brackets, political categories). After adaptation, test for measurement invariance across language versions using multi-group CFA before comparing scores. Report the adaptation procedure, translators' qualifications, and measurement invariance results in methods.`
  },
  {
    id:"sens1", category:"Sensitive Topics", title:"Surveying Sensitive and Stigmatised Behaviours",
    tags:["sensitive","stigma","indirect","RRT","framing","underreporting"],
    content:`Surveys on sensitive topics — substance use, sexual behaviour, mental health, income, discrimination, political beliefs, criminal behaviour — are subject to systematic underreporting and social desirability bias. Methodological strategies: (1) Randomised Response Technique (RRT; Warner, 1965): respondents use a randomisation device (die, coin flip) to determine whether to answer the sensitive question or a neutral one. Researchers can estimate population prevalence without knowing any individual's true answer. Appropriate for highly stigmatised behaviours. (2) Bogus pipeline: leads respondents to believe their true responses can be verified, reducing socially desirable responding. Rarely used due to ethical concerns about deception. (3) Indirect questioning: "What percentage of people in your position do you think...?" — projects sensitive answers onto others. (4) Item count technique (ICT): respondents report the count of true items from a list, with the sensitive item appearing in the experimental but not control list. Group differences estimate prevalence. (5) Anonymous administration: emphasise in consent and instructions that responses cannot be linked to individuals. (6) Neutral framing: avoid value-laden language; use clinically neutral terms ("having sex with a person of the same gender" vs. "homosexual activity"). (7) Allow "Prefer not to answer" for all sensitive items. Report sensitivity management strategy in methods.`
  },
  {
    id:"lon1", category:"Survey Design Fundamentals", title:"Longitudinal Survey Design and Panel Attrition",
    tags:["longitudinal","panel","attrition","wave","retention"],
    content:`Longitudinal surveys collect data from the same respondents at multiple time points to study change over time. Key methodological considerations: (1) Panel attrition: dropout is non-random — respondents who leave panels often differ systematically from those who remain (younger, lower SES, less engaged). Attrition analysis should compare dropouts vs. retained respondents on baseline characteristics. (2) Retention strategies: financial incentives for each wave, personalised communication, minimal contact burden between waves, regular study updates. Target >80% retention per wave for acceptable panel quality. (3) Conditioning effects: repeated exposure to survey items may sensitise respondents, changing the behaviour being measured (e.g., awareness of health behaviours after baseline health survey). Test for conditioning effects by including a fresh cross-section at follow-up waves. (4) Time interval selection: intervals should be theoretically motivated — sufficient time for the hypothesised change process to operate. (5) Mixed-effects models (multilevel/random effects) are appropriate for longitudinal data to account for within-person correlation. (6) Distinguish state change (genuine change in the construct) from measurement error (random fluctuation). Latent growth curve models separate these. (7) Pre-register each wave's analysis plan before data collection, updating for new hypotheses.`
  }
];

const CATEGORIES = [...new Set(KB.map(c => c.category))];

function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9\s]/g,'').split(/\s+/).filter(w => w.length > 2);
}

function score(query, chunk) {
  const qTokens = new Set(tokenize(query));
  const cTokens = tokenize(chunk.content + ' ' + chunk.title + ' ' + chunk.tags.join(' '));
  const tagTokens = new Set(chunk.tags.flatMap(t => tokenize(t)));
  const titleTokens = new Set(tokenize(chunk.title));
  let s = 0;
  qTokens.forEach(t => {
    if (cTokens.includes(t)) s += 1;
    if (tagTokens.has(t)) s += 2;
    if (titleTokens.has(t)) s += 3;
  });
  return s;
}

function retrieve(query, filter, k=4) {
  let pool = filter ? KB.filter(c => c.category === filter) : KB;
  if (pool.length === 0) pool = KB;
  return pool
    .map(c => ({ ...c, score: score(query, c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .filter(c => c.score > 0 || pool.length <= k);
}

async function callClaude(messages, system) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system,
      messages
    })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "No response received.";
}

const CAT_ICONS = {
  "Survey Design Fundamentals": "ti-clipboard-list",
  "Question Construction": "ti-writing",
  "Scale Design": "ti-ruler-2",
  "Cognitive Bias & Response Effects": "ti-brain",
  "Pilot Testing & Validation": "ti-test-pipe",
  "Sampling & Methodology": "ti-chart-dots",
  "Ethics & IRB": "ti-shield-check",
  "Data Quality & Analysis": "ti-filter",
  "Reporting Standards": "ti-file-certificate",
  "Digital & Online Surveys": "ti-device-laptop",
  "Cultural Adaptation": "ti-world",
  "Sensitive Topics": "ti-lock"
};

const SUGGESTED = [
  "How do I write unbiased survey questions?",
  "What sample size do I need for CFA?",
  "How should I handle missing data in my survey?",
  "What are best practices for Likert scale design?",
  "How do I detect satisficing and poor data quality?",
  "What does IRB require for survey research?",
  "How do I pre-register a survey study?",
  "How do I adapt a survey for cross-cultural use?"
];

export default function SurveyRAGAgent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [expandedSources, setExpandedSources] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text) {
    const q = (text || input).trim();
    if (!q || loading) return;
    setInput("");

    const userMsg = { role: "user", content: q };
    const chunks = retrieve(q, activeCategory, 4);

    const ctx = chunks.map((c, i) =>
      `[SOURCE ${i+1}: ${c.title} — ${c.category}]\n${c.content}`
    ).join("\n\n---\n\n");

    const system = `You are an expert survey methodologist and behavioural scientist with deep knowledge of academic best practices, psychometrics, and survey SOPs. You assist researchers in designing rigorous, ethical, and effective surveys.

You have access to a curated knowledge base of survey methodology best practices. Use the following retrieved excerpts to ground your answer. Always reference which source(s) informed your response using [SOURCE N] notation. If relevant information is not in the sources, clearly state this and draw on your broader expertise, flagging it as supplementary.

Be specific, actionable, and practical. Use numbered steps where appropriate. Reference specific standards, authors, or guidelines when relevant.

RETRIEVED KNOWLEDGE BASE CONTEXT:
---
${ctx}
---

After your answer, list the sources you used as: **Sources consulted:** [SOURCE 1: Title], [SOURCE 2: Title], etc.`;

    const history = messages.map(m => ({ role: m.role, content: m.content }));

    setMessages(prev => [...prev, { role: "user", content: q, sources: [] }]);
    setLoading(true);

    try {
      const reply = await callClaude([...history, userMsg], system);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: reply,
        sources: chunks
      }]);
    } catch(e) {
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Error reaching the API. Please check your connection and try again.",
        sources: []
      }]);
    }
    setLoading(false);
    inputRef.current?.focus();
  }

  function toggleSource(msgIdx, srcIdx) {
    const key = `${msgIdx}-${srcIdx}`;
    setExpandedSources(prev => ({ ...prev, [key]: !prev[key] }));
  }

  const kbCount = activeCategory ? KB.filter(c => c.category === activeCategory).length : KB.length;

  return (
    <div style={{
      display:"flex", height:"100vh", fontFamily:"'IBM Plex Sans', 'Helvetica Neue', sans-serif",
      background:"#0f1117", color:"#e8e6df", overflow:"hidden"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet"/>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"/>

      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? 240 : 0, minWidth: sidebarOpen ? 240 : 0,
        background:"#13151e", borderRight:"1px solid #1e2130",
        display:"flex", flexDirection:"column", overflow:"hidden",
        transition:"all 0.22s ease", flexShrink:0
      }}>
        <div style={{ padding:"18px 16px 10px", borderBottom:"1px solid #1e2130" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <div style={{
              width:28, height:28, borderRadius:6,
              background:"linear-gradient(135deg,#2d6aff,#00c7a8)",
              display:"flex", alignItems:"center", justifyContent:"center"
            }}>
              <i className="ti ti-database" style={{ fontSize:14, color:"#fff" }} aria-hidden="true"/>
            </div>
            <span style={{ fontSize:12, fontWeight:600, letterSpacing:"0.08em", color:"#8b8fa8", textTransform:"uppercase" }}>Knowledge Base</span>
          </div>
          <div style={{ fontSize:11, color:"#4a4e68", marginBottom:8 }}>
            {kbCount} of {KB.length} articles{activeCategory ? " filtered" : " loaded"}
          </div>
          <button
            onClick={() => setActiveCategory(null)}
            style={{
              width:"100%", padding:"6px 10px", borderRadius:6, border:"none",
              background: !activeCategory ? "#1e2130" : "transparent",
              color: !activeCategory ? "#e8e6df" : "#5a5e78",
              fontSize:12, cursor:"pointer", textAlign:"left", display:"flex", alignItems:"center", gap:6
            }}
          >
            <i className="ti ti-layout-grid" aria-hidden="true" style={{ fontSize:13 }}/>
            All categories
          </button>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"8px 8px" }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
              style={{
                width:"100%", padding:"7px 10px", borderRadius:6, border:"none",
                background: activeCategory === cat ? "#1a1d2e" : "transparent",
                color: activeCategory === cat ? "#7ba7ff" : "#7a7e96",
                fontSize:11.5, cursor:"pointer", textAlign:"left",
                display:"flex", alignItems:"center", gap:7, marginBottom:2,
                borderLeft: activeCategory === cat ? "2px solid #2d6aff" : "2px solid transparent"
              }}>
              <i className={`ti ${CAT_ICONS[cat] || "ti-book"}`} aria-hidden="true" style={{ fontSize:13, flexShrink:0 }}/>
              <span style={{ lineHeight:1.3 }}>{cat}</span>
            </button>
          ))}
        </div>

        <div style={{ padding:"12px 16px", borderTop:"1px solid #1e2130" }}>
          <div style={{ fontSize:10, color:"#3a3e58", lineHeight:1.5 }}>
            Sources: APA, AAPOR, AERA/NCME,<br/>Tourangeau et al., Dillman et al.,<br/>Krosnick, Willis, Fowler & more
          </div>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Header */}
        <div style={{
          padding:"12px 20px", borderBottom:"1px solid #1e2130",
          display:"flex", alignItems:"center", gap:12, background:"#0f1117", flexShrink:0
        }}>
          <button onClick={() => setSidebarOpen(p => !p)} style={{
            background:"none", border:"none", color:"#5a5e78", cursor:"pointer", padding:4, borderRadius:4
          }}>
            <i className="ti ti-layout-sidebar" style={{ fontSize:18 }} aria-hidden="true"/>
          </button>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:600, color:"#e8e6df" }}>
              Survey SOP · Behavioural Science RAG Agent
            </div>
            <div style={{ fontSize:11, color:"#4a4e68", marginTop:1 }}>
              {activeCategory ? `Filtering: ${activeCategory}` : "All knowledge base categories active"} · {kbCount} articles
            </div>
          </div>
          {activeCategory && (
            <button onClick={() => setActiveCategory(null)} style={{
              background:"#1a1d2e", border:"1px solid #2d3050", color:"#7ba7ff",
              borderRadius:6, padding:"4px 10px", fontSize:11, cursor:"pointer",
              display:"flex", alignItems:"center", gap:5
            }}>
              <i className="ti ti-x" style={{ fontSize:11 }} aria-hidden="true"/>
              Clear filter
            </button>
          )}
        </div>

        {/* Chat area */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 0" }}>
          {messages.length === 0 && (
            <div style={{ maxWidth:680, margin:"0 auto", padding:"0 20px" }}>
              <div style={{ textAlign:"center", marginBottom:32 }}>
                <div style={{
                  width:52, height:52, borderRadius:14, margin:"0 auto 14px",
                  background:"linear-gradient(135deg,#2d6aff22,#00c7a822)",
                  border:"1px solid #2d6aff44",
                  display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                  <i className="ti ti-molecule" style={{ fontSize:24, color:"#2d6aff" }} aria-hidden="true"/>
                </div>
                <div style={{ fontSize:18, fontWeight:600, marginBottom:6 }}>Survey Methods RAG Agent</div>
                <div style={{ fontSize:13, color:"#5a5e78", lineHeight:1.6, maxWidth:460, margin:"0 auto" }}>
                  Ask any question about academic survey design, behavioural science methodology, or SOP requirements. Answers are grounded in the embedded knowledge base.
                </div>
              </div>

              <div style={{ fontSize:11, fontWeight:600, color:"#4a4e68", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>
                Suggested questions
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                {SUGGESTED.map((s, i) => (
                  <button key={i} onClick={() => send(s)} style={{
                    background:"#13151e", border:"1px solid #1e2130", borderRadius:8,
                    padding:"10px 12px", color:"#8b8fa8", fontSize:12, cursor:"pointer",
                    textAlign:"left", lineHeight:1.4,
                    transition:"all 0.15s"
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#2d6aff44"; e.currentTarget.style.color="#b8bccc"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="#1e2130"; e.currentTarget.style.color="#8b8fa8"; }}
                  >
                    <i className="ti ti-arrow-right" style={{ fontSize:11, marginRight:6, color:"#2d6aff" }} aria-hidden="true"/>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, mi) => (
            <div key={mi} style={{
              maxWidth:680, margin:"0 auto 20px", padding:"0 20px"
            }}>
              {msg.role === "user" ? (
                <div style={{ display:"flex", justifyContent:"flex-end" }}>
                  <div style={{
                    background:"#1a2040", border:"1px solid #2d3a5e",
                    borderRadius:"12px 12px 3px 12px",
                    padding:"10px 14px", maxWidth:"80%",
                    fontSize:14, lineHeight:1.6, color:"#c8cce0"
                  }}>
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:8 }}>
                    <div style={{
                      width:26, height:26, borderRadius:7, flexShrink:0, marginTop:2,
                      background:"linear-gradient(135deg,#2d6aff,#00c7a8)",
                      display:"flex", alignItems:"center", justifyContent:"center"
                    }}>
                      <i className="ti ti-atom" style={{ fontSize:13, color:"#fff" }} aria-hidden="true"/>
                    </div>
                    <div style={{
                      background:"#13151e", border:"1px solid #1e2130",
                      borderRadius:"3px 12px 12px 12px",
                      padding:"12px 16px", fontSize:13.5, lineHeight:1.75,
                      color:"#c8cce0", whiteSpace:"pre-wrap", flex:1
                    }}>
                      {msg.content}
                    </div>
                  </div>

                  {msg.sources && msg.sources.length > 0 && (
                    <div style={{ marginLeft:36 }}>
                      <div style={{ fontSize:10, color:"#3a3e58", fontWeight:600, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:6 }}>
                        Retrieved sources ({msg.sources.length})
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                        {msg.sources.map((src, si) => {
                          const key = `${mi}-${si}`;
                          const expanded = expandedSources[key];
                          return (
                            <div key={si} style={{
                              background:"#0d0f18", border:"1px solid #1a1d2e",
                              borderRadius:7, overflow:"hidden"
                            }}>
                              <button onClick={() => toggleSource(mi, si)} style={{
                                width:"100%", padding:"7px 10px", background:"none",
                                border:"none", color:"#6a6e88", cursor:"pointer",
                                display:"flex", alignItems:"center", gap:8, textAlign:"left"
                              }}>
                                <span style={{
                                  background:"#1a2040", color:"#7ba7ff",
                                  borderRadius:4, padding:"1px 6px", fontSize:10, fontFamily:"'IBM Plex Mono',monospace",
                                  fontWeight:600, flexShrink:0
                                }}>SRC {si+1}</span>
                                <span style={{ fontSize:11.5, color:"#8b8fa8", flex:1 }}>{src.title}</span>
                                <span style={{
                                  fontSize:10, color:"#3a3e58", background:"#13151e",
                                  borderRadius:4, padding:"1px 6px", flexShrink:0
                                }}>{src.category}</span>
                                <i className={`ti ${expanded ? "ti-chevron-up" : "ti-chevron-down"}`}
                                  style={{ fontSize:12, flexShrink:0 }} aria-hidden="true"/>
                              </button>
                              {expanded && (
                                <div style={{
                                  padding:"8px 10px 10px", borderTop:"1px solid #1a1d2e",
                                  fontSize:11.5, color:"#7a7e96", lineHeight:1.65
                                }}>
                                  {src.content}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ maxWidth:680, margin:"0 auto", padding:"0 20px" }}>
              <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{
                  width:26, height:26, borderRadius:7, flexShrink:0,
                  background:"linear-gradient(135deg,#2d6aff,#00c7a8)",
                  display:"flex", alignItems:"center", justifyContent:"center"
                }}>
                  <i className="ti ti-atom" style={{ fontSize:13, color:"#fff" }} aria-hidden="true"/>
                </div>
                <div style={{
                  background:"#13151e", border:"1px solid #1e2130",
                  borderRadius:"3px 12px 12px 12px", padding:"14px 16px",
                  display:"flex", gap:5, alignItems:"center"
                }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{
                      width:6, height:6, borderRadius:"50%", background:"#2d6aff",
                      animation:"pulse 1.2s ease-in-out infinite",
                      animationDelay:`${i*0.2}s`
                    }}/>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>

        {/* Input */}
        <div style={{
          padding:"14px 20px 16px", borderTop:"1px solid #1e2130",
          background:"#0f1117", flexShrink:0
        }}>
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <div style={{
              display:"flex", gap:10, alignItems:"flex-end",
              background:"#13151e", border:"1px solid #1e2130",
              borderRadius:10, padding:"8px 8px 8px 14px",
              transition:"border-color 0.15s"
            }}
            onFocus={e => e.currentTarget.style.borderColor="#2d6aff44"}
            onBlur={e => e.currentTarget.style.borderColor="#1e2130"}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder={`Ask about survey methodology${activeCategory ? ` · ${activeCategory}` : ""}…`}
                rows={1}
                style={{
                  flex:1, background:"none", border:"none", outline:"none",
                  color:"#c8cce0", fontSize:14, lineHeight:1.5, resize:"none",
                  fontFamily:"'IBM Plex Sans', sans-serif", maxHeight:120, overflowY:"auto"
                }}
                onInput={e => {
                  e.target.style.height="auto";
                  e.target.style.height=Math.min(e.target.scrollHeight,120)+"px";
                }}
              />
              <button
                onClick={() => send()}
                disabled={!input.trim() || loading}
                style={{
                  width:34, height:34, borderRadius:7, border:"none",
                  background: input.trim() && !loading ? "linear-gradient(135deg,#2d6aff,#1a8fff)" : "#1a1d2e",
                  color: input.trim() && !loading ? "#fff" : "#3a3e58",
                  cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  flexShrink:0, transition:"all 0.15s"
                }}
              >
                <i className="ti ti-send" style={{ fontSize:15 }} aria-hidden="true"/>
              </button>
            </div>
            <div style={{ fontSize:10, color:"#2a2e48", marginTop:6, textAlign:"center" }}>
              Enter to send · Shift+Enter for new line · Knowledge base: {KB.length} articles from APA, AAPOR, AERA/NCME standards
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%,100%{opacity:0.3;transform:scale(0.85)}
          50%{opacity:1;transform:scale(1.1)}
        }
        *{box-sizing:border-box}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#1e2130;border-radius:2px}
        textarea::placeholder{color:#3a3e58}
      `}</style>
    </div>
  );
}
