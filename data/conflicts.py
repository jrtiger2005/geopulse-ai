# Geopolitical Flashpoints and Conflict Zones
CONFLICTS = [
    {
        'id': 'ukraine-russia',
        'name': 'Russia-Ukraine War & European Security Front',
        'region': 'Eastern Europe',
        'lat': 48.3794,
        'lng': 31.1656,
        'severity': 'Critical',
        'status': 'Active Major Interstate War',
        'primary_parties': ['Ukraine', 'Russian Federation'],
        'belligerent_support': {
            'Ukraine': ['United States', 'NATO Member States', 'European Union', 'G7'],
            'Russia': ['Belarus', 'Iran (Shahed drones)', 'North Korea (munitions/troops)', 'China (dual-use tech)']
        },
        'background': 'Initiated by Russia\'s full-scale invasion in February 2022 following the 2014 annexation of Crimea and Donbas proxy warfare. Represents the largest conventional armed conflict in Europe since 1945.',
        'key_stakes': [
            'European security architecture and NATO deterrence credibility',
            'Sovereignty, territory, and demographic future of Ukraine',
            'Black Sea maritime transit and global grain food security',
            'Nuclear deterrence signaling and tactical nuclear threshold risks'
        ],
        'latest_developments': 'High-intensity attrition along the 1,000km Donbas front, expanding long-range drone strikes on refineries and power grids, and deep debate over security guarantees.',
        'casualty_estimate': '500,000+ killed or wounded (military and civilian combined)',
        'escalation_risk': 92,
        'nuclear_shadow': True,
        'tags': ['NATO', 'Conventional War', 'Territorial Dispute', 'Sanctions', 'Drones']
    },
    {
        'id': 'israel-mideast',
        'name': 'Middle East Multi-Front War & Escalation',
        'region': 'Middle East',
        'lat': 31.5,
        'lng': 34.4667,
        'severity': 'Critical',
        'status': 'Active Multi-Front Conflict',
        'primary_parties': ['Israel', 'Hamas (Gaza)', 'Hezbollah (Lebanon)', 'Iran', 'Houthis (Yemen)', 'Iraqi Militias'],
        'belligerent_support': {
            'Israel': ['United States', 'United Kingdom', 'Western Partners'],
            'Axis of Resistance': ['Iran (IRGC Quds Force)', 'Syrian Government', 'Regional Shia Militias']
        },
        'background': 'Triggered by the October 7, 2023 attacks, engulfing Gaza, expanding into southern Lebanon against Hezbollah, and precipitating direct ballistic missile exchanges between Iran and Israel.',
        'key_stakes': [
            'Levant and Persian Gulf stability and petroleum transit security',
            'Palestinian statehood and future regional governance',
            'Iranian nuclear breakout threshold and regional deterrence balance',
            'Future of Saudi-Israeli normalization and Abraham Accords'
        ],
        'latest_developments': 'Ground operations in southern Lebanon and Gaza, direct missile duels between Tel Aviv and Tehran, and fragile diplomatic cease-fire negotiations.',
        'casualty_estimate': '50,000+ deaths across Gaza, Israel, and Lebanon; widespread humanitarian crisis',
        'escalation_risk': 89,
        'nuclear_shadow': True,
        'tags': ['Axis of Resistance', 'Urban Warfare', 'Proxy War', 'Missile Defense']
    },
    {
        'id': 'red-sea-houthis',
        'name': 'Red Sea & Bab-el-Mandeb Maritime Interdiction',
        'region': 'Red Sea / Horn of Africa',
        'lat': 12.8,
        'lng': 43.3,
        'severity': 'High',
        'status': 'Asymmetric Maritime War',
        'primary_parties': ['Ansar Allah (Houthi Movement)', 'Operation Prosperity Guardian (US-led)', 'EU Aspides Mission'],
        'belligerent_support': {
            'Houthis': ['Iran (anti-ship ballistic missiles, targeting intelligence)'],
            'Coalition': ['US Navy', 'Royal Navy', 'International Merchant Fleet']
        },
        'background': 'Houthis deployed anti-ship ballistic missiles, drones, and explosive USVs against commercial shipping transiting the Bab-el-Mandeb strait to enforce a maritime blockade.',
        'key_stakes': [
            'Disruption of artery carrying 12-15% of global maritime commerce',
            'Mass rerouting of container vessels around Cape of Good Hope (+10-14 days, inflation pressure)',
            'Testing of asymmetric low-cost drone saturation vs expensive naval interceptors'
        ],
        'latest_developments': 'US and British airstrikes on launch sites and subterranean depots in Yemen; continuous maritime patrol operations.',
        'casualty_estimate': 'Hundreds of launch/radar sites struck; commercial vessels damaged/sunk',
        'escalation_risk': 76,
        'nuclear_shadow': False,
        'tags': ['Maritime Chokepoint', 'Asymmetric Warfare', 'Supply Chain', 'Trade']
    },
    {
        'id': 'taiwan-strait',
        'name': 'Taiwan Strait & First Island Chain Flashpoint',
        'region': 'East Asia',
        'lat': 24.0,
        'lng': 119.5,
        'severity': 'Critical',
        'status': 'High Tension / Gray-Zone Siege',
        'primary_parties': ['People\'s Republic of China (PLA)', 'Republic of China (Taiwan)'],
        'belligerent_support': {
            'Taiwan': ['United States (Taiwan Relations Act)', 'Japan', 'Regional Allies'],
            'China': ['Domestic state-military apparatus / PLA Strategic Support']
        },
        'background': 'Beijing considers Taiwan a breakaway province to be annexed by force if necessary. Washington maintains strategic ambiguity while augmenting deterrence and defense capabilities.',
        'key_stakes': [
            'Naval dominance over the First Island Chain and access to the Western Pacific',
            '60%+ of global semiconductor fabrication and 90%+ of cutting-edge microchips (TSMC)',
            'Direct risk of direct superpower conflict between the US and China'
        ],
        'latest_developments': 'Regularized Joint Sword military exercises encircling the island, routine ADIZ violations, gray-zone coast guard boardings, and asymmetric porcupine strategy adoption.',
        'casualty_estimate': 'Low immediate combat casualties; estimated .5T+ global economic contraction if blockaded',
        'escalation_risk': 83,
        'nuclear_shadow': True,
        'tags': ['Superpower Rivalry', 'Semiconductors', 'Island Chain', 'Blockade Risk']
    },
    {
        'id': 'south-china-sea',
        'name': 'South China Sea Maritime Sovereignty Confrontation',
        'region': 'Southeast Asia',
        'lat': 12.0,
        'lng': 114.0,
        'severity': 'High',
        'status': 'Gray-Zone Confrontation',
        'primary_parties': ['China (Ten-Dash Line)', 'Philippines', 'Vietnam', 'Malaysia', 'Brunei'],
        'belligerent_support': {
            'Philippines': ['United States (1951 Mutual Defense Treaty)', 'Japan', 'Australia'],
            'China': ['China Coast Guard (CCG)', 'People\'s Armed Forces Maritime Militia']
        },
        'background': 'China claims over 80% of the South China Sea through its historic line, clashing with Southeast Asian claimants and defying the 2016 Hague Arbitration ruling.',
        'key_stakes': [
            'Over .4 trillion in annual ship-borne global trade passage',
            'Hydrocarbon deposits, undersea cables, and crucial fishery reserves',
            'Potential trigger of US Mutual Defense Treaty obligations at Second Thomas Shoal / Sabina Shoal'
        ],
        'latest_developments': 'China Coast Guard water cannoning and physical ramming of Philippine resupply missions; expansion of US military rotational access in northern Luzon.',
        'casualty_estimate': 'Scores injured in maritime clashes; hull and equipment damage',
        'escalation_risk': 78,
        'nuclear_shadow': False,
        'tags': ['UNCLOS', 'Freedom of Navigation', 'US-Philippines Treaty', 'Maritime Dispute']
    },
    {
        'id': 'korean-peninsula',
        'name': 'Korean Peninsula Nuclear Brinkmanship',
        'region': 'East Asia',
        'lat': 38.0,
        'lng': 127.0,
        'severity': 'High',
        'status': 'Armed Armistice / Nuclear Alert',
        'primary_parties': ['Democratic People\'s Republic of Korea (North Korea)', 'Republic of Korea (South Korea)'],
        'belligerent_support': {
            'South Korea': ['United States (Extended Nuclear Deterrence)', 'Japan (Camp David Accord)'],
            'North Korea': ['Russian Federation (Mutual Defense Treaty)', 'China (1961 Friendship Treaty)']
        },
        'background': 'Technically at war since 1953. North Korea has successfully tested intercontinental ballistic missiles, solid-fuel hypersonics, and expanded its tactical nuclear doctrine.',
        'key_stakes': [
            'Nuclear proliferation, miniaturized warhead deployments, and tactical pre-emptive strike doctrines',
            'Direct defense pact with Russia including troop and ammunition exchanges',
            'North Korea officially designating South Korea as principal hostile adversary'
        ],
        'latest_developments': 'Deployment of North Korean military units in Russia\'s Kursk region, ballistic missile test salvos, and dismantling of all inter-Korean road and rail links.',
        'casualty_estimate': '3M+ historical; Seoul metro (25M people) within heavy artillery range',
        'escalation_risk': 80,
        'nuclear_shadow': True,
        'tags': ['Nuclear Weapons', 'ICBM', 'Russia-DPRK Pact', 'DMZ']
    },
    {
        'id': 'sudan-civil-war',
        'name': 'Sudan Civil War & Humanitarian Collapse',
        'region': 'Sub-Saharan Africa',
        'lat': 15.5,
        'lng': 32.53,
        'severity': 'Critical',
        'status': 'Active Full-Scale Civil War',
        'primary_parties': ['Sudanese Armed Forces (SAF - Burhan)', 'Rapid Support Forces (RSF - Hemedti)'],
        'belligerent_support': {
            'SAF': ['Egypt', 'Iran (Mohajer-6 drones)', 'Saudi Arabia (diplomatic talks)'],
            'RSF': ['UAE (alleged logistical/materiel corridor)', 'Wagner/Russian mercenary networks']
        },
        'background': 'Exploded in April 2023 between military chief Abdel Fattah al-Burhan and RSF paramilitary commander Mohamed Hamdan Dagalo over security sector integration.',
        'key_stakes': [
            'World\'s largest displacement emergency (11M+ displaced) and widespread famine in Darfur and Khartoum',
            'Fragmentation of Sudan and proxy involvement threatening Red Sea coastlines',
            'Severe ethnic massacres and destruction of critical agricultural infrastructure'
        ],
        'latest_developments': 'Brutal siege of El Fasher in North Darfur, sustained drone and artillery strikes in Khartoum-Omdurman, and famine declarations in Zamzam camp.',
        'casualty_estimate': '150,000+ estimated fatalities (direct combat and disease/hunger)',
        'escalation_risk': 86,
        'nuclear_shadow': False,
        'tags': ['Civil War', 'Famine', 'Displacement', 'Proxy Conflict', 'Africa']
    },
    {
        'id': 'sahel-belt',
        'name': 'Sahel Coup Belt & Confederation of Sahel States (AES)',
        'region': 'West Africa / Sahel',
        'lat': 14.5,
        'lng': -1.5,
        'severity': 'High',
        'status': 'Insurgency & Geostrategic Realignment',
        'primary_parties': ['Mali, Burkina Faso, Niger (AES Juntas)', 'JNIM (al-Qaeda)', 'ISGS (Islamic State)', 'Tuareg Rebels (CSP-DPA)'],
        'belligerent_support': {
            'AES': ['Russian Federation (Africa Corps / Wagner)'],
            'Western States': ['Expelled: France, United States (withdrawn from Air Base 201)']
        },
        'background': 'Coups across Mali, Burkina Faso, and Niger dismantled decades of French and American security presence, replacing Western military missions with Moscow-aligned Africa Corps.',
        'key_stakes': [
            'Collapse of Sahelian regional counter-insurgency and westward jihadist expansion toward Gulf of Guinea',
            'Control over uranium deposits in Niger and significant gold reserves in Mali',
            'Severing of ECOWAS ties and creation of the rival AES confederation'
        ],
        'latest_developments': 'Heavy ambush of Russian Africa Corps and Malian troops by Tuareg rebels at Tinzaouaten; deadly jihadist strikes on gendarmerie and military academies in Bamako.',
        'casualty_estimate': '40,000+ fatalities in recent years; millions displaced',
        'escalation_risk': 77,
        'nuclear_shadow': False,
        'tags': ['Sahel', 'Russian Wagner', 'Jihadist Threat', 'Uranium', 'Coups']
    },
    {
        'id': 'myanmar-civil-war',
        'name': 'Myanmar Revolutionary Conflict',
        'region': 'Southeast Asia',
        'lat': 19.76,
        'lng': 96.07,
        'severity': 'High',
        'status': 'Nationwide Insurgency',
        'primary_parties': ['State Administration Council (Military Junta)', 'National Unity Government (PDF)', 'Ethnic Resistance Organizations (EROs)'],
        'belligerent_support': {
            'Junta': ['Russia (fighter jets, gunships)', 'China (hedging / border security)'],
            'Resistance': ['Three Brotherhood Alliance (MNDAA, TNLA, AA)', 'Kachin Independence Army (KIA)']
        },
        'background': 'Triggered by the February 2021 military coup against the democratically elected civilian administration, resulting in a nationwide armed struggle.',
        'key_stakes': [
            'Geostrategic access: China\'s overland pipelines and deep-sea port at Kyaukpyu (Bay of Bengal)',
            'Destabilization of border trade and crackdown on transnational scam compounds in Kokang',
            'Junta losing control over 50%+ of territorial outposts and key border gates'
        ],
        'latest_developments': 'Operation 1027 capturing junta regional military headquarters in Shan State and Rakhine; junta imposing forced conscription and launching punitive airstrikes.',
        'casualty_estimate': '55,000+ casualties; over 3 million internally displaced',
        'escalation_risk': 73,
        'nuclear_shadow': False,
        'tags': ['Civil War', 'Coup', 'Southeast Asia', 'Border Security']
    },
    {
        'id': 'himalayan-lac',
        'name': 'Sino-Indian Line of Actual Control (LAC)',
        'region': 'South Asia / Himalayas',
        'lat': 34.0,
        'lng': 78.0,
        'severity': 'Medium',
        'status': 'Militarized Standoff / Tactical Disengagement',
        'primary_parties': ['Republic of India', 'People\'s Republic of China'],
        'belligerent_support': {
            'India': ['Quad Security Partnership', 'Indo-US Defense Logistics Agreements (LEMOA, BECA)'],
            'China': ['Western Theater Command PLA Infrastructure']
        },
        'background': 'Disputed 3,488 km Himalayan border where lethal non-firearm hand-to-hand combat erupted in Galwan Valley in June 2020.',
        'key_stakes': [
            'Strategic control of Aksai Chin, Siachen glacier flanks, and Arunachal Pradesh',
            'Water security originating from the Tibetan plateau (Brahmaputra dam projects)',
            'Accelerating India\'s geopolitical and technological alignment with Western democracies'
        ],
        'latest_developments': 'Historic patrolling pact announced for Depsang and Demchok friction areas, easing immediate escalation while massive dual-use infrastructure remains permanently fortified.',
        'casualty_estimate': '20 Indian soldiers, 4+ Chinese soldiers killed in 2020; continuous frostbite/altitude casualties',
        'escalation_risk': 63,
        'nuclear_shadow': True,
        'tags': ['Nuclear Powers', 'Himalayas', 'Quad', 'Border Friction']
    },
    {
        'id': 'armenia-azerbaijan',
        'name': 'South Caucasus & Zangezur Corridor Friction',
        'region': 'South Caucasus',
        'lat': 40.0,
        'lng': 47.0,
        'severity': 'Medium',
        'status': 'Fragile Peace Talks / Transport Corridor Dispute',
        'primary_parties': ['Republic of Azerbaijan', 'Republic of Armenia'],
        'belligerent_support': {
            'Azerbaijan': ['Republic of Turkey', 'State of Israel (advanced drones/defense tech)'],
            'Armenia': ['France (air defense/radar systems)', 'India (Pinaka rocket systems, Howitzers)']
        },
        'background': 'Azerbaijan fully re-established sovereignty over Nagorno-Karabakh in a 24-hour offensive in September 2023. Tensions now pivot around a transport corridor connecting Azerbaijan to Nakhchivan through Armenia\'s Syunik province.',
        'key_stakes': [
            'Armenia formally freezing CSTO cooperation and turning toward the European Union',
            'Iran\'s red line prohibiting geopolitical border modifications north of its frontier',
            'Expansion of the Middle Corridor connecting Central Asia to Europe via the Caspian Sea'
        ],
        'latest_developments': 'Direct bilateral border delimitation accords; active negotiations on formal peace treaty text without Russian mediation.',
        'casualty_estimate': '7,000+ killed in 2020 and 2023; 100,000+ ethnic Armenians displaced',
        'escalation_risk': 57,
        'nuclear_shadow': False,
        'tags': ['Caucasus', 'Middle Corridor', 'CSTO Pivot', 'Energy Route']
    },
    {
        'id': 'drc-great-lakes',
        'name': 'DR Congo & M23 Great Lakes Conflict',
        'region': 'Central Africa',
        'lat': -1.68,
        'lng': 29.23,
        'severity': 'High',
        'status': 'Interstate Proxy Warfare',
        'primary_parties': ['DR Congo (FARDC / Wazalendo)', 'M23 Rebels (alleged Rwandan support)', 'FDLR'],
        'belligerent_support': {
            'DRC': ['Southern African Development Community (SAMIDRC)', 'European military trainers'],
            'M23': ['Rwanda (documented by UN Group of Experts)']
        },
        'background': 'Decades of conflict rooted in the 1994 Rwandan genocide fallout, intertwined with competition over colossal deposits of cobalt, coltan, lithium, and gold.',
        'key_stakes': [
            'Supply chain resilience: DRC supplies 70%+ of the world\'s raw cobalt essential for electric vehicle batteries',
            'Humanitarian crisis with over 7.3 million displaced persons across the Congo basin',
            'Risk of a full-scale direct interstate war between Kinshasa and Kigali'
        ],
        'latest_developments': 'M23 encirclement and artillery bombardment of Goma; diplomatic talks under the Angolan Luanda process facing repeated truce violations.',
        'casualty_estimate': '10,000+ dead in recent flare-ups; millions in severe humanitarian destitution',
        'escalation_risk': 74,
        'nuclear_shadow': False,
        'tags': ['Critical Minerals', 'Cobalt', 'Resource War', 'Humanitarian Crisis']
    }
]
