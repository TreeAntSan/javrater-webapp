-- Import this with `mysql -u root -p < movierater.sql`
-- Only do this once!

USE movierater;

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
  (NOW(), NOW(), "ACT", "Action"),
  (NOW(), NOW(), "ADV", "Adventure"),
  (NOW(), NOW(), "DRA", "Drama"),
  (NOW(), NOW(), "CLA", "Classic"),
  (NOW(), NOW(), "SAM", "Samurai"),
  (NOW(), NOW(), "WES", "Western"),
  (NOW(), NOW(), "ANM", "Animated"),
  (NOW(), NOW(), "ANI", "Anime"),
  (NOW(), NOW(), "OTH", "Other");

-- Tags
INSERT INTO tag
  (created, updated, category, tag, name, description)
VALUES
  (NOW(), NOW(), "Reward", "BF", "Best Film", "Description"),
  (NOW(), NOW(), "Reward", "BN", "Best Film Nominee", "Description"),
  (NOW(), NOW(), "Reward", "BA", "Best Actor", "Description"),
  (NOW(), NOW(), "Reward", "BC", "Best Actress", "Description"),
  (NOW(), NOW(), "Reward", "OW", "Other Winner", "Description"),
  (NOW(), NOW(), "Story", "FF", "Far Future", "Description"),
  (NOW(), NOW(), "Story", "CF", "Near Future", "Description"),
  (NOW(), NOW(), "Story", "MD", "Modern Day", "Description"),
  (NOW(), NOW(), "Story", "PP", "Period Piece", "Description"),
  (NOW(), NOW(), "Story", "FA", "Fantasy", "Description"),
  (NOW(), NOW(), "Story", "MA", "Magic", "Description"),
  (NOW(), NOW(), "Story", "SF", "Sci-Fi", "Description"),
  (NOW(), NOW(), "Story", "CO", "Comic", "Description"),
  (NOW(), NOW(), "Story", "FT", "Fairytale", "Description"),
  (NOW(), NOW(), "Story", "NF", "Non Fiction", "Description"),
  (NOW(), NOW(), "Story", "BI", "Biography", "Description"),
  (NOW(), NOW(), "Story", "LO", "Love", "Description"),
  (NOW(), NOW(), "Story", "RE", "Revenge", "Description"),
  (NOW(), NOW(), "Story", "TT", "Time Travel", "Description"),
  (NOW(), NOW(), "Character", "PM", "Male Protag", "Description"),
  (NOW(), NOW(), "Character", "PF", "Female Protag", "Description"),
  (NOW(), NOW(), "Character", "PC", "Child Protag", "Description"),
  (NOW(), NOW(), "Character", "PT", "Teen Protag", "Description"),
  (NOW(), NOW(), "Character", "PE", "Elder Protag", "Description"),
  (NOW(), NOW(), "Character", "PN", "No Protag", "Description"),
  (NOW(), NOW(), "Character", "PS", "Multiple Protags", "Description"),
  (NOW(), NOW(), "Character", "PA", "Anti-Hero Protag", "Description"),
  (NOW(), NOW(), "Character", "PR", "Protag Sacrifice", "Description"),
  (NOW(), NOW(), "Character", "PD", "Protag Death", "Description"),
  (NOW(), NOW(), "Character", "PL", "Protag Loss", "Description"),
  (NOW(), NOW(), "Character", "RL", "Real Life", "Description"),
  (NOW(), NOW(), "Character", "SE", "As Self", "Description"),
  (NOW(), NOW(), "Character", "FM", "No Family", "Description"),
  (NOW(), NOW(), "Character", "MS", "Marysue/Gary Stu", "Description"),
  (NOW(), NOW(), "Character", "HT", "Heel Turn", "Description"),
  (NOW(), NOW(), "Character", "RH", "Reverse Heel Turn", "Description"),
  (NOW(), NOW(), "Character", "RD", "Redemption", "Description"),
  (NOW(), NOW(), "Character", "ND", "Not Dead", "Description"),
  (NOW(), NOW(), "Cinematography", "DL", "Dolly", "Description"),
  (NOW(), NOW(), "Cinematography", "TL", "Timelapse", "Description"),
  (NOW(), NOW(), "Cinematography", "SM", "Slo-mo", "Description"),
  (NOW(), NOW(), "Cinematography", "RT", "Reverse Time", "Description"),
  (NOW(), NOW(), "Cinematography", "SC", "Steady Cam", "Description"),
  (NOW(), NOW(), "Cinematography", "CZ", "Crash Zoom", "Description"),
  (NOW(), NOW(), "Cinematography", "RF", "Rack Focus", "Description"),
  (NOW(), NOW(), "Cinematography", "MR", "Mirror Shot", "Description"),
  (NOW(), NOW(), "Cinematography", "DA", "Dutch Angle", "Description"),
  (NOW(), NOW(), "Cinematography", "BW", "Black and White", "Description"),
  (NOW(), NOW(), "Cinematography", "DE", "Double Exposure", "Description"),
  (NOW(), NOW(), "Cinematography", "CC", "Character Camera", "Description"),
  (NOW(), NOW(), "Cinematography", "TS", "Trick Shot", "Description"),
  (NOW(), NOW(), "Cinematography", "MI", "Miniatures", "Description"),
  (NOW(), NOW(), "Cinematography", "UW", "Underwater", "Description"),
  (NOW(), NOW(), "Cinematography", "VM", "Vehicle Mounted", "Description"),
  (NOW(), NOW(), "Music", "DG", "Digetic", "Description"),
  (NOW(), NOW(), "Music", "SR", "Score", "Description"),
  (NOW(), NOW(), "Music", "ST", "Sound Track", "Description"),
  (NOW(), NOW(), "Music", "MU", "Musical", "Description"),
  (NOW(), NOW(), "Sound", "DU", "Dub", "Description"),
  (NOW(), NOW(), "Sound", "SS", "Shell Shock", "Description"),
  (NOW(), NOW(), "Sound", "VA", "Vamp", "Description"),
  (NOW(), NOW(), "Sound", "SI", "Silent", "Description"),
  (NOW(), NOW(), "Sound", "FR", "Field Recording", "Description"),
  (NOW(), NOW(), "Animation", "SO", "Smooth", "Description"),
  (NOW(), NOW(), "Animation", "ME", "Messy", "Description"),
  (NOW(), NOW(), "Animation", "CM", "Composite", "Description"),
  (NOW(), NOW(), "Animation", "CG", "CGI", "Description"),
  (NOW(), NOW(), "Animation", "MX", "Mixed CGI/Real", "Description"),
  (NOW(), NOW(), "Animation", "SN", "Stop Motion", "Description"),
  (NOW(), NOW(), "Animation", "RO", "Rotoscope", "Description"),
  (NOW(), NOW(), "Animation", "WJ", "Western via Japan", "Description"),
  (NOW(), NOW(), "Animation", "JW", "Japanese via West", "Description"),
  (NOW(), NOW(), "Animation", "TR", "Transform", "Description"),
  (NOW(), NOW(), "Animation", "AL", "Analog", "Description"),
  (NOW(), NOW(), "Animation", "DI", "Digital", "Description"),
  (NOW(), NOW(), "Animation", "SY", "Styled", "Description"),
  (NOW(), NOW(), "Violence", "CE", "Comedic", "Description"),
  (NOW(), NOW(), "Violence", "RS", "Realistic", "Description"),
  (NOW(), NOW(), "Violence", "GO", "Gore", "Description"),
  (NOW(), NOW(), "Violence", "WA", "War", "Description"),
  (NOW(), NOW(), "Violence", "CR", "Crime", "Description"),
  (NOW(), NOW(), "Language", "NT", "Native Tongue", "Description"),
  (NOW(), NOW(), "Language", "ES", "English Speakers", "Description"),
  (NOW(), NOW(), "Language", "EA", "Everyone is American", "Description"),
  (NOW(), NOW(), "SFX", "XM", "Miniatures", "Description"),
  (NOW(), NOW(), "SFX", "XE", "Early CGI", "Description"),
  (NOW(), NOW(), "SFX", "XB", "Bad CGI", "Description"),
  (NOW(), NOW(), "SFX", "XG", "Good CGI", "Description"),
  (NOW(), NOW(), "SFX", "DP", "Disaster Porn", "Description"),
  (NOW(), NOW(), "SFX", "XX", "Too Much CGI", "Description"),
  (NOW(), NOW(), "SFX", "XP", "Practical Effects", "Description"),
  (NOW(), NOW(), "SFX", "MP", "Matte Paintings", "Description"),
  (NOW(), NOW(), "SFX", "CS", "Costumes", "Description"),
  (NOW(), NOW(), "SFX", "MK", "Make-up", "Description"),
  (NOW(), NOW(), "SFX", "XC", "CGI Character", "Description"),
  (NOW(), NOW(), "SFX", "NC", "Not CGI Character", "Description"),
  (NOW(), NOW(), "SFX", "CW", "Crowd", "Description"),
  (NOW(), NOW(), "SFX", "SP", "Space", "Description"),
  (NOW(), NOW(), "SFX", "DR", "Dream", "Description"),
  (NOW(), NOW(), "SFX", "RC", "Recreation", "Description"),
  (NOW(), NOW(), "SFX", "EX", "Explosions", "Description"),
  (NOW(), NOW(), "SFX", "DS", "Digital Squibs", "Description"),
  (NOW(), NOW(), "Director", "WAN", "Wes Anderson", "Description"),
  (NOW(), NOW(), "Director", "AKU", "Akira Kurosawa", "Description"),
  (NOW(), NOW(), "Director", "HMI", "Hayao Miyazaki", "Description"),
  (NOW(), NOW(), "Director", "QTA", "Quentin Tarantino", "Description"),
  (NOW(), NOW(), "Director", "SSP", "Steven Spielberg", "Description"),
  (NOW(), NOW(), "Director", "WAL", "Woody Allen", "Description"),
  (NOW(), NOW(), "Director", "DLE", "David Lean", "Description"),
  (NOW(), NOW(), "Director", "SLE", "Sergio Leone", "Description");

INSERT INTO user
  (created, updated, name, password, type, status)
VALUES  -- password is 'password' hashed+salted with bcryptjs
  (NOW(), NOW(), "MrTest", "$2a$10$MyB4x8RE2jo2o5.2jAX5rO2X0MQrTz9q9pY/vF/3Sz8qIQRttXUJC", 0, 0);

INSERT INTO movie
  (created, updated, title, prodcode, ratingid, genreid, createdby)
VALUES
  (NOW(), NOW(), "Test Movie", "BLU-RAY", 1, 1, 1);

-- No seed for movie or map_movie_tag because it has ids belonging to other tables so it would be presumptive to do so...
-- Example you can run by hand yourself:
-- INSERT INTO map_movie_tag (created, updated, movieid, tagid) VALUES (NOW(), NOW(), 1, 2), (NOW(), NOW(), 1, 10);
-- It will make the first movie have "Favorite" and "Creampie" tags if set to a fresh DB.