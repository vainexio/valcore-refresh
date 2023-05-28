/*
SUB_COMMAND - 1
SUB_COMMAND_GROUP - 2
STRING - 3
INTEGER - 4
BOOLEAN - 5
USER - 6
CHANNEL - 7
ROLE - 8
MENTIONABLE - 9
NUMBER - 10
ATTACHMENT - 11
*/
module.exports = {
  register: false,
  deleteSlashes: [],
  slashes: [
    {
      "name": "joinall",
      "type": 1,
      "description": "Join all your verified users to your backup server",
      "options": [
        {
          "name": 'target_server_id',
          "description": 'The server you want your verified users to join',
          "type": 3,
          "required": true,
        },
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": false,
        },
      ]
    },
    {
      "name": "join",
      "type": 1,
      "description": "Shows a list of available stocks",
      {
          "name": 'target_server_id',
          "description": 'The server you want your verified users to join',
          "type": 3,
          "required": true,
        },
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": false,
        },
    }
  ],
};
