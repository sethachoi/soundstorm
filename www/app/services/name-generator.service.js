angular.module('soundstorm')
.factory('NameGenerator', function($log, $location, $cookies, ENV) {
    var adjs = [
      "autumn", "hidden", "bitter", "misty", "silent", "empty", "dry", "dark",
      "summer", "icy", "delicate", "quiet", "white", "cool", "spring", "winter",
      "patient", "twilight", "dawn", "crimson", "wispy", "weathered", "blue",
      "billowing", "broken", "cold", "damp", "falling", "frosty", "green",
      "long", "late", "lingering", "bold", "little", "morning", "muddy", "old",
      "red", "rough", "still", "small", "sparkling", "shinning", "shy",
      "wandering", "withered", "wild", "black", "young", "holy", "solitary",
      "fragrant", "aged", "snowy", "proud", "floral", "restless", "divine",
      "polished", "ancient", "purple", "lively", "nameless"
    ]
    var nouns = [
      "waterfall", "river", "breeze", "moon", "rain", "wind", "sea", "morning",
      "snow", "lake", "sunset", "pine", "shadow", "leaf", "dawn", "glitter",
      "forest", "hill", "cloud", "meadow", "sun", "glade", "bird", "brook",
      "butterfly", "bush", "dew", "dust", "field", "fire", "flower", "firefly",
      "feather", "grass", "haze", "mountain", "night", "pond", "darkness",
      "snowflake", "silence", "sound", "sky", "shape", "surf", "thunder",
      "violet", "water", "wildflower", "wave", "water", "resonance", "sun",
      "wood", "dream", "cherry", "tree", "fog", "frost", "voice", "paper",
      "frog", "smoke", "star"
    ]

    function generateName(){
        return pick(adjs) + '-' + pick(nouns) + '-' + rndNum(100,0);
    }

    function pick(list){
        return list[rndNum(list.length, 0)]
    }

    function rndNum(max, min){
        return Math.floor(Math.random()* (max - min) + min);
    }

    return generateName;
});
