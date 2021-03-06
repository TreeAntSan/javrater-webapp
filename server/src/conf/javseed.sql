-- Import this with `mysql -u root -p < javrater.sql`
-- Only do this once!

USE javrater;

-- Ratings
INSERT INTO rating
  (created, updated, rating, description)
VALUES
  (NOW(), NOW(), "_", "No rating"),
  (NOW(), NOW(), "1", "Bad"),
  (NOW(), NOW(), "2", "Below Average"),
  (NOW(), NOW(), "3", "Average"),
  (NOW(), NOW(), "4", "Good"),
  (NOW(), NOW(), "5", "Great"),
  (NOW(), NOW(), "6", "Awesome");

-- Genres
INSERT INTO genre
  (created, updated, code, description)
VALUES
  (NOW(), NOW(), "STD", "Standard"),
  (NOW(), NOW(), "INC", "Incest"),
  (NOW(), NOW(), "FET", "Fetish"),
  (NOW(), NOW(), "GRO", "Gross"),
  (NOW(), NOW(), "INT", "Interesting"),
  (NOW(), NOW(), "VOY", "Voyeur"),
  (NOW(), NOW(), "IDL", "Idol"),
  (NOW(), NOW(), "OTH", "Other"),
  (NOW(), NOW(), "EWF", "Embarrassing, Weird, or Funny");

-- Tags
INSERT INTO tag
  (created, updated, category, tag, name, description)
