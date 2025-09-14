// Support Controllers

exports.getHelpCenter = (req, res, next) =>{
  res.render("webPages/Support/helpCenter",{pageTitle: 'help Center'})
}


exports.getAirCover = (req, res, next) =>{
  res.render("webPages/Support/airCover",{pageTitle: 'AirCover'})
}

exports.getAntiDis = (req, res, next) =>{
  res.render("webPages/Support/antiDiscrimination",{pageTitle: 'Anti'})
}

exports.getDisSupport = (req, res, next) =>{
  res.render("webPages/Support/dis_Support",{pageTitle: 'Dis-Support'})
}

exports.getCancelOption = (req, res, next) =>{
  res.render("webPages/Support/cancelOptions",{pageTitle: 'Cancellation options'})
}


// Hosting

exports.getYourHome = (req, res, next) =>{
  res.render("webPages/Hosting/yourHome",{pageTitle: 'Airbnb Your Home'})
}


exports.getAirCover = (req, res, next) =>{
  res.render("webPages/Hosting/airCoverHost",{pageTitle: 'AirCover for Host'})
}


exports.getExploreHosting = (req, res, next) =>{
  res.render("webPages/Hosting/Explorehosting",{pageTitle: 'Explore hosting resources'})
}

exports.getCommunityforum = (req, res, next) =>{
  res.render("webPages/Hosting/Communityforum",{pageTitle: 'Community Forum'})
}

// Company Controllers

exports.getAboutus = (req, res, next) =>{
  res.render("webPages/Company/aboutUs",{pageTitle: 'About-us'})
}


exports.getCareers = (req, res, next) =>{
  res.render("webPages/Company/Careers",{pageTitle: 'Careers'})
}


exports.getInvestors = (req, res, next) =>{
  res.render("webPages/Company/Investors",{pageTitle: 'Investors'})
}


exports.getNewsroom = (req, res, next) =>{
  res.render("webPages/Company/Newsroom",{pageTitle: 'Newsroom'})
}


//  Discover

exports.getTrustSafety = (req, res, next) =>{
  res.render("webPages/Discover/TrustSafety",{pageTitle: 'Trust & Safety'})
}

exports.getTravelCredit = (req, res, next) =>{
  res.render("webPages/Discover/TravelCredit",{pageTitle: 'Travel Credit'})
}

exports.getGiftCards = (req, res, next) =>{
  res.render("webPages/Discover/Giftcards",{pageTitle: 'Gift cards'})
}


// copy write

exports.getPrivacy = (req, res, next) =>{
  res.render("webPages/Privacy",{pageTitle: 'Privacy'})
}

exports.getTerms = (req, res, next) =>{
  res.render("webPages/Terms",{pageTitle: 'Terms'})
}

exports.getSitemap = (req, res, next) =>{
  res.render("webPages/Sitemap",{pageTitle: 'Sitemap'})
}