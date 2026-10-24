# Geopolitical Crisis Simulation / What-If Scenarios

SCENARIOS = [
    {
        'id': 'taiwan-blockade',
        'title': 'Naval Quarantine & Air Blockade of Taiwan',
        'probability_score': 'Medium-High (68%)',
        'timeframe': '2025-2030 Horizon',
        'trigger_event': 'Beijing declares customs inspection zone and no-fly exclusion area around Taiwan following political declarations or US arms transfers.',
        'global_economic_shock': '.6 Trillion to  Trillion global GDP loss in Year 1',
        'key_affected_sectors': [
            'Global Semiconductors (92% of sub-10nm chip supply frozen)',
            'Consumer Electronics, Automotive, Datacenters, Cloud Infrastructure',
            'East Asian Maritime Trade (over 50% of global container ship fleet rerouted)'
        ],
        'escalation_stages': [
            {'phase': 'Phase 1 - Gray Zone Encirclement', 'action': 'China Coast Guard announces mandatory cargo declarations for all merchant ships entering Taiwanese territorial waters.'},
            {'phase': 'Phase 2 - Mining & Exclusion Zones', 'action': 'PLA Navy enforces no-go zones off Kaohsiung and Keelung; underwater cable sabotage severs communications.'},
            {'phase': 'Phase 3 - Asymmetric Counter-Blockade', 'action': 'US and allied naval coalition conducts freedom of navigation escort operations; US enacts sweeping sanctions on Chinese banks.'},
            {'phase': 'Phase 4 - Kinetic Flashpoint', 'action': 'Interception of an allied naval escort triggers surface-to-ship missile duel; risk of full-scale Pacific naval war.'}
        ],
        'military_response': 'US INDOPACOM activates contingency plans, staging carrier strike groups east of Taiwan and deploying long-range stealth bombers from Guam and Australia.',
        'diplomatic_consequences': 'Total fracturing of US-China trade, immediate decoupling of Western supply chains, G7 emergency sanctions package freezing Chinese foreign assets.'
    },
    {
        'id': 'hormuz-closure',
        'title': 'Total Closure & Mining of the Strait of Hormuz',
        'probability_score': 'Medium (48%)',
        'timeframe': 'Immediate Flashpoint',
        'trigger_event': 'Direct military strikes on Iranian nuclear facilities provoke Tehran to deploy naval mines, anti-ship cruise missiles, and swarm craft across Hormuz.',
        'global_economic_shock': 'Brent Crude surges to -/barrel within 72 hours',
        'key_affected_sectors': [
            'Global Energy Markets (21 million barrels/day taken offline)',
            'Aviation, Shipping, and Global Freight Logistics',
            'Petrochemicals, Fertilizer, and Food Production Costs'
        ],
        'escalation_stages': [
            {'phase': 'Phase 1 - Mining & Seizures', 'action': 'IRGC Navy sows thousands of naval bottom-mines in the 2-mile inbound and outbound shipping channels.'},
            {'phase': 'Phase 2 - Lloyd\'s War Risk Denial', 'action': 'Maritime insurance syndicates cancel war risk coverage for Persian Gulf; supertanker movements completely halt.'},
            {'phase': 'Phase 3 - Operation Earnest Will II', 'action': 'US Fifth Fleet and international mine countermeasures coalition begin high-risk minesweeping under missile fire.'},
            {'phase': 'Phase 4 - Regional Infrastructure Strikes', 'action': 'Missile strikes target Gulf oil terminals (Ras Tanura, Das Island); catastrophic supply interruption.'}
        ],
        'military_response': 'Sustained allied strikes to neutralize Iranian coastal missile batteries, anti-ship radar sites, and naval submarine pens at Bandar Abbas.',
        'diplomatic_consequences': 'Emergency coordinated release from IEA Strategic Petroleum Reserves, worldwide emergency fuel rationing, immediate diplomatic mediation by China.'
    },
    {
        'id': 'suwalki-breach',
        'title': 'Suwalki Gap Push & NATO Article 5 Activation',
        'probability_score': 'Low-Medium (28%)',
        'timeframe': 'Crisis Scenario',
        'trigger_event': 'Russian and Belarusian forces mount a rapid armored incursion across the 65-mile Suwalki corridor to link Belarus with the militarized Kaliningrad exclave.',
        'global_economic_shock': 'Stock market crash, complete freeze of European cross-border commerce',
        'key_affected_sectors': [
            'European Defense & Aerospace Industrial Base',
            'Baltic Financial and Logistics Networks',
            'Global Sovereign Debt and Currency Markets'
        ],
        'escalation_stages': [
            {'phase': 'Phase 1 - Hybrid Border Provocation', 'action': 'Mass cyber-attacks disable Polish and Lithuanian rail signaling, power grids, and GPS networks.'},
            {'phase': 'Phase 2 - Armor Push', 'action': 'Spearhead motorized divisions cross the frontier under heavy electronic jamming and S-400 air defense cover.'},
            {'phase': 'Phase 3 - Article 5 Invocation', 'action': 'North Atlantic Council invokes Article 5 collective defense; NATO Allied Reaction Force mobilizes 300,000 troops.'},
            {'phase': 'Phase 4 - Tactical Nuclear Signaling', 'action': 'Moscow conducts nuclear dispersal exercises in Kaliningrad, warning NATO against deep strikes inside Russia.'}
        ],
        'military_response': 'NATO air forces launch Operation Baltic Bastion to achieve air supremacy over Kaliningrad and obliterate invading armored columns.',
        'diplomatic_consequences': 'Full severance of all diplomatic relations between NATO members and Russia; complete naval embargo of the Baltic and Black Seas.'
    },
    {
        'id': 'brics-currency',
        'title': 'BRICS Multilateral Clearing & Commodity De-Dollarization',
        'probability_score': 'High (79% ongoing)',
        'timeframe': '2024-2032 Incremental Shift',
        'trigger_event': 'BRICS+ formalizes a digital multi-currency settlement platform (BRICS Pay / mBridge) backing crude oil and metal transactions with local currencies or gold.',
        'global_economic_shock': 'Gradual erosion of US Dollar reserve currency status and Treasury yield volatility',
        'key_affected_sectors': [
            'Global Reserve Currencies (USD share drops below 50%)',
            'International Banking & SWIFT Messaging Dominance',
            'Commodities Trading (Oil, LNG, Gold, Copper pricing in non-dollar units)'
        ],
        'escalation_stages': [
            {'phase': 'Phase 1 - Bilateral Settlements', 'action': 'Russia, China, India, and UAE settle 80%+ of bilateral energy trade in Rubles, Yuan, Dirhams, and Rupees.'},
            {'phase': 'Phase 2 - mBridge Expansion', 'action': 'Central Bank Digital Currencies (CBDCs) connect across 20+ emerging economies bypassing SWIFT and US correspondent banks.'},
            {'phase': 'Phase 3 - US Counter-Sanctions', 'action': 'US Congress debates secondary financial penalties on institutions using non-SWIFT settlement systems.'},
            {'phase': 'Phase 4 - Bipolar Financial World', 'action': 'Ecosystem bifurcates into a Western G7 financial orbit and a parallel BRICS+ non-Western trade sphere.'}
        ],
        'military_response': 'Non-kinetic warfare: cyber surveillance, regulatory enforcement, and competitive geopolitical infrastructure financing.',
        'diplomatic_consequences': 'Diminishing efficacy of unilateral US financial sanctions; acceleration of alternative multilateral economic institutions.'
    }
]
