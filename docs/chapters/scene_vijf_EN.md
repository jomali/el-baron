   Object kasteel_maan "moon"
    class Prop,
     with name 'moon' 'moonlight',
          description 
	     "The bleak light of the moon softens the outlines of the things, takes from them all sharpness; they seem to gently flow into each other, the building blocks of a dream where nothing is what it seems and all meanings are interweaved.",
	  found_in kasteel_hal kasteel_ruine kasteel_eetzaal kasteel_plaats,
      has ;

   Object kasteel_muren "walls"
    class Prop,
     with name 'wall' 'walls' 'black' 'spot' 'spots',
          description
	     "The walls have once been built from pale stone, but are now disgraced by black spots that indicate that fire was one of the causes of the castle's decline.",
	  found_in kasteel_hal kasteel_ruine kasteel_eetzaal kasteel_plaats kasteel_kerker kasteel_toren_1,
      has pluralname;

   Object kasteel_sterren "stars"
    class Prop,
     with name 'stars' 'star' 'sky' 'heaven' 'welkin',
          description 
	     "Tens, hundreds and thousands of light years away, gigantic hot balls of gas are waiting, violently burning until they will implode under the weight of their own passion. Here on earth, their light has been weakened so much that they adorn the welkin as lovely candles against black velvet.",
	  found_in kasteel_hal kasteel_ruine kasteel_eetzaal kasteel_plaats,
      has pluralname;  
   
   Object kasteel_sneeuw "snow"
    class Prop,
     with name 'snow',
          found_in kasteel_ruine kasteel_plaats kasteel_hal,
	  description 
	     "Sometimes snow gives all the objects it has nestled on a fairytale appearance, but this snow seems to desire to smother and bury them instead.",
	  before [;
	    Search, LookUnder: "You poke in the snow here and there, but find nothing significant.";
	  ],
      has ;
      
   Object kasteel_stenen "heaps of stone"
    class Prop,
     with name 'heap' 'heaps' 'stone' 'stones' 'snow-covered' 'buildings' 'rubble',
          description
	     "Nothing is left from the once proud buildings than this rubble, motionless under a blanket of frost.",
	  found_in kasteel_hal kasteel_plaats,
      has pluralname;

   Object kasteel_vanaf_plaats "courtyard"
    class Prop,
     with found_in kasteel_hal kasteel_ruine kasteel_toren_1,
          name 'courtyard' 'yard',
          description 
	     "A large courtyard where once, long ago, tourneys were fought and parties were celebrated. The past is being smothered by a thick layer of snow.",
      has ;         
      
               
Object kasteel_hal "The castle's hall"
  with name 'hall',
       description [;
          if (self hasnt visited) {
	      verhaaltracker.status = 5;
	     }
          "Behind a facade of intactness a true ruin hides itself. Half the walls of the completely empty hall have fallen down, and the moonlight enters unhindered past the skeleton of a roof. The rest of the castle is in no better state: large, snow-covered heaps of stone indicate were buildings used to be. Only to the east a doorway leads to a hall that is mainly intact. A few walls of the building to the west still stand erect, and to the northwest a narrow path winds between a boulder and a massive statue to the castle's courtyard.";
        ],
       nw_to kasteel_plaats,
       w_to kasteel_ruine,
       e_to kasteel_eetzaal,
       s_to "You will not leave the castle without Maartje!",
   has light transparent;
   
   Object kasteel_hal_dak "roof" kasteel_hal
    class Prop,
     with name 'roof' 'skeleton' 'beams',
          description 
	     "Blackened beams form a pattern of squares against the star-filled sky. Whatever protection against the elements the roof may have provided once, now it serves only as a remembrance of happier times.",
      has ;

   Object kasteel_doorgang "doorway"
    class Prop,
     with name 'doorway' 'portal',
          found_in kasteel_eetzaal kasteel_hal,
          description [; 
	     print "A doorway that has not contained a door for a long time, opens like a yawning mouth into the darkness of the ";
	     if(location == kasteel_hal) "dining-room.";
	     if(location == kasteel_eetzaal) "hall.";
          ],
	  before [;
	    Enter, Go: 
	       if(location == kasteel_hal) <<go e_obj>>;
	       if(location == kasteel_eetzaal) <<go w_obj>>;
	  ],
      has ;      
      
   Object kasteel_hal_zaal "hall" kasteel_hal
    class Prop,
     with name 'hall' 'dining-hall' 'dining-room',
          description
	     [; print "The hall to the east is large, and still seems to be in possession of a roof. ";
	        if(parent(toorts) == kasteel_eetzaal && toorts has general)
		  {"A weak orange glow, as from a fireplace or a torch, plays across the floor.";}
		 else
		  {"No torchlight can be seen anymore.";}
	     ],
	  before [;
	    Go, Enter: <<go e_obj>>;
	  ],
      has ;
   
   Object kasteel_hal_gebouw "building to the west" kasteel_hal
    class Prop,
     with pname 'building' '.x' 'to' '.x' 'the' '.x' 'west' '.p' 'ruin',
          description
	     "Nothing but a ruin remains from what once must have been the living quarters of dozens of people.",
	  before [;
	    Go, Enter: <<go w_obj>>;
	  ],
      has ;
      
   Object kasteel_pad "path to the courtyard" kasteel_hal
    class Prop,
     with name 'path' 'narrow',
          description "A narrow strip of ground that is free of stones appears to be a path; whether this appearance corresponds to reality cannot be verified, because of the snow.",
      has ;
 
   Object rotsblok "boulder" kasteel_hal
    class Prop,
     with name 'rock' 'boulder' 'granite',
          description [;
	      if(poeder has general) {
	        "Large and made of black granite instead of the paler stone from which the castle has been built, the boulder has been adorned with a child's drawing on the top. Beneath that, small signs have been carved into the rock.";
	      } else {  
		"Large and made of black granite instead of the paler stone from which the castle has been built, the boulder carries a hood of white powder. Below that, small signs have been carved.";
	      };
	     ],
	  before [;
	    Rub: if(poeder has general) {
	            "You rub once more over the boulder, but the snow has already been removed.";
	         } else {
		   <<remove poeder>>;
		 }
            Take, Pull, Push: "The boulder is much too large and much too heavy.";
	  ],
      has transparent;
      
      Object poeder "snow" rotsblok
       class Prop,
        with name 'powder' 'white' 'hood',
	     description "A layer of snow covers the top of the boulder.",
	     before [;
	       Push, Pull, Take, Remove, LookUnder:
	        print "You brush the snow from the boulder, uncovering a child's drawing.^";
		move tekening to rotsblok;
		remove poeder;
		return true;
	     ],
	 has concealed;
	 
      Object tekening "child's drawing" poeder
	  class Prop,
	   with name 'drawing' 'child^s',
	        description 
		   "Two stickmen represent a man and a small girl, walking hand in hand under a stylised sun. Both have a big smile on their face.",
	    has concealed;
      
      Object rots_tekens "carvings" rotsblok
       class Prop,
        with name 'signs' 'small' 'carvings',
	     description [a x;
	       a = 0;
	       objectloop (x in player) {
	         if (x == toorts) a = 1;
	       }
	       if(a == 1) {
	          "By the light of the torch you lean towards the clumsy, angular letters. You read:^^
		   ~I AM AFRAID. HE HURTS ME.^
		   IF YOU READ THIS, HELP ME!~^^
		   Maartje, screaming with a soundless voice.";
	       } else {
	          "The moonlight is too weak to read the small carvings by.";
	       }
	       
	     ],
	 has concealed;
  
   Object kasteel_beeld "statue" kasteel_hal
    class Prop,
     with name 'statue' 'massive',
          description 
	     "Two meters high, in grey granite, here stands the imposing statue of a nobleman. His face has been so weathered by the elements that you can only guess about his features.",
	  before [;
	    Invite: "The statue nods, once, curtly. Then he again assumes his immobile stance.";
	    Take, Pull, Push: "The statue is much too large and much too heavy.";
	  ],
      has ;
     

