import { OneToOne, Entity, Property, t, BeforeCreate, ManyToOne } from "@mikro-orm/sqlite";
import { BaseEntity } from "../common/base.entity.js";
import { User } from "../user/user.entity.js";
import { MeetingCode } from "./meetingCode.entity.js";
import { checkJoinCodeAvailable } from "../../meetings.js";

const wordList = [
  "apple", "bat", "cat", "dog", "egg", "fish", "goat", "hat", "ice", "jam", "kite", "log", "moon", "net", "owl", 
  "pig", "queen", "rat", "sun", "tree", "urn", "van", "wolf", "xray", "yak", "zip", "ant", "bird", "cake", "duck", 
  "ear", "frog", "gum", "hill", "ink", "jet", "key", "lamp", "mop", "nest", "oak", "pen", "quiz", "rope", "sock", 
  "tap", "urn", "vase", "web", "xylophone", "yarn", "zebra", "axe", "bag", "car", "dew", "eel", "fan", "gem", 
  "hop", "ice", "jug", "kid", "lid", "mud", "nap", "oak", "pit", "queen", "rim", "sip", "toe", "urn", "vet", 
  "wax", "yell", "zip"
];

const generateJoinCode = (wordLen: number = 3, separator: string = '-') => {
  let words = []
  for(let i = 0; i < wordLen; i++){
    var item = wordList[Math.floor(Math.random()*wordList.length)];
    words.push(item)
  }

  return words.join(separator)
}

@Entity()
export class Meeting extends BaseEntity<'password'> {
  @OneToOne()
  joinCode!: MeetingCode

  @Property()
  password = ''

  @Property()
  title!: string

  @Property({type: t.boolean})
  isVerifiedOnly = false

  @Property({type: t.boolean})
  isRecorded = false

  @ManyToOne()
  createdBy: User

  @Property()
  status: 'complete' | 'scheduled' = 'scheduled'

  constructor(title: string, createdBy: User, code: string) {
    super()
    this.title = title
    this.createdBy = createdBy
    this.joinCode = new MeetingCode(code)
  }

  static newMeetingWithCode = async (title: string, createdBy: User): Promise<Meeting> => {
    var joinCode: string = ''
    do {
      joinCode = generateJoinCode()
    } while(await checkJoinCodeAvailable(joinCode))
    return new Meeting(title, createdBy, joinCode)
  }
}
