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
  deleteSlashes: ['1169812083995574394'],
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
      "description": "Joins a verified user to a server",
      "options": [
        {
          "name": 'target_server_id',
          "description": 'The server you want the user to join',
          "type": 3,
          "required": true,
        },
        {
          "name": 'target_user',
          "description": 'User you want to join',
          "type": 6,
          "required": false,
        },
        {
          "name": 'target_user_id',
          "description": 'User ID you want to join',
          "type": 3,
          "required": false,
        },
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": false,
        },
      ],
    },
    {
      "name": "transfer",
      "type": 1,
      "description": "Transfer_data",
      "options": [
        {
          "name": 'new_server_id',
          "description": 'New server ID',
          "type": 3,
          "required": true,
        },
        {
          "name": 'key',
          "description": 'Access key',
          "type": 3,
          "required": true,
        },
      ],
    },
    {
      "name": "status",
      "type": 1,
      "description": "Get backup status of a guild",
      "options": [
        {
          "name": 'unverify_button',
          "description": 'Show unverify button',
          "type": 3,
          "choices": [
            {
              name: 'show',
              value: 'show',
            },
            {
              name: 'hide',
              value: 'hide',
            },
          ],
          "required": false,
        },
        {
          "name": 'guild_id',
          "description": 'Guild ID',
          "type": 3,
          "required": false,
        },
      ],
    },
    {
      "name": "getkey",
      "type": 1,
      "description": "Get data key",
      "options": [
        {
          "name": 'id',
          "description": 'Server/Author ID',
          "type": 3,
          "required": true,
        },
      ],
    },
    {
      "name": "leaderboard",
      "type": 1,
      "description": "Get leaderboard",
    },
    {
      "name": "addroles",
      "type": 1,
      "description": "Add backup role",
      "options": [
        {
          "name": 'key',
          "description": 'Access Key',
          "type": 3,
          "required": true,
        },
      ],
    }
  ],
};