Object kasteel_ruine "Ruined building"
  with name 'ruined' 'building' 'ruin',
       description 
          "Low, crumbling walls rise above the rubble, suggestions of the building's former glory. Now there is not a single sign of life, and only the stones remember how in this place once the servants lived, laughed and made love. What rests from the castle's great hall lies to the east; to the north you can make your way to the courtyard through the remnants of this ruin.",
       e_to kasteel_hal,
       n_to kasteel_plaats,
       d_to [; 
           if(kerker_luik hasnt absent) {return kerker_luik;}
           else return false;
        ],
       before [;
         Listen: 
	    print "You close your eyes and listen, listen to the voice of the stones that repeat history eternally.";
	    
	    VraagToets(0,0,0);
	    
	    print "People are laughing. In another room a woman scolds someone; you cannot hear her words, but the gist of her story is obvious. A buzz of voices comes from all sides, a mixture of words and moods that encloses you like a warm blanket. Above all sounds, serene and sad, a whistled tune.";
	    
	    VraagToets(0,0,0);
	    
	    "You open your eyes again, and the whistling and the voices cease. Only the howling of the wind breaks the sombre silence.";
       ],
   has light transparent;
   
   Object kasteel_muurtjes "crumbling walls" kasteel_ruine
    class Prop,
     with name 'walls' 'crumbling' 'remnants',
          description
             "The outlines of the rooms that once formed the ground floor of this ruin are still visible as low walls, crumbling ever further under the teeth of time. You think you can almost hear and touch the memories that have been stored inside.",
	  before [;
	     Touch: 
	       print "You put your hand on the stones and close your eyes.";
	       
	       VraagToets(0,0,0);
	       
	       print "A lighted hall, smaller but cosier than the one where the castle's noble lords repose. People walk on and off, putting the last hand to that evening's meal or relaxing from a long day of hard work. A group of boys is laughing. An old man plays on a wind instrument, some kind of flute. Peaceful. Merry. Snug. All of these people are home.";
	       
	       VraagToets(0,0,0);
	       
	       "When you open your eyes, you are standing again in the snow with both feet. You pull your coat more tightly around you, as protection against the freezing wind that screeches through the ruins.";
	  ],
      has pluralname;

   Object puin "rubble" kasteel_ruine
    class Prop,
     with name 'rubble',
          description "The ground is covered with stones that once formed this building. Now they lie, dead and silent, waiting for the remaining walls to follow them.",
      has ;
      
   Object kasteel_ruine_hal "hall" kasteel_ruine
    class Prop,
     with name 'hall' 'big',
          description 
	     "The walls of the big wall are still standing, but little rests of the roof. Now the building is silently waiting for a nameless future.",
	  before [;
	    Go, Enter: <<go e_obj>>;
	  ],
      has ;

   Object kerker_luik "hatch"
    class Deur, 
     with name 'hatch' 'trapdoor',
          description [;
             if (location == kasteel_ruine) "A heavy trapdoor leads to underground catacombs.";
	     else "The hatch opens up to the world above.";
	    ],
          found_in kasteel_ruine kasteel_kerker,
          door_dir [;
             if (location == kasteel_ruine) {return d_to;}
	     else {return u_to;};
	    ],
          door_to [;
             if (location == kasteel_ruine) return kasteel_kerker;
	     else return kasteel_ruine;
            ],
	  before [;
	    Open: give kasteel_kerker light;
	          return false;
            Close: give kasteel_kerker ~light;
	           return false;
            Burn: "The trapdoor is made of iron. Iron doesn't burn.";
	  ],
      has door openable ~open scenery absent;

   Object kasteel_ruine_stenen "heap of stones" kasteel_ruine
     with pname '.p' 'stones' '.p' 'heap' '.p' 'heap' 'of' 'stones',
          initial [;
	    if(self hasnt general) "In a corner of the ruins lies a heap of stones that is not covered with snow.";
	    "A heap of stones lies on the ground next to a hatch.";
	  ],
	  description [;
	    if(self hasnt general) "Head-sized stones form an untidy heap. There is hardly any snow on it, whereas the rest of the castle is covered by a layer of several inches.";
	    "The stones form an untidy heap. They no longer cover the hatch.";
	  ],
	  before [;
	    Pull, Push, Take, LookUnder, Search, Transfer:
	      if(self hasnt general) {
	        give kerker_luik ~absent;
                move kerker_luik to kasteel_ruine;
	        give self general;
		"The stones are heavy, but with some difficulty you manage to push and roll them aside. Under the heap you discover a metal hatch in the ground.";
	      } else {
	        "You are not going to move the stones again.";
	      }
	  ],
      has ;
      
   Object dagboek_pagina_1 "soaked page" kasteel_ruine
     with name 'soaked' 'page',
          description [;
	    print "A page of paper that has become wet, turning the sentences written in black ink--the careful handwriting of a girl--into a muddle that you can only decipher small part of.^^";
	    
	    style bold;
	    
	    print "~... want from me? Why does he come...~^
	    ~Whom can I ask for help... mummy... nobody knows~^
	    ~...good. I will do what he says, and not...~";
	    
	    style roman;
	    
	    if(dagboek.counter == 1) print "^^The page has exactly the size of the pages of Maartje's diary.";
	    "";
	   ],
	   before [;
	     Burn:
	      if(TestScope(toorts, player)) {
	       if(second == toorts || second == nothing) {
	         if(toorts has general) {
		   remove self;
		   "The flames lick past the page, which at first emits only steam. But soon it has dried and the fire starts destroying the paper itself, until nothing but a memory rests of it.";
		 } else {
		   "Now that the torch has gone out, it can't set anything on fire.";
		 }
	       } else {
	         "You can't use that to make a fire.";
	       }
	      }
	   ],
      has ;

            

