/*
  The Fair Plumber — site config
  Compiled from the company's existing website (fairplumber.com) on 2026-07-15:
  locations, phone numbers, license number, and service area list.
  Office hours were not published on the source site, so the site leads with
  "24/7 Emergency Service" messaging instead of fixed hours — confirm exact
  office hours with the client before launch if they want them listed.
*/
window.TFP_CONFIG = {
  PRIMARY_PHONE_DISPLAY: "630.833.0808",
  PRIMARY_PHONE_TEL: "+16308330808",
  LICENSE_NUMBER: "IL Plumbing Contractor No. 055-042914",
  YEARS_IN_BUSINESS: "30+",
  REVIEW_COUNT: 733,
  REVIEW_RATING: "5.0",

  SOCIALS: {
    facebook: "https://www.facebook.com/profile.php?id=100066674542923",
    instagram: "https://www.instagram.com/the_fair_plumber/",
    youtube: "https://www.youtube.com/channel/UC52zZT4hpGARpjcjeXvYP5g",
    twitter: "https://twitter.com/TheFairPlumber"
  },

  LOCATIONS: [
    {
      id: "elmhurst",
      name: "Elmhurst",
      address1: "846 N. York St. Suite A",
      address2: "Elmhurst, IL 60126",
      phoneDisplay: "630.833.0808",
      phoneTel: "+16308330808",
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=846+N+York+St+Suite+A,+Elmhurst,+IL+60126",
      mapEmbed: "https://www.google.com/maps?q=846+N+York+St+Suite+A,+Elmhurst,+IL+60126&output=embed"
    },
    {
      id: "mount-prospect",
      name: "Mount Prospect",
      address1: "668 E. Northwest Hwy.",
      address2: "Mount Prospect, IL 60056",
      phoneDisplay: "847.452.9444",
      phoneTel: "+18474529444",
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=668+E+Northwest+Hwy,+Mount+Prospect,+IL+60056",
      mapEmbed: "https://www.google.com/maps?q=668+E+Northwest+Hwy,+Mount+Prospect,+IL+60056&output=embed"
    },
    {
      id: "schaumburg",
      name: "Schaumburg",
      address1: "715 E. Golf Rd. Suite 200A-2",
      address2: "Schaumburg, IL 60173",
      phoneDisplay: "847.452.9444",
      phoneTel: "+18474529444",
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=715+E+Golf+Rd+Suite+200A-2,+Schaumburg,+IL+60173",
      mapEmbed: "https://www.google.com/maps?q=715+E+Golf+Rd+Suite+200A-2,+Schaumburg,+IL+60173&output=embed"
    },
    {
      id: "winnetka",
      name: "Winnetka",
      address1: "723 Elm St Suite 23",
      address2: "Winnetka, IL 60093",
      phoneDisplay: "847.452.9444",
      phoneTel: "+18474529444",
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=723+Elm+St+Suite+23,+Winnetka,+IL+60093",
      mapEmbed: "https://www.google.com/maps?q=723+Elm+St+Suite+23,+Winnetka,+IL+60093&output=embed"
    },
    {
      id: "bensenville",
      name: "Bensenville",
      address1: "211 Beeline Dr Unit 5",
      address2: "Bensenville, IL 60106",
      phoneDisplay: "630.833.0808",
      phoneTel: "+16308330808",
      mapsUrl: "https://www.google.com/maps/dir/?api=1&destination=211+Beeline+Dr+Unit+5,+Bensenville,+IL+60106",
      mapEmbed: "https://www.google.com/maps?q=211+Beeline+Dr+Unit+5,+Bensenville,+IL+60106&output=embed"
    }
  ],

  SUBURBS: [
    "Arlington Heights", "Bensenville", "Berkeley", "Chicago", "Des Plaines",
    "Elmhurst", "Franklin Park", "Glencoe", "Highland Park", "Kenilworth",
    "Lombard", "Melrose Park", "Morton Grove", "Mount Prospect", "Naperville",
    "Northlake", "Oak Brook", "Prospect Heights", "Schaumburg", "Schiller Park",
    "Villa Park", "Wheaton", "Wilmette", "Winnetka", "Wood Dale"
  ]
};