VALUES
  (NOW(), NOW(), "Special", "ZZ", "Incomplete", "Not familiar enough with this video to make decisions on."),
  (NOW(), NOW(), "Special", "FV", "Favorite", "One of my favorites."),
  (NOW(), NOW(), "Special", "HL", "Hi-light", "Meritable within its own genre."),
  (NOW(), NOW(), "Special", "SE", "Something Else", "\"This is something else, man\" would be a way to describe this video."),
  (NOW(), NOW(), "Special", "AC", "Special Actress", "Contains the work of a noted or favorite actress."),
  (NOW(), NOW(), "Generic", "VY", "Very Young", "If this wasn't commercial porn..."),
  (NOW(), NOW(), "Generic", "YN", "Young Girls", "Teenagers, mostly."),
  (NOW(), NOW(), "Generic", "MA", "Mature Women", "Mothers and up."),
  (NOW(), NOW(), "Generic", "VD", "Very Old", "60+ year old grandmas."),
  (NOW(), NOW(), "Generic", "CP", "Creampie", "At least one creampie."),
  (NOW(), NOW(), "Generic", "CD", "CP Dedicated", "Creampies are the end of a majority of scenes."),
  (NOW(), NOW(), "Generic", "LE", "Lesbian", "Girls doing girls."),
  (NOW(), NOW(), "Generic", "SG", "School Girl", "There are girls wearing sailor uniforms..."),
  (NOW(), NOW(), "Generic", "ST", "Story", "There is a narrative of some kind, they are actors, not porn stars fucking."),
  (NOW(), NOW(), "Generic", "RL", "Realism", "Director is trying for some realism here in a <special> way."),
  (NOW(), NOW(), "Generic", "NP", "Normal People", "Not full of make-up covered models giving fake orgasms. Amateurs and authenticity are key."),
  (NOW(), NOW(), "Generic", "LB", "Lubed", "Girl is lubed and shiny for at least part of the video. Also counts for sweaty."),
  (NOW(), NOW(), "Generic", "LO", "Lolita", "Girl is acting/looking like a child."),
  (NOW(), NOW(), "Generic", "HF", "Hot Fucking", "The actors are fucking hard. A special classification that is just \"oh shit this is hot\"."),
  (NOW(), NOW(), "Interesting", "FN", "Funny", "Make you laugh with some of the stuff they do."),
  (NOW(), NOW(), "Interesting", "WD", "Weird", "Sometimes it's not even about getting a boner..."),
  (NOW(), NOW(), "Interesting", "BU", "Bully", "Usually school bullying."),
  (NOW(), NOW(), "Interesting", "BM", "Blackmail", "Girl is forced over guilt of something; having sex to get a job or good grades."),
  (NOW(), NOW(), "Interesting", "EM", "Embarrassing", "Girl is forced and made shameful or embarrassed over her actions."),
  (NOW(), NOW(), "Interesting", "TS", "Teasing", "Girl is playfully forced to do embarrassing things, mild."),
  (NOW(), NOW(), "Interesting", "SY", "Shy", "Shy, reluctant about everything - beyond embarrassing tag."),
  (NOW(), NOW(), "Interesting", "FA", "Fantasy", "Time manipulation, ghosts, body switching, mind control, etc."),
  (NOW(), NOW(), "Interesting", "GA", "Game", "Usually funny, takes crazy Japanese gameshow and puts porn in the equation."),
  (NOW(), NOW(), "Interesting", "WR", "Wrestling", "Men v women, women v women, whatever it is, there is a wrestling match!"),
  (NOW(), NOW(), "Interesting", "DR", "Doctor", "Here the check-up gets a little sexy."),
  (NOW(), NOW(), "Interesting", "DG", "Drugs/Drinks", "Girls getting drugged or drunk. Bad things happen."),
  (NOW(), NOW(), "Interesting", "SC", "School", "Takes place in or around a school, teachers are obviously often involved."),
  (NOW(), NOW(), "Interesting", "PB", "Public", "In a weird location, out in public, exhibitionists..."),
  (NOW(), NOW(), "Interesting", "SR", "Sharking", "Wonderful sharking videos."),
  (NOW(), NOW(), "Interesting", "RP", "Role-playing", "Generic costumes like nun, police, or maid; acting while acting."),
  (NOW(), NOW(), "Interesting", "CO", "Cosplay", "Costumes are involved that imply \"named\" characters."),
  (NOW(), NOW(), "Interesting", "OG", "Orgy", "Consensual group sex, not gang rapes."),
  (NOW(), NOW(), "Interesting", "SL", "Sleeping", "Whether just sleeping or drugged, girl is asleep when sexy happens."),
  (NOW(), NOW(), "Fetish", "RA", "Rape", "Forced, usually by strangers."),
  (NOW(), NOW(), "Fetish", "CR", "Crying", "Girl really isn't having much fun; ugly crying- tears, snot, etc required."),
  (NOW(), NOW(), "Fetish", "LD", "Loud", "Loud moaning, screaming, sweaty, intense orgasms, whatever."),
  (NOW(), NOW(), "Fetish", "RC", "Rough Core", "Uncomfortable and rough sex. Can involve stuff like wrestling, physical exertion."),
  (NOW(), NOW(), "Fetish", "TO", "Torture (Mild)", "Simple vibrator torture. Sensory overload, maybe a tiny bit of pain, but nothing serious."),
  (NOW(), NOW(), "Fetish", "TR", "Torture (Intense)", "A notch about rough core, usually the creepy Night24 stuff. Pain."),
  (NOW(), NOW(), "Fetish", "GR", "Gang Rape", "Forced, by multiple."),
  (NOW(), NOW(), "Fetish", "FC", "Forced Creampie", "Girl is upset -in particular- about getting creampied."),
  (NOW(), NOW(), "Fetish", "HE", "Heinous", "Some really bad shit happens. Reserved for the extra fucked up stuff."),
  (NOW(), NOW(), "Fetish", "IS", "Insemination", "Somehow separates itself from usual creampie. Point is that they're making a baby."),
  (NOW(), NOW(), "Fetish", "AB", "Abused", "Girl is being bullied, teased - different from being rough or tortured."),
  (NOW(), NOW(), "Fetish", "PN", "Punished", "Punishment and other general physical discipline or beating."),
  (NOW(), NOW(), "Fetish", "CH", "Chikan", "Girls getting molested in a crowded area."),
  (NOW(), NOW(), "Fetish", "BD", "Bondage", "Ropes, restraints, etc."),
  (NOW(), NOW(), "Fetish", "FE", "Fear", "Scared girls feeling their well being is in danger. Fearful."),
  (NOW(), NOW(), "Fetish", "OR", "Orgasm", "Girls made to cum specifically."),
  (NOW(), NOW(), "Gross", "SP", "Sperm", "Absurd amounts of jizz everywhere."),
  (NOW(), NOW(), "Gross", "PE", "Pee", "Girls peeing freely, girls inconstinent, doesn't matter."),
  (NOW(), NOW(), "Gross", "PO", "Poop", "Scat stuff... uhhgg."),
  (NOW(), NOW(), "Gross", "VO", "Vomit", "Dry heaving, retching, vomiting, all that gross stuff."),
  (NOW(), NOW(), "Other", "FO", "Foreign", "White girls, black guys, traveling, outside of Asia."),
  (NOW(), NOW(), "Other", "QV", "Quality Video", "1080p or 60fps or both. Eye candy awaits."),
  (NOW(), NOW(), "Other", "BQ", "Bad Quality", "Low pixels, bad frame rate, low bitrate."),
  (NOW(), NOW(), "Other", "UC", "Uncensored", "No mosaics here."),
  (NOW(), NOW(), "Other", "CL", "Collection", "Folder than contains many single-shots that are all pretty much identical."),
  (NOW(), NOW(), "Incest", "MO", "Mother-Son", "Also includes grandmothers-grandsons."),
  (NOW(), NOW(), "Incest", "FD", "Father-Daughter", "Also includes grandfathers-granddaughters."),
  (NOW(), NOW(), "Incest", "BS", "Brother-Sister", "Siblings in general."),
  (NOW(), NOW(), "Incest", "MD", "Mother-Daughter", "Also includes any type of lesbian incest."),
  (NOW(), NOW(), "Incest", "FI", "Faux Incest", "Step-siblings, step-parents, etc."),
  (NOW(), NOW(), "Incest", "EF", "Extended Family", "Aunts, uncles, cousins, etc."),
  (NOW(), NOW(), "Incest", "JF", "Jumble Family", "Multiple relations abound."),
  (NOW(), NOW(), "Incest", "RI", "Realistic Incest", "Realistic incest that does its best to make you believe they're related."),
  (NOW(), NOW(), "Incest", "GI", "Goofy Incest", "Not fooling anybody saying they're related."),
  (NOW(), NOW(), "Incest", "MU", "Mutual", "Taboo is there, but they love each other/are so horny together."),
  (NOW(), NOW(), "Incest", "FR", "Forced", "Family member forces another."),
  (NOW(), NOW(), "Incest", "PR", "Perversion", "Family fucking is totally accepted."),
  (NOW(), NOW(), "Incest", "BL", "Blood Relation", "Within reasoned odds that the actual people involved are related, often mother+daughter teams."),
  (NOW(), NOW(), "Voyeur", "VR", "Voyeur-Real", "This guy would probably be put in jail for this."),
  (NOW(), NOW(), "Voyeur", "VP", "Voyeur-Pseudo", "Plausible angles, but the girls are just too good to be true."),
  (NOW(), NOW(), "Voyeur", "VF", "Voyeur-Fake", "They're not fooling anyone / they're not even trying to be real here."),
  (NOW(), NOW(), "Voyeur", "MB", "Masturbation", "Spying on a girl who is masturbating is a leading piece."),
  (NOW(), NOW(), "Voyeur", "WC", "Toilet", "Spying on a girl who's using the toilet."),
  (NOW(), NOW(), "Idol", "U14", "Under 14", "Yeah, very young girls."),
  (NOW(), NOW(), "Idol", "O14", "Over 14", "Yeah, slightly less young."),
  (NOW(), NOW(), "Idol", "AD", "Adult", "Legal girls just not taking it off."),
  (NOW(), NOW(), "Girl", "GN", "Ganguro", "Orange, sparkly girls that make JWoww look normal."),
  (NOW(), NOW(), "Girl", "TN", "Tanned", "Girl is significantly tanned or tanned lined."),
  (NOW(), NOW(), "Girl", "FT", "Fit", "Trim and slim, but not buff."),
  (NOW(), NOW(), "Girl", "MS", "Muscle", "Trim and buff, showing off muscles and veins, always appears with FT."),
  (NOW(), NOW(), "Girl", "SK", "Skinny", "Usually overrides fit and muscle, girl is skin and bones."),
  (NOW(), NOW(), "Girl", "CB", "Chubby", "Fatty or big-boned girl."),
  (NOW(), NOW(), "Girl", "DA", "Dat Ass-et", "Super asses or tits."),
  (NOW(), NOW(), "Girl", "TI", "Tiny", "Super short, though not necessarily super young."),
  (NOW(), NOW(), "Girl", "TL", "Tall", "Very tall girl."),
  (NOW(), NOW(), "Girl", "BG", "Big Girl", "Girl is tall and wide, bulky, often huge tits."),
  (NOW(), NOW(), "Girl", "SH", "Short Hair", "Short haired girl."),
  (NOW(), NOW(), "Girl", "TB", "Tomboy", "Girl trying to hide her feminine side."),
  (NOW(), NOW(), "Girl", "CU", "Cute", "Shockingly cute girl."),
  (NOW(), NOW(), "Girl", "VI", "Virginal", "Someone here is a virgin, male or female; or its their first time on camera."),
  (NOW(), NOW(), "Girl", "AV", "Acted Virgin", "Obviously this is a porn actress, but her character is a virgin and really sells it."),
  (NOW(), NOW(), "Girl", "CS", "Curious", "Dunno, the girl just looks interesting. Eyes, face, demeanor, expression. Catches the eye."),
  (NOW(), NOW(), "Girl", "GF", "Goofy", "Sorta like curious, but for weird or ugly looking women."),
  (NOW(), NOW(), "Girl", "FB", "Full-bodied", "That look that FAD and FAX videos always have. Woman is full sized and ready for lovin'."),
  (NOW(), NOW(), "Series", "MUS", "Muscle", "Part of the muscle series folder. While the tag MS is there, this makes it easy to find."),
  (NOW(), NOW(), "Series", "BAK", "Bakky Series", "The Bakky Insane Series. Really heinous and twisted shit."),
  (NOW(), NOW(), "Series", "N24", "Night24", "Similar to Bakky. Really twisted shit."),
  (NOW(), NOW(), "Series", "RRA", "Real Rape", "Established subseries that involve rape crimes that are very realistic. Often outside. FAD and FAX."),
  (NOW(), NOW(), "Series", "CND", "Chikan Nakadashi", "Public rape on trains and buses + creampies."),
  (NOW(), NOW(), "Series", "GQU", "G-Queen", "Super soft-core that feature uncensored, totally bald pussy of incredibly innocent and young looking girls."),
  (NOW(), NOW(), "Series", "RTG", "Rocket Games", "Large series of incest gameshows that I have over a dozen of."),
  (NOW(), NOW(), "Series", "SPK", "Spikespen", "\"Translations\" of key incest themed JAV videos.");

INSERT INTO user
  (created, updated, name, password, type, status)
VALUES  -- password is 'password' hashed+salted with bcryptjs
  (NOW(), NOW(), "MrTest", "$2a$10$MyB4x8RE2jo2o5.2jAX5rO2X0MQrTz9q9pY/vF/3Sz8qIQRttXUJC", 0, 0);

INSERT INTO movie
  (created, updated, title, prodcode, ratingid, genreid, createdby)
VALUES
  (NOW(), NOW(), "Test JAV", "ABC-123", 1, 1, 1);

-- No seed for movie or map_movie_tag because it has ids belonging to other tables so it would be presumptive to do so...
-- Example you can run by hand yourself:
-- INSERT INTO map_movie_tag (created, updated, movieid, tagid) VALUES (NOW(), NOW(), 1, 2), (NOW(), NOW(), 1, 10);
-- It will make the first movie have "Favorite" and "Creampie" tags if set to a fresh DB.