Object kasteel_eetzaal "The dining-hall"
  with name 'dining-hall' 'dining',
       description 
          "The large dining-hall has been less affected by decay than most other parts of the castle. Moonlight shines through several holes in the roof, under which heaps of half-molten snow have formed. A long wooden table, with a chair at each end, looks lost despite its length in the otherwise empty space. Now and then you hear a bat flying past. A doorway leads back to the hall to the west.",
       w_to kasteel_hal,
   has light transparent;

   Object toorts "torch" kasteel_eetzaal
     with name 'torch' 'flame' 'fire',
          initial [;
	    if(self has general) {
	      "A single torch on the wall spreads a flickering yellow light.";
	    } else {
	      "An extinguished torch hangs inertly on the wall.";
	    }
	   ],
	  description [;
	    if(self has general) {
	       "A wooden torch of about half a meter ends in a lustily burning flame.";
	    } else {
	       "Half a meter of wood ends in blackened, cold tip.";
	    }
	  ],
	  invent [;
	    if(inventory_stage == 1) return false;
	    if(self has general) {
	       print " (burning lustily)";
	    } else {
	       print " (extinguished)";
	    }
	    return true; 
	  ],
          before [;
	    Doof:
	      if(self has general) {
	        print "You beat the torch against the ground a few times, than step onto the burning end. ";
		if (kleding has worn) {print "Under your heavy boots, the fire is soon extinguished.";}
		 else {print "Ouch! You momentarily forgot that you're not wearing your boot, and you almost burned yourself. But the torch is extinguished.";}
		give self ~general;
		give self ~light;
		if (parent(self) == player) " You pick up the torch again.";
		move self to parent(player); 
		give self moved;
		"";
	      } else {
	        "The torch doesn't burn anymore. How could you extinguish it?";
	      };
	     	     
	    Transfer, Insert:
	      if(second == kasteel_sneeuw || second == kasteel_eetzaal_sneeuw) {
	        give self ~general;
		give self ~light;
		move self to parent(player); 
		give self moved;
		"You put the torch with the burning end into the snow. With a sizzling sound, the fire goes out.";
	       } else {
	         "You put the torch with the extinguished end into the snow. You are hardly surprised when this doesn't have any effect.";
	       }
	    
	    Receive: <<burn noun>>;
	      
	  ],
      has general light;


   
   Object kasteel_eetzaal_sneeuw "heaps of snow" kasteel_eetzaal
    class Prop,
     with pname '.p' 'snow' '.p' 'heap' '.p' 'heaps' '.p' 'heaps' 'of' 'snow',
          doorzocht 0,
          description "On three places in the dining-hall, a heap of snow has formed under a hole in the roof.",
	  before [;
	    Search, LookUnder:
	      if(self.doorzocht == 0) {
	        self.doorzocht = 1;
		move bevroren_kat to kasteel_eetzaal;
		"Under the biggest heap you find the frozen corpse of a cat.";
	      } else {
	        "You find nothing further in the snow.";
	      };
	  ],
      has pluralname;
      
      Object bevroren_kat "corpse of Cathy"
        with name 'frozen' 'cat' 'cathy' 'corpse',
	     description "This is unmistakably the body of Cathy, your cat, who died years ago. Maartje was inconsolable, and the rabbits you later bought for her were never able to conquer her heart.",
	     before [;
	       Burn: "That might thaw the cat, but nothing more. To cremate Cathy, you will need a bigger fire.";
	       Spreek: "The cat is dead. She will not be able to hear you.";
	       Touch: "Tenderly you stroke Cathy, and think of the time when she still came to sit on your lap, purring.";
	       Eat: "Have you gone completely mad?";
	     ],
	 has ;

   Object kasteel_eetzaal_tafel "dining table" kasteel_eetzaal
    class PropSup,
     with name 'dining' 'table' 'end' 'long' 'wooden',
          description
	    "The table, made of black ebony, is at least six meters long. When two persons were to sit at the ends, they'd almost have to shout in order to have a conversation--and yet that is where the chairs have been placed.",
	  before [;
	    Push, Pull, Take: "The table is much too heavy to be moved by a single person.";
	    Burn:
	      if(TestScope(toorts,player)) {
	       if(second == toorts || second == nothing) {
	         if(toorts has general) {
		   "The ebony doesn't seem very impressed by the torch's flame. It doesn't even smoulder.";
		 } else {
		   "Now that the torch has gone out, it can't set anything on fire.";
		 }
	       } else {
	         "You can't use that to make a fire.";
	       }
	      }
	      return false;
	  ],
      has supporter scenery;
      
   Object dagboek_pagina_2 "torn page" kasteel_eetzaal_tafel
     with name 'torn' 'page',
          description [;
	    print "A sheet of paper, crumpled and torn, on which sentences written in black ink--the careful handwriting of a girl--tell their sorrowful story.^^";
	    
	    style bold;
	    
	    print "It happened again tonight. Will it never end? Will I nevermore be free and happy? And even if it ends--can I get rid of the fear and the nightmares? I hate him, I hate myself, I hate my life. All my joy turns to ashes in the fire of his lust...";
	    
	    style roman;
	    
	    if(dagboek.counter == 1) print "^^The page is exactly the size of the pages of Maartje's diary.";
	    "";
	   ],
	   before [;
	     Burn:
	      if(TestScope(toorts,player)) {
	       if(second == toorts || second == nothing) {
	         if(toorts has general) {
		   remove self;
		   "The flames lick past the page, which chars and curls up immediately. When the entire sheet has been consumed by the fire, it falls apart in small black flakes that are scattered on the wind.";
		 } else {
		   "Now that the torch has gone out, it can't set anything on fire.";
		 }
	       } else {
	         "You can't use that to make a fire.";
	       }
	      }
	   ],
      has ;
      
   Object kasteel_eetzaal_stoelen "chair" kasteel_eetzaal
    class Prop,
     with name 'chair' 'chairs',
          description
	    "Like the table, the chairs are made of ebony, heavy and black. One is on each end of the table, as far apart as possible.",
	  before [;
	    Push, Pull, Take: "You are not here to rearrange the baron's furniture.";
	    Burn:
	      if(TestScope(toorts,player)) {
	       if(second == toorts || second == nothing) {
	         if(toorts has general) {
		   "The ebony doesn't seem very impressed by the torch's flame. It doesn't even smoulder.";
		 } else {
		   "Now that the torch has gone out, it can't set anything on fire.";
		 }
	       } else {
	         "You can't use that to make a fire.";
	       }
	      }
	    Enter: 
	     move player to kasteel_eetzaal_stoelen;
	     "You seat yourself on one of the chairs.";
	    Exit, GetOff:
	     move player to kasteel_eetzaal;
	     "You get up.";
	  ],
	  react_before [;
	    Go, Search, Take, Enter, LookUnder, Pull, Push, JumpOver, Attack, Climb, Burn, Dig, Cut, Jump:
	      if(parent(player) == self) {
	        move player to kasteel_eetzaal;
		print "First you get up.^";
		return false;
	      }
	      return false;
	    
	    Sit: <<Enter self>>;
	    
	    default: return false;
	  ],
      has enterable supporter transparent scenery static;
               
   Object kasteel_eetzaal_dak "roof" kasteel_eetzaal
    class Prop,
     with name 'roof' 'holes' 'hole',
          description "Apart from three large holes, were apparently one of the beams has given way, the roof here is still intact. This has allowed the large dining-hall to retain some of its former grandeur.",
	  before [;
	    Touch, Take, Burn: "The roof is much too high for that.";
	  ],
      has ;
   
   Object kasteel_eetzaal_vleermuis "bats" kasteel_eetzaal
    class Prop,
     with name 'bat' 'bats' 'fluttering',
          description "You look up, but see no movement in the darkness.",
	  react_before [;
	    Listen:
	      if(noun == nothing) <<listen self>>;
	  ],
	  before [;
	     Listen:
	       "Now and then you hear a soft fluttering, presumably made by a bat somewhere under the roof.";
	  ],
      has pluralname;
      
   Object kasteel_eetzaal_hal "hall" kasteel_eetzaal
    class Prop,
     with name 'hall' 'large',
          description 
	     "The walls of the big wall are still standing, but little rests of the roof. Now the building is silently waiting for a nameless future.",
	  before [;
	    Go, Enter: <<go w_obj>>;
	  ],
      has ;
         
 
      
