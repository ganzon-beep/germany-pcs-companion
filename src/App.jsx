import { useEffect, useState } from 'react'

const assetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`

const journeyStages = [
  ['01', 'Offer & orders', 'From tentative offer to travel orders'],
  ['02', 'Pre-arrival', 'Make the move feel manageable'],
  ['03', 'Arrival', 'Handle the first essentials'],
  ['04', 'Days 30 · 60 · 90', 'Settling into your new life'],
]

const phaseTips = {
  'Offer & orders': {
    label: 'Good to know',
    title: 'Plan for upfront PCS costs',
    detail: 'Many PCS expenses can come due before allowances or reimbursements are paid. As a planning target, some households may want $10,000–$25,000 readily accessible, adjusted for family size, temporary lodging, deposits, pets, and vehicle costs.',
    note: 'This is a planning buffer, not an entitlement estimate. Ask your HR or finance office which expenses and advances are authorized for your specific move before making financial decisions.',
  },
}

const phaseTasks = [
  {
    id: 'temporary-offer',
    phase: 'Offer & orders',
    milestone: 'After your Tentative Job Offer (TJO)',
    window: 'Start here',
    title: 'Review your Tentative Job Offer (TJO)',
    detail: 'Confirm the position, duty location, grade, and the HR contact listed in your offer.',
    tag: 'Offer',
  },
  {
    id: 'start-document-folder',
    phase: 'Offer & orders',
    milestone: 'After your Tentative Job Offer (TJO)',
    window: 'This week',
    title: 'Start your PCS document folder',
    detail: 'Keep your offer, passports, marriage or birth certificates, pet records, medical records, and receipts together.',
    tag: 'Documents',
  },
  {
    id: 'audit-health-insurance',
    phase: 'Offer & orders',
    milestone: 'After your Tentative Job Offer (TJO)',
    window: 'Before enrollment closes',
    title: 'Audit your overseas health coverage',
    detail: 'Review your FEHB plan for care on the German economy, overseas claims, deductibles, and direct-billing support. Federal civilians generally use military treatment facilities only on a space-available basis.',
    tag: 'Healthcare',
  },
  {
    id: 'final-offer',
    phase: 'Offer & orders',
    milestone: 'After your Final Job Offer (FJO)',
    window: 'When received',
    title: 'Verify your Final Job Offer (FJO) and travel orders',
    detail: 'Check names, dependents, allowances, and the authorized travel details before booking.',
    tag: 'Orders',
  },
  {
    id: 'no-fee-passports-sofa',
    phase: 'Offer & orders',
    milestone: 'After your Final Job Offer (FJO)',
    window: 'As soon as authorized',
    title: 'Obtain No-Fee passports and SOFA stamps',
    detail: 'Confirm that you and each dependent have the required No-Fee passport and SOFA stamp. Keep tourist passports available for personal travel.',
    tag: 'Passports',
  },
  {
    id: 'advance-of-pay',
    phase: 'Offer & orders',
    milestone: 'After your Final Job Offer (FJO)',
    window: 'Up to 3 weeks before PCS',
    title: 'Consider an advance of pay',
    detail: 'Ask your HR sponsor whether you are eligible and how to submit the request. Existing Federal employees may request it before PCS; new hires may request it after arrival.',
    tag: 'Finance',
  },
  {
    id: 'sponsor',
    phase: 'Pre-arrival',
    window: '60–30 days out',
    title: 'Connect with your relocation contact',
    detail: 'Share your arrival plan and ask about your first workday, local requirements, and temporary lodging.',
    tag: 'Contact',
  },
  {
    id: 'lodging',
    phase: 'Pre-arrival',
    window: '60–30 days out',
    title: 'Reserve temporary lodging',
    detail: 'Book early, confirm pet restrictions, and keep every lodging and meal receipt for TQSA.',
    tag: 'Housing',
  },
  {
    id: 'usareur-training',
    phase: 'Pre-arrival',
    window: 'Within 60 days of appointment',
    title: 'Complete USAREUR driver training',
    detail: 'Complete the course and exam on JKO no earlier than 60 days before your licensing appointment. Print several copies of both completion certificates.',
    tag: 'Driving',
  },
  {
    id: 'install-essential-apps',
    phase: 'Pre-arrival',
    window: 'Before departure',
    title: 'Install a few essential Germany apps',
    detail: 'Download German for offline use in Google Translate, plus DB Navigator for public transit and EasyPark for municipal parking.',
    tag: 'Daily life',
  },
  {
    id: 'plan-school-path',
    phase: 'Pre-arrival',
    window: 'Before choosing housing',
    title: 'Review school and childcare options',
    detail: 'Compare DoDEA zoning, private international schools, and local German schools. Your off-base address can determine the DoDEA school zone.',
    tag: 'Family',
  },
  {
    id: 'save-healthcare-options',
    phase: 'Pre-arrival',
    window: 'Before departure',
    title: 'Save local healthcare options',
    detail: 'Identify nearby English-speaking primary, emergency, specialty, therapy, and dental care. Save 112 as the German emergency number.',
    tag: 'Healthcare',
  },
  {
    id: 'cac-deers',
    phase: 'Arrival',
    window: 'First 48 hours',
    title: 'Complete CAC and DEERS enrollment',
    detail: 'Make this an early priority for installation access, network access, and payroll processing. Dependents should also obtain ID cards and confirm authorized patronage.',
    tag: 'Identification',
  },
  {
    id: 'local-phone',
    phase: 'Arrival',
    window: 'First 48 hours',
    title: 'Set up local phone service',
    detail: 'Use an international plan or Wi-Fi until you activate a German SIM or eSIM. Telekom, Vodafone, O2, and TKS are common local options.',
    tag: 'Communication',
  },
  {
    id: 'housing-inprocess',
    phase: 'Arrival',
    window: 'Within 48 hours',
    title: 'In-process with the KMC Housing Office',
    detail: 'Register at Bldg 1001, Vogelweh, and begin the off-base housing process. Eligible civilians may have up to 90 days of TQSA.',
    tag: 'Housing',
  },
  {
    id: 'finance-inprocess',
    phase: 'Arrival',
    window: 'Within 15 days',
    title: 'Complete finance and payroll in-processing',
    detail: 'Submit your initial travel voucher and begin any authorized advance-pay or temporary-quarters allowance actions through your servicing finance office.',
    tag: 'Finance',
  },
  {
    id: 'usareur-license',
    phase: 'Arrival',
    window: 'First week',
    title: 'Obtain your USAREUR driver’s license',
    detail: 'Bring your JKO certificates, hard copies of orders, valid state license, and a non-cash payment method. Licensing is available at Ramstein Bldg 2106 or Kleber Bldg 3212.',
    tag: 'Driving',
  },
  {
    id: 'apo-box',
    phase: 'Arrival',
    window: 'First week',
    title: 'Establish an APO mailing address',
    detail: 'In-process at a post office to receive your box. Options include Landstuhl Bldg 3377, Kapaun Bldg 2767, and Ramstein Bldg 426.',
    tag: 'Mail',
  },
  {
    id: 'iban-account',
    phase: 'Arrival',
    window: 'First week',
    title: 'Open a Euro account with an IBAN',
    detail: 'An IBAN is commonly needed for rent, UTAP, utilities, and local contracts. On-base and online banking options are available.',
    tag: 'Banking',
  },
  {
    id: 'ration-card',
    phase: 'Arrival',
    window: 'First week',
    title: 'Obtain a rations card if needed',
    detail: 'Eligible civilians need a physical rations card for rationed tax-free purchases. Offices are located at Ramstein Bldg 2102 and Kleber Bldg 3245.',
    tag: 'Benefits',
  },
  {
    id: 'vat-program',
    phase: 'Arrival',
    window: 'First week',
    title: 'Register for the VAT program',
    detail: 'VAT forms can remove eligible German tax from off-base purchases. Registration options include ROB Bldg 162 and the Ramstein BX Services Counter.',
    tag: 'Benefits',
  },
  {
    id: 'tqsa',
    phase: 'Days 30 · 60 · 90',
    window: 'Every 30 days',
    title: 'Submit your temporary-lodging claim',
    detail: 'Keep every lodging, meal, and laundry receipt. Submit TQSA claims in strict 30-day increments; reimbursement percentages may decrease over time.',
    tag: 'Deadline',
  },
  {
    id: 'review-rental-details',
    phase: 'Days 30 · 60 · 90',
    window: 'Before signing a lease',
    title: 'Review the home beyond the rent',
    detail: 'Confirm your LQA cap, whether an Einbauküche (EBK) is included, the heating type, shutters or cooling options, and how annual Nebenkosten reconciliation works.',
    tag: 'Housing',
  },
  {
    id: 'utap',
    phase: 'Days 30 · 60 · 90',
    window: 'After lease approval',
    title: 'Set up UTAP for eligible utilities',
    detail: 'Bring the approved lease, IBAN details, and setup fee to Kleber Bldg 3245 or Ramstein Bldg 2118. Garbage, telephone, internet, and heating oil are not covered.',
    tag: 'Utilities',
  },
  {
    id: 'fmo',
    phase: 'Days 30 · 60 · 90',
    window: 'After signing a lease',
    title: 'Schedule FMO furnishings and appliances',
    detail: 'Visit FMO at Vogelweh Bldg 1001 for temporary loaner furniture and available tour-length appliances while you wait for household goods.',
    tag: 'Home',
  },
  {
    id: 'vehicle-registration',
    phase: 'Days 30 · 60 · 90',
    window: 'When your vehicle arrives',
    title: 'Inspect and register your vehicle',
    detail: 'At Kapaun Bldg 2806, obtain temporary plates, collect the vehicle, pass inspection, then secure permanent plates. Carry a DIN 13164 first-aid kit, two masks, a warning triangle, and reflective vest.',
    tag: 'Vehicle',
  },
  {
    id: 'esso-card',
    phase: 'Days 30 · 60 · 90',
    window: 'After registration',
    title: 'Set up an ESSO fuel card',
    detail: 'Take your vehicle registration, orders, and CAC to an AAFES gas station to request the prepaid tax-free fuel card.',
    tag: 'Vehicle',
  },
  {
    id: 'school-registration',
    phase: 'Days 30 · 60 · 90',
    window: 'After choosing housing',
    title: 'Complete school registration',
    detail: 'Register through DoDEA, your selected private school, or the local Rathaus for German public school. Confirm your final school zone from your home address.',
    tag: 'Family',
  },
  {
    id: 'german-life-rules',
    phase: 'Days 30 · 60 · 90',
    window: 'As you settle in',
    title: 'Learn the everyday German rules',
    detail: 'Plan for Sunday closures and quiet hours, carry some Euros, use winter-rated tires in winter conditions, and remember Germany’s 0.05 BAC limit also applies to bicycles and e-scooters.',
    tag: 'Daily life',
  },
]

const directoryEntries = [
  {
    id: 'ramstein-id-cards',
    name: 'Ramstein ID Cards & DEERS',
    category: 'Identification',
    location: 'Ramstein Passenger Terminal, Bldg 2102',
    area: 'Ramstein Air Base',
    phone: '06371-47-2273',
    services: 'CAC issuance, SOFA stamps, and DEERS support.',
    steps: ['Complete CAC and DEERS enrollment', 'Obtain No-Fee passports and SOFA stamps'],
  },
  {
    id: 'kleber-id-cards',
    name: 'Kleber DEERS Office',
    category: 'Identification',
    location: 'Kleber Kaserne, Bldg 3245',
    area: 'Kaiserslautern',
    phone: '0631-411-7662',
    alternatePhone: '0631-411-7072',
    dsn: '483-7072',
    hours: 'Mon–Thu 0800–1530; Fri 0800–1200',
    services: 'DEERS enrollment, CAC issuance, SOFA stamps, and ID cards.',
    steps: ['Complete CAC and DEERS enrollment'],
  },
  {
    id: 'lrmc-deers',
    name: 'LRMC DEERS Office',
    category: 'Identification',
    location: 'Bldg 3766, Room 15B 120',
    area: 'Landstuhl',
    phone: '06371-9464-5917',
    dsn: '590-5917',
    services: 'Local DEERS enrollment and identification support.',
    steps: ['Complete CAC and DEERS enrollment'],
  },
  {
    id: 'kleber-utap',
    name: 'Kleber UTAP Office',
    category: 'Housing',
    location: 'Kleber Kaserne, Bldg 3245',
    area: 'Kaiserslautern',
    services: 'Utility Tax Avoidance Program support for eligible electricity, gas, and water accounts.',
    steps: ['Set up UTAP for eligible utilities'],
  },
  {
    id: 'kleber-passports',
    name: 'Kleber Passport Office',
    category: 'Passports',
    location: '90th Personnel Service Battalion, Bldg 3245, Room 117',
    area: 'Kleber Kaserne',
    phone: '0631-411-8892',
    alternatePhone: '0631-411-7659',
    dsn: '483-8892 / 483-7659',
    hours: 'Birth registration by appointment only, Mon–Thu 0800–1100',
    website: 'http://www.rp.army.mil/Directorates/DHR/passports.html',
    services: 'U.S. Army passport services and appointment-only birth registration.',
    steps: ['Obtain No-Fee passports and SOFA stamps'],
  },
  {
    id: 'baumholder-passports',
    name: 'Baumholder Passport Office',
    category: 'Passports',
    location: 'Bldg 8660',
    area: 'Baumholder',
    phone: '06783-6-7215',
    dsn: '485-7215',
    services: 'U.S. Army passport services.',
    steps: ['Obtain No-Fee passports and SOFA stamps'],
  },
  {
    id: 'ramstein-passports',
    name: 'Ramstein Passport Office',
    category: 'Passports',
    location: 'Bldg 2106, Room 110',
    area: 'Ramstein Air Base',
    hours: 'Mon–Fri 0900–1500; birth registration by appointment only',
    services: 'Passport services and appointment-only birth registration.',
    steps: ['Obtain No-Fee passports and SOFA stamps'],
  },
  {
    id: 'landstuhl-outprocessing',
    name: 'LRMC In/Out-Processing',
    category: 'Finance',
    location: 'Bldg 3700',
    area: 'Landstuhl',
    services: 'Local badging, security keys, in-processing, travel vouchers, and TQSA forms.',
    steps: ['Complete finance and payroll in-processing', 'Submit your temporary-lodging claim'],
  },
  {
    id: 'rob-vat-office',
    name: 'Rhine Ordnance Barracks (ROB) VAT Office',
    category: 'Finance',
    location: 'Java Café, Bldg 273, 67661 Kaiserslautern',
    area: 'Rhine Ordnance Barracks',
    phone: '+49 (0)611-143-541-9089',
    phoneHref: '+496111435419089',
    dsn: '(314) 541-9089',
    website: 'https://www.armymwr.com/location-contact?location_form_location=66955',
    websiteLabel: 'Email office',
    mapsUrl: 'https://www.google.com/maps/search/Rhine+Ordnance+Barracks+(ROB)+Java+Caf%C3%A9,+Kaiserslautern,+Rhineland-Palatinate,+67661,+Germany',
    services: 'VAT form sales and support for eligible tax-free purchases. Now open during lunch.',
    steps: ['Register for the VAT program'],
  },
  {
    id: 'kleber-vat-office',
    name: 'Kleber VAT Office',
    category: 'Finance',
    location: 'Kleber Kaserne, Bldg 3245, Room 116, 67657 Kaiserslautern',
    area: 'Kleber Kaserne',
    phone: '+49 (0)611-143-541-9120',
    phoneHref: '+496111435419120',
    dsn: '(314) 541-9120',
    website: 'https://www.armymwr.com/location-contact?location_form_location=66956',
    websiteLabel: 'Email office',
    mapsUrl: 'https://www.google.com/maps/search/Kleber+Kaserne,+Room+116,+Kaiserslautern,+Rhineland-Palatinate,+67657,+Germany',
    services: 'VAT form sales and support for eligible tax-free purchases.',
    steps: ['Register for the VAT program'],
  },
  {
    id: 'landstuhl-vat-office',
    name: 'Landstuhl VAT Office',
    category: 'Finance',
    location: 'Landstuhl Post (Wilson Barracks), inside the Library, Bldg 3810, 66849 Landstuhl',
    area: 'Landstuhl',
    phone: '+49 (0)611-143-541-9126',
    phoneHref: '+496111435419126',
    dsn: '(314) 541-9126',
    website: 'https://www.armymwr.com/location-contact?location_form_location=66957',
    websiteLabel: 'Email office',
    mapsUrl: 'https://www.google.com/maps/search/Landstuhl+Post+(Wilson+Barracks),+(Located+inside+Library),+Landstuhl,+Rhineland-Palatinate,+66849,+Germany',
    services: 'VAT form sales and support for eligible tax-free purchases.',
    steps: ['Register for the VAT program'],
  },
  {
    id: 'kmc-housing',
    name: 'KMC Housing Office',
    category: 'Housing',
    location: 'Vogelweh, Bldg 1001',
    area: 'Kaiserslautern',
    services: 'Housing registration and lease review. Register within 48 hours and obtain approval before signing a German lease.',
    steps: ['In-process with the KMC Housing Office', 'Review the home beyond the rent'],
  },
  {
    id: 'fmo',
    name: 'Furnishings Management Office',
    category: 'Housing',
    location: 'Vogelweh, Bldg 1001',
    area: 'Kaiserslautern',
    services: 'Schedules temporary furniture and major appliance delivery, including washers, dryers, and transformers.',
    steps: ['Schedule FMO furnishings and appliances'],
  },
  {
    id: 'ramstein-licensing',
    name: 'Ramstein USAREUR Licensing',
    category: 'Driving',
    location: 'Bldg 2106',
    area: 'Ramstein Air Base',
    services: 'USAREUR driver’s license processing. Bring JKO certificates, hard-copy orders, and the required non-cash fee.',
    steps: ['Complete USAREUR driver training', 'Obtain your USAREUR driver’s license'],
  },
  {
    id: 'kleber-licensing',
    name: 'Kleber USAREUR Licensing',
    category: 'Driving',
    location: 'Bldg 3212',
    area: 'Kleber Kaserne',
    services: 'USAREUR driver’s license processing. Bring JKO certificates, hard-copy orders, and the required non-cash fee.',
    steps: ['Complete USAREUR driver training', 'Obtain your USAREUR driver’s license'],
  },
  {
    id: 'aafes-esso',
    name: 'AAFES ESSO Card Service',
    category: 'Vehicle',
    location: 'Any local on-base AAFES gas station',
    area: 'KMC',
    services: 'Issues prepaid ESSO fuel cards. Bring vehicle registration, orders, and CAC.',
    steps: ['Set up an ESSO fuel card'],
  },
  {
    id: 'school-liaison',
    name: 'School Liaison Officer',
    category: 'Schools',
    location: 'Rhine Ordnance Barracks, Bldg 162',
    area: 'Kaiserslautern',
    phone: '0631-143-541-9061',
    services: 'Assists families with DoDEA registration and school-transition questions.',
    steps: ['Review school and childcare options', 'Complete school registration'],
  },
  {
    id: 'landstuhl-elementary',
    name: 'Landstuhl Elementary School',
    category: 'Schools',
    location: 'Landstuhl Post, Bldg 3720',
    area: 'Landstuhl',
    services: 'DoDEA school serving grades PK–5.',
    steps: ['Review school and childcare options', 'Complete school registration'],
  },
  {
    id: 'kaiserslautern-schools',
    name: 'Kaiserslautern DoDEA Schools',
    category: 'Schools',
    location: 'Vogelweh & Kleber area',
    area: 'Kaiserslautern',
    services: 'DoDEA elementary, middle, and high school options.',
    steps: ['Review school and childcare options', 'Complete school registration'],
  },
  {
    id: 'ramstein-schools',
    name: 'Ramstein DoDEA Schools',
    category: 'Schools',
    location: 'Ramstein Air Base',
    area: 'Ramstein',
    services: 'DoDEA elementary, intermediate, middle, and high school options.',
    steps: ['Review school and childcare options', 'Complete school registration'],
  },
  {
    id: 'sbw-westpfalz',
    name: 'SBW International School Westpfalz',
    category: 'Schools',
    location: 'Landstuhl area',
    area: 'Landstuhl',
    services: 'Private English-language curriculum and an alternative to DoDEA or local German schools.',
    steps: ['Review school and childcare options', 'Complete school registration'],
  },
  {
    id: 'flynn-family-medicine',
    name: 'Flynn Family Medicine',
    category: 'Healthcare',
    location: 'Schulstraße 2, 66877 Ramstein-Miesenbach',
    area: 'Ramstein-Miesenbach',
    phone: '06371-952-7070',
    services: 'English-speaking general practice and family care on the German economy.',
    steps: ['Audit your overseas health coverage', 'Save local healthcare options'],
  },
  {
    id: 'kleber-tricare',
    name: 'Kleber TRICARE Service Center',
    category: 'Healthcare',
    location: 'Kleber Kaserne',
    area: 'Kaiserslautern',
    phone: '0631-411-6358',
    dsn: '483-6358',
    services: 'TRICARE enrollment and beneficiary support.',
    steps: ['Audit your overseas health coverage', 'Save local healthcare options'],
  },
  {
    id: 'baumholder-tricare',
    name: 'Baumholder TRICARE Service Center',
    category: 'Healthcare',
    location: 'Baumholder',
    area: 'Baumholder',
    phone: '06783-6-8089',
    dsn: '485-8089',
    services: 'TRICARE enrollment and beneficiary support.',
    steps: ['Audit your overseas health coverage', 'Save local healthcare options'],
  },
  {
    id: 'ramstein-tricare',
    name: 'Ramstein TRICARE Service Center',
    category: 'Healthcare',
    location: 'Ramstein Air Base',
    area: 'Ramstein',
    phone: '06371-46-2616',
    dsn: '479-2616',
    services: 'TRICARE enrollment and beneficiary support.',
    steps: ['Audit your overseas health coverage', 'Save local healthcare options'],
  },
  {
    id: 'lrmc-tricare',
    name: 'LRMC TRICARE Service Center',
    category: 'Healthcare',
    location: 'Bldg 3744',
    area: 'Landstuhl',
    phone: '06371-9464-4830',
    dsn: '590-4830',
    services: 'TRICARE enrollment and beneficiary support.',
    steps: ['Audit your overseas health coverage', 'Save local healthcare options'],
  },
  {
    id: 'dentistry-4-kidz',
    name: 'Dentistry 4 Kidz',
    category: 'Healthcare',
    location: 'Kaiserstraße 171, 66849 Landstuhl',
    area: 'Landstuhl',
    phone: '06371-130-0921',
    services: 'English-speaking pediatric dental care.',
    steps: ['Save local healthcare options'],
  },
  {
    id: 'nardini-klinikum',
    name: 'Nardini Klinikum',
    category: 'Healthcare',
    location: 'Nardinistraße 30, 66849 Landstuhl',
    area: 'Landstuhl',
    phone: '06371-840',
    services: 'General emergency hospital and maternity care with on-call patient liaisons.',
    steps: ['Save local healthcare options'],
  },
  {
    id: 'westpfalz-klinikum',
    name: 'Westpfalz-Klinikum',
    category: 'Healthcare',
    location: 'Hellmut-Hartert-Straße 1, Kaiserslautern',
    area: 'Kaiserslautern',
    phone: '0631-2030',
    services: 'Regional hospital and major trauma center.',
    steps: ['Save local healthcare options'],
  },
  {
    id: 'pulaski-vet',
    name: 'Pulaski Veterinary Clinic',
    category: 'Pets',
    location: 'Pulaski Barracks, Bldg 2928',
    area: 'Kaiserslautern',
    services: 'Pet registration. The storyboard directs arriving families to register within 14 days.',
    steps: ['Start your PCS document folder'],
  },
]

const directoryCategories = ['All', ...new Set(directoryEntries.map((entry) => entry.category))]

const localLifePreviews = [
  {
    eyebrow: 'Know your surroundings',
    title: 'Meet your local area',
    copy: 'Get oriented to Ramstein, Kaiserslautern, Landstuhl, and the villages that connect everyday life across the region.',
    link: 'Explore the region',
    className: 'path-card--sky',
  },
  {
    eyebrow: 'Learn the local rhythm',
    title: 'Make daily life easier',
    copy: 'Understand recycling, shopping hours, transportation, village routines, and the practical systems you will use each week.',
    link: 'See everyday essentials',
    className: 'path-card--sand',
  },
  {
    eyebrow: 'Connect with confidence',
    title: 'Read the culture',
    copy: 'Learn the small courtesies, quiet-hour expectations, useful phrases, and neighborhood habits that help a new place feel like home.',
    link: 'Explore culture & etiquette',
    className: 'path-card--sage',
  },
]

const localAreas = [
  {
    name: 'Kaiserslautern',
    label: 'City life',
    copy: 'The region’s urban center: a walkable pedestrian district, main rail connections, restaurants, services, and a weekly market rhythm.',
  },
  {
    name: 'Ramstein & Ramstein-Miesenbach',
    label: 'Connected hub',
    copy: 'A practical center for base-adjacent errands, family routines, local shops, restaurants, and regional rail access.',
  },
  {
    name: 'Landstuhl',
    label: 'Compact town',
    copy: 'A smaller town center with everyday services, rail connections, wooded surroundings, and quick access across the western KMC area.',
  },
  {
    name: 'The surrounding villages',
    label: 'Village rhythm',
    copy: 'Places such as Kindsbach, Mackenbach, Weilerbach, Bann, Queidersbach, and Bruchmühlbach-Miesau each have their own services, events, and waste calendar.',
  },
]

const lifeTopics = [
  {
    category: 'Culture',
    title: 'Small courtesies go a long way',
    summary: 'German interactions can feel more formal at first, but the pattern is easy to learn.',
    tips: [
      'Say “Guten Morgen,” “Guten Tag,” or a simple “Hallo” when entering a small shop or meeting a neighbor.',
      'Use “Sie” until invited to use “du,” especially with officials, landlords, and older adults.',
      'Be on time for appointments and tell someone early if you will be delayed.',
      'A direct answer is usually meant to be clear, not unfriendly.',
    ],
  },
  {
    category: 'Culture',
    title: 'Know the neighborhood rhythm',
    summary: 'Shared buildings and villages place a high value on consideration and predictable routines.',
    tips: [
      'Follow the quiet hours written in your lease or local rules; Sundays and public holidays are generally treated as rest days.',
      'Ask before hosting a loud gathering and introduce yourself to immediate neighbors.',
      'Local clubs—Vereine—are one of the easiest ways to meet people beyond work.',
      'Keep sidewalks, shared stairwells, parking areas, and assigned bins tidy.',
    ],
  },
  {
    category: 'Recycling',
    title: 'Learn the household bins first',
    summary: 'Waste rules differ between the City and County of Kaiserslautern, so your address determines the exact system and pickup calendar.',
    tips: [
      'Yellow bag or yellow bin: empty sales packaging made of plastic, metal, or mixed materials—not every plastic household item.',
      'Paper bin: clean paper and cardboard; flatten boxes and keep food-soiled paper out.',
      'Bio bin: food and garden waste accepted by your municipality.',
      'Residual bin: non-recyclable household waste that does not belong in another stream.',
    ],
  },
  {
    category: 'Recycling',
    title: 'Handle glass, deposits, and special waste separately',
    summary: 'A few common items never belong in the regular household recycling bins.',
    tips: [
      'Sort non-deposit glass at public containers by clear, green, and brown glass; follow posted drop-off hours.',
      'Return bottles and cans marked “Pfand” to a supermarket deposit machine and use the receipt at checkout.',
      'Use the local recycling center or scheduled collection for electronics, chemicals, and bulky waste.',
      'Check the waste guide for your municipality before setting anything beside the bins.',
    ],
  },
  {
    category: 'Shopping',
    title: 'Plan around Sundays and holidays',
    summary: 'Most regular shops and supermarkets close on Sundays and public holidays, with limited exceptions and occasional designated shopping Sundays.',
    tips: [
      'Finish the main grocery run by Saturday and check holiday closures before a long weekend.',
      'Bakeries, fuel stations, restaurants, and a few travel-location shops may have limited Sunday hours.',
      'Kaiserslautern announces occasional “verkaufsoffene Sonntage” when participating stores open for a Sunday afternoon.',
      'Hours can change by location—check the specific shop before traveling.',
    ],
  },
  {
    category: 'Shopping',
    title: 'Expect a different checkout routine',
    summary: 'German supermarkets move quickly and assume shoppers will bring or purchase what they need to carry groceries home.',
    tips: [
      'Bring reusable bags and pack your own groceries after they are scanned.',
      'Keep a €1 or €2 coin—or a reusable token—for many shopping carts.',
      'Cards are widely accepted, but keeping some euros helps at markets, bakeries, and smaller businesses.',
      'Use weekly markets and bakeries to learn local seasonal foods and everyday phrases.',
    ],
  },
  {
    category: 'Getting around',
    title: 'Build a local transportation toolkit',
    summary: 'The area is car-oriented in places, but regional trains and buses can cover many routine trips.',
    tips: [
      'Save your nearest station and bus stop, not just the nearest city.',
      'Use DB Navigator for rail planning and check the regional operator for local bus changes.',
      'Look for parking signs, time limits, and the blue parking-disc symbol before walking away from the car.',
      'Expect narrow village streets and leave driveways, sidewalks, and emergency access clear.',
    ],
  },
  {
    category: 'Home',
    title: 'Let the house work the German way',
    summary: 'A few habits help with comfort, moisture, utility use, and good relations with a landlord.',
    tips: [
      'Practice brief, wide-open window ventilation—Stoßlüften—instead of leaving windows tilted for long periods.',
      'Learn how your heat, shutters, cellar, meters, and shared spaces work during the handover.',
      'Photograph the move-in condition and keep the signed handover record with your lease.',
      'Ask which bins, sweeping, snow, garden, or hallway duties belong to the tenant.',
    ],
  },
]

const lifeCategories = ['All', ...new Set(lifeTopics.map((topic) => topic.category))]

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>
}

function InstallPwa() {
  const [installPrompt, setInstallPrompt] = useState(null)
  const [showGuide, setShowGuide] = useState(false)
  const [isInstalled, setIsInstalled] = useState(() =>
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true,
  )

  useEffect(() => {
    const captureInstallPrompt = (event) => {
      event.preventDefault()
      setInstallPrompt(event)
    }
    const markInstalled = () => {
      setIsInstalled(true)
      setShowGuide(false)
      setInstallPrompt(null)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setShowGuide(false)
    }

    window.addEventListener('beforeinstallprompt', captureInstallPrompt)
    window.addEventListener('appinstalled', markInstalled)
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt)
      window.removeEventListener('appinstalled', markInstalled)
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [])

  const beginInstall = async () => {
    if (!installPrompt) {
      setShowGuide(true)
      return
    }

    await installPrompt.prompt()
    const choice = await installPrompt.userChoice
    setInstallPrompt(null)
    if (choice.outcome === 'accepted') setIsInstalled(true)
  }

  if (isInstalled) return null

  return (
    <>
      <button className="install-pwa-button" onClick={beginInstall} aria-haspopup="dialog">
        <span className="install-pwa-icon" aria-hidden="true">↓</span>
        Install this app
      </button>

      {showGuide && (
        <div className="install-modal-backdrop" onMouseDown={() => setShowGuide(false)}>
          <section
            className="install-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-modal-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="install-modal-close" onClick={() => setShowGuide(false)} aria-label="Close installation guide">×</button>
            <p className="eyebrow">Keep your companion close</p>
            <h2 id="install-modal-title">Install the app</h2>
            <p className="install-modal-intro">Add Germany PCS Companion to your home screen for quick, app-like access.</p>

            <div className="install-guide-grid">
              <article>
                <span className="install-guide-number">iOS</span>
                <h3>iPhone or iPad</h3>
                <ol>
                  <li>Open this website in <strong>Safari</strong>.</li>
                  <li>Tap the <strong>Share</strong> button—the square with an upward arrow.</li>
                  <li>Select <strong>Add to Home Screen</strong>.</li>
                  <li>Choose a name if desired, then tap <strong>Add</strong>.</li>
                </ol>
              </article>
              <article>
                <span className="install-guide-number">Android</span>
                <h3>Android phone or tablet</h3>
                <ol>
                  <li>Open this website in Chrome, Edge, Brave, or Samsung Internet.</li>
                  <li>Open the browser menu and select <strong>Install app</strong> or <strong>Add to Home screen</strong>. In Samsung Internet, use the install icon in the address bar.</li>
                  <li>Confirm the name, then tap <strong>Install</strong> or <strong>Add</strong>.</li>
                </ol>
              </article>
            </div>

            <button className="button button--primary install-modal-done" onClick={() => setShowGuide(false)}>Got it</button>
          </section>
        </div>
      )}
    </>
  )
}

function Directory({ onHome, onPlan }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const normalizedQuery = query.trim().toLowerCase()
  const visibleEntries = directoryEntries.filter((entry) => {
    const matchesCategory = category === 'All' || entry.category === category
    const searchable = [
      entry.name,
      entry.category,
      entry.location,
      entry.area,
      entry.phone,
      entry.alternatePhone,
      entry.dsn,
      entry.hours,
      entry.services,
      ...entry.steps,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
    return matchesCategory && (!normalizedQuery || searchable.includes(normalizedQuery))
  })

  const mapUrl = (entry) =>
    entry.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${entry.name}, ${entry.location}`)}`

  return (
    <div className="companion-shell directory-shell">
      <header className="companion-header">
        <button className="brand brand-button" onClick={onHome} aria-label="Return to Germany PCS Companion home">
          <span className="brand-mark">G</span>
          <span className="brand-copy">
            <strong>GERMANY</strong>
            <span>PCS Companion</span>
          </span>
        </button>
        <p>Offices, services & support</p>
        <div className="companion-nav-actions">
          <button className="home-link" onClick={onPlan}>My plan</button>
          <button className="home-link" onClick={onHome}>Exit</button>
        </div>
      </header>

      <main className="directory-main">
        <section className="directory-hero">
          <div>
            <p className="eyebrow">Cross-base service directory</p>
            <h1>Find the right place,<br /><span>when you need it.</span></h1>
          </div>
          <p>Search offices, schools, clinics, and support services. Every listing shows which part of your PCS plan it supports.</p>
        </section>

        <a className="emergency-banner" href="tel:112">
          <span className="emergency-icon" aria-hidden="true">!</span>
          <span>
            <small>Emergency in Germany</small>
            <strong>Call 112</strong>
          </span>
          <span className="emergency-call">Tap to call →</span>
        </a>

        <section className="directory-tools" aria-label="Directory filters">
          <label className="directory-search">
            <span>Search</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Office, service, city, phone, or step"
            />
          </label>
          <div className="directory-filters" aria-label="Filter by category">
            {directoryCategories.map((item) => (
              <button
                key={item}
                className={category === item ? 'is-active' : ''}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <div className="directory-results-heading">
          <h2>{category === 'All' ? 'All services' : category}</h2>
          <span>{visibleEntries.length} {visibleEntries.length === 1 ? 'listing' : 'listings'}</span>
        </div>

        <section className="directory-grid" aria-live="polite">
          {visibleEntries.map((entry) => (
            <article className="directory-card" key={entry.id}>
              <div className="directory-card-top">
                <span className="directory-category">{entry.category}</span>
                <span className="directory-area">{entry.area}</span>
              </div>
              <h3>{entry.name}</h3>
              <p className="directory-location">{entry.location}</p>
              {(entry.dsn || entry.hours) && (
                <dl className="directory-details">
                  {entry.dsn && <><dt>DSN</dt><dd>{entry.dsn}</dd></>}
                  {entry.hours && <><dt>Hours</dt><dd>{entry.hours}</dd></>}
                </dl>
              )}
              <p className="directory-services">{entry.services}</p>
              <div className="directory-step-links">
                <small>Supports these steps</small>
                {entry.steps.map((step) => <span key={step}>{step}</span>)}
              </div>
              <div className="directory-actions">
                {entry.phone ? (
                  <>
                    <a className="directory-action directory-action--primary" href={`tel:${entry.phoneHref || entry.phone.replace(/[^\d+]/g, '')}`}>
                      Call {entry.phone}
                    </a>
                    {entry.alternatePhone && (
                      <a className="directory-action directory-action--primary" href={`tel:${entry.alternatePhone.replace(/[^\d+]/g, '')}`}>
                        Call {entry.alternatePhone}
                      </a>
                    )}
                  </>
                ) : (
                  <span className="directory-no-phone">Phone not listed in source</span>
                )}
                {entry.website && (
                  <a className="directory-action" href={entry.website} target="_blank" rel="noreferrer">
                    {entry.websiteLabel || 'Official website'} ↗
                  </a>
                )}
                <a className="directory-action" href={mapUrl(entry)} target="_blank" rel="noreferrer">
                  Open in Maps ↗
                </a>
              </div>
            </article>
          ))}
          {visibleEntries.length === 0 && (
            <div className="directory-empty">
              <h3>No matching services</h3>
              <p>Try a city, building number, phone number, or a broader category.</p>
            </div>
          )}
        </section>

        <div className="planner-reassurance directory-disclaimer">
          <span aria-hidden="true">i</span>
          <p><strong>Public reference information.</strong> Details were extracted from the supplied storyboard. Confirm current hours, eligibility, fees, and appointment requirements before traveling.</p>
        </div>
      </main>
    </div>
  )
}

function Companion({ onHome, onDirectory }) {
  const [activePhase, setActivePhase] = useState('Offer & orders')
  const [completed, setCompleted] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('germany-pcs-progress')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('germany-pcs-progress', JSON.stringify(completed))
  }, [completed])

  const visibleTasks = phaseTasks.filter((task) => task.phase === activePhase)
  const activeTip = phaseTips[activePhase]
  const taskGroups = activePhase === 'Offer & orders'
    ? [
        ['After your Tentative Job Offer (TJO)', visibleTasks.filter((task) => task.milestone === 'After your Tentative Job Offer (TJO)')],
        ['After your Final Job Offer (FJO)', visibleTasks.filter((task) => task.milestone === 'After your Final Job Offer (FJO)')],
      ]
    : [[null, visibleTasks]]
  const completion = Math.round((completed.length / phaseTasks.length) * 100)

  const toggleTask = (id) => {
    setCompleted((current) =>
      current.includes(id) ? current.filter((taskId) => taskId !== id) : [...current, id],
    )
  }

  return (
    <div className="companion-shell">
      <header className="companion-header">
        <button className="brand brand-button" onClick={onHome} aria-label="Return to Germany PCS Companion home">
          <span className="brand-mark">G</span>
          <span className="brand-copy">
            <strong>GERMANY</strong>
            <span>PCS Companion</span>
          </span>
        </button>
        <p>Your personal arrival plan</p>
        <div className="companion-nav-actions">
          <button className="home-link" onClick={onDirectory}>Directory</button>
          <button className="home-link" onClick={onHome}>Exit plan</button>
        </div>
      </header>

      <main className="planner">
        <aside className="planner-sidebar">
          <p className="eyebrow">Your journey</p>
          <h2>One move.<br />One step at a time.</h2>
          <div className="progress-card">
            <div>
              <span>Overall progress</span>
              <strong>{completion}%</strong>
            </div>
            <div className="progress-bar" aria-label={`${completion}% complete`}>
              <span style={{ width: `${completion}%` }} />
            </div>
            <small>{completed.length} of {phaseTasks.length} essential steps complete</small>
          </div>
          <p className="device-note">Your checkmarks are saved only on this device.</p>
        </aside>

        <section className="planner-main">
          <div className="planner-intro">
            <div>
              <p className="eyebrow">Your personalized roadmap</p>
              <h1>Where are you<br /><span>right now?</span></h1>
            </div>
            <p>Choose the stage that matches your move. We’ll keep the immediate tasks in focus while your full plan stays close at hand.</p>
          </div>

          <div className="phase-tabs" role="tablist" aria-label="PCS journey stage">
            {journeyStages.map(([number, title]) => (
              <button
                key={title}
                className={activePhase === title ? 'is-active' : ''}
                onClick={() => setActivePhase(title)}
                role="tab"
                aria-selected={activePhase === title}
              >
                <span>{number}</span>
                {title}
              </button>
            ))}
          </div>

          <div className="task-heading">
            <div>
              <p className="eyebrow">Focus now</p>
              <h2>{activePhase}</h2>
            </div>
            <span>{visibleTasks.length} essential {visibleTasks.length === 1 ? 'step' : 'steps'}</span>
          </div>

          {activeTip && (
            <aside className="good-to-know" aria-labelledby="good-to-know-title">
              <span className="good-to-know-icon" aria-hidden="true">i</span>
              <div>
                <p className="good-to-know-label">{activeTip.label}</p>
                <h3 id="good-to-know-title">{activeTip.title}</h3>
                <p>{activeTip.detail}</p>
                <small>{activeTip.note}</small>
              </div>
            </aside>
          )}

          <div className="task-groups">
            {taskGroups.map(([milestone, tasks]) => (
              <section className="task-group" key={milestone || activePhase} aria-label={milestone || activePhase}>
                {milestone && <h3 className="task-group-heading">{milestone}</h3>}
                <div className="task-list">
                  {tasks.map((task) => {
                    const isDone = completed.includes(task.id)
                    return (
                      <article className={`task-card ${isDone ? 'is-done' : ''}`} key={task.id}>
                        <button
                          className="task-check"
                          onClick={() => toggleTask(task.id)}
                          aria-label={`${isDone ? 'Mark incomplete' : 'Mark complete'}: ${task.title}`}
                          aria-pressed={isDone}
                        >
                          {isDone ? '✓' : ''}
                        </button>
                        <div>
                          <div className="task-meta">
                            <span>{task.window}</span>
                            <span>{task.tag}</span>
                          </div>
                          <h3>{task.title}</h3>
                          <p>{task.detail}</p>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>

          <div className="planner-reassurance">
            <span aria-hidden="true">i</span>
            <p><strong>Unofficial testing guide.</strong> This site is not affiliated with any government agency, installation, base, unit, or employer. Confirm requirements with your authorized relocation or HR contact before acting.</p>
          </div>
        </section>
      </main>
    </div>
  )
}

function LifeInGermany({ onHome, onPlan, onDirectory }) {
  const [category, setCategory] = useState('All')
  const visibleTopics = lifeTopics.filter((topic) => category === 'All' || topic.category === category)

  return (
    <div className="companion-shell life-shell">
      <header className="companion-header">
        <button className="brand brand-button" onClick={onHome} aria-label="Return to Germany PCS Companion home">
          <span className="brand-mark">G</span>
          <span className="brand-copy">
            <strong>GERMANY</strong>
            <span>PCS Companion</span>
          </span>
        </button>
        <p>Everyday life in your new community</p>
        <div className="companion-nav-actions">
          <button className="home-link" onClick={onDirectory}>Directory</button>
          <button className="home-link" onClick={onPlan}>My plan</button>
          <button className="home-link" onClick={onHome}>Exit</button>
        </div>
      </header>

      <main className="life-main">
        <section className="life-hero">
          <div>
            <p className="eyebrow">Explore life in the KMC area</p>
            <h1>Feel local,<br /><span>one routine at a time.</span></h1>
          </div>
          <div className="life-hero-copy">
            <p>Get to know the Ramstein–Kaiserslautern–Landstuhl area through the things that shape a real week: neighbors, recycling, groceries, transportation, village life, and the small cultural cues nobody explains at first.</p>
            <div className="life-quick-start">
              <small>Your first local week</small>
              <ul>
                <li>Find your municipality’s waste calendar.</li>
                <li>Save your closest grocery store, bakery, pharmacy, and train or bus stop.</li>
                <li>Plan the first Sunday and public holiday before everything closes.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="local-area-section" aria-labelledby="local-area-heading">
          <div className="life-section-heading">
            <div>
              <p className="eyebrow">Your local geography</p>
              <h2 id="local-area-heading">One region,<br />many rhythms.</h2>
            </div>
            <p>The area works less like one city and more like a connected collection of towns, installations, and villages. Your home address will shape your commute, waste rules, school route, and everyday errands.</p>
          </div>
          <div className="local-area-grid">
            {localAreas.map((area, index) => (
              <article key={area.name}>
                <span className="local-area-number">0{index + 1}</span>
                <p className="path-card__eyebrow">{area.label}</p>
                <h3>{area.name}</h3>
                <p>{area.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="life-topics" aria-labelledby="life-topics-heading">
          <div className="life-section-heading">
            <div>
              <p className="eyebrow">The everyday guide</p>
              <h2 id="life-topics-heading">What changes<br />after you arrive.</h2>
            </div>
            <p>Choose a topic and learn the local pattern. These are practical starting points; city, county, lease, and village rules may differ by address.</p>
          </div>

          <div className="life-topic-filters" aria-label="Filter everyday-life topics">
            {lifeCategories.map((item) => (
              <button
                key={item}
                className={category === item ? 'is-active' : ''}
                onClick={() => setCategory(item)}
                aria-pressed={category === item}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="life-topic-grid" aria-live="polite">
            {visibleTopics.map((topic) => (
              <article className="life-topic-card" key={topic.title}>
                <span className="life-topic-label">{topic.category}</span>
                <h3>{topic.title}</h3>
                <p>{topic.summary}</p>
                <ul>
                  {topic.tips.map((tip) => <li key={tip}>{tip}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="local-resources" aria-labelledby="local-resources-heading">
          <div>
            <p className="eyebrow">Keep the official sources close</p>
            <h2 id="local-resources-heading">Local answers,<br />when details matter.</h2>
          </div>
          <div className="local-resource-links">
            <a href="https://www.welcome-to-rlp.org/guide/overview" target="_blank" rel="noreferrer">
              <span>Living guide</span>
              <strong>Welcome to Rheinland-Pfalz</strong>
              <ArrowIcon />
            </a>
            <a href="https://www.kaiserslautern-kreis.de/verwaltung/abfallwirtschaft/" target="_blank" rel="noreferrer">
              <span>County addresses</span>
              <strong>Kaiserslautern County waste information</strong>
              <ArrowIcon />
            </a>
            <a href="https://stadtbildpflege-kaiserslautern.de/" target="_blank" rel="noreferrer">
              <span>City addresses</span>
              <strong>City of Kaiserslautern waste information</strong>
              <ArrowIcon />
            </a>
            <a href="https://www3.kaiserslautern.de/gaco/" target="_blank" rel="noreferrer">
              <span>Community help</span>
              <strong>German-American Community Office</strong>
              <ArrowIcon />
            </a>
          </div>
        </section>

        <div className="planner-reassurance life-disclaimer">
          <span aria-hidden="true">i</span>
          <p><strong>Address-specific rules matter.</strong> Confirm collection schedules, quiet hours, parking restrictions, and local services with your municipality, landlord, or the responsible office.</p>
        </div>
      </main>
    </div>
  )
}

function App() {
  const getViewFromHash = () => {
    if (window.location.hash === '#plan') return 'plan'
    if (window.location.hash === '#directory') return 'directory'
    if (window.location.hash === '#life') return 'life'
    return 'home'
  }
  const [activeView, setActiveView] = useState(getViewFromHash)

  useEffect(() => {
    const handleHash = () => setActiveView(getViewFromHash())
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const startPlan = () => {
    window.location.hash = 'plan'
    setActiveView('plan')
  }

  const openDirectory = () => {
    window.location.hash = 'directory'
    setActiveView('directory')
  }

  const openLife = () => {
    window.location.hash = 'life'
    setActiveView('life')
    window.scrollTo(0, 0)
  }

  const returnHome = () => {
    window.history.pushState(null, '', window.location.pathname)
    setActiveView('home')
    window.scrollTo(0, 0)
  }

  if (activeView === 'plan') {
    return <><Companion onHome={returnHome} onDirectory={openDirectory} /><InstallPwa /></>
  }

  if (activeView === 'directory') {
    return <><Directory onHome={returnHome} onPlan={startPlan} /><InstallPwa /></>
  }

  if (activeView === 'life') {
    return <><LifeInGermany onHome={returnHome} onPlan={startPlan} onDirectory={openDirectory} /><InstallPwa /></>
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Germany PCS Companion home">
          <span className="brand-mark">G</span>
          <span className="brand-copy">
            <strong>GERMANY</strong>
            <span>PCS Companion</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#journey">Your journey</a>
          <button onClick={openDirectory}>Directory</button>
          <button onClick={openLife}>Explore</button>
          <a href="#about">About this guide</a>
        </nav>

        <div className="header-actions">
          <button className="mobile-directory-action" onClick={openDirectory}>Directory</button>
          <button className="header-action" onClick={startPlan} aria-label="Find my next step">
            Find my next step
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </header>

      <main id="top">
        <section
          className="hero hero--map-background section-pad"
          style={{ '--hero-map-image': `url("${assetUrl('/images/lrmc-area-hand-drawn-map-3x2-transparent.png')}")` }}
        >
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="eyebrow-dot" />
              Welcome to the KMCC family
            </p>
            <h1>
              Your move to Germany,
              <span>made clearer.</span>
            </h1>
            <p className="hero-lede">
              The Germany PCS Companion brings the details of an overseas move
              into one calm, step-by-step experience—from your first job offer
              through arrival and your first 90 days at home in Germany.
            </p>
            <div className="hero-actions">
              <button className="button button--primary" onClick={startPlan}>
                Start my journey
                <span aria-hidden="true">→</span>
              </button>
              <button className="text-link" onClick={openLife}>
                Explore life in Germany
                <ArrowIcon />
              </button>
            </div>
            <p className="privacy-note">
              <span>No account required</span>
              <span className="privacy-note__dot" aria-hidden="true">•</span>
              <span>Your progress stays on your device</span>
            </p>
          </div>

        </section>

        <section className="journey section-pad" id="journey">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your path, at your pace</p>
              <h2>We’ll meet you where you are.</h2>
            </div>
            <p>
              Tell us where you are in the process and the Companion will shape
              what you see—so you can focus on today without losing sight of
              what’s ahead.
            </p>
          </div>

          <ol className="journey-track">
            {journeyStages.map(([number, title, copy], index) => (
              <li key={title} className={index === 0 ? 'is-active' : ''}>
                <span className="stage-number">{number}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
          </ol>

          <button className="journey-prompt" onClick={startPlan}>
            <span className="journey-prompt__number">01</span>
            <span>
              <small>Start here</small>
              <strong>I’ve received my Tentative Job Offer (TJO)</strong>
            </span>
            <span className="journey-prompt__arrow" aria-hidden="true">
              →
            </span>
          </button>
        </section>

        <section className="explore section-pad" id="explore">
          <div className="section-heading section-heading--center">
            <div>
              <p className="eyebrow">Explore life in your new community</p>
              <h2>Germany starts right outside your door.</h2>
            </div>
            <p>
              A practical introduction to culture, everyday systems, and the
              Ramstein–Kaiserslautern–Landstuhl area.
            </p>
          </div>

          <div className="path-grid">
            {localLifePreviews.map((path) => (
              <article className={`path-card ${path.className}`} key={path.title}>
                <p className="path-card__eyebrow">{path.eyebrow}</p>
                <h3>{path.title}</h3>
                <p>{path.copy}</p>
                <button onClick={openLife}>
                  {path.link}
                  <ArrowIcon />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="welcome section-pad" id="about">
          <div className="welcome-image">
            <img
              src={assetUrl('/images/german-shepherd-spring.png')}
              alt="A happy illustrated German shepherd beneath a flowering tree in Germany"
            />
          </div>
          <div className="welcome-copy">
            <p className="eyebrow">About this guide</p>
            <h2>Clear guidance for the move—and the life around it.</h2>
            <p className="welcome-intro">
              Built for KMCC employees and families moving to Germany, this
              companion connects the official PCS milestones with the everyday
              questions that begin once Germany becomes home.
            </p>

            <div className="about-principles">
              <article>
                <span>01</span>
                <strong>Plan the move</strong>
                <p>Follow the path from your job offer and orders through arrival and the first 90 days.</p>
              </article>
              <article>
                <span>02</span>
                <strong>Understand the place</strong>
                <p>Learn the local offices, culture, routines, and communities around Ramstein, Kaiserslautern, and Landstuhl.</p>
              </article>
              <article>
                <span>03</span>
                <strong>Keep control</strong>
                <p>No account is required. Your checklist progress stays on the device you are using.</p>
              </article>
            </div>

            <div className="about-actions">
              <button className="text-link" onClick={startPlan}>
                Open my arrival plan
                <ArrowIcon />
              </button>
              <span>Start anywhere. Return anytime.</span>
            </div>
            <div className="testing-notice">
              <strong>Unofficial public testing edition</strong>
              <span>
                This guide is unaffiliated with any government agency, base,
                installation, unit, organization, or employer. Confirm official
                requirements, eligibility, deadlines, and benefits with your
                authorized HR, relocation, or servicing office.
              </span>
            </div>
          </div>
        </section>

        <section className="closing section-pad">
          <img
            src={assetUrl('/images/heidelberger-schloss.jpg')}
            alt="Aerial view of Heidelberg Castle, the Neckar River, and the surrounding wooded hills"
          />
          <div className="closing-overlay" />
          <div className="closing-copy">
            <p className="eyebrow">Ready when you are</p>
            <h2>A more confident move starts with one clear next step.</h2>
            <button className="button button--light" onClick={startPlan}>
              Build my arrival plan
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      </main>
      <InstallPwa />

      <footer className="site-footer section-pad">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">G</span>
          <span className="brand-copy">
            <strong>GERMANY</strong>
            <span>PCS Companion</span>
          </span>
        </a>
        <p>From job offer to settled in Germany.</p>
        <div className="footer-links">
          <button onClick={openLife}>Explore life</button>
          <button onClick={openDirectory}>Directory</button>
          <a href="#top">Accessibility</a>
          <a href="#top">Privacy</a>
          <a href="#about">Testing disclaimer</a>
        </div>
      </footer>
    </div>
  )
}

export default App
