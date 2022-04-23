const mongoose = require("mongoose");
import { Schema } from 'mongoose';

var eventSchema = new mongoose.Schema({

    userCreated: {
        type: mongoose.Types.ObjectId, 
        ref: 'User',
        required: true
    },

    createdForm: {
        
        title: {
            type: String,
            required: [true, 'Event name cannot blank']
        },

        description: {
            type: String,
            required: [true, 'description cannot blank']
        },

        socialDays: {
            type: Number,
            required: [true, 'Number of social days cannot blank']
        },

        maxRegister: {
            type: Number,
            required: [true]
        },

        eventAddress: {
            type: String,
            default: "Update later"
        },

        eventUnit: {
            type: String,
        },

        type: {
            type: String,
            default: 'Normal',
        },

        requirements: {
            type: String,
            default: "Update later"
        },

        placeGather: {
            type: String,
            default: "Update later"
        },

        formStart: {
            type: Number,
            required: [true, 'formStart cannot blank']
        },

        formEnd: {
            type: Number,
            required: [true, 'formEnd cannot blank']
        },

        eventStart: {
            type: Number,
            default: -1
        },

        eventEnd: {
            type: Number,
            default: -1
        },

        timeGather: {
            type: Number,
            default: -1,
        },

        isUrgent: {
            type: Boolean,
            default: false,
        },

        createdAt: {
            type: Number,
            default: Date.now()
        },

        updatedAt: {
            type: Number,
        },

        media: {

            type: {
                type: String,
            },

            path: {
                original: {
                    type: String,
                    required: true,
                },
                thumbnail: {
                    type: String,
                    required: true,
                },
                small: {
                    type: String,
                    required: true,
                }
            }

        },

    },

    userStaff: [{

        user: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },

        isAttempt: {
            type: Boolean,
            default: false,
        },

        attemptAt: {
            type: Number,
        },

        socialDays: {
            type: Number,
            default: 0,
        },

        reason: {
            type: String
        },

        role: {
            type: String,
            default: "Staff", //Staff, StaffContact, Leader
        }
    }],

    userRegistered: [{

        user: { 
            type: Schema.Types.ObjectId,
            ref: 'User'
        },

        checkAttendance: {

            firstCheck: {
                isCheck: {
                    type: Boolean,
                    default: false
                },
                checkTime: {
                    type: Number,
                }
            },

            secondCheck: {
                isCheck: {
                    type: Boolean,
                    default: false
                },
                checkTime: {
                    type: Number,
                }
            }

        },

        socialDays: {
            type: Number,
            default: 0,
        },

        isAttempt: {
            type: Number,
            default: false,
        },

        registeredAt: {
            type: Number,
        } 
    }],

    eventStatus: {

        start: {
            isStart: {
                type: Boolean,
                default: false,
            },
            startAt: {
                type: Number
            }
        },

        end: {
            isEnd: {
                type: Boolean,
                default: false,
            },
            endAt: {
                type: Number
            }
        },

        update: {

            updateAt: {
                type: Number,
            },

            updateBy: {
                user: {
                    type: Schema.Types.ObjectId,
                    ref: 'User'
                },
                userRole: {
                    type: String,
                }
            }
        },

        confirm: {
            lead: {
                isConfirm: {
                    type: Boolean,
                    default: false,
                },
                confirmAt: {
                    type: Boolean,
                }
            },

            admin: {
                isConfirm: {
                    type: Boolean,
                    default: false,
                },
                confirmAt: {
                    type: Boolean,
                }
            },

            myBK: {
                isConfirm: {
                    type: Boolean,
                    default: false,
                },
                confirmAt: {
                    type: Boolean,
                }
            },

            imageSource: {
                type: String,
            },

            note: {
                type: String,
            },

        }

    },

    firstCheck: {
       start: {
            isStart: {
                type: Boolean,
                default: false,
            },
            startAt: {
                type: Number
            }
        },

        end: {
            isEnd: {
                type: Boolean,
                default: false,
            },
            endAt: {
                type: Number
            }
        },
    },

    secondCheck: {
        start: {
            isStart: {
                type: Boolean,
                default: false,
            },
            startAt: {
                type: Number
            }
        },

        end: {
            isEnd: {
                type: Boolean,
                default: false,
            },
            endAt: {
                type: Number
            }
        },
    },

});

eventSchema.index({ "createdForm.title" : 'text' });
eventSchema.index({ "createdForm.description" : 'text' });


export default mongoose.model("event", eventSchema);