Object kasteel_kerker "A damp dungeon"
  with name 'dungeon' 'cellar' 'catacomb',
       description [;
         if(kerker_luik has open)
           print "In the bleak light that comes through the trapdoor, you can just see descry that this has been a dungeon. ";
         if(kerker_luik hasnt open)
	   print "The flickering light of the torch reveals a dark dungeon. ";
	 if(kasteel_kerker_tralies hasnt general && parent(pop_moeder_kerker) == kasteel_kerker_cel)
	   print "Along one of the walls metal grating delimits a small cell, wherein you can see bones, chains and--strangely enough--a famished mother doll. ";
	 if(kasteel_kerker_tralies hasnt general && parent(pop_moeder_kerker) ~= kasteel_kerker_cel)
	   print "Along one of the walls metal grating delimits a small cell, wherein you can see bones an chains. ";  
	 if(kasteel_kerker_tralies has general)   
	   print "Where a grating used to delimit a cell, now only molten then solidified metal lies on the floor. Bones and chains commemorate the former purpose. ";
	 "On the other side of the dungeon are two instruments of torture: a rack and an iron maiden. Drops of water fall with irregular intervals from the ceiling on the cold stone floor.^^You hear the silence of stilled voices.";
        ],
       u_to kerker_luik,
       moeder_spreekt 0,
       vader_spreekt 0,
       dochter_spreekt 0,
       before [;
         Listen: 
	   if(noun == nothing) {
	     if(self == location) {
	       "Apart from the falling water there is only silence; but it seems as if a conversation stopped the moment you opened the hatch.";
	     } else {
	       self.moeder_spreekt = 0;
               self.vader_spreekt = 0;
               self.dochter_spreekt = 0;
	       
	       if(TestScope(pop_moeder_kerker)) self.moeder_spreekt = 1;
	       if(parent(pop_moeder_kerker) == kasteel_kerker) self.moeder_spreekt = 1;
	       if(parent(pop_moeder_kerker) == kasteel_kerker_cel) self.moeder_spreekt = 1;
	       
	       if(TestScope(pop_vader_kerker)) self.vader_spreekt = 1;
	       if(parent(pop_vader_kerker) == kasteel_kerker) self.vader_spreekt = 1;
	       if(parent(pop_vader_kerker) == kasteel_kerker_cel) self.vader_spreekt = 1;
	       if(parent(pop_vader_kerker) == kasteel_kerker_rek) self.vader_spreekt = 2;
	       
	       if(TestScope(pop_dochter_kerker)) self.dochter_spreekt = 1;
	       if(parent(pop_dochter_kerker) == kasteel_kerker) self.dochter_spreekt = 1;
	       if(parent(pop_dochter_kerker) == kasteel_kerker_cel) self.dochter_spreekt = 1;
	       if(parent(pop_dochter_kerker) == kasteel_kerker_maagd && kasteel_kerker_maagd has open)
	          self.dochter_spreekt = 2;
	       
	       if(self.moeder_spreekt == 1) {
	         print "~Why? Why did this have to happen to us?~, says a soft woman's voice.";
		 
		 VraagToets(0,0,0);
		 
		 if(self.vader_spreekt == 0 && self.dochter_spreekt == 0) {
		   "But there is no answer, and the silence returns.";
		 }
		 
		 if(self.vader_spreekt == 2) {
		   print "From the rack sounds a tortured moaning.";
		   VraagToets(0,0,0);
		   self.vader_spreekt = 0;
		 }
		 
		 if(self.vader_spreekt == 0 && self.dochter_spreekt == 1) {
		   print "~And why did you never do anything, mother?~, answers the reproachful voice of a girl.";
		   
		   VraagToets(0,0,0);
		   
		   print "~I didn't want to believe it. I didn't want to understand what I understood all along; I didn't want to know what I had known for years. I...I am sorry.~";
		   
		   VraagToets(0,0,0);
		   
		   print "~You have allowed him to destroy my life without lifting so much as a finger. How can I ever forgive you?~ The voice starts sobbing.";
		   
		   VraagToets(0,0,0);
		   
		   print "~You are right, I cannot be justified. I have wholly earned your condemnation.~ The woman's voice falls silent, beaten.";
		   
		   VraagToets(0,0,0);
		   
		   return true;
		 }		 

		 if(self.vader_spreekt == 0 && self.dochter_spreekt == 2) {
		   print "A soft wailing comes from the iron maiden.";
		   
		   VraagToets(0,0,0);
		   
		   "But that is all, and silence returns to the dungeon.";
		 
		 }
		 
		 if(self.vader_spreekt == 0 && self.dochter_spreekt == 0) {
		   "But that is all, and silence returns to the dungeon.";
		 }		 
	 
		 if(self.vader_spreekt == 1) {
		   print "~I do not know, I...I...I have tried to stop it, but I cannot,~ a male voice answers, whispering.";
		   
		   VraagToets(0,0,0);
		   
		   if(self.dochter_spreekt == 2) {
		     print "A soft wailing comes from the iron maiden.";
		   
		     VraagToets(0,0,0);
		     
		     self.dochter_spreekt = 0;
		   }
		    
		   if(self.dochter_spreekt == 0) {
		     ! Gesprek tussen pa en moe.
		     
		     print "~Was I not enough for you? Why did you have to destroy our happiness for that wench?~";
		     
		     VraagToets(0,0,0);
		     
		     print "~What do you know about it! You haven't wrestled night after night with this infernal lust, until your soul was rendered asunder and you drowned anew in a sea of flames!~";
		     
		     VraagToets(0,0,0);
		     
		     print "For a moment it is silent. Then the woman continues, calmer now: ~I didn't say you could help it...I...I don't know, I don't know anything anymore. Haven't, for years. Perhaps everything will return to normal when she is old enough to leave our house?~.";
		     
		     VraagToets(0,0,0);
		     
		     print "~It will never be normal again.~^^After that fatalistic conclusion the voices remain silent.";
		     
		     VraagToets(0,0,0);
		     
		     return true;	   
		   }
		   
		   if(self.dochter_spreekt == 1) {
		     ! Gesprek tussen alle drie.
		   
		     print "~And that is why you have destroyed my youth and made my life into a hell?~, a girl's voice asks accusingly.";
		     
		     VraagToets(0,0,0);
		     
		     print "~And what about my life?~, the woman answers. ~Do you imagine these years have been merry for me? Do you think I took pleasure in watching my daughter wither and crawl always deeper back into herself?~";
		     
		     VraagToets(0,0,0);
		     
		     print "~What?!~ The girl sounds enraged. ~All these years you have never dared to lift a finger to help me, and know you dare ask for compassion? It is your cowardliness that has enabled him to go on all this time.~";
		     
		     VraagToets(0,0,0);
		     
		     print "~No,~ the man interrupts them. ~It is my fault, all of it is my fault. I know it, and yet I cannot free us from this hell. Forgive me.~";
		     
		     VraagToets(0,0,0);
		     
		     print "But that last remark meets only a dismal silence.";
		     
		     VraagToets(0,0,0);
		     
		     return true;
		   }
		   
		 }
		 
	       }
	     
	     if(self.moeder_spreekt == 0) {  
	       ! Alle mogelijkheden waarbij moeder niets zegt.
	       
	       if(self.vader_spreekt == 0 && self.dochter_spreekt == 0)
	         "You must have been mistaken; no matter how attentively you listen, you hear nothing.";
	
               if(self.vader_spreekt == 2 && self.dochter_spreekt == 0)
	         "From the rack comes a painful moaning.";

               if(self.vader_spreekt == 2 && self.dochter_spreekt == 2)
	         "A painful moaning coming from the rack alternates with a soft sobbing coming out of the iron maiden.";
		 
               if(self.vader_spreekt == 0 && self.dochter_spreekt == 2)
	         "All you hear is a soft sobbing coming from the iron maiden.";

               if(self.vader_spreekt == 0 && self.dochter_spreekt == 1) {
	       
	         print "~Father?~, asks a soft girl's voice. ~Why do you do this to me?~";
		 
		 VraagToets(0,0,0);
		 
		 print "But there is no answer.";
		 
		 VraagToets(0,0,0);
		 
		 print "~Mother?~, the girl then asks. ~Why don't you help me?~";
		 
		 VraagToets(0,0,0);
		 
		 print "But that question too meets only silence.";
		 
		 VraagToets(0,0,0);
		 
		 return true;
	       
	       }
               
               if(self.vader_spreekt == 2 && self.dochter_spreekt == 1) {
	       
	         print "~Father?~, asks a soft girl's voice. ~Why do you do this to me?~";
		 
		 VraagToets(0,0,0);
		 
		 print "From the rack comes only a soft moaning.";
		 
		 VraagToets(0,0,0);
		 
		 print "~Mother?~, the girl then asks. ~Why don't you help me?~";
		 
		 VraagToets(0,0,0);
		 
		 print "But only silence follows.";
		 
		 VraagToets(0,0,0);
		 
		 return true;
	       
	       }

               if(self.vader_spreekt == 1 && self.dochter_spreekt == 0) {
	       
	         print "~My girl?~, a male's voice says. ~I am so incredibly sorry.~";
		 
		 VraagToets(0,0,0);
		 
		 print "But only silence follows.";
		 
		 VraagToets(0,0,0);
		 
		 return true;
	       
	       }
	       
               if(self.vader_spreekt == 1 && self.dochter_spreekt == 2) {
	       
	         print "~My girl?~, a male's voice says. ~I am so incredibly sorry.~";
		 
		 VraagToets(0,0,0);
		 
		 print "But all that follows is a soft wailing coming from the iron maiden.";
		 
		 VraagToets(0,0,0);
		 
		 return true;
	       
	       }
	       
               if(self.vader_spreekt == 1 && self.dochter_spreekt == 1) {
	       
	         print "~Father?~, asks a soft girl's voice. ~Why do you do this to me?~";
		 
		 VraagToets(0,0,0);
		 
		 print "~I do not know, girl. I truly do not know,~ a man answers.";
		 
		 VraagToets(0,0,0);
		 
		 print "~Is your pleasure really more important than my life? How can I ever forgive you when I cannot understand you?~";
		 
		 VraagToets(0,0,0);
		 
		 print "~I--I do not understand it myself either. I cannot stop. I am not strong enough; or I am too depraved.~";
		 
		 VraagToets(0,0,0);
		 
		 print "For a moment the girl hesitates. ~I tried so often to forgive you, but I cannot. For the last couple of years, I have prayed for your death every night.~";
		 
		 VraagToets(0,0,0);
		 
		 print "Thereupon utter silence descends.";
		 
		 VraagToets(0,0,0);
		 
		 return true;
	       
	       }
	       	       	            
	     }
	     
	     return true;  
	     }
	  }
       ],
       after [;
         Look:
	   if(self ~= location)
	     "But, very softly, it seems as if you hear something.";
       ],
   has light transparent;  

   Object kasteel_kerker_licht "light" kasteel_kerker
    class Prop,
     with name 'light' 'bleak' 'moonlight',
          description [;
	    if(kerker_luik has open) {
	      print "Moonlight enters the dungeon through the trapdoor, weakly illuminating it.";
	      if(TestScope(toorts) && toorts has general) {
	        print " The torch casts yellow light and flickering shadows on the walls.";
	      }
	      "";
	    }	
	   
	    if(TestScope(toorts) && toorts has general) {
	        "The torch casts yellow light and flickering shadows on the walls.";
	     }
	  ],
     has ;
     
   Object kasteel_kerker_tralies "grating" kasteel_kerker
    class Prop,
     with name 'grating' 'grate' 'iron' 'metal' 'bars' 'molten' 'mass',
          description [;
	    if(self hasnt general)
	      "An iron grating goes from one of the room to other, from floor to veiling, and thus delimits a cell to which a likewise iron door gives entrance. The bars are about three inches apart: sufficient to put imploring hands through, but too little to escape.";
	    "Where there used be a grating, now only a mass of once-molten metal lies on the ground.";
	  ],
	  before [;
	    Open: <<open kasteel_kerker_cel>>;
	    Close: <<close kasteel_kerker_cel>>;
	  ],
      has ;
      
   Object kasteel_kerker_cel "cell" kasteel_kerker
     with name 'cell' 'delimited' 'door' 'celldoor',
          description [;
	   print "The cell is a less than a meter wide, but it sex meter long. Chains are hanging from the wall, and a skeleton lies defeated on the floor, his arms extended through the bars, as if he were begging for food or water.^^";
	   <<Search self>>;
	   ],
	  with_key dagboek_sleutel,
	  before [;
	    Open: 
	      if(self has locked) "The door to the cell appears to be locked.";
	      if (self has open) "The door to the cell is already open.";
	      give self open;
	      if(parent(player) == self) "You push open the iron door, which screeches mightily.";
	      "You forcefully pull the iron door, which slowly opens towards you on its rusty hinges while emitting loud shrieks of protest.";
	      
	    Close:
	      if (self hasnt open) "The door to the cell is already closed.";
	      give self ~open;
	      if(parent(player) == self) "You forcefully pull the iron door closed, as it shrieks on its rusty hinges.";
	      "You push closed the iron door, which screeches mightily.";
	     
            Unlock: 
	      if (self hasnt locked) "The cell door has already been unlocked.";
	      if (self has locked && second == dagboek_sleutel) {
	         print "You put the copper key into the lock, which seems to be four sizes too big, and carefully turn it around. With a soft click the lock opens..^";
		 give self ~locked;
		 return true;}
	      print "No matter what you try, the lock doesn't open. Presumably, ", (the) second, " "; print IsorAre(second); print " not the key to this cell.^";
	      return true;
	      
	    Lock:
	      if(second == nothing && parent(dagboek_sleutel == player)) <<Lock self dagboek_sleutel>>;
	      if(self has locked) "The cell door has already been locked.";
	      if(self hasnt locked && parent(dagboek_sleutel) == player) {
	        give self locked;
		"You lock the door again.";
	       }
	      "You do not have the key to Maartje's diary with you.";
	    
	    Enter:
	      if(parent(player) == self) "You are in the cell already.";
	      if(self has open) {
	        move player to self;
		"You enter the narrow cell.";
	      }
	      return false;
	    
	    Exit: 
	     if(parent(player) ~= self) "You are not inside the cell.";
	      if(self has open) {
	        move player to kasteel_kerker;
		"You walk out of the narrow cell.";
	      }
	      return false;
	  ],
	  react_before [;
	    Search, Take, Touch, Go, Transfer, Enter, Open, Close, Lock, Unlock, LookUnder, Taste, Pull, Push, Turn, JumpOver, Drink, Fill, Attack, Rub, Climb, Squeeze, Burn, Cut, Kiss:
	      
	      if(parent(player) == self) {
	       if(parent(noun) ~= self && parent(noun) ~= player && noun ~= self && noun ~= d_obj && noun ~= u_obj && noun ~= kasteel_kerker_tralies) {
	         "You cannot reach that from the cell.";
	       }
	      }
	    
	      return false;
	      
	    PutOn, Insert:
	      
	      if(parent(player) == self) {
	       if(parent(second) ~= self && parent(noun) ~= player && second ~= self && second ~= d_obj && second ~= u_obj && second ~= kasteel_kerker_tralies) {
	         "You cannot reach that from the cell.";
	       }
	      }
	    
	      return false;	  
	  ],
	 
      has transparent enterable container ~open openable lockable locked scenery;
   

   Object sleutelweg
    class Character,
     with quip [a b;
             switch (a) {
	       12: 
	          "When you throw the key away now, you will never be able to open the cell again and you will be locked in here forever. Are you sure you want to do it?^";
               13: qtype = MainMenu;
	            qqon  = true;
                    killz = true;
                    killq = true;
	       14: return Qlist(b, 3,
                                    2,
				    3,
				    4);      

               21: "No. Keep the key.";   ! Vanaf 1
               22: 
	           "You decide to keep the key close at hand.";
               23: killz = true;
                   killq = true;               

               31: "Yes. I deserve to die the slow death of starvation in this horrible cell.";   ! Vanaf 1
               32: SmeltendTraliewerk();
	           return true;
	           
               33: killz = true;
                   killq = true;  
		   
               41: "Yes. It is the only way I can make myself harmless.";   ! Vanaf 1
               42: SmeltendTraliewerk();
	           return true;
               43: killz = true;
                   killq = true;
             }
	  ],
      has ;

      Object kasteel_kerker_poppen_fake "dolls" kasteel_kerker_cel
       class Prop,
        with name 'dolls',
	     before [;
	       default: "You can only do things with the individual dolls.";
	     ],
	 has pluralname;
      
      Object kasteel_kerker_botten "bones" kasteel_kerker_cel
       class Prop,
        with name 'bones' 'bone' 'skeleton',
	     description 
	        "This is evidently the skeleton of an adult, who was presumably left to die a lonely death in these catacombs. On the one hand it is horrible, and you'd rather not contemplate his or her fate; on the other hand you are relieved that these are obviously not the mortal remains of Maartje.",
	     before [;
	       Take: "You don't feel like walking around with human remains.";
	     ],
	 has pluralname;

      Object kasteel_kerker_ketens "chains" kasteel_kerker_cel
        with name 'chains' 'chain',
	     description 
	        "Heavy metal chains have been fastened to the wall on one side. Once, they must have been meant to restrain prisoners, as an extra safety check in addition to the bars.",
	     before [;
	       Take: "The chains are fastened to the wall.";
	       Pull: 
	         if(parent(player) == kasteel_kerker_cel || parent(self) == kasteel_kerker)
		   "You pull on the chains, but they do not come loose.";
		 "You will first have to enter the cell.";
	       Open, Close: "The moving parts with which these chains were ones fastened to limbs are nowhere to be seen.";
	       Wear: "Parading around covered in chains is something you'd rather leave to youngsters in dubious subcultures.";
	     ],
	 has pluralname scenery;

   Object kasteel_kerker_martel "instruments of torture" kasteel_kerker
    class Furniture,
     with pname '.p' 'instruments' '.p' 'torture' '.p' 'instruments' 'of' 'torture',
          description 
	     "In the dungeon are a rack--on which people could be slowly torn apart--and an iron maiden--in which people were impaled by sharp points and died a slow and painful death.",
      has pluralname scenery;
      
   Object kasteel_kerker_rek "rack" kasteel_kerker
    class Furniture,
     with name 'rack' 'wheel' 'rope' 'ropes',
          gedraaid 0,
          description [;
	     print "This is a medieval instrument of torture, upon which people were forced to lie down. Their arms and legs were tied to ropes which could be tightened by turning a wheel, slowly stretching the victim. The apparatus still seems to be in a good state.";
	     
	     if(pop_vader_kerker has general) print "^^A doll which look like a man lies on the rack, his arms and legs tied down and already stretched a bit.";
	     
	     "";
	  ], 
	  before [;
	    Search: <<Examine self>>;
	    
	    Turn:
	      switch(self.gedraaid) {
	        0: self.gedraaid = 1;
		   "Carefully you turn the wheel, and the ropes tighten. The doll is stretched further, and doesn't appear to be able to hold out much longer.";
	        1: self.gedraaid = 2;
		   "Again you turn the wheel, and again the ropes tighten even more. You hear the sound of ripping cloth; on the face of the doll you believe to see an expression of panic.";
	        2: self.gedraaid = 3;
		   remove pop_vader_kerker;
		   move pop_vader_kerker_2 to kasteel_kerker_rek;
		   "You give one last hard pull on the wheel, and with a ripping sound the father doll is torn asunder. The upper and lower half of his body are separated forever.";
		3: "You can't use the rack to further mutilate the father doll.";
		default: "You turn the wheel, but since nothing has been tied to the rack it has no effect whatsoever.";
	      }
	    
	    Tie, Receive:
	      if(second ~= pop_vader_kerker && noun ~= pop_vader_kerker) "You don't feel like torturing that.";
	      if(parent(pop_vader_kerker) ~= self) {
	        move pop_vader_kerker to self;
		give pop_vader_kerker general;
		self.gedraaid = 0;
		"You tie the father doll to the rack once more.";
	      } else {
	        "The father doll already lies on the rack.";
	      }
	  ],
      has supporter scenery;

      Object pop_vader_kerker "stretched father doll" kasteel_kerker_rek
        with name 'stretched' 'father' 'doll',
	     description "The doll is about forty centimeters big, bearded, and clothed as an adult man. He has seen better days: the tortures on the rack have made his limbs longer than they should be and in his face lies an expression of constant pain.",
	     before[;
	       Take, Remove: 
	         if(parent(self) == kasteel_kerker_rek) {
		   give self ~general;
		   move self to player;
		   kasteel_kerker_rek.gedraaid = 99;
		   "You free the father doll from his distressing situation.";
		 }
		 return false;
	       
	       Burn:
	       if(TestScope(toorts,player)) {
	         if(second == toorts || second == nothing) {
	           if(toorts has general) {
		     remove self;
		     "The flames grab the father doll hungrily, and surround him completely. A doll's cry penetrates the night--then the fire burns down and nothing remains of the toy man. Not even ashes has he left to scatter.";
		   } else {
		     "Now that the torch has gone out, it can't set anything on fire.";
	 	   }
	         } else {
	           "You can't use that to make a fire.";
	         }
	        }
		
		Play: "You don't feel like playing with the tortured doll.";

	     ],
	 has male general;
	 
      Object pop_vader_kerker_2 "torn father doll"
        with name 'father' 'doll' 'torn' 'stuffing' 'head' 'torso' 'part',
	     description "Through the force of the rack the doll has ripped in two along his middle, sundering his head and torso from his lower parts. Stuffing flows from the doll corpse onto the rack. The doll's eyes are dead and empty.",
	     before[;
	       Take, Remove: 
	         "The torn doll is too painful a sight; you don't want to walk around with him.";
       
	       Burn:
	       if(TestScope(toorts,player)) {
	         if(second == toorts || second == nothing) {
	           if(toorts has general) {
		     remove self;
		     "The flames grab the father doll hungrily, and surround both parts of his corpse completely. For a minute the silence is unbroken; even the drops of water pause their rhythmic falling. Then the fire burns down and nothing remains of the toy man: not even ashes has he left to scatter.";
		   } else {
		     "Now that the torch has gone out, it can't set anything on fire.";
	 	   }
	         } else {
	           "You can't use that to make a fire.";
	         }
	        }
		
	       Play: "The idea fills you with loathing.";
	     ],
	 has male;
 
      Object pop_moeder_kerker "famished mother doll" kasteel_kerker_cel
        with name 'mother' 'doll' 'famished',
	     description "It is hard to say what exactly has happened to her, but this doll clad in women's clothing seems paler and thinner than could have been intended. As if she has been undernourished for many long years, or is eaten away from the inside by her troubles.",
	     before[;
	       Burn:
	       if(TestScope(toorts,player)) {
	         if(second == toorts || second == nothing) {
	           if(toorts has general) {
		     remove self;
		     "You hold the mother doll into the torch's flame and watch how the fire conquers first her clothing, then her hair, and finally the skin and stuffing of her body. When it becomes too hot, you drop the doll, which burns on lying on the ground until nothing remains.";
		   } else {
		     "Now that the torch has gone out, it can't set anything on fire.";
	 	   }
	         } else {
	           "You can't use that to make a fire.";
	         }
	        }
		
	       Play: "You are no longer in the mood to play with dolls.";
	     ],
	 has female;

   Object kasteel_kerker_maagd "iron maiden" kasteel_kerker
    class Furniture,
     with name 'maiden' 'iron',
          description [;
	    if(self has open)
	      "The doors of the iron maiden are open, and thus show all the sharp spikes that would penetrate the body of the miserable convict. Generally, they were placed in such a way that they would miss the vital organs, in order to extend the suffering of the victim. When the doors are closed, the maiden is soundproof.";
	    "From the outside, the iron maiden looks like a metal sarcophagus on which has been etched the image of a girl. Inside, you know, are sharp spikes that would penetrate the body of the miserable convict. Generally, they were placed in such a way that they would miss the vital organs, in order to extend the suffering of the victim. When the doors are closed, the maiden is soundproof.";
	  ],
	  before [;
	    Enter: "And impale yourself on the sharp iron spikes?";
	    Open: 
	      if(self has open) return false;
	      give self open;
	      print "You open the heavy metal doors of the iron maiden, which are adorned on the inside with sharp spikes. The inside of the maiden, too, is full of metal points.";
	      if(parent(pop_dochter_kerker) == self)
	        print " Impaled on one of them hangs a small daughter doll.";
              "";
	    Close:
	      if(self hasnt open) return false;
	      give self ~open;
	      print "With a horrified shudder you close the doors.";
	      if(parent(pop_dochter_kerker) == self)
	        print " The doll is once more incarcerated in her dark hell.";
              "";
	    Receive: "You mislike the idea of putting things in the iron maiden.";
	  ],
      has enterable container openable ~open scenery;

   Object pop_dochter_kerker "impaled daughter doll" kasteel_kerker_maagd
    with name 'daughter' 'doll' 'impaled' 'small',
         description [;
	   if(parent(self) == kasteel_kerker_maagd)
	     "The small doll hangs helplessly on an iron spike that penetrates the middle of her body. She watches you with a stare of pure despair.";
	   "The little doll has a big hole in her body where the iron maiden's spike penetrated her. She watches you with a stare of pure despair.";
	 ],
	 before[;
	       Burn:
	       if(TestScope(toorts,player)) {
	         if(second == toorts || second == nothing) {
	           if(toorts has general) {
		     remove self;
		     "You cannot abide her stare a moment linger and throw the small doll into the flames. You turn around and weep bitter tears. When you dare to look again, nothing rests from the doll except the ineradicable memory of her pain.";
		   } else {
		     "Now that the torch has gone out, it can't set anything on fire.";
		 }
	       } else {
	         "You can't use that to make a fire.";
	         }
	        }
		
	     Play: "You are no longer in the mood to play with dolls.";
	     
	 ],
     has female;

  Object kasteel_kerker_druppels "falling drops" kasteel_kerker
   class Prop,
    with name 'drops' 'falling' 'drop' 'water',
         description
	   "Small drops of water gather on the ceiling and, when they have grown large enough, fall downwards, to smash to pieces on the floor below.",
	 before [;
	   Listen: "Every few second a drop falls to the ground, with a soft tick. It is the only sounds that breaks the silence.";
	   
	   Take: "Whenever you catch a drop, it seeps through your fingers and continues its fatal fall. ~O God! can I not grasp them with a tighter clasp?~, you mutter.";
	   
	   Drink: "The drops are too few, and they fall too irregularly.";
	 ],
     has pluralname;
     

   
