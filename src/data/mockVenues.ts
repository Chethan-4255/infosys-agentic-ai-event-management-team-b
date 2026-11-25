import { VenueItem } from "../types";

const PHOTOS = [
  "https://unsplash.com",
  "https://unsplash.com",
  "https://unsplash.com",
  "https://unsplash.com",
];

const mk = (
  id: string,
  name: string,
  city: string,
  state: VenueItem["state"],
  address: string,
  capacity: number,
  rating: number,
  reviewCount: number,
  foodQuality: VenueItem["foodQuality"],
  topReview: string,
  reviewerName: string,
  facilities: string[],
  photoIdx: number,
  upcomingEventsCount: number
): VenueItem => ({
  id,
  name,
  city,
  state,
  address,
  capacity,
  rating,
  reviewCount,
  foodQuality,
  topReview,
  reviewerName,
  facilities,
  imageUrl: PHOTOS[photoIdx % PHOTOS.length],
  mapUrl: "https://google.com" + encodeURIComponent(name + ", " + city + ", " + state),
  upcomingEventsCount,

});

export const VENUES_DATA: VenueItem[] = [
  // TAMIL NADU
  mk("v1", "Chennai Trade Centre — Convention Hall", "Chennai", "Tamil Nadu", "Mount Poonamallee Rd, Nandambakkam", 1500, 4.8, 342, "Excellent (4.8★)", "Massive hall with seamless AC and authentic South Indian buffet catering.", "Aravind K.", ["2 Gbps Wi-Fi", "VIP Lounge", "Valet Parking"], 0, 5),
  mk("v2", "CODISSIA Trade Fair Complex", "Coimbatore", "Tamil Nadu", "G.V. Fair Grounds, Avinashi Rd", 1200, 4.7, 218, "Very Good (4.5★)", "Spacious exhibition bays and great filter coffee & snack counters.", "Divya S.", ["Exhibition Bays", "Food Court", "Power Backup"], 1, 4),
  mk("v3", "IIT Madras Research Park Auditorium", "Chennai", "Tamil Nadu", "Kanagam Rd, Taramani", 450, 4.9, 189, "Excellent (4.8★)", "Best acoustics for AI conferences; healthy multi-cuisine lunch boxes.", "Prashanth R.", ["4K LED Wall", "Recording Studio", "EV Charging"], 2, 6),
  mk("v4", "TIDEL Park Main Auditorium", "Chennai", "Tamil Nadu", "Rajiv Gandhi Salai, Taramani", 350, 4.6, 154, "Very Good (4.5★)", "Easy metro/MRTS connectivity and well-organized corporate catering.", "Meenakshi V.", ["Enterprise Wi-Fi", "Breakout Rooms", "Metro Access"], 3, 3),
  mk("v5", "Kongu Convention Center", "Erode", "Tamil Nadu", "Perundurai Main Rd, Erode", 800, 4.7, 126, "Excellent (4.8★)", "Super clean auditorium near Erode with traditional banana-leaf feast options.", "Karthik M.", ["800+ Parking", "Green Rooms", "Dual Projectors"], 0, 3),
  mk("v6", "Madurai Convention & Expo Hub", "Madurai", "Tamil Nadu", "Ring Road, Mattuthavani", 650, 4.5, 98, "Very Good (4.5★)", "Modern banquet and hackathon space with prompt hospitality staff.", "Suresh B.", ["High-Speed LAN", "Dining Hall", "24/7 Security"], 1, 2),

  // KARNATAKA
  mk("v7", "Bangalore International Exhibition Centre (BIEC)", "Bengaluru", "Karnataka", "Tumkur Main Rd, Madavara", 2500, 4.8, 512, "Excellent (4.8★)", "World-class infrastructure for mega tech summits and diverse food courts.", "Neha G.", ["Mega Halls", "Metro Connectivity", "Food Plaza"], 2, 7),
  mk("v8", "Infosys Convention Center", "Bengaluru", "Karnataka", "Electronics City Phase 1", 900, 4.9, 410, "Excellent (4.8★)", "Iconic campus auditorium with zero-latency Wi-Fi and gourmet buffet.", "Rohan D.", ["Smart AV", "Campus Shuttle", "Breakout Pods"], 3, 6),
  mk("v9", "NIMHANS Convention Centre", "Bengaluru", "Karnataka", "Hosur Rd, Lakkasandra", 750, 4.6, 205, "Very Good (4.5★)", "Central Bengaluru location with tiered seating and hygienic catering.", "Ananya P.", ["Tiered Seating", "Central Location", "Dining Wing"], 0, 4),
  mk("v10", "Mysuru Infosys Multiplex & Auditorium", "Mysuru", "Karnataka", "Hebbal Electronics City", 1100, 4.9, 390, "Excellent (4.8★)", "Stunning architecture, crystal-clear sound, and multiple food courts.", "Vikram S.", ["Dolby Sound", "4 Food Courts", "Guest Suites"], 1, 5),

  // MAHARASHTRA
  mk("v11", "Jio World Convention Centre", "Mumbai", "Maharashtra", "G Block, Bandra Kurla Complex (BKC)", 3000, 4.9, 640, "Excellent (4.8★)", "Unmatched luxury, 5G coverage everywhere, and 5-star culinary spreads.", "Siddharth M.", ["5G Ready", "Concierge", "BKC Hub"], 2, 8),
  mk("v12", "IIT Bombay — Victor Menezes Convention Centre", "Mumbai", "Maharashtra", "Powai, Mumbai", 500, 4.8, 275, "Very Good (4.5★)", "Ideal for student hackathons and ideathons with great campus cafes.", "Tanvi K.", ["Hackathon Pods", "High-Speed Wi-Fi", "Auditorium"], 3, 5),
  mk("v13", "Pune International Convention Centre", "Pune", "Maharashtra", "Senapati Bapat Rd, Pune", 850, 4.7, 198, "Excellent (4.8★)", "Great networking terrace and superb Maharashtrian & continental snacks.", "Aditya J.", ["Rooftop Terrace", "Valet", "Dual Stages"], 0, 4),
  mk("v14", "CIDCO Exhibition & Convention Centre", "Navi Mumbai", "Maharashtra", "Sector 30A, Vashi", 1400, 4.5, 162, "Good (4.2★)", "Very accessible via Vashi station with ample exhibition booth space.", "Pooja N.", ["Railway Access", "Large Expo Floor", "Food Stalls"], 1, 3),

  // TELANGANA
  mk("v15", "HITEX Exhibition Center", "Hyderabad", "Telangana", "Izzat Nagar, Madhapur", 2200, 4.8, 480, "Excellent (4.8★)", "Premier Hyderabad tech venue; Hyderabadi biryani catering was a hit!", "Harsha V.", ["HITEC City", "4 Expo Halls", "VIP Dining"], 2, 6),
  mk("v16", "HICC — Novotel Convention Centre", "Hyderabad", "Telangana", "Kondapur, HITEC City", 1800, 4.9, 530, "Excellent (4.8★)", "Seamless corporate hospitality, huge parking, and top-tier buffet.", "Sneha R.", ["5-Star Catering", "30 Breakout Rooms", "Valet"], 3, 5),
  mk("v17", "T-Hub Phase 2 Innovation Arena", "Hyderabad", "Telangana", "Raidurgam, Knowledge City", 400, 4.9, 315, "Very Good (4.5★)", "Electric startup atmosphere for AI hackathons and founder pitch nights.", "Kiran T.", ["Startup Pods", "Demo Stage", "Specialty Coffee"], 0, 7),

  // KERALA
  mk("v18", "Lulu Bolgatty International Convention Centre", "Kochi", "Kerala", "Bolgatty Island, Kochi", 2000, 4.9, 460, "Excellent (4.8★)", "Waterfront views, massive pillarless hall, and authentic Kerala sadya.", "Akhil N.", ["Waterfront View", "Helipad", "Gourmet Kitchen"], 1, 4),
  mk("v19", "Technopark Travancore Hall", "Thiruvananthapuram", "Kerala", "Kazhakkoottam, Trivandrum", 550, 4.7, 174, "Very Good (4.5★)", "Right inside the IT hub with great AV setup and reliable catering.", "Lakshmi M.", ["IT Park Campus", "Fiber Internet", "Ample Parking"], 2, 3),
  mk("v20", "Cial Trade & Exhibition Centre", "Kochi", "Kerala", "Nedumbassery, Near Airport", 1000, 4.6, 142, "Good (4.2★)", "5 minutes from Kochi airport—super convenient for outstation speakers.", "Rahul P.", ["Airport Proximity", "Large Hall", "Catering Bay"], 3, 2),
];