Object kasteel_plaats "In the courtyard"
  with name 'courtyard' 'yard',
       description 
          "From here the state of the castle can be easily appraised. Both of the smaller towers have collapsed completely on the inside, and can no longer be climbed. In contrast, the large tower, which lies at the north side of the courtyard, seems mostly intact. Most of the buildings have been reduced to no more than rubble; only the ruin to the south and the two halls in the southeast retain some structure.",
       s_to kasteel_ruine,
       se_to kasteel_hal,
       n_to kasteel_toren_1,
       noordpas 0,
       before [;
         Go:
	   if(noun == n_obj && self.noordpas == 1)   
	     "Because of the fire and the smoke, it is impossible to enter the tower.";
       ],
   has light transparent;

   Object kasteel_plaats_kasteel "castle" kasteel_plaats
    class Prop,
     with name 'castle',
          before [;
	    Examine: <<Look>>;
	  ],
      has ;
   
   Object kasteel_plaats_gebouw "building to the south" kasteel_plaats
    class Prop,
     with pname 'building' '.x' 'to' '.x' 'the' '.x' 'south' '.p' 'ruin',
          description
	     "Nothing but a ruin remains from what once must have been the living quarters of dozens of people.",
	  before [;
	    Go, Enter: <<go s_obj>>;
	  ],
      has ;

   Object kasteel_plaats_zalen "halls" kasteel_plaats
    class Prop,
     with pname '.x' 'two' 'halls' '.x' 'to' '.x' 'the' '.x' 'southeast' '.p' 'hall',
          description 
	    "On the southeastern side of the courtyard, the large hall and the dining-hall are still more or less erect.",
      has pluralname;

   Object kasteel_plaats_torens "smaller towers"
    class Prop,
     with name 'towers' 'small' 'smaller',
          found_in  kasteel_plaats kasteel_ruine,
          description 
	    "The two smaller towers mark the front corners of the triangular castle, where the gate is. Both lean dangerously forward, and from here you can see that their insides have collapsed completely.",
	  before [;
	    Climb: "It is impossible to climb the smaller towers; the stairs seem to have been gone for a very long time, and even the floors have fallen out.";
	  ],
      has pluralname;      
      
   Object kasteel_plaats_toren "large tower"
    class Prop,
     with name 'tower' 'large',
          found_in  kasteel_plaats kasteel_ruine,
          description 
	    "The tower to the north is higher than any other building you know, and you feel that it wants to topple over and crush you beneath its infernal weight.",
	  before [;
	    Climb: "To climb the tower you will first have to enter it. The entrance lies to your north.";
	    
	    Enter: <<go n_obj>>;
	  ],
      has pluralname; 
      

Object kasteel_toren_1 "At the bottom of the middle tower"
  with name 'tower',
       verbrand 0,
       description [; 
          if(self.verbrand == 0) 
	     "The circular room is full of stacks of paper that have been put down without any apparent order. Several stacks have toppled over, but they don't quite block the way to the staircase that winds upwards from the middle of the room. Two pairs of muddy footsteps--one of an adult wearing boots, the other of a child on bare feet--lead from the door to the south all the way to the stairs.";
	  "The circular room is blackened, but completely empty. In the middle of the room a staircase winds upwards.";
	],
       s_to kasteel_plaats,
       u_to kasteel_toren_2,
       before [;
         Go:
	   if(noun == u_obj) {
	     TorenOmhoog();
	     return true;
	   }
	   return false;
       ],
   has light transparent;
   
   Object kasteel_toren_stapels "stacks of paper" kasteel_toren_1
     with name 'stack' 'stacks' 'paper' 'toppled' 'sheets',
          bekeken 0,
	  doorzocht 0,
	  verbrand 0,
          description
            [;
	      if(self.bekeken == 0) {
	        self.bekeken = 1;
	        "Large stacks of paper lie everywhere in the room, leaning against each other in a chaotic fashion. You grab a few of the pages at random and look at them. Each of them is identical to the letter the baron puts in your mailbox every night. Enraged you throw the pages down on one of the stacks.";
	      } else {
	        "Large stacks of paper lie everywhere in the room, leaning against each other in a chaotic fashion. Each of them is identical to the letter the baron puts in your mailbox every night.";
	      }
	    ],
	  before [;
	     Search, LookUnder:
	       if(self.doorzocht == 0) {
	         self.doorzocht = 1;
		 move nieuwe_fotos to player;
		 "Filled with revulsion, but determined, you search the stacks in the hope of finding something that is more interesting than the delusions and self-justifications of the baron. After a considerable time you find a number of photographs at the bottom of a small stack.";
		} else {
                  "No other interesting documents appear to be hidden between the sheets.";
		}
	     Burn:
	       if(TestScope(toorts,player)) {
	         if(second == toorts || second == nothing) {
	           if(toorts has general) {
		     if(self.verbrand == 0) {
	               StartDaemon(self);
		       return true;
	             } else {
	               "The flames are everywhere already!";
	             }
		   } else {
		     "Now that the torch has gone out, it can't set anything on fire.";
		 }
	       } else {
	         "You can't use that to make a fire.";
	         }
	        }
		
	     Take:
	       "Carrying around this mess sounds less than attractive.";
	  ],
	  daemon [;
	    self.verbrand++;
	    if(location == kasteel_toren_1) {
	      switch (self.verbrand) {
	        1: kasteel_plaats.noordpas = 1;
		   "You hold your torch against a stack of paper, which is immediately set ablaze.";
	      
	        2: "^The fire leaps from one stack to another, quicker than you could have expected. Half of the room is already burning, and the path to the door is blocked by the fire. Thick smoke rises from the burning paper.";
	      
	        3: "^The heat is almost unbearable; everywhere you look are flames. Black smoke fills your lungs.";
	      
	        4: TorenOmhoog();
    
	      }
	    }
	    
	    if(location == kasteel_plaats) {
	      switch (self.verbrand) {
	        2: "^The stacks of paper in the tower burn lustily. It seems unwise to enter.";
	      
	        3: "^The fire is still growing. Thick smoke streams flows from the doorway into the courtyard.";
	      
	        4: "^The smoke seems to lessen somewhat, as if the fire in the tower has largely done its destructive job.";
	      
	        default: StopDaemon(self);
		   while (child(kasteel_toren_1)) remove child(kasteel_toren_1);
		   move kasteel_toren_trap to kasteel_toren_1;
		   move kasteel_toren_deur to kasteel_toren_1;
		   kasteel_toren_1.verbrand = 1;
		   kasteel_plaats.noordpas = 0;
		   "^The amount of smoke now rapidly decreases. The fire appears to have burnt out in the tower.";
	      }
	    }	    
	    
	  ],
	  react_before [;
	    Go: 
	      if(noun == s_obj && self.verbrand > 1)
	        "Burning stacks block the way outside.";
	  ],
      has pluralname scenery static;
   
      Object nieuwe_fotos "found photographs"
        with name 'photos' 'pictures' 'photographs' 'found' 'new' 'recent',
	     description 
	       "These are recent pictures of your family: you, Hilde and Maartje, at home, on holiday, at school and at work. On each photo, mercilessly, unchangingly, undeniably, you see Maartje's face rigid and expressionless. Never laughing. Never merry. Dead.",
	     before [;
	       Insert:
	         if(second == fotoboek)
		   "If you had glue, you might be able to repair the album. But you don't, and besides, this is hardly your first priority.";
		 return false;
		 
	       Burn:
	       if(TestScope(toorts,player)) {
	         if(second == toorts || second == nothing) {
	           if(toorts has general) {
		     remove self;
		     "Screeching you throw the photographs into the fire, grabbing each shred that threatens to escape to throw it into the flames again. And on each picture, every time again, it is the expressionless, accusatory face of Maartje that stays intact longest and is incinerated only at the last moment.";
		   } else {
		     "Now that the torch has gone out, it can't set anything on fire.";
		 }
	       } else {
	         "You can't use that to make a fire.";
	         }
	        }	         
	     ],
	has pluralname;
	
   Object kasteel_toren_voetstappen "footsteps" kasteel_toren_1
    class Prop,
     with name 'footsteps' 'footstep' 'track' 'trace' 'muddy' 'steps' 'feet' 'footprint' 'footprints',
          description
	     "From the courtyard two clearly visible pairs of footsteps walk towards the stairs, and from there further upwards. A man with boots and a small girl on naked feet--their identity is only too easy to guess. Those stairs upwards will lead you to the baron, and to Maartje.",
      has pluralname;

   Object kasteel_toren_trap "trap" kasteel_toren_1
     with pname 
             'stairs' 'up' 'stairway' 'staircase' 'spiral',
          description "The stone stairs spiral steeply upwards.",
          door_dir u_to,
          door_to kasteel_toren_2,
          before [;
            Climb, Enter: <<go u_obj>>;
          ],
      has door scenery open;
   
   Object kasteel_toren_deur "door" kasteel_toren_1
     with name 'door',
          description "Through the door you see the courtyard.",
	  door_dir s_obj,
	  door_to kasteel_plaats,
	  before [;
	    Enter: <<go s_obj>>;
	  ],
      has door open scenery;

   Object kasteel_toren_vuur "fire"
    class Prop,
     with name 'fire' 'smoke' 'flames' 'blaze',
          found_in kasteel_toren_1 kasteel_plaats,
	  description [;
	    if(kasteel_toren_stapels.verbrand > 0 && kasteel_toren_stapels.verbrand < 4)
	      "The fire burns lustily and produces large amounts of smoke.";
	    "You see neither smoke nor fire.";
	  ],
	  before [;
	    Receive: 
	       if(kasteel_toren_stapels.verbrand > 0 && kasteel_toren_stapels.verbrand < 4) {
	         if(noun == bevroren_kat) {
		   remove bevroren_kat;
		   "You throw the corpse of Cathy into the large fire, as a kind of cremation. Quickly you mutter a short prayer for her soul's rest."; 
		 }
	         print 
	           "You throw ", (the) noun, " on the fire--the intense flames hungrily grab it, and destroy it utterly.";
	        remove noun;
	        "";
	      }
	  ],
      has container;
      
! *stapels papier, *trap, *voetstappen, *deur, *fotos, *binnenplaats; *papier in de fik steken; naar boven gaan.